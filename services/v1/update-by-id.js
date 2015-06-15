'use strict';

var template = require( '../../models' )().Template;

module.exports = function ( message, respond ) {

	if ( !message.id ) {
		return respond( {
			'status' : 'fail',
			'data'   : 'ID is required.'
		} );
	}

	template.findOne( message.id )
		.then( function ( foundTemplate ) {
			if ( foundTemplate ) {
				foundTemplate.updateAttributes( message.payload )
					.then( function ( updatedTemplate ) {
						respond( {
							'status' : 'success',
							'data'   : updatedTemplate.dataValues
						} );
					} )
					.catch( function ( error ) {
						respond( {
							'status' : 'error',
							'data'   : error
						} );
					} );
			} else {
				respond( {
					'status' : 'error',
					'data'   : new Error( 'Template not found.' )
				} );
			}
		} )
		.catch( function ( error ) {
			respond( {
				'status' : 'error',
				'data'   : error
			} );
		} );

};
