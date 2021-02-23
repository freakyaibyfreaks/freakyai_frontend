export declare module CODE {

    export interface Error { 
        convert?: {
            message: string;
        }
    }
    
    export interface codeConverter {
        sourceLanguage: string,
        targetLanguage: string,
        sourceLanguageCode: string,
        targetLanguageCode: string
    }

    export interface codeConverterReducer { 
        isLoading: boolean;
        error: Error;
        convert: codeConverter;
    }
}

