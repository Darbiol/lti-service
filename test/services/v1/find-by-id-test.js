'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var findTemplate = require( '../../../services/v1/find-by-id' );

var helper = require( '../../helper' );

beforeEach( helper.reset );

describe( 'v1.templates.findById', function () {

	var response;

	describe( 'when finding an existing template', function () {
		var message = {
			'id' : '2b38548f-bd16-4992-b443-ebd45ce5161f'
		};

		before( function ( done ) {
			findTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return a template', function () {
			response.data.should.have.property( 'id' )
				.and.equal( message.id ).and.be.a.String;

			response.data.should.have.property( 'templateId' )
				.and.be.a.Number;

			response.data.should.have.property( 'name' )
				.and.be.a.String;

			response.data.should.have.property( 'description' )
				.and.be.a.String;

			response.data.should.have.property( 'content' )
				.and.be.a.String;
		} );
	} );

	describe( 'when finding a non-existing template', function () {
		var message = {
			'id' : '1ea16719-c226-4d51-907c-ebb53b1906a6'
		};

		before( function ( done ) {
			findTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return null', function () {
			( response.data === null ).should.be.true;
		} );
	} );

	describe( 'when finding a template using invalid id', function () {
		var message = {
			'id' : '1121212sdf!!@#!@E@'
		};

		before( function ( done ) {
			findTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

} );
