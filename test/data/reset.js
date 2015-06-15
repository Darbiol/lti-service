'use strict';

// Load third party modules
var async      = require( 'async' );
var inflection = require( 'inflection' );

var data = require( './index' );

var sequelize;

/**
 * Truncate a specific table
 *
 * @param  {string}   table
 * @param  {function} done
 */
function truncate ( table, done ) {
	sequelize.query( 'TRUNCATE "' +  table + '"' ).complete( done );
}

/**
 * Truncate all tables in `data`
 *
 * @param  {function} done
 */
function drop ( done ) {
	async.eachSeries( Object.keys( data ), function ( item, callback ) {
		var tableName = inflection.camelize( item );
		truncate( tableName, callback );

	}, done );
}

/**
 * Saves test data from `data` to the database using Model.bulkCreate
 *
 * @param  {Model}   Model
 * @param  {[object]}   data
 * @param  {function} done
 */
function bulkCreate ( Model, data, done ) {
	Model.bulkCreate( data ).complete( done );
}

/**
 * Adds all data from `data` into the database
 *
 * @param {function} done
 */
function add ( done ) {
	async.eachSeries( Object.keys( data ), function ( item, callback ) {
		var models    = data[ item ].data;
		var modelName = inflection.camelize( inflection.singularize( item ) );
		var Model = sequelize.model( modelName );
		bulkCreate( Model, models, callback );

	}, done );
}

module.exports = function ( done ) {
	sequelize = sequelize || require( '../../models' )().sequelize;
	async.series( [ drop, add ], done );
};