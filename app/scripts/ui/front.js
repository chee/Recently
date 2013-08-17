define([
       "flight/component",
       "jquery",
       "lodash"
], function ( defineComponent, $, _ ) {
	"use strict";
	return defineComponent( front );

	function front () {
		var fly = this;
		this.after( "initialize", function () {
			// included this debounce so it doesn't try and load 1000 things
			this.on( "button.cta", "click", _.debounce( this.getStarted, 4500, true ) );
			this.on( document, "uiUserWantsToStart", this.fadeAway );
			this.on( document, "dataSoundOver", this.comeBack );
		});

		this.getStarted = function ( event, data ) {
			this.trigger( document, "uiUserWantsToStart", { sfw: !event.shiftKey } );
		}

		this.comeBack = function ( event, data ) {
			fly.on( document, "uiUserWantsToStart", this.fadeAway );
			$( ".front" ).addClass( "next" ).removeClass( "hide" );
		}

		this.fadeAway = function ( event, data ) {
			$( ".front" ).addClass( "hide" );
		}
	}
})
