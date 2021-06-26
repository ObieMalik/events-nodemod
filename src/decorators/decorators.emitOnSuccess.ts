import * as _ from 'lodash'

import { EventEmitter } from '../event.emitter'

import { NullError } from '@om-node/errors'
import { logger } from '@om-node/logger'

/**
 * EmitOnSuccess - 
 * Decorator to be used on controllers only.
 * @param {string} event Event Name
 * @param {boolean} includeArgs Include decorated function arguments
 * @param {object} data Data emitted to the event
 * @return {function} originalFunction
 */
function emitOnSuccess(
    event: string,
    includeArgs: boolean = false,
    data?: any ): any {
    return function ( target: any, propertyKey: string ): any {
        const originalFunction = target[ propertyKey ]

        target[ propertyKey ] = function ( ...args: any[] ) {
            const promise = originalFunction.apply( this, args )

            promise.then( ( response: any ) => {
                let message = { data: response }

                if ( includeArgs ) {
                    message = _.extend( message, { args: args } )
                }

                if ( data ) {
                    message = _.extend( message, { ext: data } )
                }

                try {
                    const status = EventEmitter.emit( event, message )

                    if ( !status || status === undefined ) {
                        throw new NullError( 'Null Response. Unknown Error' )
                    }
                } catch ( err ) {
                    logger.error( 'Emit Failure: ', err )
                }
            } )

            return promise
        }

        return target[ propertyKey ]
    }
}

export {
    emitOnSuccess as EmitOnSuccess
}