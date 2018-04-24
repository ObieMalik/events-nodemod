"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = require("events");
class EventEmitter extends Events.EventEmitter {
    constructor() {
        super();
        EventEmitter._instance = this;
    }
    static get instance() {
        if (!EventEmitter._instance) {
            EventEmitter._instance = new EventEmitter();
        }
        return EventEmitter._instance;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event.emitter.js.map