define([
       "flight/component",
       "jquery"
], function ( defineComponent, $ ) {
	"use strict";

	return defineComponent( play );

	function play () {
		this.after( "initialize", function () {
			this.on( document, "uiUserWantsToStart", this.getStarted );
			this.on( document, "dataSound", this.sound );
		});
		
		this.getStarted = function ( event, data ) {
			this.trigger( document, "uiNeedsSound" );
		}
	
		this.sound = function ( event, data ) {
			data.sound.play();
		}
	}

});
