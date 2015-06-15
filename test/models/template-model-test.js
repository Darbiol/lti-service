'use strict';

/* jshint expr: true */
/* eslint no-unused-expressions: 0 */

describe( 'Template model', function () {

	var template;

	before( function ( done ) {
		template = require( '../../models' )( done ).Template;
	} );

	describe( 'attributes', function () {
		it( 'id should be a UUID', function () {
			template.attributes.should.have.property( 'id' );
			template.attributes.id.primaryKey.should.equal( true );
		} );

		it( 'templateId should be autoIncremented INTEGER', function () {
			template.attributes.should.have.property( 'templateId' );
			template.attributes.templateId.unique.should.equal( true );
			template.attributes.templateId.autoIncrement.should.equal( true );
		} );

		it( 'name should be a VARCHAR(255) NOT NULL', function () {
			template.attributes.should.have.property( 'name' );
			template.attributes.name.allowNull.should.equal( false );
		} );

		it( 'description should be a VARCHAR(255) NOT NULL', function () {
			template.attributes.should.have.property( 'description' );
			template.attributes.description.allowNull.should.equal( true );
		} );

		it( 'content should be a VARCHAR(255) NOT NULL', function () {
			template.attributes.should.have.property( 'content' );
			template.attributes.content.allowNull.should.equal( false );
		} );

		it( 'createdAt should be a DATETIME', function () {
			template.attributes.should.have.property( 'createdAt' );
		} );

		it( 'updatedAt should be a DATETIME', function () {
			template.attributes.should.have.property( 'updatedAt' );
		} );

		it( 'deletedAt should be a DATETIME', function () {
			template.attributes.should.have.property( 'deletedAt' );
		} );

	} );

	describe( 'options', function () {

		it( 'should set paranoid to true', function () {
			template.options.should.have.property( 'paranoid' )
				.and.be.a.Boolean.and.equal( true );
		} );

	} );

} );
