"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitOnSuccess = void 0;
const _ = require("lodash");
const event_emitter_1 = require("../event.emitter");
const errors_1 = require("@om-node/errors");
const logger_1 = require("@om-node/logger");
function emitOnSuccess(event, includeArgs = false, data) {
    return function (target, propertyKey) {
        const originalFunction = target[propertyKey];
        target[propertyKey] = function (...args) {
            const promise = originalFunction.apply(this, args);
            promise.then((response) => {
                let message = { data: response };
                if (includeArgs) {
                    message = _.extend(message, { args: args });
                }
                if (data) {
                    message = _.extend(message, { ext: data });
                }
                try {
                    const status = event_emitter_1.EventEmitter.emit(event, message);
                    if (!status || status === undefined) {
                        throw new errors_1.NullError('Null Response. Unknown Error');
                    }
                }
                catch (err) {
                    logger_1.logger.error('Emit Failure: ', err);
                }
            });
            return promise;
        };
        return target[propertyKey];
    };
}
exports.EmitOnSuccess = emitOnSuccess;
//# sourceMappingURL=decorators.emitOnSuccess.js.map