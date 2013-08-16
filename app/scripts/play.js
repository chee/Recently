define([
       "flight/component",
       "jquery"
], function ( defineComponent, $ ) {
	"use strict";

	return defineComponent( play );

	function play () {
		var pictureTimeout = 0;
		var pictureDelay = 10000;

		this.after( "initialize", function () {
			this.on( document, "uiUserWantsToStart", this.play );
			this.on( document, "dataSound", this.sound );
			this.on( document, "dataPicture", this.picture );
			this.on( document, "dataSoundOver", function() {
				clearTimeout( this.pictureTimeout );
			})
		});
		
		this.play = function ( event, data ) {
			this.trigger( document, "uiNeedsSound" );
		}

		this.sound = function ( event, data ) {
			this.trigger( document, "uiNeedsPicture" );
			data.element.attr( "autoplay", "autoplay" );
			var audio = data.element;
			$( "body" ).append( audio );
			audio.on( "ended", function () {
				this.trigger( document, "dataSoundOver" );
			});
			if ( data.bpm ) {
				pictureDelay = ( ( bpm / 60 ) * 4000 );
			} else {
				pictureDelay = 10000;
			}
		}

		this.picture = function () {
			var body = this;
			pictureTimeout = setTimeout( function () {
				body.trigger( document, "uiNeedsPicture" );
			}, pictureDelay )
		}
	}
});
