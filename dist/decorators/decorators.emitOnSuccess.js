"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const event_emitter_1 = require("../event.emitter");
require("@bazook/errors");
require("@bazook/logger");
function EmitOnSuccess(event, includeArgs = false, data) {
    return function (target, propertyKey) {
        let originalFunction = target[propertyKey];
        return target[propertyKey] = function (...args) {
            let promise = originalFunction.apply(this, args);
            promise
                .then((response) => {
                let message = { data: response };
                if (includeArgs) {
                    message = _.extend(message, { args: args });
                }
                if (data) {
                    message = _.extend(message, { ext: data });
                }
                try {
                    let status = event_emitter_1.EventEmitter.emit(event, message);
                    if (!status || status === undefined) {
                        throw new NullError('Null Response. Unknown Error');
                    }
                }
                catch (err) {
                    logger.error('Emit Failure: ', err);
                }
            });
            return promise;
        };
    };
}
exports.EmitOnSuccess = EmitOnSuccess;
//# sourceMappingURL=decorators.emitOnSuccess.js.map