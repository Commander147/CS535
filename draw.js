
function init(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
}

function draw()
{
	var img = new IMAGE;
	img.src = 'http://cobrapcs.com/blog/wp-content/uploads/2013/10/Best-computer-for-gaming.jpg'
	context.drawImage(img,canvas.width/2,canvas.height/2);
}