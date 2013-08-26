
(function ($) {

    var methods = {

	init: 
    function (options) {
    },


getTextHeight : 
    function(fontsize) {
	var divText = $("BODY #autosizespan");
	var divTextCont = $("BODY #autosizecont");
	var height=0;
	var dbg=0;

	divTextCont.css( {
	    "width": parseInt( this.css('width')),
    	});

	divText.text(this.text());

	if(fontsize) {
	    if(dbg) console.log('getTextHeight: set fontSize '+fontsize);
	    divText.css('fontSize',fontsize);
	}

	height = divTextCont.innerHeight()+'px';
	if(dbg)	console.log('getTextHeight: return height '+height);
	return height;
    },

autoTextSize : 
    function(options){
	var settings = {
	    minSize:12,
	    maxSize:25,
	    debug:0
	};

	return this.each(function() { 
	    if(options) $.extend(settings,options);
	    var dbg=settings.debug;
	    //dbg=1;
	    //init with min-size so overflow hopefully won't falsify innerHeight value
	    $(this).css('font-size',settings.minSize);
	    var _self = $(this);

	    _height=$(this).innerHeight();
	    _textHeight = parseInt(
		_self.autoSize('getTextHeight',settings.maxSize)
		);
	    _fontSize = settings.maxSize;

	    if(dbg) console.log('autoTextSize: '+this.id
		+'.innerHeight:'+_height+' textheight:'
		+_textHeight+' - setting fontsize to '
		+_fontSize);

	// while _textHeight (by getTextHeight) is bigger than innterHeight
	// OR ( maxSize is defined  AND fontsize > maxSize )
	while (
	    _height <= _textHeight 
	    || 
	    (
	     settings.maxSize 
	     && _fontSize > parseInt(settings.maxSize)
	     )
	    ) 
	{
	    if (settings.minSize && _fontSize <= parseInt(settings.minSize)) break;
	    _fontSize--;
	    _self.css('font-size', _fontSize + 'px');

	    if(dbg) console.log('testing fontsize '+_fontSize+'px');
	    _textHeight = parseInt(_self.autoSize('getTextHeight',_fontSize));
	    if(dbg) console.log('textHeight now: '+_textHeight+'px');

	}

	_fontSize--;
	_self.css('font-size', _fontSize + 'px');
	
	if(dbg) console.log('autoTextSize: finalSize:'+_fontSize);
	});
    }
    };



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


jQuery.fn.css2 = jQuery.fn.css;
jQuery.fn.css = function() {
    if (arguments.length) return jQuery.fn.css2.apply(this, arguments);
    var attr = ['font-family','font-size','font-weight','font-style','color',
	'text-transform','text-decoration','letter-spacing','word-spacing',
	    'line-height','text-align','vertical-align','direction','background-color',
	    'background-image','background-repeat','background-position',
	    'background-attachment','opacity','width','height','top','right','bottom',
	    'left','margin-top','margin-right','margin-bottom','margin-left',
	    'padding-top','padding-right','padding-bottom','padding-left',
	    'border-top-width','border-right-width','border-bottom-width',
	    'border-left-width','border-top-color','border-right-color',
	    'border-bottom-color','border-left-color','border-top-style',
	    'border-right-style','border-bottom-style','border-left-style','position',
	    'display','visibility','z-index','overflow-x','overflow-y','white-space',
	    'clip','float','clear','cursor','list-style-image','list-style-position',
	    'list-style-type','marker-offset'];
    var len = attr.length, obj = {};
    for (var i = 0; i < len; i++) 
	obj[attr[i]] = jQuery.fn.css2.call(this, attr[i]);
    return obj;
}
