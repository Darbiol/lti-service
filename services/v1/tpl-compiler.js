'use strict';

var template    = require( '../../models' )().Template;
var doT         = require( 'dot' );

var EmailSender = require( '../../handlers/email-sender' );
var emailSender = new EmailSender();

module.exports = {
	'sendMail' : function ( payload, callback ) {
		emailSender.send( payload, function () {
			callback();
		} );
	},

	'compile' : function ( payload, tpl ) {
		var compiledTpl = doT.template( tpl );
		return compiledTpl( payload );
	},

	'findTemplate' : function ( message, respond ) {
		var self    = this;
		var payload = message;
		var options = {
			'where'      : { 'templateId' : message.id },
			'attributes' : [ 'id', 'templateId', 'name', 'description', 'content' ]
		};

		template.findOne( options, { 'raw' : true } )
			.then( function ( result ) {
				payload.html = self.compile( payload, result.content );

				if ( message.sendMail ) {
					// send data to email service to be sent as email
					self.sendMail( payload, function () {
						// respond a success status to the user
						respond( {
							'status' : 'success',
							'data'   : 'message sent'
						} );
					} );
				} else {
					// respond the compiles template back to the user
					respond( {
						'status' : 'success',
						'data'   : payload.html
					} );
				}
			} )
			.catch( function ( error ) {
				respond( {
					'status' : 'error',
					'data'   : error
				} );
			} );
	}
};
