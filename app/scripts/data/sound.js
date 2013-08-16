define([
       "flight/component",
       "jquery",
       "scripts/util"
], function ( defineComponent, $ ) {
	return defineComponent( sound )

	function sound () {
		this.after( "initialize", function () {
			this.on( document, "uiNeedsSound", this.getSound );
		});

		this.getSound = function ( event, data ) {
			soundCloudGet( this, data );
		}
	}

	function soundCloudGet ( fly, data ) {
		var audio = $( "<audio>" );
		var request = {
			// I have no idea why, but the api seems to return
			// the same track every time unless I ask >1.
			limit: "25",
			order: "created_at",
			created_from: now(),
		};

		var client_id = data && data.client_id || "b837f6e628242bc8cccf17121cb206f9";

		SC.get( "/tracks", request, function ( tracks ) {
			var track = tracks[ Math.floor( Math.random() * tracks.length ) ];

			// a little messy
			var sanitised = {
				artist: track.user.username,
				artistLink: track.user.permalink_url,
				bpm: track.bpm,
				duration: track.duration,
				piece: track.title,
				pieceLink: track.permalink_url,
				pieceLinkRaw: track.uri + "/stream?client_id=" + client_id,
				target: data && data.target,
				type: 'sound',
				userImage: track.user.avatar_url
			}
			
			// load the audio up a bit before announcing i've got it
			audio.attr( "src", sanitised.pieceLinkRaw )
//			.append( "body" )
			.on( "canplay", function () {
				sanitised.element = audio.clone();
				fly.trigger( document, "dataSound", sanitised );
			});
		});
	}
});
