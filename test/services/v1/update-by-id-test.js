'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var updateTemplate = require( '../../../services/v1/update-by-id' );

var helper = require( '../../helper' );

beforeEach( helper.reset );

describe( 'v1.templates.updateById', function () {

	var response;

	describe( 'when updating an existing template', function () {

		var message = {
			'id' : '8405d22a-7adf-40cb-9b54-9fd72fbf4621',

			'payload' : {
				'name' : 'Updated template name'
			}
		};

		before( function ( done ) {
			updateTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return the updated template', function () {
			response.data.name.should.be.equal( message.payload.name );
		} );
	} );

	describe( 'when updating a non-existing template', function () {
		// non-existing template
		var message = {
			'id'      : '8405d22a-7adf-40cb-9b54-9fd72fbf4622',
			'payload' : {
				'name' : 'Updated template name'
			}
		};

		before( function ( done ) {
			updateTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

	describe( 'when updating a template using an invalid id', function () {

		var message = {
			'id'      : '1231asdasda!@#!@#@!sd1111',
			'payload' : {
				'name' : 'Updated template name'
			}
		};

		before( function ( done ) {
			updateTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

	describe( 'when updating a template without an id', function () {

		var message = {
			'id'      : null,
			'payload' : {
				'name' : 'Updated template name'
			}
		};

		before( function ( done ) {
			updateTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `fail` status', function () {
			response.status.should.be.equal( 'fail' );
		} );

		it( 'should return string data', function () {
			response.data.should.be.equal( 'ID is required.' );
		} );
	} );

	describe( 'when attempting to update template ID', function () {

		var message = {
			'id'      : '8405d22a-7adf-40cb-9b54-9fd72fbf4621',
			'payload' : {
				'templateId' : 102
			}
		};

		before( function ( done ) {
			updateTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

} );
