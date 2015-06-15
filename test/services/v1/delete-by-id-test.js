'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var deleteTemplate = require( '../../../services/v1/delete-by-id' );

var helper = require( '../../helper' );

beforeEach( helper.reset );

describe( 'v1.templates.deleteById', function () {

	var response;

	describe( 'when deleting an existing template', function () {

		// existing template
		var message = {
			'id' : '7ea16719-c226-4d51-907c-ebb53b1906a6'
		};

		before( function ( done ) {
			deleteTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'affected rows should be 1', function () {
			response.data.should.be.equal( 1 );
		} );
	} );

	describe( 'when deleting a non-existing template', function () {
		// non-existing template
		var message = {
			'id' : '7ea16719-c226-4d51-907c-ebb53b1906b9'
		};

		before( function ( done ) {
			deleteTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'affected rows should be 0', function () {
			response.data.should.be.equal( 0 );
		} );
	} );

	describe( 'when deleting using an invalid id', function () {
		// non-existing template
		var message = {
			'id' : '121sad#$@!!@!>?*'
		};

		before( function ( done ) {
			deleteTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );
	} );

} );
