export declare module CODE {

    export interface Error { 
        convert?: {
            message: string;
        }
    }
    
    export interface backgrondRemoval {
        sourceLanguage: string,
        targetLanguage: string,
        sourceLanguageCode: string,
        targetLanguageCode: string
    }

    export interface backgrondRemovalReducer { 
        isLoading: boolean;
        error: Error;
        convert: backgrondRemoval;
    }
}

