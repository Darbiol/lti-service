'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var createTemplate = require( '../../../services/v1/create' );

var helper = require( '../../helper' );

beforeEach( helper.reset );

describe( 'v1.templates.create', function () {

	var response;

	describe( 'when creating a template with valid payload', function () {
		// valid payload
		var message = {
			'name'        : 'Template 1',
			'description' : 'Template 1 description',
			'content'     : 'Template 1 content'
		};

		before( function ( done ) {
			createTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return the created template', function () {
			response.data.should.have.property( 'id' )
				.and.be.a.String.with.lengthOf( 36 );

			response.data.should.have.property( 'templateId' )
				.and.be.a.Number;

			response.data.should.have.property( 'name' )
				.and.be.a.String.and.equal( message.name );

			response.data.should.have.property( 'description' )
				.and.be.a.String.and.equal( message.description );

			response.data.should.have.property( 'content' )
				.and.be.a.String.and.equal( message.content );

			response.data.should.have.property( 'createdAt' )
				.and.be.a.Date;

			response.data.should.have.property( 'updatedAt' )
			.and.be.a.Date;
		} );
	} );

	describe( 'when creating new template with invalid payload', function () {
		// invalid payload
		var message = {
			'name' : ''
		};

		before( function ( done ) {
			createTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

} );
