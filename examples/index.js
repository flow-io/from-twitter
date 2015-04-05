'use strict';

var createStream = require( './../lib' );

// Create a readable stream:
var readableStream = createStream();

// Pipe the data...
readableStream.pipe( process.stdout );
