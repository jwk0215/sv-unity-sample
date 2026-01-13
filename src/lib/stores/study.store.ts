import { writable } from "svelte/store";





export type StudyStoreType = {
    section: string;
    id: string;
    devId: string;
    title: string;
    subTitle: string;
    studyType: string;
    step: number;
    hintCount: number;
    useDrawing: boolean;
    studyController: {
        restart: boolean;
        rollback: boolean;
        correct: boolean;
    };
    isStudy: boolean;
    clear: boolean;
    gem: number;
}


function createStudyStore() {
    const { subscribe, set, update } = writable<StudyStoreType | null>(null);

    return {
        subscribe,
        setStore: (data: StudyStoreType) => set(data),
        clearStore: () => set(null)
    }
}
export default createStudyStore();