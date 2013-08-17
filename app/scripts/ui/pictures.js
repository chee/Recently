define([
       "flight/component",
       "text!templates/slide.html",
], function ( defineComponent, slideTemplate ) {
	"use strict";
	return defineComponent( slide );

	function slide () {
		var body = $( "body" );
		var sfw, delay, playing, first, timeout;
		
		this.after( "initialize", function () {
			this.on( document, "dataPicture", this.picture );
			this.on( document, "dataSoundInfo", this.sound );
			this.on( document, "dataSoundOver", this.soundOver );
			this.on( document, "uiUserWantsToStart", this.getStarted );
		});

		this.getStarted = function ( event, data ) {
			// filth mode
			//sfw = data.swf;
			sfw = true;
		}

		this.picture = function ( event, data ) {
			var next = $( _.template( slideTemplate, data ) );
			var fly = this;

			if ( first ) {
				first = false;
				body.append( next.fadeIn( 1000 ) );
			} else {
				var previous = body.find( ".slide" );
				body.append( next.fadeIn( 2000 ) );
				previous.fadeOut( 2000, function () {
					this.remove();
				});
			}

			if ( playing ) {
				timeout = setTimeout(function () {
					fly.trigger( document, "uiNeedsPicture", { sfw: sfw } );
				}, delay);
			}
		}

		this.sound = function ( event, data ) {
			playing = first = true;
			if ( data.bpm ) {
				// if there is a bpm, let's set the timeout to 4 bars.
				delay = ( data.bpm / 60 * 4000 );
			} else {
				delay = 10000; 
			}
			this.trigger( document, "uiNeedsPicture", {
				sfw: sfw
			});
		}

		this.soundOver = function () {
			playing = false;
			window.clearTimeout( timeout );
		}
	}
})
