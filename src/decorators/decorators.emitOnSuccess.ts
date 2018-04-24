import * as _ from 'lodash'

import { EventEmitter } from '../event.emitter'

import '@bazook/errors'

export function EmitOnSuccess( event: string, includeArgs: boolean = false ): any {
    return function ( target: any, propertyKey: string ): any {
        let originalFunction = target[ propertyKey ]

        return target[ propertyKey ] = function ( ...args: any[] ) {
            console.log( 'Executing Function...' )

            let promise = originalFunction.apply( this, args )
            promise
                .then( ( response: any ) => {
                    let message = response
                    console.log( 'Execution Complete. Emitting Message...' )

                    if ( includeArgs ) { message = _.extend( response, args ) }
                    try {
                        let status = EventEmitter.instance.emit( event, message )
                        if ( !status || status === undefined ) {
                            throw new NullError( 'Null Response. Unknown Error' )
                        }
                    } catch ( err ) {
                        console.log( 'Emit Failure: ', err )
                    }
                } )
            return promise
        }
    }
}