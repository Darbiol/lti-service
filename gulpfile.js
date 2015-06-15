'use strict';

/* eslint no-process-exit:0 */

var del              = require( 'del' );
var gulp             = require( 'gulp' );
var mocha            = require( 'gulp-mocha' );
var istanbul         = require( 'gulp-istanbul' );
var coverageEnforcer = require( 'gulp-istanbul-enforcer' );

var paths = {
	'scripts'  : [ 'handlers/**/*.js', 'services/**/*.js' ],
	'tests'    : [ 'test/**/*-test.js' ],
	'coverage' : 'coverage'
};

var mochaOpts = {
	'ui'       : 'bdd',
	'reporter' : 'spec',
	'bail'     : true,
	'globals'  : {
		'should' : require( 'should' )
	}
};

var covEnforcerOpts = {
	'thresholds' : {
		'statements' : 80,
		'branches'   : 50,
		'lines'      : 80,
		'functions'  : 50
	},

	'coverageDirectory' : paths.coverage,
	'rootDirectory'     : ''
};

gulp.task( 'clean-coverage', function () {
	del( [ 'coverage' ] );
} );

gulp.task( 'test', [ 'clean-coverage' ], function () {
	var coverageDir = paths.coverage;

	gulp.src( paths.scripts )

		// Covering files
		.pipe( istanbul() )

		// Force `require` to return covered files
		.pipe( istanbul.hookRequire() )

		.on( 'finish', function () {
			gulp.src( paths.tests, { 'read' : false } )
				.pipe( mocha( mochaOpts ) )

				.pipe( istanbul.writeReports( {
					'dir'        : coverageDir,
					'reportOpts' : { 'dir' : coverageDir },
					'reporters'  : [ 'text', 'text-summary', 'json', 'html' ]
				} ) )

				// enforce converage
				.pipe( coverageEnforcer( covEnforcerOpts ) )

				.once( 'error', function () {
					process.exit( 1 );
				} )

				.once( 'end', function () {
					process.exit();
				} );
		} );
} );
