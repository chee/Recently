define([
       "flight/component",
       "jquery"
], function ( defineComponent, $ ) {
	"use strict";
	return defineComponent( front );

	function front () {
		this.after( "initialize", function () {
			this.on( "button.cta", "click", this.getStarted );
			this.on( document, "uiUserWantsToStart", this.fadeAway );
			this.on( document, "dataSoundOver", this.comeBack );
		});

		this.getStarted = function ( event, data ) {
			this.trigger( document, "uiUserWantsToStart" );
		}

		this.comeBack = function ( event, data ) {
			console.log("wat");
			$( ".front" ).fadeIn( 2000 );
		}

		this.fadeAway = function ( event, data ) {
			$( ".front" ).fadeOut( 2000 );
		}
	}
})
