"use strict";

require.config({
	baseUrl: "./",
	paths: {
		jquery: "bower_components/jquery/jquery",
		es5shim: "bower_components/es5-shim/es5-shim",
		lodash: "bower_components/lodash/lodash",
		text: "bower_components/requirejs-text/text",
		soundmanager: "bower_components/soundmanager/script/soundmanager2",
		app: "scripts/app",
		flight: "bower_components/flight/lib/index"
	},
	map: {
		"*": {
			"flight/component": "bower_components/flight/lib/component",
		}
		
	},
	shim: {
		flight: {
			deps: [ "jquery", "es5shim" ]
		},
		app: {
			deps: [ "bower_components/flight/lib/index" ]
		},
	}

});

require(["scripts/app"], function (App) {
	App.initialise()
});
