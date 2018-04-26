"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = require("events");
class GlobalEmitter {
    static get instance() {
        if (!GlobalEmitter._instance) {
            GlobalEmitter._instance = new Events.EventEmitter();
        }
        return GlobalEmitter._instance;
    }
}
exports.EventEmitter = GlobalEmitter.instance;
//# sourceMappingURL=event.emitter.js.map