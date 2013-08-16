define([
       "flight/component",
       "jquery",
       "lodash",
       "text!templates/slide.html"
], function ( defineComponent, $, _, slideTemplate ) {
	"use strict";

	return defineComponent( slide );

	function slide () {
		slideTemplate = _.template( slideTemplate );

		this.after( "initialize", function () {
			this.on( document, "dataPicture", this.showPicture );
		});

		this.showPicture = function ( event, data ) {
			var previous = $( ".slide" );
			$( "body" ).append( $( slideTemplate( data ) ).fadeIn( 2000 ) );
			previous.fadeOut( 2000, function () {
				this.remove();
			});
		}
	}
})
