from-twitter
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a stream interface for the Twitter stream API.


## Installation

``` bash
$ npm install flow-from-twitter
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var stream = require( 'flow-from-twitter' );
```

#### stream( [options] )

What does this stream do?

``` javascript

```

To set the stream `options`,

``` javascript
var opts = {
	
};

// TODO: demo use
```



#### stream.factory( [options] )

Returns a reusable stream factory. The factory method ensures streams are configured identically by using the same set of provided `options`.

``` javascript
var opts = {
	
};

var factory = require( 'flow-from-twitter' ).factory( opts );

// TODO: demo use
```


#### stream.objectMode( [options] )

This method is a convenience function to create streams which always operate in `objectMode`. The method will __always__ override the `objectMode` option in `options`.

``` javascript
var stream = require( 'flow-from-twitter' ).objectMode;

// TODO: demo use
```




## Examples

``` javascript
var toString = require( 'flow-tostring' ),
	append = require( 'flow-append' ).objectMode,
	fromArray = require( 'flow-from-array' ),
	flowStream = require( 'flow-from-twitter' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/flow-from-twitter.svg
[npm-url]: https://npmjs.org/package/flow-from-twitter

[travis-image]: http://img.shields.io/travis/flow-io/from-twitter/master.svg
[travis-url]: https://travis-ci.org/flow-io/from-twitter

[coveralls-image]: https://img.shields.io/coveralls/flow-io/from-twitter/master.svg
[coveralls-url]: https://coveralls.io/r/flow-io/from-twitter?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/from-twitter.svg
[dependencies-url]: https://david-dm.org/flow-io/from-twitter

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/from-twitter.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/from-twitter

[github-issues-image]: http://img.shields.io/github/issues/flow-io/from-twitter.svg
[github-issues-url]: https://github.com/flow-io/from-twitter/issues
