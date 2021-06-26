import * as Events from 'events';

/**
 * Global Event Emitter
 */
class GlobalEmitter {
    private static _instance: Events.EventEmitter;

    /**
     * Singleton
     */
    public static get instance(): Events.EventEmitter {
        if ( !GlobalEmitter._instance ) {
            GlobalEmitter._instance = new Events.EventEmitter();
        }
        return GlobalEmitter._instance;
    }
}

const eventEmitter = GlobalEmitter.instance

export {
    eventEmitter as EventEmitter
}