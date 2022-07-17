export interface IWordRepository{
    wordType: string;
    wordLibrary: string[];
}

export interface IConstructedSentences{
    id: number,
    value: string,
    dateTime: Date
}

export interface IConfigFile{
    apiBaseUrl: string;
}