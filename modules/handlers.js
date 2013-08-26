MCDAF.prototype.setHandlers = function() {
	this.setHandlersDocument(this);
	this.setHandlersQuestionPage(this);
	}
	
	
MCDAF.prototype.setHandlersQuestionPage = function(obj){
    $('.ansclass').click( 
    	function (event) {
			if(! obj.cpause && 
		    ! obj.clickAnywhereToContinue &&  
			    $(this).is(':visible')
			  ) 
			  {
			    obj.clickedAnswer( this.id );
			    obj.clickPause();
			}
    	} /*function (event) */
    ); /*click*/   
	}
	
MCDAF.prototype.clickPause = function () {
    this.cpause = true;
    setTimeout(function (obj) { obj.cpause = false; },500,this);
}

MCDAF.prototype.setHandlersDocument = function (obj){
    $(document).bind('click', function () {
		if (
			obj.clickAnywhereToContinue 
			&& ! obj.cpause) 
			{
			   if ( !obj.isLastQ() ) {
					obj.clickAnywhereToContinue = false;
					obj.nextQuestion();
		    	}
		    	else {
		    		$('#questions').hide();
		    		 $('#results').show();
		    		obj.renderResults();		    		
		    	}
			}/*if*/
    }); /*bind*/
}


MCDAF.prototype.clickedAnswer = function (idstr) {
	   
    var correctId = this.currentQ.solutionLetter;
    
    $('#'+correctId).removeClass('nohighlight').addClass('correct');
    
   if (correctId!=idstr){
		$('#'+idstr).removeClass('nohighlight').addClass('wrong');	
		}
	else {
		this.correctAnswers+=1;
		}

		this.clickAnywhereToContinue = true; 
}