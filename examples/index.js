'use strict';

var toString = require( 'flow-tostring' ),
	append = require( 'flow-append' ).objectMode,
	fromArray = require( 'flow-from-array' ),
	flowStream = require( './../lib' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readableStream = fromArray( data );

// Create a new flow stream:
var stream = flowStream();

// Pipe the data:
readableStream
	.pipe( stream )
	.pipe( toString() )
	.pipe( append( '\n' ) )
	.pipe( process.stdout );
