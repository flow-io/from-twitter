/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values, err;

		values = [
			5,
			'5',
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate( values[ i ] );
			assert.instanceOf( err, TypeError );
		}
	});

	it( 'should return an error if encoding option is not a string primitive or null', function test() {
		var values, err;

		values = [
			new String( 'utf8' ),
			5,
			{},
			true,
			NaN,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate({
				'encoding': values[ i ]
			});
			assert.instanceOf( err, TypeError );
		}
	});

	it( 'should return an error if high watermark option is not nonnegative number', function test() {
		var values, err;

		values = [
			-5,
			'5',
			{},
			true,
			NaN,
			null,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate({
				'highWaterMark': values[ i ]
			});
			assert.instanceOf( err, TypeError );
		}
	});

	it( 'should return an error if objectMode option is not a boolean primitive', function test() {
		var values, err;

		values = [
			new Boolean( true ),
			5,
			'5',
			null,
			{},
			NaN,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			err = validate({
				'objectMode': values[ i ]
			});
			assert.instanceOf( err, TypeError );
		}
	});

});
