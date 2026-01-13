<script lang="ts">
    import type { CharacterItemType } from '$stores/characterItemShop.store';
    import characterItemShopStore from '$stores/characterItemShop.store';
    import unityStore from '$stores/unity.store';
    import userDataStore from '$stores/userData.store';
    import gemIcon from "$assets/gem-icon.png";
    import { onDestroy } from 'svelte';




    // state
    let currentTabState = $state<"own" | "shop">("own");
    let currentSlotState = $state<"head" | "body">("head");
    let currentItemState = $state<CharacterItemType | null>(null);
    let buyState: boolean = $derived.by(() => {
        if ($userDataStore && currentItemState) {
            const userItems = $userDataStore.item[currentSlotState];
            let flag = true;
            
            // 보유중인지 확인
            for (const item of userItems) {
                if (item.id === currentItemState.id) {
                    flag = false;
                    break;
                }
            }

            // gem이 부족한지 확인
            if ($userDataStore.gem < currentItemState.price) flag = false;

            return flag;
        } else {
            return false;
        }
    });


    /**
     * item 장착
     * @param itemName 아이템 프리팹 이름
     */
    function itemEquip(itemName: string) {
        switch (currentSlotState) {
            case "head":
                $unityStore.instance?.SendMessage(
                    "Character",
                    "HeadSlotEquip",
                    itemName
                );
                break;
        
            case "body":
                $unityStore.instance?.SendMessage(
                    "Character",
                    "BodySlotEquip",
                    itemName
                );
                break;
        
            default:
                break;
        }
    }


    /**
     * item 장착 해제
     */
    function itemUnEquip() {
        switch (currentSlotState) {
            case "head":
                $unityStore.instance?.SendMessage("Character", "HeadSlotUnEquip");
                break;
                
            case "body":
                $unityStore.instance?.SendMessage("Character", "HeadSlotUnEquip");
                break;
        
            default:
                break;
        }
    }


    /**
     * 원래 item으로 reset
     */
    function itemReset() {
        if (!$userDataStore) return;
        const userItem = $userDataStore.currentItem[currentSlotState];

        if (Object.keys(userItem).length > 0) itemEquip(userItem.prefabName);
        else itemUnEquip();
    }


    /**
     * item reset all
     */
    function itemResetAll() {
        if (!$userDataStore) return;
        const headItem = $userDataStore.currentItem["head"];
        const bodyItem = $userDataStore.currentItem["body"];
        
        if (Object.keys(headItem).length > 0) $unityStore.instance?.SendMessage("Character", "HeadSlotEquip", headItem.prefabName);
        else $unityStore.instance?.SendMessage("Character", "HeadSlotUnEquip");
        
        if (Object.keys(bodyItem).length > 0) $unityStore.instance?.SendMessage("Character", "BodySlotEquip", bodyItem.prefabName);
        else $unityStore.instance?.SendMessage("Character", "BodySlotUnEquip");
    }


    /**
     * currentTabState setter
     * @param tab "own" | "shop"
     */
    function setCurrentTabState(tab: "own" | "shop") {
        currentTabState = tab;
        currentItemState = null;
        itemReset();
    }


    /**
     * currentSlotState setter
     * @param slot "head" | "body"
     */
    function setCurrentSlotState(slot: "head" | "body") {
        currentSlotState = slot;
        currentItemState = null;
        itemReset();
    }


    /**
     * currentItemState setter
     * @param item CharacterItemType
     */
    function setCurrentItemState(item: CharacterItemType) {
        // 내 아이템 탭인 경우
        if (currentTabState === "own") {
            itemEquip(item.prefabName);
            userDataStore.updateCurrentItem(currentSlotState, item);

        // 상점 탭인 경우
        } else if (currentTabState === "shop") {
            if (!currentItemState || currentItemState.id !== item.id) {
                currentItemState = item;
                itemEquip(item.prefabName);
            }
        }
    }


    /**
     * item 구매
     */
    function buy() {
        if (
            !currentItemState ||
            !$userDataStore ||
            $userDataStore.gem < currentItemState.price
        ) return;

        userDataStore.deGem(currentItemState.price);
        userDataStore.updateItem(currentSlotState, currentItemState);
        userDataStore.updateCurrentItem(currentSlotState, currentItemState);
    }


    /**
     * onDestroy()
    */
    onDestroy(() => {
        itemResetAll();
    });
</script>



{#snippet itemList(itemData: CharacterItemType[])}
<ul class="item-list">
    {#each itemData as item}
    <li class="item">
        <img class="thumbnail" src="{item.thumbnail}" alt="thumbnail">

        <div class="info">
            <p class="name">{item.name}</p>
            <div class="price">
                <img src="{gemIcon}" alt="icon">
                <span>{item.price}</span>
            </div>
        </div>

        <!-- 보유중 표시 -->
        {#if $userDataStore}
        {#each $userDataStore.item[currentSlotState] as own}
        {#if own.id === item.id}
        <p class="is-owned">보유중</p>
        {/if}
        {/each}
        {/if}

        <button class="apply-btn" onclick={() => setCurrentItemState(item)}>
            선택
        </button>
    </li>
    {/each}
</ul>
{/snippet}


<div id="character-edit-wrapper">
    <h3 id="title">캐릭터 꾸미기</h3>

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
        <button class="tab" class:on={currentSlotState === "head"}
        onclick={() => setCurrentSlotState("head")}>
            머리
        </button>

        <button class="tab" class:on={currentSlotState === "body"}
        onclick={() => setCurrentSlotState("body")}>
            몸
        </button>
    </div>

    <div id="item-viewer">
        {#if $userDataStore && currentTabState === "own"}
            {#if $userDataStore.item[currentSlotState].length > 0}
            {@render itemList($userDataStore.item[currentSlotState])}
    
            <button class="item-btn">
                장착하기
            </button>
            {:else}
            <p class="info-text">보유중인 아이템이 없습니다.</p>
            {/if}
        {/if}

        {#if $characterItemShopStore && currentTabState === "shop"}
        {@render itemList($characterItemShopStore[currentSlotState])}

        <button class="item-btn" class:disable={!buyState} onclick={buy}>
            구매 및 장착하기
        </button>
        {/if}
    </div>
</div>



<style>
    #character-edit-wrapper {
        position: absolute;
        left: 3rem;
        top: 3rem;
        z-index: 100;
        border-radius: 2rem;
        background-color: var(--color-main);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 40rem;
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
        padding: 0.5rem;
        border-radius: 9999px;
        background-color: var(--color-background);
        display: flex;
        align-items: center;


        & .tab {
            height: 4rem;
            flex: 1;
            border-radius: 9999px;
            font-size: 1.8rem;
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
        height: 35rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;


        /* 안내문구 */
        & .info-text {
            width: 100%;
            height: 100%;
            font-size: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }


        /* 장착 및 구매 버튼 */
        & .item-btn {
            padding: 1.3rem 0;
            font-size: 1.8rem;
            border-radius: 9999px;
            background-color: var(--color-main);
            font-weight: bold;
            cursor: pointer;
        }
        & .item-btn.disable {
            filter: grayscale(0.9);
            cursor: default;
        }


        /* 아이템 리스트 */
        & .item-list {
            width: 100%;
            flex: 1;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            overflow-y: auto;

            
            & .item {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                border-radius: 1rem;
                width: calc(50% - 1rem);
                aspect-ratio: 1 / 1.1;
                background-color: var(--color-main);
                padding: 1rem;


                & .thumbnail {
                    width: 100%;
                    aspect-ratio: 1 / 0.65;
                    border-radius: 1rem;
                }


                & .info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background-color: var(--color-background);
                    border-radius: 1rem;

                    
                    & .name {
                        flex: 1;
                        font-size: 1.7rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
    
    
                    & .price {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 0.5rem;
    
                        
                        & img {
                            width: 2.5rem;
                            aspect-ratio: 1;
                        }


                        & span {
                            font-size: 1.7rem;
                        }
                    }
                }


                & .apply-btn {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    text-indent: -9999em;
                }


                & .is-owned {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    padding: 1rem;
                    width: 100%;
                    height: 100%;
                    background-color: var(--color-border-hover);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: var(--color-heading);
                }
                & .is-owned::before {
                    content: '';
                    width: 100%;
                    aspect-ratio: 1 / 0.65;
                }
            }
        }
    }
</style>