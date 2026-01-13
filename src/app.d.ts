// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		onUnityLoaded: () => void;
	}


	interface UnityInstance {
		SendMessage(gameObject: string, methodName: string, value?: string): void;
        SetFullscreen(flag: boolean): void;
        Quit(): Promise<void>;
	}


	declare function createUnityInstance(
        canvas: HTMLCanvasElement,
        config: {
			dataUrl: string;
			frameworkUrl: string;
			codeUrl: string;
		},
		onProgress?: (progress: number) => void,
    ): Promise<UnityInstance>;


	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
