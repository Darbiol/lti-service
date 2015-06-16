'use strict';

var ltiMiddleware = require( './middleware' );
var findSecret = require( './read' );



module.exports = function ( request, respond ) {
// findSecret( '010-10te10.ten', function ( keyObj ) {
// 	console.log( keyObj )
// } )
ltiMiddleware({
  // consumer_key: request.body.oauth_consumer_key,       // Required if not using credentials.
  // consumer_secret: request.body.custom_consumer_secret // Required if not using credentials.
  credentials: function (key, callback) {
    findSecret( key, function ( keyObj ) {
    	console.log( keyObj )
    	if ( !keyObj ) {
    		callback( 'Consumer key does not match any record.' );
    	} else {
    		callback(null, key, keyObj.secret);
    	}
    } )
  },

  // store: {                   // Optional.
  //   type: "redis",           // If store is omitted memory will be used.
  //   client: redisClient      // Required when using Redis.
  // }
})( request, respond, function ( err ) {
	console.log( respond )
	respond( 'kewl' )
} );
	// ltiMiddleware( message )

};
