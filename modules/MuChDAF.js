$(document).ready( function() {
   mcdafo = new MCDAF({});
   mcdafo.setHandlers();
   mcdafo.nextQuestion();
	}
);
 
function MCDAF(options) {
	console.log('init MCDAF');

	this.settings = {}
	if(options) {$.extend(this.settings,options)}

	this.debug = this.settings.debug;
 	this.cpause = false; /*clickpause*/
 	this.clickAnywhereToContinue = false;  /*click anywhere to continue to next question*/
   this.correctAnswers = 0; 	
	this.numbOfQ = fragebogen.fragen.length; 	
 	
 	this.currentQ = {
 		'idx' : -1, 
 		'solutionLetter' : ''
 	};
 	
 	this.isLastQ = function () {
 		console.log('isLastQ? '+this.currentQ.idx+'  length='+fragebogen.fragen.length );
 		
		if( this.currentQ.idx == this.numbOfQ -1 )
		{
			console.log('isLastQ: is last!');
			return 1;			
		} 		/*if*/

 		return 0;

 		} /*function*/ 	
 }/*MCDAF*/



MCDAF.prototype.renderResults = function () {
	var corr = this.correctAnswers;
	var numb = this.numbOfQ;
	var ratio = corr+'/'+numb
	$('#resultstitle').html(mcdafo.visTools.vertAligned('Ergebnis:'));   
  	$('#resultstitle').autoSize('autoTextSize',{minSize:14,maxSize:200});
  	  
  	$('#points').html(mcdafo.visTools.vertAligned(ratio)); 
   $('#points').autoSize('autoTextSize',{minSize:14,maxSize:200}); 
	
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