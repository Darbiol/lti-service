'use strict';

var ltiMiddleware = require( './middleware' );




module.exports = function ( message, respond ) {
ltiMiddleware({
  consumer_key: message.oauth_consumer_key,       // Required if not using credentials.
  consumer_secret: message.custom_consumer_secret// Required if not using credentials.

  // store: {                   // Optional.
  //   type: "redis",           // If store is omitted memory will be used.
  //   client: redisClient      // Required when using Redis.
  // }
})
	// ltiMiddleware( message )

};
