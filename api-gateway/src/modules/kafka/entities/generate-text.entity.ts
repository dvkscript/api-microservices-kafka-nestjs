export class convertSpeechToTextEntity {
    text: string;
    chunks: {
        timestamp: number[];
        text: string;
    }[]
}