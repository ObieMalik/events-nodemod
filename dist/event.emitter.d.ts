import * as Events from 'events';
export declare class EventEmitter extends Events.EventEmitter {
    private static _instance;
    private constructor();
    static readonly instance: EventEmitter;
}
