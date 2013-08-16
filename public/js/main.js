Array.prototype.shuffle = function () {
	return this.sort(function () {
		return Math.random( (new Date).getTime() ) * 2 > 0.5;
	})
}

$( document ).ready(function( $ ) {
	var body = $( "body" );
	var music = body.find( ".music" );
	var visual = body.find( ".picture" );
	var musician = music.find( ".artist" );
	var photographer = visual.find( ".artist" );
	var song = music.find( ".piece" );
	var picture = visual.find( ".piece" );
	var duration;
	var photos = [];
	var interval = 10000;

	// Get ready...!
	
	SC.initialize({
		client_id: "b837f6e628242bc8cccf17121cb206f9"
	})

	_500px.init({
		sdk_key: "43a60a7ff8d7a167458cc0e8795a0ccdb99abaeb"
	});

	// And, rumble.
	
	SC.get( "/tracks", {
		// I have no idea why, but the api seems to return
		// the same track every time unless I ask >1.
		limit: "10",
		order: "created_at",
		created_from: now()
	}, function ( data ) {
		var track = data[0];
		musician.text( track.user.username ).attr( "href", track.user.permalink_url );
		song.text( track.title );

		if ( track.bpm ) {
			interval = track.bpm * 16;
			console.log( "they ain't nothing like: ", interval )
		}

		// duration in tens of seconds
		duration = Math.abs( track.duration / 10000 );

		// get a streamer, and play it
		SC.stream( track.uri, function ( sound ) {
			sound.play();
		});
	});

	function now() {
		 new Date().toISOString().replace( /T/, ' '  ).replace( /\..*/, ''  )
	}
	pickPhoto();

	function pickPhoto() {
		duration -= 1;
		_500px.api( "/photos", {
			feature: "fresh_today",
			rpp: 100,
			image_size: "4",
			exclude: "Nude",
			created_at: now()
		}, function ( result ) {
			photos = result.data.photos;
			var photo = photos.shuffle()[Math.floor(Math.random() * photos.length)];
			setPhoto( photo );
			setTimeout( pickPhoto, interval )
		});
	}

	function setPhoto ( photo ) {
		var url = photo.image_url;
		visual.fadeOut();
		$( "<img>" ).attr("src", url).load(function() {
			body.css( "background-image", "url(" + url + ")" );
			picture.text( photo.name );
			photographer.text( photo.user.fullname ).attr( "href", "http://500px.com/" + photo.user.username );
			visual.fadeIn();
		});
	}
})
