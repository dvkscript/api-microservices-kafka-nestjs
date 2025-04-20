import { RequestContextService } from "src/libs/application/context/AppRequestContext";
import { KafkaStep, KafkaTopic } from "../enum/kafka.enum";
import { KafkaMessage } from "./kafka-message.interface";

export class KafkaMessageFactory {
  static createMessage<T>(options: {
    topic: KafkaTopic;
    step?: KafkaStep;
    data: T;
    userId?: string;
    correlationId?: string;
  }): KafkaMessage<T> {
    const requestId = options.correlationId ?? RequestContextService.getRequestId();
    const userId = options.userId ?? RequestContextService.getUser()?.id;
    const key = userId ?? requestId;

    const headers = {
      requestId
    };

    if (userId) {
      headers["userId"] = userId;
    }

    return {
      key,
      topic: options.topic,
      step: options.step,
      timestamp: Date.now(),
      value: {
        ...options.data,
      },
      headers
    };
  }
}