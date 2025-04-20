import { KafkaStep, KafkaTopic } from "../enum/kafka.enum";

export interface KafkaMessage<T = any> {
    key: string;
    topic: KafkaTopic;
    step?: KafkaStep;
    timestamp: number;
    value: T;
    headers?: {
        userId?: string;
        requestId?: string;
    }
}
