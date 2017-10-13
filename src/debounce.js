let debounce = (fn, delay = 0, first = false ) => {
	let timer = null;

	if(!first) {

		return function() {
			var context = this;
			var args = arguments;
	
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context,args);
			},delay);
		};

	} else {

		return function() {
			var context = this;
			var args = arguments;

			if( !timer ) {
				fn.apply(context,args);
				timer = setTimeout(()=>{
					timer = null;
				},delay);
			}

		};
		
	}

};

export default debounce;