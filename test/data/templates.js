'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

// Load third party modules
var _  = require( 'lodash' );

// Load local modules
var data = JSON.parse( fs.readFileSync(
	path.join( __dirname, './templates.json' )
) );

function getByAttribute ( attribute, value ) {
	/*jshint validthis:true */
	var conditions = {};

	conditions[ attribute ] = value;
	return _.find( this, conditions );
}

module.exports = {
	'getByAttribute' : getByAttribute.bind( data ),
	'data'           : data
};