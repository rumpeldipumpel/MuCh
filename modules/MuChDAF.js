$(document).ready( function() {
   mcdafo = new MCDAF({});
   mcdafo.setHandlers();
   mcdafo.nextQuestion();
	}
);

$(window).resize(function() {
	//console.log('resize event');	
	mcdafo.renderText();
	
	});

var dbg = false;

function MCDAF(options) {
	console.log('init MCDAF');

	this.settings = {}
	if(options) {$.extend(this.settings,options)}

	this.debug = this.settings.debug;
 	this.cpause = false; /*clickpause*/
 	this.clickAnywhereToContinue = false;  /*click anywhere to continue to next question*/
   this.correctAnswers = 0; 	
	this.numbOfQ = fragebogen.questions.length; 	

	console.log('read '+this.numbOfQ+' questions');
	this.qidxarray = range(0,this.numbOfQ);
	
	this.qidxarray = shuffle_fisher_yates (this.qidxarray);
	this.qidxarray.splice(5);
	
	console.log(this.qidxarray) 	
 	
 	this.currentQ = {
 		'idx' : -1, 
 		'solutionLetter' : ''
 	};
 	
 	this.isLastQ = function () {
 		console.log('isLastQ? '+this.currentQ.idx+'  length='+this.qidxarray.length );
 		
		if( this.currentQ.idx == this.qidxarray.length -1 )
		{
			if(dbg) console.log('isLastQ: is last!');
			return 1;			
		} 		/*if*/

 		return 0;

 		} /*function*/ 	
 }/*MCDAF*/



MCDAF.prototype.renderResults = function () {
	var corr = this.correctAnswers;
	var numb = this.qidxarray.length;
	var ratio = corr+'/'+numb
	$('#resultstitle').html(mcdafo.visTools.vertAligned('Ergebnis:'));   
//  	$('#resultstitle').autoSize('autoTextSize',{minSize:14,maxSize:200});
  	  
  	$('#points').html(mcdafo.visTools.vertAligned(ratio)); 
 //  $('#points').autoSize('autoTextSize',{minSize:14,maxSize:200}); 
	
	$('#points').fitText();
	$('#resultstitle').fitText();
	}

function shuffle_fisher_yates(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter--) {
        // Pick a random index
        index = (Math.random() * counter) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


/*
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
*/