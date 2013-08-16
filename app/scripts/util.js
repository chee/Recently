function now() {
		 new Date().toISOString().replace( /T/, ' '  ).replace( /\..*/, ''  );
}
