define([
       "flight/component",
       "jquery",
       "scripts/util"
], function ( defineComponent, $ ) {
	return defineComponent( pictures )

	function pictures () {
		this.after( "initialize", function () {
			this.on( document, "uiNeedsPicture", this.getPicture );
		});

		this.getPicture = function ( event, data ) {
			_500pxGet( this, data );
		}
	}

	function _500pxGet ( fly, data ) {
		var request = {
			feature: "fresh_today",
			rpp: 10,
			image_size: "4",
			created_at: now()
		};

		if ( data && data.sfw ) request.exclude = "Nude";

		_500px.api( "/photos", request, function ( result ) {
			var photos = result.data.photos;
			var photo = photos[ Math.floor( Math.random() * photos.length ) ];

			// a little messy
			var sanitised = {
				artist: photo.user.fullname,
				artistLink: "http://500px.com/" + photo.user.username,
				piece: photo.name,
				// ick!
				pieceLink: "http://500px.com/photo/" + photo.image_url.split( "/" )[ 3 ],
				pieceLinkRaw: photo.image_url,
				target: data && data.target,
				type: 'photo',
				userImage: photo.user.userpic_url
			};

			$( "<img>" ).attr( "src", sanitised.pieceLinkRaw ).load(function () {
				fly.trigger( document, "dataPicture", sanitised );
			});
		});
	}
});
