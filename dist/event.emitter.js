"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const Events = require("events");
class GlobalEmitter {
    static get instance() {
        if (!GlobalEmitter._instance) {
            GlobalEmitter._instance = new Events.EventEmitter();
        }
        return GlobalEmitter._instance;
    }
}
const eventEmitter = GlobalEmitter.instance;
exports.EventEmitter = eventEmitter;
//# sourceMappingURL=event.emitter.js.map