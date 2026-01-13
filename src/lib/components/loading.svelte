<script lang="ts">
    import { fade } from "svelte/transition";
</script>


<div id="loading-wrapper" out:fade={{duration: 300}}>
    <div id="loading-effect">
        <div class="loading"></div>
        <div class="loading"></div>
        <div class="loading"></div>
        <div class="loading"></div>
        <div class="loading"></div>
    </div>
</div>


<style>
    #loading-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background-color: var(--color-background);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }


    #loading-effect {
        display: flex;
        align-items: center;
        gap: 1rem;


        & .loading {
            width: 2rem;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: var(--color-main);
            transform: scale(0.5);
            animation: loading 1.5s ease-in-out infinite;
        }
        & .loading:nth-child(2) { animation-delay: 0.2s; }
        & .loading:nth-child(3) { animation-delay: 0.4s; }
        & .loading:nth-child(4) { animation-delay: 0.6s; }
        & .loading:nth-child(5) { animation-delay: 0.8s; }
    }




    @keyframes loading {
        0% { transform: scale(0.5); }
        50% { transform: scale(1); }
        100% { transform: scale(0.5); }
    }
</style>