import { writable } from "svelte/store";
import type { CharacterItemType } from "./characterItemShop.store";
import type { HomeItemType } from "./homeItemShop.store";






type UserStoreType = {
    id: string;
    name: string;
    gem: number;
    item: {
        [key: string]: CharacterItemType[];
    };
    currentItem: {
        [key: string]: CharacterItemType;
    };
    homeItem: {
        [key: string]: HomeItemType[];
    };
    currentHomeItem: {
        [key: string]: HomeItemType[];
    }
}


function createUserStore() {
    const { subscribe, set, update } = writable<UserStoreType | null>(null);

    return {
        subscribe,
        setStore: (data: UserStoreType) => set(data),
        addGem: (value: number) => {
            update(store => {
                if (!store) return store;
                
                store.gem += value;
                return store;
            });
        },
        deGem: (value: number) => {
            update(store => {
                if (!store) return store;

                store.gem -= value;
                return store;
            });
        },
        updateItem: (slot: string, item: CharacterItemType) => {
            update(store => {
                if (!store) return store;

                store.item[slot].push(item);
                return store;
            });
        },
        updateCurrentItem: (slot: string, item: CharacterItemType) => {
            update(store => {
                if (!store) return store;

                store.currentItem[slot] = item;
                return store;
            });
        }
    }
}
export default createUserStore();