(function($) {
	/**
	* Resizes an inner element's font so that the inner element completely fills the outer element.
	* @author Russ Painter WebDesign@GeekyMonkey.com
	* @version 0.1
	* @param {Object} Options which are maxFontPixels (default=40), innerTag (default='span')
	* @return All outer elements processed
	* @example <div class='mybigdiv filltext'><span>My Text To Resize</span></div>
	*/
	$.fn.textfill = function(options) {
		var defaults = {
			maxFontPixels: 80,
			innerTag: 'span'
		};
		var Opts = jQuery.extend(defaults, options);
		return this.each(function() {
			var fontSize = Opts.maxFontPixels;
			console.log('innertag:'+Opts.innerTag);
			var ourText = $(Opts.innerTag + ':visible:first', this);
			var maxHeight = $(this).height();
			var maxWidth = $(this).width();
			var textHeight;
			var textWidth;
			do {
				ourText.css('font-size', fontSize);
				textHeight = ourText.height();
				textWidth = ourText.width();
				fontSize = fontSize - 1;
				console.log('h:'+textHeight+'('+maxHeight+
				    ') w:'+textWidth+'('+maxWidth+
				    ') fs:'+fontSize);
			} while (
			    (
			     textHeight > maxHeight 
			     || textWidth > maxWidth 
			     ) 
			    && fontSize > 3
			    );
		});
	};

	$.fn.textfillsl = function(maxFontSize) {
	    maxFontSize = parseInt(maxFontSize, 10);
	    return this.each(function(){
		var ourText = $("span", this);
		   parent = ourText.parent();
		   maxHeight = parent.height();
		   maxWidth = parent.width();
		   fontSize = parseInt(ourText.css("fontSize"), 10);
		   console.log('mH:'+maxHeight+' mW:'+maxWidth+' fS:'+fontSize);
		   multiplier = maxWidth/ourText.width();
		   newSize = (fontSize*(multiplier-0.1));
	    ourText.css(
		"fontSize", 
		(maxFontSize > 0 && newSize > maxFontSize) ? 
		maxFontSize : 
		newSize
		);
	    });
	};	

})(jQuery);


