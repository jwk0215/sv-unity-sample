import { writable } from "svelte/store";




export interface CharacterItemType {
    name: string;
    prefabName: string;
    price: number;
    thumbnail: string;
    id: string;
}

interface CharacterItemShopStoreType {
    [key: string]: CharacterItemType[];
}

function createCharacterItemShopStore() {
    const { subscribe, set, update } = writable<CharacterItemShopStoreType | null>(null);

    return {
        subscribe,
        setStore: (data: CharacterItemShopStoreType) => set(data)
    }
}
export default createCharacterItemShopStore();