MCDAF.prototype.nextQuestion = function() {
	this.currentQ.idx+=1;	
	var idx = this.currentQ.idx;
	this.writeMC(idx)	
	}

MCDAF.prototype.writeMC = function(qidx) {
	this.initQuestion();

	var fragestellung = fragebogen.fragen[qidx];
	var questionstr = fragestellung.frage;
	
	if(dbg) console.log('rendering: questionstr:'+questionstr );
 	$('#question').html(this.visTools.vertAligned( questionstr ),'left');
   /*$('#question').autoSize('autoTextSize',{minSize:15,maxSize:100});*/	
	$('#question').autoSize('autoTextSize',{'debug':true});
	
	var antworten = fragestellung.antworten; 
	var moeglichkeiten = antworten.length;	
		
	var idxArray = [0,1,2,3];
	var shuffledIdxArray = shuffle(idxArray);	
	
	lettersArray = ['A','B','C','D'];
	
	for (i = 0; i< antworten.length; i++ ) {
		var letter = lettersArray[i];

		var answeridx = shuffledIdxArray[i];
		if( answeridx == 0) { 
			this.currentQ.solutionLetter=letter;	
			}		
		
		var answer = antworten[answeridx];
			
		$('#'+letter).show();
      console.log('ans:'+letter+' answer:'+answer)
      $('#'+letter+'char').html(this.visTools.vertAligned(letter+')')); 
      $('#'+letter+'char').autoSize('autoTextSize',{minSize:14,maxSize:100});      
      $('#'+letter+'text').html(this.visTools.vertAligned( answer,'left'));
      $('#'+letter+'text').autoSize('autoTextSize',{minSize:14,maxSize:100});
		}	
 	
 	}
 	
 	
MCDAF.prototype.visTools = {
    vertAligned : function(str,hori) {
		      var marginstr='margin: auto;';
		      if(hori=='left') marginstr='';
		      var ostr='<div style="display: table; '+marginstr;
		      ostr += ' height:100%;"><p style="display: table-cell;';
		      ostr += ' height:100%; vertical-align: middle;">'+str+'</p></div>';
		      return ostr;
		  }
}

MCDAF.prototype.initQuestion = function () {
		$('.ansclass').addClass('nohighlight').removeClass('highlight wrong correct');
		
	}
	
/*	
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};