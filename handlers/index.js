'use strict';

var path        = require( 'path' );
var rabbit      = require( 'wascally' );
var lapin       = require( 'lapin' )( rabbit );
var fetchConfig = require( 'zero-config' );
var tplServices = require( '../services/v1' );
var tplCompiler = tplServices.tplCompiler;

// fetch configurations
var config = fetchConfig( path.join( __dirname, '..' ) );

function loadTemplateHandlers () {
	lapin.respond( 'v1.templates.create', tplServices.create );
	lapin.respond( 'v1.templates.deleteById', tplServices.deleteById );
	lapin.respond( 'v1.templates.findAll', tplServices.findAll );
	lapin.respond( 'v1.templates.findById', tplServices.findById );
	lapin.respond( 'v1.templates.updateById', tplServices.updateById );
	lapin.respond( 'v1.templates.compile', tplCompiler.findTemplate.bind( tplCompiler ) );
}

function reportError ( err ) {
	if ( err ) {
		console.log( err.stack );
	}
}

rabbit
	.configure( { 'connection' : config.get( 'rabbitmq' ) } )
	.then( loadTemplateHandlers )
	.then( undefined, reportError );
