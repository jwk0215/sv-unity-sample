<script lang="ts">
    // props
    let { msg } = $props();


    /**
     * 재시도 이벤트 (새로고침)
     */
    function retryEvt() {
        window.location.replace(window.location.href);
    }
</script>



<div id="alert-wrapper">
    <div id="alert">
        <p id="msg">{@html msg}</p>

        <button id="retry-btn" onclick={retryEvt}>
            다시시도
        </button>
    </div>
</div>



<style>
    #alert-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #alert {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        padding: 3rem 4rem;
        border-radius: 2rem;
        background-color: var(--color-background);
        border: 0.2rem solid var(--color-border);
    }


    #msg {
        font-size: 1.8rem;
        text-align: center;
    }


    #retry-btn {
        width: 5rem;
        aspect-ratio: 1;
        border-radius: 1rem;
        text-indent: -9999em;
        border: 0.2rem solid var(--color-border);
        background: var(--color-third) url(../assets/retry-icon.svg) center / 70% no-repeat;
        cursor: pointer;
    }
</style>