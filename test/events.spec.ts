import { EventEmitter } from '../src'

describe( 'Global Emitter', () => {
    it( 'should be able to emit an event globally', () => {
        const event = {
            name: 'test-event',
            data: {
                value: 1
            }
        }

        EventEmitter.addListener( event.name, ( data: { value: number } ) => {
            expect( event.data.value ).toEqual( data.value )
        } )

        EventEmitter.emit( event.name, event.data )
    } )
} )