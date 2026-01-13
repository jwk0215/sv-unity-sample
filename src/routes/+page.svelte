<script lang="ts">
    import Alert from "$components/alert.svelte";
    import Header from "$components/header.svelte";
    import Loading from "$components/loading.svelte";
    import Study from "$components/study.svelte";
    import loadingStore from "$stores/loading.store";
    import studyStore from "$stores/study.store";
    import studyDataStore from "$stores/studyData.store";
    import userDataStore from "$stores/userData.store";
    import clickSound from "$assets/sounds/click.mp3";
    import correctSound from "$assets/sounds/correct.mp3";
    import startSound from "$assets/sounds/start.mp3";
    import bgmSound from "$assets/sounds/game-bgm.mp3";
    import unityStore from "$stores/unity.store";
    import ModeBtn from "$components/modeBtn.svelte";
    import characterIcon from "$assets/mode-character-icon.svg";
    import homeIcon from "$assets/mode-home-icon.svg";
    import moveIcon from "$assets/mode-move-icon.svg";
    import CharacterEdit from "$components/characterEdit.svelte";
    import characterItemShopStore from "$stores/characterItemShop.store";
    import { onMount } from "svelte";
    import { SoundUtil } from "$utils/sound.util";
    import { fade } from "svelte/transition";
    import HomeEdit from "$components/homeEdit.svelte";
    import homeItemShopStore from "$stores/homeItemShop.store";




    // state
    let canvasEl = $state<HTMLCanvasElement | null>(null);
    let modeLoadingState = $state(false);
    let errorState = $state<string | null>(null);


    /**
     * 모드 전환 시 호출할 함수
     * @param callback 모드 전환에 필요한 기능을 담은 콜백
     */
    function modeLoading(callback: () => void) {
        modeLoadingState = true;

        setTimeout(() => {
            callback();
            modeLoadingState = false;
        }, 600);
    }


    // unity config
    const config = {
        dataUrl: "/unity/data.gz",
        frameworkUrl: "/unity/framework.js.gz",
        codeUrl: "/unity/wasm.gz",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Land",
        productVersion: "0.1",
        contextAttributes: { alpha: true }
    }


    /**
     * 유니티 로드
     */
    function setUnity() {
        const script = document.createElement("script");
        script.src = "/unity/loader.js";
        script.onload = async () => {
            try {
                unityStore.updateInstance(await createUnityInstance(canvasEl!, config));
                console.log("%c ----- 유니티 로드 완료 -----", "color: #fff; background-color: #0ea500");
            } catch (error) {
                console.error("%c ----- 유니티 로드 실패 -----", "color: #fff; background-color: red");
            }
        }
        document.body.appendChild(script);
    }

    
    /**
     * onMount()
    */
    onMount(async () => {
        try {
            // 오디오 등록
            SoundUtil.addSound("click", clickSound);
            SoundUtil.addSound("correct", correctSound);
            SoundUtil.addSound("start", startSound);
            SoundUtil.addSound("bgm", bgmSound);

            // 데이터 가져오기
            const userDataRes = await fetch("/data/user.data.json");
            const studyDataRes = await fetch("/data/study.data.json");
            const characterItemDataRes = await fetch("/data/item.data.character.json");
            const homeItemDataRes = await fetch("/data/item.data.home.json");

            // 데이터 가져오기 실패 시
            if (!userDataRes.ok || !studyDataRes.ok || !characterItemDataRes.ok) {
                throw new Error("데이터를 불러오지 못했습니다.<br>확인 후 다시 시도해주세요.");

            // 데이터 가져오기 성공 시 스토어 등록
            } else {
                userDataStore.setStore(await userDataRes.json());
                studyDataStore.setStore(await studyDataRes.json());
                characterItemShopStore.setStore(await characterItemDataRes.json());
                homeItemShopStore.setStore(await homeItemDataRes.json());
            }

            // 유니티 셋팅 및 onUnityLoaded 선언
            window.onUnityLoaded = () => {
                setTimeout(() => {
                    loadingStore.loadingOff();
                }, 500);
            }
            setUnity();
            
        } catch (error: any) {
            errorState = error.message;
        }
    });
</script>




<svelte:head>
    <title>Title</title>
</svelte:head>

<div id="layout">
    {#if $loadingStore}
    <Loading />
    {/if}

    {#if $studyStore}
    <Study />
    {/if}



    {#if !errorState}
    <Header />

    <main id="main">
        <canvas id="canvas" bind:this={canvasEl}></canvas>

        {#if $unityStore.mode === "character"}
        <CharacterEdit />
        {/if}

        {#if $unityStore.mode === "home"}
        <HomeEdit />
        {/if}

        <div id="mode-btn-wrapper">
            <ModeBtn name={"캐릭터 변경 모드"} icon={characterIcon} mode={"character"} modeLoading={modeLoading} />
            <!-- <ModeBtn name={"집 꾸미기 모드"} icon={homeIcon} mode={"home"} modeLoading={modeLoading} /> -->
            <!-- <ModeBtn name={"이동 모드"} icon={moveIcon} mode={"move"} modeLoading={modeLoading} /> -->
        </div>

        {#if modeLoadingState}
        <div id="mode-loading" transition:fade={{duration: 300}}></div>
        {/if}
    </main>
    {:else}
    <Alert msg={errorState} />
    {/if}
</div>




<style>
    :global(*) {
        overflow: hidden;
    }
    
    
    #layout {
        position: relative;
        width: 1224px;
        height: 800px;
        background-color: var(--color-main);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 5rem 1fr;
        gap: 1rem;
        grid-template-areas: 
        "header"
        "main";
        padding: 1rem 2rem 2rem 2rem;
    }


    #main {
        position: relative;
        grid-area: main;
        border-radius: 5rem;
        background-color: var(--color-background);


        & #canvas {
            width: 100%;
            height: 100%;
        }


        & #mode-btn-wrapper {
            position: absolute;
            left: 3rem;
            bottom: 3rem;
            display: flex;
            gap: 2rem;
        }


        & #mode-loading {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            background-color: #181818;
        }
    }


    /* 스크롤 스타일 */
    :global(*::-webkit-scrollbar) {
		width: 1rem;
		height: 1rem;
		background-color: var(--color-background);
	}
	:global(*::-webkit-scrollbar-thumb) {
		border-radius: 9999rem;
		background-color: var(--color-scroll);
	}
	:global(*::-webkit-scrollbar-thumb:hover) {
		background-color: var(--color-scroll-hover);
	}
	:global(*::-webkit-scrollbar-corner) {
		background-color: var(--color-background);
	}
</style>