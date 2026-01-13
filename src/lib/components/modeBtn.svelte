<script lang="ts">
    import unityStore from "$stores/unity.store";
    
    
    
    
    // props
    let { name, icon, mode, modeLoading } = $props<{
        name: string,
        icon: string,
        mode: string
        modeLoading: (callback: () => void) => void;
    }>();


    /**
     * click evt
     * @param mode 모드
     */
    function clickEvt() {
        modeLoading(() => {
            if ($unityStore.mode === mode) {
                $unityStore.instance?.SendMessage("Main Camera", "SetMode", "default");
                $unityStore.instance?.SendMessage("Home", "SetObjectTransparent", "default");

                unityStore.updateMode();

            } else {
                $unityStore.instance?.SendMessage("Main Camera", "SetMode", mode);

                // home 모드 시
                if (mode === "home") {
                    $unityStore.instance?.SendMessage("Home", "SetObjectTransparent", mode);
                }

                unityStore.updateMode(mode);
            }
        });
    }
</script>



<button id="mode-btn" onclick={clickEvt}>
    {name}

    {#if $unityStore.mode === mode}
    <div id="exit-icon" class="icon"></div>
    {:else}
    <div id="mode-icon" class="icon" style={`--icon-url: url("${icon}")`}></div>
    {/if}
</button>



<style>
    #mode-btn {
        position: relative;
        width: 7rem;
        aspect-ratio: 1;
        background-color: var(--color-main);
        border-radius: 50%;
        border: 0.3rem solid var(--color-border-hover);
        text-indent: -9999em;
        cursor: pointer;


        & .icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            aspect-ratio: 1;
            background-color: var(--color-heading);
        }
        & #mode-icon {
            mask: var(--icon-url) center / cover no-repeat;
        }
        & #exit-icon {
            mask: url(../assets/mode-exit-icon.svg) center / cover no-repeat;
        }
    }
</style>