'use strict';

var _        = require( 'lodash' );
var template = require( '../../models' )().Template;

module.exports = function ( message, respond ) {
	var options = {
		'attributes' : [ 'id', 'templateId', 'name', 'description', 'content' ]
	};

	var newAttr = [];

	_.each( message, function ( val, keys ) {
		if ( val ) {
			newAttr.push( keys );
		}
	} );

	if ( newAttr.length ) {
		options.attributes = newAttr;
	}

	template.findAll( options, { 'raw' : true } )
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
