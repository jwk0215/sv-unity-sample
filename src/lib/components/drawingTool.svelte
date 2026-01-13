<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    // props
    let { drawingState, setDrawingState } = $props();


    // state
    let canvasEl = $state<HTMLCanvasElement | null>(null);
    let ctx = $state<CanvasRenderingContext2D | null>(null);

    let drawState = $state(false);
    let drawingModeState = $state("draw");
    let strokerColor = $state("#000");


    /**
     * drawingModeState setter
     * @param state draw | erase
     */
    function setDrawingModeState(state: string) {
        drawingModeState = state;
    }


    /**
     * 그리기 시작 이벤트
     * @param e MouseEvent
     */
    function startDraw(e: MouseEvent) {
        if (ctx) {
            drawState = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
    }


    /**
     * 그리기 이벤트
     * @param e MouseEvent
     */
    function draw(e: MouseEvent) {
        if (!drawState || !ctx) return;

        if (drawingModeState === "draw") {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = 5;
        } else {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = 20;
        }

        ctx.strokeStyle = strokerColor;
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }


    /**
     * 그리기 종료 이벤트
     * @param e MouseEvent
     */
    function endDraw(e: Event) {
        if (!drawState || !ctx) return;

        drawState = false;
        ctx.closePath();
    }


    /**
     * 전체 지우기 이벤트
     */
    function clearAll() {
        if (canvasEl && ctx) {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        }
    }


    /**
     * onMount()
    */
    onMount(() => {
        if (canvasEl) {
            canvasEl.width = canvasEl.clientWidth;
            canvasEl.height = canvasEl.clientHeight;
            ctx = canvasEl.getContext("2d");

            canvasEl.addEventListener("pointerdown", startDraw);
            canvasEl.addEventListener("pointermove", draw);
            canvasEl.addEventListener("pointerup", endDraw);
            canvasEl.addEventListener("pointerleave", endDraw);
        }
    });
    
    
    /**
     * onDestroy()
    */
    onDestroy(() => {
        if (canvasEl) {
            canvasEl.removeEventListener("pointerdown", startDraw);
            canvasEl.removeEventListener("pointermove", draw);
            canvasEl.removeEventListener("pointerup", endDraw);
            canvasEl.removeEventListener("pointerleave", endDraw);
        }
    });
</script>



<div id="drawing-tool-wrapper" class:on={drawingState}>
    <canvas id="canvas" bind:this={canvasEl}></canvas>

    <div id="btn-wrapper">
        <button id="close-btn" class="btn" onclick={() => (setDrawingState(false))}>
            닫기
        </button>

        <button id="draw-btn" class="btn" class:on={drawingModeState === "draw"}
        onclick={() => setDrawingModeState("draw")}>
            펜
        </button>

        <button id="erase-btn" class="btn" class:on={drawingModeState === "erase"}
        onclick={() => setDrawingModeState("erase")}>
            지우개
        </button>

        <button id="erase-all-btn" class="btn" onclick={clearAll}>
            모두 지우기
        </button>
    </div>
</div>



<style>
    #drawing-tool-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
    }
    #drawing-tool-wrapper.on {
        visibility: visible;
        opacity: 1;
        pointer-events: all;
    }


    #canvas {
        width: 100%;
        height: 100%;
    }


    #btn-wrapper {
        position: absolute;
        right: 2rem;
        top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border-radius: 9999px;
        background-color: #f0e990;


        & .btn {
            position: relative;
            width: 6.1rem;
            aspect-ratio: 1;
            border-radius: 50%;
            text-indent: -9999em;
            cursor: pointer;
        }
        & .btn.on::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 0.5rem solid var(--color-border-hover);
        }
        & #close-btn {
            background: url(../assets/drawing-close-icon.png) center / cover no-repeat;
        }
        & #draw-btn {
            background-image: url(../assets/drawing-pen-icons.png);
            background-position: -5px -5px;
        }
        & #erase-btn {
            background-image: url(../assets/drawing-erase-icons.png);
            background-position: -5px -5px;
        }
        & #erase-all-btn {
            background-image: url(../assets/drawing-erase-all-icon.png);
        }
    }
</style>