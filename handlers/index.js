'use strict';

var path        = require( 'path' );
var rabbit      = require( 'wascally' );
var lapin       = require( 'lapin' )( rabbit );
var fetchConfig = require( 'zero-config' );
var ltiServices = require( '../services/v1' );


// fetch configurations
var config = fetchConfig( path.join( __dirname, '..' ) );

function loadLTIHandlers () {
	lapin.respond( 'v1.lti.version1', ltiServices.version1 );
}

function reportError ( err ) {
	if ( err ) {
		console.log( err.stack );
	}
}

rabbit
	.configure( { 'connection' : config.get( 'rabbitmq' ) } )
	.then( loadLTIHandlers )
	.then( undefined, reportError );
