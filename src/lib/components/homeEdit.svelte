<script lang="ts">
    import gemIcon from "$assets/gem-icon.png";
    import type { HomeItemType } from '$stores/homeItemShop.store';
    import homeItemShopStore from '$stores/homeItemShop.store';
    import unityStore from "$stores/unity.store";
    import userDataStore from "$stores/userData.store";
    import { onMount } from "svelte";

    // state
    let itemListEl = $state<HTMLElement>();
    let currentTabState = $state("own");
    let currentCategoryState = $state("bed");
    let currentItemState = $state<HomeItemType | null>(null);
    let canPlaceState = $state(false);


    /**
     * currentTabState setter
     * @param tab string
     */
    function setCurrentTabState(tab: string) {
        currentTabState = tab;
    }
    
    
    /**
     * currentCategoryState setter
     * @param category string
     */
    function setCurrentCategoryState(category: string) {
        currentCategoryState = category;
        $unityStore.instance?.SendMessage("Home", "SetCurrentCategory", currentCategoryState);
        if (itemListEl) itemListEl.scrollTop = 0;
    }


    /**
     * 해당 Prefab Load
     * @param item HomeItemType
     */
    function loadPrefab(item: HomeItemType) {
        currentItemState = item;
        $unityStore.instance?.SendMessage("Home", "LoadPrefab", item.prefabName);
    }


    /**
     * onMount()
    */
    onMount(() => {
        $unityStore.instance?.SendMessage("Home", "SetCurrentCategory", currentCategoryState);
    });
</script>



{#snippet itemList(itemList: HomeItemType[])}
    <ul class="item-list" bind:this={itemListEl}>
        {#each itemList as item}
        <li class="item">
            <img class="thumbnail" src="{item.thumbnail}" alt="thumbnail">

            <div class="info">
                <span class="name">{item.name}</span>

                <div class="price">
                    <img src="{gemIcon}" alt="gem">
                    <span>{item.price}</span>
                </div>

                <button class="preview-btn" onclick={() => loadPrefab(item)}>
                    보기
                </button>
            </div>
        </li>
        {/each}
    </ul>
{/snippet}


<div id="home-edit-wrapper">
    <h3 id="title">집 꾸미기</h3>

    <div class="tab-box">
        <button class="tab" class:on={currentTabState === "own"}
        onclick={() => setCurrentTabState("own")}>
            내 아이템
        </button>

        <button class="tab" class:on={currentTabState === "shop"}
        onclick={() => setCurrentTabState("shop")}>
            상점
        </button>
    </div>

    <div class="tab-box">
        <button class="tab" class:on={currentCategoryState === "bed"}
        onclick={() => setCurrentCategoryState("bed")}>
            침대
        </button>

        <button class="tab" class:on={currentCategoryState === "chair"}
        onclick={() => setCurrentCategoryState("chair")}>
            의자
        </button>

        <button class="tab" class:on={currentCategoryState === "kitchen"}
        onclick={() => setCurrentCategoryState("kitchen")}>
            부엌
        </button>

        <button class="tab" class:on={currentCategoryState === "plant"}
        onclick={() => setCurrentCategoryState("plant")}>
            식물
        </button>

        <button class="tab" class:on={currentCategoryState === "closet"}
        onclick={() => setCurrentCategoryState("closet")}>
            옷장
        </button>

        <button class="tab" class:on={currentCategoryState === "bathroom"}
        onclick={() => setCurrentCategoryState("bathroom")}>
            화장실
        </button>
    </div>

    <div id="item-viewer">
        {#if $userDataStore && currentTabState === "own"}
            {#if $userDataStore.homeItem[currentCategoryState].length > 0}
            {@render itemList($userDataStore.homeItem[currentCategoryState])}
            {:else}
            <p class="info-text">보유중인 아이템이 없습니다.</p>
            {/if}
        {/if}

        {#if $homeItemShopStore && currentTabState === "shop"}
        {@render itemList($homeItemShopStore[currentCategoryState])}
        {/if}
    </div>
</div>

{#if true}
<div id="item-toolbar">
    <button class="tool-btn">
        회전
    </button>

    <button class="tool-btn">
        선택 해제
    </button>

    <button class="tool-btn">
        삭제
    </button>

    <button class="tool-btn">
        구매하기
    </button>

    <button class="tool-btn">
        적용하기
    </button>
</div>
{/if}



<style>
    #home-edit-wrapper {
        position: absolute;
        left: 3rem;
        top: 3rem;
        z-index: 100;
        border-radius: 2rem;
        background-color: var(--color-main);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 31.5rem;
        padding: 1rem;
    }


    #title {
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-main);
        font-size: 2.2rem;
        font-weight: bold;
    }


    .tab-box {
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-background);
        display: flex;
        align-items: center;
        flex-wrap: wrap;


        & .tab {
            width: 50%;
            height: 3.5rem;
            border-radius: 9999px;
            font-size: 1.6rem;
            font-weight: bold;
            cursor: pointer;
        }
        & .tab.on {
            background-color: var(--color-main);
        }
    }


    #item-viewer {
        border-radius: 1rem;
        background-color: var(--color-background);
        height: 27rem;
        padding: 1rem;
        

        /* 안내문구 */
        & .info-text {
            width: 100%;
            height: 100%;
            font-size: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }


    .item-list {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-right: 1rem;
        /* flex-wrap: wrap; */


        & .item {
            position: relative;
            display: flex;
            padding: 1rem;
            gap: 1rem;
            flex-shrink: 0;
            width: 100%;
            background-color: var(--color-main);
            border-radius: 1rem;


            & .thumbnail {
                flex: 1;
                aspect-ratio: 1;
                border-radius: 1rem;
            }


            & .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: var(--color-background);
                border-radius: 1rem;
                padding: 1rem;
    
    
                & .name {
                    font-size: 1.7rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
    
    
                & .price {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
    
                    & img {
                        width: 2.5rem;
                        aspect-ratio: 1;
                    }
    
                    & span {
                        font-size: 1.7rem;
                    }
                }


                & .preview-btn {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    text-indent: -9999em;
                    cursor: pointer;
                }
            }
        }
    }


    #item-toolbar {
        position: absolute;
        right: 5.5rem;
        bottom: 2.5rem;
        z-index: 100;
        border-radius: 2rem;
        background-color: var(--color-background-mute);
        border: 0.3rem solid var(--color-main);
        display: flex;
        gap: 1rem;
        padding: 1rem;


        & .tool-btn {
            width: 10rem;
            height: 4rem;
            border-radius: 9999px;
            font-size: 1.6rem;
            font-weight: bold;
            color: var(--color-heading);
            background-color: var(--color-main);
            cursor: pointer;
        }
    }
</style>