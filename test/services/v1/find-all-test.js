'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var findAllTemplate = require( '../../../services/v1/find-all' );

var helper = require( '../../helper' );

beforeEach( helper.reset );

describe( 'v1.templates.findAll', function () {

	var response;

	describe( 'when all existing fields are defined to be returned after the query', function () {
		before( function ( done ) {
			var filters = {
				'id'          : true,
				'name'        : true,
				'description' : true,
				'content'     : true,
				'templateId'  : true
			};

			findAllTemplate( filters, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return an array', function () {
			response.data.should.be.an.Array;
			response.data.length.should.be.above( 0 );
		} );

		it( 'should return data with all properties', function () {
			response.data.forEach( function ( template ) {
				Object.keys( template ).length.should.equal( 5 );
			} );
		} );

		it( 'should return template objects', function () {
			response.data.forEach( function ( template ) {
				template.should.have.property( 'id' ).and.be.a.String.with.lengthOf( 36 );
				template.should.have.property( 'templateId' ).and.be.a.Number;
				template.should.have.property( 'name' ).and.be.a.String;
				template.should.have.property( 'description' ).and.be.a.String;
				template.should.have.property( 'content' ).and.be.a.String;
			} );
		} );
	} );

	describe( 'when not specifying any fields to be returned after query', function () {
		before( function ( done ) {
			var filters = {};

			findAllTemplate( filters, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return an array', function () {
			response.data.should.be.an.Array;
			response.data.length.should.be.above( 0 );
		} );

		it( 'should return data with all properties', function () {
			response.data.forEach( function ( template ) {
				Object.keys( template ).length.should.equal( 5 );
			} );
		} );

		it( 'should return template objects', function () {
			response.data.forEach( function ( template ) {
				template.should.have.property( 'id' ).and.be.a.String.with.lengthOf( 36 );
				template.should.have.property( 'templateId' ).and.be.a.Number;
				template.should.have.property( 'name' ).and.be.a.String;
				template.should.have.property( 'description' ).and.be.a.String;
				template.should.have.property( 'content' ).and.be.a.String;
			} );
		} );
	} );

	describe( 'when some of the existing fields are defined to be returned after the query', function () {
		// code
		before( function ( done ) {
			var filters = {
				'id'          : true,
				'name'        : false,
				'description' : true,
				'content'     : false
			};

			findAllTemplate( filters, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `success` status', function () {
			response.status.should.be.equal( 'success' );
		} );

		it( 'should return an array', function () {
			response.data.should.be.an.Array;
			response.data.length.should.be.above( 0 );
		} );

		it( 'should return only two properties', function () {
			response.data.forEach( function ( template ) {
				Object.keys( template ).length.should.equal( 2 );
			} );
		} );

		it( 'should return template objects with only two properties', function () {
			response.data.forEach( function ( template ) {
				template.should.have.property( 'id' ).and.be.a.String.with.lengthOf( 36 );
				template.should.have.property( 'description' ).and.be.a.String;
			} );
		} );
	} );

	describe( 'when non-existing fields are defined as a return field after query', function () {
		before( function ( done ) {
			var filters = {
				'id'          : true,
				'name'        : false,
				'description' : false,
				'status'      : true
			};

			findAllTemplate( filters , function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );

	} );

} );
