"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const event_emitter_1 = require("../event.emitter");
require("@bazook/errors");
function EmitOnSuccess(event, includeArgs = false) {
    return function (target, propertyKey) {
        let originalFunction = target[propertyKey];
        return target[propertyKey] = function (...args) {
            console.log('Executing Function...');
            let promise = originalFunction.apply(this, args);
            promise
                .then((response) => {
                let message = response;
                console.log('Execution Complete. Emitting Message...');
                if (includeArgs) {
                    message = _.extend(response, args);
                }
                try {
                    let status = event_emitter_1.EventEmitter.instance.emit(event, message);
                    if (!status || status === undefined) {
                        throw new NullError('Null Response. Unknown Error');
                    }
                }
                catch (err) {
                    console.log('Emit Failure: ', err);
                }
            });
            return promise;
        };
    };
}
exports.EmitOnSuccess = EmitOnSuccess;
//# sourceMappingURL=decorators.emitOnSuccess.js.map