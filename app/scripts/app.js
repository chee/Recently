/*global define */
define([
       "./ui/front",
       "./play",
       "./ui/next",
       "./ui/slideshow",
       "./ui/panels",
       "./data/sound",
       "./data/pictures",
       "./vendor/soundcloud",
       "./vendor/500px",
 //      "soundmanager"
], function ( Front, Play, Next, Slides, Panels, Sound, Pictures ) {
	"use strict";
	SC.initialize({
		client_id: "b837f6e628242bc8cccf17121cb206f9"
	});

	_500px.init({
		sdk_key: "43a60a7ff8d7a167458cc0e8795a0ccdb99abaeb"
	});

	function attachToDocument ( component )  {
		component.attachTo( document )
	}

	var activeComponents =  [ Front, Play, Slides, Panels, Sound, Pictures ];

	return {
		initialise: function () {
			activeComponents.forEach( attachToDocument );
		}
	}
});
