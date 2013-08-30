MCDAF.prototype.nextQuestion = function() {
	this.currentQ.idx+=1;	
	var idx = this.currentQ.idx;
	this.writeMC(idx)	
	}

MCDAF.prototype.writeMC = function(qidx) {
	this.initQuestion();

	var fragestellung = fragebogen.questions[qidx];
	var questionstr = fragestellung.q;
	
	if(dbg) console.log('rendering: questionstr:'+questionstr );
 	$('#question').html(this.visTools.vertAligned( questionstr ),'left');
   /*$('#question').autoSize('autoTextSize',{minSize:15,maxSize:100});*/	
	$('#question').autoSize('autoTextSize',{'debug':true});
	
	var solutions = fragestellung.s;
	var wrongs = fragestellung.w;
	
	var maxanswers = wrongs.length + 1;
	if( maxanswers < 2) {
			alert('keine falschen Antwortmöglichkeiten vorhanden!');
			return false;		
		}
	var idxArray = [0,1,2,3];
	var shuffledIdxArray = shuffle(idxArray);	
	
	var lettersArray = ['A','B','C','D'];
	lettersArray.splice(maxanswers);
	lettersArray = shuffle(lettersArray);

	console.log('lettersarray:'+lettersArray)		
	
	console.log('sol len:'+solutions.length);
	var picksolution_str = solutions[ getRandomInt(0,solutions.length-1) ];
	var solletter = lettersArray.pop()
	this.setButtonText(solletter, picksolution_str );
	console.log('setzte antwort '+picksolution_str+' als Antwort '+solletter);
	this.currentQ.solutionLetter = solletter;	
	
	
	//create idx array, shuffle it and take the first 3 elements
	var pickwrongs_idxArray = shuffle( range(0, wrongs.length) );
	pickwrongs_idxArray.splice(3);

	
	
	for (i = 0; i< lettersArray.length; i++ ) {
		var letter = lettersArray[i];
		var answer = wrongs[ pickwrongs_idxArray[i] ];
			
      console.log('ans:'+letter+' answer:'+answer)
		this.setButtonText(letter, answer);
		      
		}	
 	
 	}
 	
MCDAF.prototype.setButtonText = function (letter,str) {
      $('#'+letter+'char').html(this.visTools.vertAligned('<b>'+letter+'</b>')); 
      $('#'+letter+'char').autoSize('autoTextSize',{minSize:14,maxSize:100});   
         
      $('#'+letter+'text').html(this.visTools.vertAligned( str,'left'));
      $('#'+letter+'text').autoSize('autoTextSize',{minSize:14,maxSize:100});
		$('#'+letter).show();			
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
	
	
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(start, count) {
    if(arguments.length == 1) {
        count = start;
        start = 0;
    }

    var foo = [];
    for (var i = 0; i < count; i++) {
        foo.push(start + i);
    }
    return foo;
}
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};