import * as Events from 'events';

class GlobalEmitter {
    
    private static _instance: Events.EventEmitter;

    public static get instance(): Events.EventEmitter {
        if ( !GlobalEmitter._instance ) {
            GlobalEmitter._instance = new Events.EventEmitter();
        }
        return GlobalEmitter._instance;
    }

}

export const EventEmitter = GlobalEmitter.instance