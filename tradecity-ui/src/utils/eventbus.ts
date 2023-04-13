import { Subject, Subscription } from 'rxjs';

export class EventMessage<T> {
    constructor(public readonly messageId: string, public readonly payload: T) {}
}

type TopicRegistry<T> = Map<string, Subject<EventMessage<T>>>;
export class EventBus<T> {
    private topicRegistry: TopicRegistry<T>;

    public constructor() {
        this.topicRegistry = new Map();
    }

    public subscribe(topic: string, callback: (value: EventMessage<T>) => void): Subscription {
        const subjectFromRegistry = this.topicRegistry.get(topic);
        if (subjectFromRegistry) {
            return subjectFromRegistry.subscribe(callback);
        }
        const subject = new Subject<EventMessage<T>>();
        this.topicRegistry.set(topic, subject);
        return subject.subscribe(callback);
    }

    public emit(topic: string, message: EventMessage<T>): void {
        this.topicRegistry.get(topic)?.next(message);
    }
}
