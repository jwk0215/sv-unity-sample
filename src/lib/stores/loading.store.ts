import { writable } from "svelte/store";




/**
 * 로딩화면 제어 스토어
 * on : 로딩화면 띄우기
 * off : 로딩화면 내리기
 */
function createLoadingStore() {
    const { subscribe, set } = writable(true);

    return {
        subscribe,
        loadingOn: () => set(true),
        loadingOff: () => set(false)
    }
}
export default createLoadingStore();