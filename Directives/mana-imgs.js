deckbuilder.directive('manaImgs', function() {
    return {
	    link: function(scope, element, attrs) {
	    	var imgsrc;
	        var manacost = attrs.manacost.substring(1, attrs.manacost.length-1).split("}{");
	        for (i = 0; i < manacost.length; i++){
	      		switch(manacost[i]){
	      			case "B": 
	      			case "U": 
	      			case "R": 
	      			case "G": 
	      			case "W":      
	      			case "1": 
	      			case "2": 
	      			case "3":       			
	      			case "4":        			
	      			case "5":        			
	      			case "6":      			
	      			case "7":        			
	      			case "8":       			
	      			case "9": 
	      			imgsrc = 'images/mana_' + manacost[i] + '.png'; 
	      			break;    			      			      			      			
	      			default:
	      			imgsrc = 'images/mana_unknown.png';
	  			}

		        var img = document.createElement('img');
		        img.src = imgsrc; 
		        img.className = 'mana-img';
			    element[0].appendChild(img); 

	        }
	    }
    }

});