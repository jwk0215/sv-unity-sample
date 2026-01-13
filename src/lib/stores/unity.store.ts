import { writable } from "svelte/store";




interface UnityStoreType {
    instance: UnityInstance | null;
    mode: string;
}

const initialStore = {
    instance: null,
    mode: "default"
}


function createUnityStore() {
    const { subscribe, update, set } = writable<UnityStoreType>(initialStore);

    return {
        subscribe,
        updateInstance: (instance: UnityInstance) => {
            update(store => {
                store.instance = instance;
                return store;
            });
        },
        updateMode: (mode: string = "default") => {
            update(store => {
                store.mode = mode;
                return store;
            });
        }
    }
}
export default createUnityStore();