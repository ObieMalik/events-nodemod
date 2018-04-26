import * as _ from 'lodash'

import { EventEmitter } from '../event.emitter'

import '@bazook/errors'
import '@bazook/logger'

export function EmitOnSuccess( event: string, includeArgs: boolean = false, data?: any ): any {
    return function ( target: any, propertyKey: string ): any {
        let originalFunction = target[ propertyKey ]

        return target[ propertyKey ] = function ( ...args: any[] ) {
            let promise = originalFunction.apply( this, args )
            promise
                .then( ( response: any ) => {
                    let message = { data: response }

                    if ( includeArgs ) { message = _.extend( message, { args: args } ) }
                    if ( data ) { message = _.extend( message, { ext: data } ) }
                    
                    try {
                        let status = EventEmitter.emit( event, message )
                        if ( !status || status === undefined ) {
                            throw new NullError( 'Null Response. Unknown Error' )
                        }
                    } catch ( err ) {
                        logger.error( 'Emit Failure: ', err )
                    }
                } )
            
            return promise
        }
    }
}