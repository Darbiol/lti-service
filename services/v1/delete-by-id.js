'use strict';

var template = require( '../../models' )().Template;

module.exports = function ( message, respond ) {

	var options = {
		'where' : { 'id' : message.id }
	};

	template.destroy( options )
		.then( function  ( result ) {
			respond( {
				'status' : 'success',
				'data'   : result
			} );
		} )
		.catch( function ( error ) {
			respond( {
				'status' : 'error',
				'data'   : error
			} );
		} );

};
