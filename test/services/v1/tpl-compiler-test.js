'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

// module to test
var tplCompiler = require( '../../../services/v1/tpl-compiler' );
var helper      = require( '../../helper' );
var sinon       = require( 'sinon' );

beforeEach( helper.reset );

describe( 'template compiler', function () {

	var response;

	it( 'should have methods', function () {
		// code
		tplCompiler.should.have.property( 'sendMail' );
		tplCompiler.should.have.property( 'compile' );
		tplCompiler.should.have.property( 'findTemplate' );
	} );

	describe( 'when finding an existing template', function () {
		// existing template
		var message = {
			'id'       : '102',
			'sendMail' : false
		};

		describe( 'when template exists and `sendMail` is false', function () {
			before( function ( done ) {
				message.sendMail = false;
				tplCompiler.sendMail = sinon.spy();
				tplCompiler.findTemplate( message, function ( result ) {
					response = result;
					done();
				}.bind( tplCompiler ) );
			} );

			it( 'should return `success` status', function () {
				response.status.should.be.equal( 'success' );
			} );

			it( 'should return a compiled template as a string', function () {
				response.data.should.be.a.String;
			} );

			it( 'should not call `sendMail` method', function () {
				tplCompiler.sendMail.should.be.notCalled;
			} );
		} );

		describe( 'when template exists and `sendMail` is true', function () {
			before( function () {
				message.sendMail = true;
				tplCompiler.sendMail = sinon.spy();
				tplCompiler.findTemplate( message, function ( result ) {
					response = result;
				}.bind( tplCompiler ) );
			} );

			it( 'should return `success` status', function () {
				response.status.should.be.equal( 'success' );
			} );

			it( 'should call `sendMail` method', function () {
				tplCompiler.sendMail.should.be.called;
			} );
		} );

	} );

	describe( 'when template does not exists', function () {
		var message = {
			'id'       : '1ea16719-c226-4d51-907c-ebb53b1906a6',
			'sendMail' : false
		};

		before( function ( done ) {
			tplCompiler.sendMail = sinon.spy();
			tplCompiler.findTemplate( message, function ( result ) {
				response = result;
				done();
			} );
		} );

		it( 'should return `error` status', function () {
			response.status.should.be.equal( 'error' );
		} );

		it( 'should not call `sendMail` method', function () {
			tplCompiler.sendMail.should.be.notCalled;
		} );
	} );

} );
