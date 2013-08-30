
(function ($) {
	
    var methods = {
		init: function (options) {} ,	

		/*sets fontsize for the text inside the hidden container*/		
		setContFontsize: function(fontsize) {
			var textSpan = $("BODY #autosizespan");
			var textContainer = $("BODY #autosizecont");
	    		textSpan.css('fontSize',fontsize);
			},		
		
		initCont: function(width,text) {
			if (dbg) console.log('autosize: init container')
			var textSpan = $("BODY #autosizespan");
			var textContainer = $("BODY #autosizecont");

			/*set it to a fixed width according to the base div and copy text*/
			textContainer.css( { "width": parseInt( this.css('width')),	});
			textSpan.html(this.html());
							
			},
			
		/*determine Textheight using a textSpan inside a textContainer (hidden)*/
		getTextHeight:  function() {
			var textSpan = $("BODY #autosizespan");
			var textContainer = $("BODY #autosizecont");
			var height=0;
			var dbg=true;

			height = textContainer.innerHeight()+'px';
			if(dbg)	console.log('getTextHeight: return height '+height);
			return height;
    	},

		/*gets fontsize and obj of container
		sets fontsize in container
		measures tHeight
		returns left space: iHeight - tHeight
		*/
		leftSpace: function(fontsize) {
			var textSpan = $("BODY #autosizespan");
			var textContainer = $("BODY #autosizecont");
			textSpan.css('fontSize',fontsize+'px');
			_tHeight = textContainer.innerHeight();
			_iHeight = $(this).innerHeight();
			var _val = _iHeight - _tHeight;
			if (dbg) console.log('space left for fontsize='+fontsize+' -> '+_val);
			return _val;
			},

		autoTextSize : function(options){
			var settings = {
	    		minSize:12,
	    		maxSize:250,
	    		debug:0
			};
			//if(options) {console.log(options)}

			$(this).autoSize('initCont');

			return this.each(function() { 
		    	if(options) $.extend(settings,options);
		    	var dbg=0;//settings.debug;
		    	var _self = $(this);
		    	
		    	/* grab some data 
					_iHeight = innerHeight of block to fill
					_tHeight = actual / current textheight 		    	   	
		    	*/
		    	
		    	/*start with biggest size possible:
				choose tiny font, measure height, set to max. font		    			    	
		    	*/
				_self.css('font-size',8);
				_iHeight = _self.innerHeight();
				_fontSize = _iHeight;
				if (dbg) console.log('setting font-size: '+ _fontSize ); 
				_self.css('font-size', _fontSize);
							
				
				var minFontSize = 10;
				var maxFontSize = _iHeight;
				var remainingSpaceMin=Math.floor(maxFontSize * 0.1);
				var remainingSpaceMax=Math.floor(maxFontSize * 0.15);
				
				var spaceLeft = _self.autoSize('leftSpace',_iHeight);
				
				/*try to minimize spaceleft, so it is 
				0< spacemin < spaceleft < spacemax < ...
				*/
				if (dbg) console.log('push spaceleft between min='
				+remainingSpaceMin+' and max='
				+remainingSpaceMax);
				
				var iters = 0;
				while ( remainingSpaceMin > spaceLeft || spaceLeft > remainingSpaceMax	)
				{
					if(spaceLeft < remainingSpaceMin) {
							if (dbg) console.log('font too big')
							maxFontSize = _fontSize;				
						}					
						else if( spaceLeft > remainingSpaceMax ){
							if (dbg) console.log('font too small')
							minFontSize = _fontSize;							
						}
						else
						{
							if (dbg) console.log('---------> Bug! while-loop autosize!');
							break;							
						}
							
					_fontSize = Math.floor((maxFontSize+minFontSize) / 2);
					
					
					if( (maxFontSize - minFontSize) < 3 ) {
						if (dbg) console.log('converged');						
						_fontSize = minFontSize;
						spaceLeft = _self.autoSize('leftSpace',_fontSize);
						if (dbg) console.log('spaceLeft:'+spaceLeft);	
						break;
						}					
						
					if (dbg) console.log('min:'+minFontSize+'  fs:'+_fontSize+'  max:'+maxFontSize);
					spaceLeft = _self.autoSize('leftSpace',_fontSize);
											
					iters++;
					if (iters > 10) break;		
					
				}
		
		_self.css('font-size', _fontSize + 'px');
		
		if(dbg) console.log('autoTextSize: finalSize:'+_fontSize);
		});
		}/*autotextsize*/
    }; /*methods*/


    $.fn.autoSize = function( method ) {
	// Method calling logic
	if ( methods[method] ) {
	    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
	    return methods.init.apply( this, arguments );
	} else {
	    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	}    
    }

})(jQuery);

