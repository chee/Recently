define([
       "flight/component",
       "jquery",
       "lodash",
       "text!templates/panel.html"
], function ( defineComponent, $, _, panelTemplate  ) {
	// wee joke
	"use strict"

	return defineComponent( panels );

	function panels () {
		panelTemplate = _.template( panelTemplate );

		this.after( "initialize", function () {
			this.on( document, "dataPicture", this.loadPanel );
			this.on( document, "dataSound", this.loadPanel );
			this.on( document, "dataSoundOver", this.hide );
			this.trigger( "uiNeedsPicture" );
		});
		
		this.loadPanel = function ( event, data ) {
			var panel = $( panelTemplate( data ) );
			// data has a .type of "picture" or "sound", making this easier:
			var target = $( ".panel." + data.type );
			if ( target.length ) {
				target.children().fadeOut( 2400 );
				target.replaceWith( panel )
				target.children().fadeIn( 2400 )
			} else {
				panel.css( "display: none" );
				$( "body" ).append( panel );
				panel.fadeIn( 1000 );
			}
		}

		this.hide = function ( event, data ) {
			$( ".panel" ).fadeOut(function () {
				this.remove();
			});
		}
	}
});
