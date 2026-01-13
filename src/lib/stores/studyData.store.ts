import { writable } from "svelte/store";
import type { StudyStoreType } from "./study.store";




type StudyDataStoreType = {
    [id: string]: StudyStoreType
}


function createStudyDataStore() {
    const { subscribe, set, update } = writable<StudyDataStoreType | null>(null);

    return {
        subscribe,
        setStore: (data: StudyDataStoreType) => {
            set(data);
        },
        /**
         * 학습 완료 후 종료 시 호출할 업데이트
         * @param id 해당 학습 데이터 ID
         * @param isStudy 학습 완료 상태
         * @param isClear clear 상태
         */
        updateState: (id: string, isStudy: boolean, isClear: boolean) => {
            update((store) => {
                if (!store || !store[id]) {
                    console.error("해당 학습 데이터가 없습니다.");
                    return store;
                }

                store[id].isStudy = isStudy;
                store[id].clear = isClear;
                return store;
            });
        }
    }
}
export default createStudyDataStore();