/**
*
*	VALIDATE: options
*
*
*	DESCRIPTION:
*		- Validates readable stream options.
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

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive'),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' );


// VARIABLES //

var validators = {
	'encoding': encoding,
	'highWaterMark': highWaterMark,
	'objectMode': objectMode
};


// FUNCTIONS //

/**
* FUNCTION: validate( options )
*	Validates stream options.
*
* @private
* @param {Object} options - Readable stream options
* @returns {Null|TypeError} null if all options are valid or TypeError if any option is invalid
*/
function validate( options ) {
	var validator,
		keys,
		key,
		err,
		i;

	if ( !isObject( options ) ) {
		return new TypeError( 'Stream()::invalid input argument. Options must be an object.' );
	}
	keys = Object.keys( options );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		validator = validators[ key ];
		err = validator( options[ key ] );
		if ( err ) {
			return err;
		}
	}
	return null;
} // end FUNCTION validate()

/**
* FUNCTION: encoding( value )
*	Validates the stream encoding option.
*
* @private
* @param {String|Null} value - stream encoding
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function encoding( value ) {
	if ( !isString( value ) && value !== null ) {
		return new TypeError( 'Stream()::invalid option. Encoding option must be a string primitive or null. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION encoding()

/**
* FUNCTION: highWaterMark( value )
*	Validates the stream high watermark option.
*
* @private
* @param {Number} value - stream high watermark
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function highWaterMark( value ) {
	if ( !isNonNegative( value ) ) {
		return new TypeError( 'Stream()::invalid option. High watermark option must be a nonnegative number. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION highWaterMark()

/**
* FUNCTION: objectMode( value )
*	Validates the stream objectMode option.
*
* @private
* @param {Boolean} value - stream objectMode option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function objectMode( value ) {
	if ( !isBoolean( value ) ) {
		return new TypeError( 'Stream()::invalid option. objectMode option must be a boolean primitive. Option: `' + value + '`.' );
	}
	return null;
} // end FUNCTION objectMode()


// EXPORTS //

module.exports = validate;
