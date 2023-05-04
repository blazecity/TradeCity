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

export enum Topics {
    OUTSIDE_CLICK = "outside_click",
    ESCAPE_CLICKED = "escape_clicked",
    FUNCTIONALITY_GROUP_INDEX_CHANGED = "functionality_group_index_changed",
    MODULE_SELECTED_NAME = "module_selected_name",
    FUNCTIONALITY_BAR_VISIBLE = "functionality_bar_visible",
    HOME_MODULE_SELECTED = "home_module_selected",
    FUNCTIONALITY_SELECTED = "functionality_selected",
    FUNCTIONALITY_SELECTED_NAME = "functionality_selected_name",
    PANEL_EXPANDED = "panel_expanded"
}
