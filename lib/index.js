/**
*
*	STREAM: from-twitter
*
*
*	DESCRIPTION:
*		- Provides a stream interface for the Twitter stream API.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var Readable = require( 'readable-stream' ).Readable,
	validate = require( './validate.js' );


// VARIABLES //

var PROPS = [
	'objectMode',
	'highWaterMark',
	'encoding'
];


// FUNCTIONS //

/**
* FUNCTION: copyOptions( options )
*	Copies relevant stream options into a new object.
*
* @private
* @param {Object} options - stream options
* @returns {Object} options copy
*/
function copyOptions( options ) {
	var copy = {},
		prop,
		i;

	for ( i = 0; i < PROPS.length; i++ ) {
		prop = PROPS[ i ];
		if ( options.hasOwnProperty( prop ) ) {
			copy[ prop ] = options[ prop ];
		}
	}
	return copy;
} // end FUNCTION copyOptions()

/**
* FUNCTION: setOptions( options )
*	Sets stream specific options.
*
* @private
* @param {Object} options - stream options
*/
function setOptions( options ) {
	if ( !options.hasOwnProperty( 'objectMode' ) ) {
		options.objectMode = false;
	}
	if ( !options.hasOwnProperty( 'encoding' ) ) {
		options.encoding = null;
	}
} // end FUNCTION setOptions()


// STREAM //

/**
* FUNCTION: Stream( [options] )
*	Readable stream constructor.
*
* @constructor
* @param {Object} [options] - Readable stream options
* @returns {Stream} Readable stream
*/
function Stream( options ) {
	var opts,
		err;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	if ( !( this instanceof Stream ) ) {
		return new Stream( opts );
	}
	err = validate( opts );
	if ( err ) {
		throw err;
	}
	setOptions( opts );
	Readable.call( this, opts );
	this._destroyed = false;
	this._enc = opts.encoding;
	this._mode = opts.objectMode;
	return this;
} // end FUNCTION Stream()

/**
* Create a prototype which inherits from the parent prototype.
*/
Stream.prototype = Object.create( Readable.prototype );

/**
* Set the constructor.
*/
Stream.prototype.constructor = Stream;

/**
* METHOD: _read()
*	Implements the `_read` method to fetch data from the Twitter stream API.
*
* @private
*/
Stream.prototype._read = function() {
	this.push( Math.random() );
}; // end METHOD _read()

/**
* METHOD: destroy( [error] )
*	Gracefully destroys a stream, providing backwards compatibility.
*
* @param {Object} [error] - optional error message
* @returns {Stream} Stream instance
*/
Stream.prototype.destroy = function( error ) {
	if ( this._destroyed ) {
		return;
	}
	var self = this;
	this._destroyed = true;
	process.nextTick( destroy );

	return this;

	/**
	* FUNCTION: destroy()
	*	Emits a `close` event.
	*
	* @private
	*/
	function destroy() {
		if ( error ) {
			self.emit( 'error', error );
		}
		self.emit( 'close' );
	}
}; // end METHOD destroy()


// OBJECT MODE //

/**
* FUNCTION: objectMode( [options] )
*	Returns a stream with `objectMode` set to `true`.
*
* @param {Object} [options] - Readable stream options
* @returns {Stream} Readable stream
*/
function objectMode( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts );
} // end FUNCTION objectMode()


// FACTORY //

/**
* FUNCTION: streamFactory( [options] )
*	Creates a reusable stream factory.
*
* @param {Object} [options] - Readable stream options
* @returns {Function} stream factory
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	opts = copyOptions( opts );
	/**
	* FUNCTION: createStream()
	*	Creates a stream.
	*
	* @returns {Stream} Readable stream
	*/
	return function createStream() {
		return new Stream( opts );
	};
} // end METHOD streamFactory()


// EXPORTS //

module.exports = Stream;
module.exports.objectMode = objectMode;
module.exports.factory = streamFactory;
