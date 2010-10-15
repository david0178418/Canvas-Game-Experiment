function Game() {
	var player,
	fieldBorder,
	fieldHeight,
	fieldWidth,
	fieldRatio,
	render,
	tick,
	speed;
	
	GLOBAL = {
		gameCanvasId	: 'canvas',
		render			: false
	};
	
	function start() {
		canvas = $(GLOBAL.gameCanvasId);
		fieldBorder = 20;
		fieldHeight = canvas.height();
		fieldWidth = canvas.width();
		fieldRatio = fieldHeight/fieldWidth,
		speed = 30;
		player = Player();
		GLOBAL.render = Renderer();
		render = GLOBAL.render;
		
		render.registerDrawMethods(player.draw, player.drawClear);
		
		$(window).resize(canvasResize);
		$(document).keydown(player.triggerAction);
		$(document).keyup(player.stopAction);
		$(window).resize();
		
		tick = setInterval(play, speed);
	}
	
	function pause() {
	}
	
	function play() {
		render.clear();
		player.move();
		render.render();
	}
	
	function canvasResize(event) {
		var resizeHeight = $(window).height() - fieldBorder,
			resizeWidth = $(window).width() - fieldBorder,
			resizeRatio = resizeHeight/resizeWidth;
		
		pause();
		
		if(fieldRatio == resizeRatio) {
			canvas.height(resizeHeight);
			canvas.width(resizewidth);
		}
		else if(fieldRatio < resizeRatio){
			//width max is taken, height adjusted
			canvas.height(resizeWidth * fieldRatio);
			canvas.width(resizeWidth);
		}
		else {
			//height max is taken, width adjusted
			canvas.height(resizeHeight);
			canvas.width(resizeHeight / fieldRatio);
		}
	}
	
	return {
		start	: start
	}
}
