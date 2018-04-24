import * as Events from 'events';

export class EventEmitter extends Events.EventEmitter {
    private static _instance: EventEmitter;

    private constructor() {
        super();
        EventEmitter._instance = this;
    }

    public static get instance(): EventEmitter {
        if ( !EventEmitter._instance ) {
            EventEmitter._instance = new EventEmitter();
        }
        return EventEmitter._instance;
    }
}