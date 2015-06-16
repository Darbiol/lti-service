'use strict';

// var ltiModel = require( '../../models' )().Tctp_contract;

// module.exports = function ( object, respond ) {
// 	var g = {
// 		'key' : '123-456.PH.edu',
// 		'secret' : 'keyboardcat'
// 	};

// 	sequelize.sync()
// 		.then( function () {
// 			ltiModel.create( g )
// 				.then( function  ( result ) {
// 					respond( {
// 						'status' : 'success',
// 						'data'   : result.dataValues
// 					} );
// 				} ).catch( function ( error ) {
// 					respond( {
// 						'status' : 'error',
// 						'data'   : error
// 					} );
// 				} );
// 		} );
// };

var _ = require( 'lodash' );
var fs = require( 'fs' );

module.exports = function ( key, callback ) {
	fs.readFile( './data/lti_contract.json', 'utf8',  function ( err, data ) {
		if( err ) throw err;
		var collection = JSON.parse( data );
		var keyCombo = _.findWhere( collection, { 'consumer_key' : key } );
		callback( keyCombo.secret )
	} );
}