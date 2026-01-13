import { writable } from "svelte/store";




export interface HomeItemType {
    name: string;
    prefabName: string;
    price: number;
    thumbnail: string;
    id: string;
    pos: any;
}

interface HomeItemShopStoreType {
    [key: string]: HomeItemType[];
}


function createHomeItemShopStore() {
    const { subscribe, set, update } = writable<HomeItemShopStoreType | null>(null);
    
    return {
        subscribe,
        setStore: (data: HomeItemShopStoreType) => set(data)
    }
}
export default createHomeItemShopStore();