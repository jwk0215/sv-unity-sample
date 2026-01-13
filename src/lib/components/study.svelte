<script lang="ts">
    import startIMG from "$assets/start.png";
    import loadingStore from "$stores/loading.store";
    import studyStore from "$stores/study.store";
    import { onDestroy, onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import DrawingTool from "./drawingTool.svelte";
    import studyDataStore from "$stores/studyData.store";
    import userDataStore from "$stores/userData.store";
    import { SoundUtil } from "$utils/sound.util";




    // state
    let wrapperEl = $state<HTMLDivElement | null>(null);        // 학습 컴포넌트 최상단 element
    let iframeEle = $state<HTMLIFrameElement | null>(null);     // 학습 페이지 iframe element
    let progressState = $state("loading");                      // 학습 상태 state
    let userActionState = $state(false);                        // 버튼 클릭 가능여부 state
    let bgmState = $state(true);                                // bgm state
    let closePopupState = $state(false);                        // 종료 팝업 state
    let stepState = $state(0);                                  // step state
    let stepClearState = $state(false);                         // step clear state

    let hintCountState = $state(0);                             // hint 사용 갯수 state
    let hintPopupState = $state(false);                         // hint 팝업 state

    let drawingState = $state(false);                           // 그리기 state
    
    let incorrectEffectState = $state(false);                   // 오답 효과 state
    let correctBtnState = $state(false);                        // 정답 확인 버튼 state
    let correctAniState = $state(false);                        // 정답 애니메이션 state

    let studyEndPopupState = $state(false);                     // 학습 완료 팝업 state
    let clearState = $state(true);                              // 클리어 state


    /**
     * IFRAME으로 학습 페이지 생성
     */
    async function setIframePage() {
        iframeEle = document.createElement("iframe");
        iframeEle.src = '';
        iframeEle.title = "학습 프레임";
        iframeEle.style = "position: relative; width: 100%; height: 100%; overflow: hidden;";
        wrapperEl?.appendChild(iframeEle);

        const doc = iframeEle.contentWindow?.document || iframeEle.contentDocument;
        const fileNameArr = [
            "createjs.min",
            "animate",
            "animate.util",
            "msg.util",
            "controller",
            "study"
        ];
        const dynamicFileNameArr = [
            $studyStore?.devId,
            "study"
        ];

        if (doc) {
            async function loadScript(doc: Document, src: string) {
                return new Promise((resolve, reject) => {
                    const script = doc.createElement("script");
                    script.src = src;
                    script.onload = resolve;
                    script.onerror = reject;
                    doc.head.appendChild(script);
                });
            }

            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html style="width: 100%; height: 100%; overflow: hidden;">
                <head>
                <base href=./contents/${$studyStore?.section}/${$studyStore?.id}/>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                </head>
                <body onload="init()" style="margin: 0px; width: 100%; height: 100%;"></body>
                </html>
            `);

            for (const fileName of fileNameArr) {
                await loadScript(doc, `/contents/common/js/${fileName}.js`);
            }

            for (const fileName of dynamicFileNameArr) {
                await loadScript(doc, `./${fileName}.js`);
            }
            doc.close();
        }
    }


    /**
     * closePopupState setter
     * @param state boolean
     */
    function setClosePopupState(state: boolean) {
        if (userActionState) closePopupState = state;
    }


    /**
     * hintPopupState setter
     * @param state boolean
     */
    function setHintPopupState(state: boolean) {
        if (userActionState) hintPopupState = state;
    }


    /**
     * drawingState setter
     * @param state boolean
     */
    function setDrawingState(state: boolean) {
        if (userActionState) drawingState = state;
    }
    
    
    /**
     * close evt
     */
    function closeEvt() {
        if (userActionState) studyStore.clearStore();
    }


    /**
     * 기능 버튼 이벤트
     * @param funcType 기능 타입
     */
    async function clickEvt(funcType: string) {
        if (!userActionState || !$studyStore || !$studyDataStore) return;
        
        switch (funcType) {
            case "hint":
                sendMsgToIframe("checkHint");
                break;

            case "useHintOverLimit":
                clearState = false;
                setHintPopupState(false);
                sendMsgToIframe("showHint");
                break;

            case "drawing":
                setDrawingState(true);
                break;

            case "nextStep":
                hintCountState = 0;
                stepClearState = false;
                stepState++;
                sendMsgToIframe("nextStep", { step: stepState });
                sendMsgToIframe("start");
                break;

            case "retry":
                studyEndPopupState = false;

                userActionState = false;
                stepState = 0;
                stepClearState = false;
                hintCountState = 0;
                clearState = true;

                if (iframeEle) {
                    wrapperEl?.removeChild(iframeEle);
                    iframeEle = null;
                }

                await setIframePage();
                break;

            case "studyEnd":
                closeEvt();
                break;

            case "bgm":
                bgmState ? SoundUtil.mute("bgm", true) : SoundUtil.mute("bgm", false);
                bgmState = !bgmState;
                break;
        
            default:
                break;
        }

        SoundUtil.playSound("click");
    }


    /**
     * 정답 애니메이션 종료 시 이벤트
     */
    function correctAniEndEvt() {
        if (!$studyStore || !$studyDataStore) return;

        // 스텝 완료 시
        if (stepState < ($studyStore.step - 1)) {
            correctAniState = false;
            stepClearState = true;

        // 학습 완료 시
        } else {
            const id = ($studyStore.section.toUpperCase()) + $studyStore.id;

            if (!$studyDataStore[id].clear) {
                studyDataStore.updateState(id, true, clearState);
                if (clearState) userDataStore.addGem($studyStore.gem);
            }

            studyEndPopupState = true;
            correctAniState = false;
        }
    }


    /**
     * 학습 IFRAME으로 메시지 전송
     * @param type 메시지 타입
     * @param msg 메시지 객체
     */
    function sendMsgToIframe(type: string, msg: any = {}) {
        msg.type = type;
        iframeEle?.contentWindow?.postMessage(msg, '*');
    }


    /**
     * 메시지 수신 이벤트
     */
    function rcvMsgEvt({ data }: any) {
        if (!$studyStore) return;
        
        switch (data.type) {
            case "reqStudyData":
                sendMsgToIframe("resStudyData", {step: 0, id: $studyStore?.devId});
                break;
        
            case "loadingEnd":
                loadingStore.loadingOff();
                progressState = "start";
                SoundUtil.playSound("start");

                setTimeout(() => {
                    progressState = "playing";
                    sendMsgToIframe("start");
                    userActionState = true;

                    setTimeout(() => {
                        SoundUtil.playSound("bgm", true);
                    }, 500);
                }, 1800);
                break;
        
            case "incorrectStart":
                userActionState = false;
                incorrectEffectState = true;
                break;
                
                case "incorrectEnd":
                userActionState = true;
                incorrectEffectState = false;
                break;
        
            case "useCorrectBtn":
                correctBtnState = data.isAvailable;
                break;
        
            case "checkHint":
                if (
                    clearState &&
                    $studyStore.hintCount &&
                    hintCountState >= $studyStore.hintCount
                ) {
                    setHintPopupState(true);
                } else {
                    sendMsgToIframe("showHint");
                }
                break;
        
            case "hintUsed":
                hintCountState++;
                break;

            case "studyEnd":
                correctAniState = true;
                SoundUtil.playSound("correct");
                break;

            case "retryReady":
                progressState = "start";

                setTimeout(() => {
                    progressState = "playing";
                    sendMsgToIframe("start");
                    userActionState = true;
                }, 1800);
                break;
        
            default:
                break;
        }
    }
    
    
    /**
     * onMount()
    */
    onMount(async () => {
        window.addEventListener("message", rcvMsgEvt);
        await setIframePage();
    });


    /**
     * onDestroy()
    */
    onDestroy(() => {
        window.removeEventListener("message", rcvMsgEvt);

        if (iframeEle) {
            iframeEle.src = "about:blank";
            iframeEle.remove();
            iframeEle = null;
        }

        SoundUtil.stop("bgm");
    });
</script>



{#if $studyStore}
<div id="study-wrapper" bind:this={wrapperEl}>
    <!-- 시작 애니메이션 -->
    {#if progressState === "start"}
    <div id="start-img-wrapper">
        <img src="{startIMG}?cache={Date.now()}" alt="start">
    </div>
    {/if}

    {#if incorrectEffectState}
    <div id="incorrect-effect"></div>
    {/if}

    <!-- 배경음 -->
    <button id="bgm-btn" class:mute={!bgmState} onclick={() => clickEvt("bgm")}>
        배경음
    </button>
    
    <!-- 닫기 관련 -->
    <button id="close-popup-btn" onclick={() => setClosePopupState(true)}>
        닫기
    </button>
    {#if closePopupState}
    <div class="popup" transition:fade={{duration: 300}}>
        <div class="popup-content" transition:fly={{x: 0, y: 50, duration: 300}}>
            <p class="info-text">종료하시겠습니까?</p>
            
            <button id="close-btn" class="popup-btn" onclick={closeEvt}>
                종료하기
            </button>

            <button id="cancel-btn" class="popup-btn" onclick={() => setClosePopupState(false)}>
                취소하기
            </button>
        </div>
    </div>
    {/if}

    <!-- 스텝 표시 -->
    <div id="step-count">
        {#each Array($studyStore.step) as _, step}
        <span class="step" class:on={step <= stepState}></span>
        {/each}
    </div>

    <!-- 컨트롤 버튼 -->
    <div id="control-btn-wrapper">
        {#each Object.entries($studyStore.studyController) as [key, value]}
            {#if value}
                <button id="{key}" onclick={() => sendMsgToIframe(key)}
                class="control-btn" class:enable={key === "correct" && correctBtnState}>
                    {key}
                </button>
            {/if}
        {/each}
    </div>

    <!-- 기능 버튼 -->
    <div id="func-btn-wrapper">
        <button id="hint-btn" class="func-btn" onclick={() => clickEvt("hint")}>
            힌트
        </button>

        {#if $studyStore?.useDrawing}
        <button id="drawing-btn" class="func-btn" onclick={() => clickEvt("drawing")}>
            그림판
        </button>
        {/if}
    </div>

    <!-- 힌트 최대 팝업 -->
    {#if hintPopupState}
    <div class="popup">
        <div class="popup-content">
            <p class="info-text">힌트를 더 사용하면<br>보석을 얻을 수 없습니다.<br></p>

            <button id="use-hint-btn" class="popup-btn" onclick={() => clickEvt("useHintOverLimit")}>
                사용하기
            </button>

            <button class="popup-btn" onclick={() => setHintPopupState(false)}>
                취소하기
            </button>
        </div>
    </div>
    {/if}

    <!-- 그리기 툴 -->
    <DrawingTool drawingState={drawingState} setDrawingState={setDrawingState} />

    <!-- 정답 애니메이션 -->
    {#if correctAniState}
    <div id="correct-ani-wrapper">
        <div id="correct-ani" onanimationend={correctAniEndEvt}></div>
    </div>
    {/if}

    <!-- 다음 버튼 -->
    {#if stepClearState}
    <button id="next-btn" onclick={() => clickEvt("nextStep")}>
        다음 스텝으로
    </button>
    {/if}

    <!-- 클리어 팝업 -->
    {#if studyEndPopupState}
        {#if clearState}
        <div class="popup">
            <div id="clear-popup-content" class="popup-content">
                <div id="gem-icon"></div>
                
                <p class="info-text">
                    <span>{$studyStore?.title}</span> Clear!<br>참 잘했어요!
                </p>

                <button id="restart-btn" class="popup-btn" onclick={() => clickEvt("retry")}>
                    다시하기
                </button>

                <button class="popup-btn" onclick={() => clickEvt("studyEnd")}>
                    종료하기
                </button>
            </div>
        </div>
        {:else}
        <div class="popup">
            <div id="end-popup-content" class="popup-content">
                <div id="empty-gem-icon"></div>

                <p class="info-text">학습 완료!<br>아쉽지만 보석은 얻지 못했어요.<br>다시 도전해 볼까요?</p>
        
                <button id="retry-btn" class="popup-btn" onclick={() => clickEvt("retry")}>
                    다시하기
                </button>
        
                <button class="popup-btn" onclick={() => clickEvt("studyEnd")}>
                    종료하기
                </button>
            </div>
        </div>
        {/if}
    {/if}
</div>
{/if}



<style>
    #study-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9000;
        background-image: url(../assets/study-background.png);
        background-position: center;
        background-size: auto;
        background-repeat: no-repeat;
    }


    /* 팝업 */
    .popup {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;


        & .popup-content {
            padding: 2rem;
            width: 40rem;
            border-radius: 2rem;
            border: 0.2rem solid var(--color-main);
            background-color: var(--color-background);
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;


            & .info-text {
                width: 100%;
                padding: 2rem 0;
                text-align: center;
                font-size: 2.4rem;
                font-weight: bold;


                & span {
                    font-size: 2.4rem;
                    color: var(--color-main);
                    font-weight: bold;
                }
            }

            & .popup-btn {
                flex: 1;
                height: 5rem;
                font-size: 1.8rem;
                font-weight: bold;
                border-radius: 9999px;
                border: 0.2rem solid var(--color-border);
                background-color: var(--color-main);
                cursor: pointer;
            }
        }
    }


    /* 시작 애니메이션 부분 */
    #start-img-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }


    /* 오답 효과 */
    #incorrect-effect {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: url(../assets/incorrect_frame.png) center / 100% 100% no-repeat;
    }


    /* 배경음 버튼 */
    #bgm-btn {
        position: absolute;
        left: 0.7rem;
        top: 4rem;
        z-index: 90;
        width: 5rem;
        aspect-ratio: 1;
        text-indent: -9999em;
        border-radius: 50%;
        background-image: url(../assets/study-btns.png);
        background-position-x: -270px;
        background-position-y: -6px;
        cursor: pointer;
    }
    #bgm-btn.mute {
        background-position-x: -396px;
    }


    /* 종료 팝업 버튼 */
    #close-popup-btn {
        position: absolute;
        right: 0.7rem;
        top: 4rem;
        z-index: 90;
        width: 5rem;
        aspect-ratio: 1;
        text-indent: -9999em;
        border-radius: 50%;
        background-image: url(../assets/study-btns.png);
        background-position-x: -333.5px;
        background-position-y: -6px;
        cursor: pointer;
    }


    /* 종료 팝업 (종료 버튼) */
    #close-btn {
        background-color: rgb(245, 120, 120);
        color: var(--color-background);
    }

    
    /* STEP 안내 */
    #step-count {
        position: absolute;
        left: 50%;
        top: 2.4rem;
        z-index: 80;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        gap: 1rem;

        & .step {
            width: 2.2rem;
            aspect-ratio: 1;
            background-image: url(../assets/study-btns.png);
            background-position-x: -454px;
            background-position-y: -31px;
        }
        & .step.on {
            background-position-x: -477px;
        }
    }


    /* 컨트롤 버튼들 */
    #control-btn-wrapper {
        position: absolute;
        left: 50%;
        bottom: 5.5rem;
        transform: translateX(-50%);
        z-index: 80;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;


        & .control-btn {
            width: 8.8rem;
            height: 8.2rem;
            text-indent: -9999em;
            background-image: url(../assets/study-btns.png);
            cursor: pointer;
        }
        & #restart {
            background-position-x: 0;
            background-position-y: 0;
        }
        & #rollback {
            background-position-x: -88px;
            background-position-y: 0;
        }
        & #correct {
            background-position-x: -176px;
            background-position-y: 0;
            filter: grayscale(1);
            pointer-events: none;
        }
        & #correct.enable {
            filter: grayscale(0);
            pointer-events: all;
        }
    }


    /* 기능 버튼들 */
    #func-btn-wrapper {
        position: absolute;
        left: 70%;
        bottom: 5.5rem;
        z-index: 80;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;


        & .func-btn {
            width: 81px;
            aspect-ratio: 1;
            border-radius: 50%;
            background-image: url(../assets/study-btns.png);
            text-indent: -9999em;
            cursor: pointer;
        }
        & #hint-btn {
            background-position: -98px -82px;
        }
        & #drawing-btn {
            background-position: -262px -82px;
        }
    }


    /* 힌트 팝업 (힌트 사용 버튼) */
    #use-hint-btn {
        background-color: rgb(245, 149, 120);
        color: var(--color-background);
    }


    /* 정답 애니메이션 */
    @keyframes correct-ani {
        from { background-position: 0 0; }
        to { background-position: -6470px 0; }
    }
    #correct-ani-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 99;
        transform: translate(-50%, -50%);
        width: 647px;
        height: 461px;

        & #correct-ani {
            width: 6470px;
            height: 100%;
            background-image: url(../assets/correct_ani.png);
            background-repeat: no-repeat;
            animation: correct-ani 1s steps(10);
        }
    }


    /* 다음 스텝으로 버튼 */
    @keyframes next-effect {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
    #next-btn {
        animation-name: next-effect;
        animation-duration: 1.2s;
        animation-iteration-count: 3;
        position: absolute;
        right: 5rem;
        bottom: 5rem;
        z-index: 90;
        width: 9rem;
        height: 7.2rem;
        text-indent: -9999em;
        background-image: url(../assets/study-btns.png);
        background-position-y: -82px;
        cursor: pointer;
    }


    /* 클리어 팝업 */
    #clear-popup-content {
        position: relative;
        overflow: visible;
        padding-top: 4rem;


        & #gem-icon {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            width: 10rem;
            aspect-ratio: 1;
            background: url(../assets/gem-icon.png) center / cover no-repeat;
        }


        & #restart-btn {
            background-color: #ff85c8;
            color: var(--color-background);
        }
    }
    #clear-popup-content::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, 15%);
        z-index: -1;
        width: 648px;
        height: 233px;
        background: url(../assets/study-clear-background.png) center / cover no-repeat;
    }
    #clear-popup-content::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translate(-50%, -50%);
        width: 287px;
        height: 100px;
        background: url(../assets/study-clear-img.png) center / cover no-repeat;
    }


    /* 학습 완료 팝업 (클리어는 아니지만 학습이 완료된 경우) */
    #end-popup-content {
        position: relative;
        overflow: visible;
        padding-top: 4rem;


        & #empty-gem-icon {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, -50%);
            width: 10rem;
            aspect-ratio: 1;
            background: url(../assets/gem-empty-icon.png) center / cover no-repeat;
        }


        & #retry-btn {
            background-color: #ff85c8;
            color: var(--color-background);
        }
    }
</style>