'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

var fs          = require( 'fs' );
var path        = require( 'path' );
var Sequelize   = require( 'sequelize' );
var fetchConfig = require( 'zero-config' );

// fetch database configurations
var config   = fetchConfig( path.join( __dirname, '..' ) );
var dbConfig = config.get( 'database' );

var basename = path.basename( module.filename );
var db       = {};

// connect to database
var sequelize = new Sequelize( dbConfig.database,
	dbConfig.username, dbConfig.password, {
		'host'    : dbConfig.host,
		'port'    : dbConfig.port,
		'dialect' : dbConfig.dialect,
		'logging' : dbConfig.logging || false
	}
);

module.exports = function ( callback ) {
	// get all models
	fs
		.readdirSync( __dirname )
		.filter( function ( file ) {
			return ( file.indexOf( '.' ) !== 0 ) && ( file !== basename );
		} )
		.forEach( function ( file ) {
			var model        = sequelize.import( path.join( __dirname, file ) );
			db[ model.name ] = model;

			typeof callback === 'function' && callback();
		} );

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	return db;
};
