'use strict';

var template = require( '../../models' )().Template;

module.exports = function ( message, respond ) {

	template.create( message )
		.then( function  ( result ) {
			respond( {
				'status' : 'success',
				'data'   : result.dataValues
			} );
		} ).catch( function ( error ) {
			respond( {
				'status' : 'error',
				'data'   : error
			} );
		} );

};
