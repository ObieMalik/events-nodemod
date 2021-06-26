"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('Global Emitter', () => {
    it('should be able to emit an event globally', () => {
        const event = {
            name: 'test-event',
            data: {
                value: 1
            }
        };
        src_1.EventEmitter.addListener(event.name, (data) => {
            expect(event.data.value).toEqual(data.value);
        });
        src_1.EventEmitter.emit(event.name, event.data);
    });
});
//# sourceMappingURL=events.spec.js.map