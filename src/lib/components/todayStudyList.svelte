<script lang="ts">
    import tFindDifference from "$assets/thumbnail-findDifference.png";
    import tFindRoute from "$assets/thumbnail-findRoute.png";
    import tSudoku from "$assets/thumbnail-sudoku.png";
    import closeIcon from "$assets/close-icon.svg";
    import gemIcon from "$assets/gem-icon.png";
    import gemEmptyIcon from "$assets/gem-empty-icon.png";
    import loadingStore from "$stores/loading.store";
    import studyStore, { type StudyStoreType } from "$stores/study.store";
    import studyDataStore from "$stores/studyData.store";
    import { fade, fly } from "svelte/transition";
    import unityStore from "$stores/unity.store";




    const thumbnail: {[key: string]: string} = {
        findDifference: tFindDifference,
        findRoute: tFindRoute,
        sudoku: tSudoku
    };


    // props
    let { tsViewState, setTsViewState } = $props();


    /**
     * 학습 시작
     * @param id 학습 ID
     */
    function studyStartEvt(data: StudyStoreType) {
        loadingStore.loadingOn();
        studyStore.setStore(data);
        setTsViewState(false);

        if ($unityStore.mode !== "default") {
            $unityStore.instance?.SendMessage("Main Camera", "SetMode", "default");
            unityStore.updateMode();
        }
    }
</script>



{#if tsViewState}
<div id="wrapper" transition:fade={{duration: 300}}>
    <div id="view-box" transition:fly={{x: 0, y: 50, duration: 300}}>
        <header id="header">
            <h2 id="title">오늘의 학습</h2>

            <button id="close-btn" onclick={() => setTsViewState(false)}>
                <img src="{closeIcon}" alt="icon">
            </button>
        </header>

        <ul id="ts-list">
            {#if $studyDataStore}
            {#each Object.keys($studyDataStore) as id}
            <li class="ts">
                <div class="ts-title-part">
                    <h3 class="ts-title">{$studyDataStore[id].title}</h3>
                    <h4 class="ts-sub-title">
                        {$studyDataStore[id].subTitle}
                        <img class="gem" src="{$studyDataStore[id].clear ? gemIcon : gemEmptyIcon}" alt="">
                    </h4>
                </div>

                <img class="ts-thumbnail" src="{thumbnail[$studyDataStore[id].studyType]}" alt="thumbnail">

                <button class="ts-start-btn" onclick={() => studyStartEvt($studyDataStore[id])}>
                    {$studyDataStore[id].isStudy ? "다시하기" : "시작하기"}
                </button>
            </li>
            {/each}
            {:else}
            <li id="info">
                데이터를 불러오지 못했습니다.
            </li>
            {/if}
        </ul>
    </div>
</div>
{/if}



<style>
    #wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #view-box {
        display: flex;
        flex-direction: column;
        border: 0.2rem solid var(--color-main);
        background-color: var(--color-background);
        border-radius: 2rem;
        overflow: hidden;
    }


    /* 헤더 부분 */
    #header {
        position: relative;
        margin-top: 1rem;
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 1rem;

        
        & #title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: inline-flex;
            font-size: 2.4rem;
            font-weight: bold;
        }


        & #close-btn {
            height: 100%;
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;


            & img {
                width: 60%;
                aspect-ratio: 1;
            }
        }
    }


    /* 리스트 부분 */
    #ts-list {
        padding: 2rem;
        display: flex;
        gap: 2rem;


        & #info {
            padding: 2rem;
            font-size: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }


        & .ts {
            width: 25rem;
            height: 30rem;
            border-radius: 2rem;
            border: 0.2rem solid var(--color-main);
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem;


            & .ts-title-part {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                gap: 0.5rem;
    
                & .ts-title {
                    font-size: 2.2rem;
                    font-weight: bold;
                    color: var(--color-main);
                }

                & .ts-sub-title {
                    font-weight: bold;
                    font-size: 1.6rem;
                    display: flex;
                    align-items: center;

                    & .gem {
                        width: 2.6rem;
                        aspect-ratio: 1;
                    }
                }
            }


            & .ts-thumbnail {
                display: block;
                width: 100%;
                aspect-ratio: 1.6 / 1;
                border: 0.2rem solid var(--color-border);
            }


            & .ts-start-btn {
                width: 100%;
                flex: 1;
                border-radius: 9999px;
                background-color: var(--color-main);
                border: 0.2rem solid var(--color-border);
                font-size: 1.8rem;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
</style>