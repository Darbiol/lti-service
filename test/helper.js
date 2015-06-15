'use strict';

var data  = require( './data/index' );
var reset = require( './data/reset' );

before( function ( done ) {
	// Load models
	require( '../models' )( done );
} );

module.exports = {
	'data'  : data,
	'reset' : reset
};
