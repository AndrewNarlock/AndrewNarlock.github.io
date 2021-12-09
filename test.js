function pushMe() {		
		var card = document.createElement("div");
  	card.style.position = "absolute";
		card.style.left = "500px";
		card.style.top = "500px";
		card.style.width = "600px";
		card.style.height = "400px";
		card.style.background = "rgb(59, 161, 226)";
		card.style.color = "blue";
  
  	var element = document.getElementById("mediaBrick");
		element.appendChild(card);
		
		var mousePosition;
		var offset = [0,0];
		var isDown = false;
	
		card.addEventListener('mousedown', function(e) {
			isDown = true;
    			offset = [card.offsetLeft - e.clientX, card.offsetTop - e.clientY];
		}, true);

		document.addEventListener('mouseup', function() {
    			isDown = false;
		}, true);

		document.addEventListener('mousemove', function(event) {
    			event.preventDefault();
    			if (isDown) {
        			mousePosition = {
            				x : event.clientX,
            				y : event.clientY
        			};
        			card.style.left = (mousePosition.x + offset[0]) + 'px';
        			card.style.top  = (mousePosition.y + offset[1]) + 'px';
    			}
		}, true);
}
