'use strict';

var template = require( '../../models' )().Template;

module.exports = function ( message, respond ) {

	var options = {
		'where'      : { 'id' : message.id },
		'attributes' : [ 'id', 'templateId', 'name', 'description', 'content' ]
	};

	template.findOne( options, { 'raw' : true } )
		.then( function ( result ) {
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
