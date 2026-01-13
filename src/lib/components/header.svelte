<script lang="ts">
    import gemIcon from "$assets/gem-icon.png";
    import userDataStore from "$stores/userData.store";
    import TodayStudyList from "./todayStudyList.svelte";




    // state
    let tsViewState = $state(false);


    /**
     * tsViewState setter
     * @param state 변경할 state값
     */
    function setTsViewState(state: boolean) {
        tsViewState = state;
    }
</script>



<header id="header">
    <h1 id="title">TITLE</h1>

    <div id="menu-wrapper">
        <div id="user-info">
            <span id="user-name">이름: {$userDataStore?.name}</span>

            <div id="gem">
                <img src="{gemIcon}" alt="icon">
                <span>: {$userDataStore?.gem}</span>
            </div>
        </div>
        
        <button id="today-study-btn" onclick={() => setTsViewState(true)}>
            오늘의 학습
        </button>
    </div>
</header>
<TodayStudyList tsViewState={tsViewState} setTsViewState={setTsViewState} />



<style>
    #header {
        grid-area: header;
        display: flex;
        align-items: center;
        padding: 0 2rem;
    }


    #title {
        font-size: 2.8rem;
        font-weight: bold;
    }


    #menu-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 2rem;


        /* 사용자 정보 표시 */
        & #user-info {
            display: flex;
            align-items: center;
            gap: 1rem;


            & #user-name {
                font-size: 1.6rem;
                font-weight: bold;
            }


            & #gem {
                display: flex;
                align-items: center;

                &, & * {
                    font-size: 1.6rem;
                    font-weight: bold;
                }

                & img {
                    width: 3rem;
                    aspect-ratio: 1;
                }
            }
        }

        & #today-study-btn {
            font-size: 1.6rem;
            font-weight: bold;
            padding: 1rem 2rem;
            border: 0.2rem solid var(--color-border-hover);
            border-radius: 9999px;
            cursor: pointer;
        }
    }
</style>