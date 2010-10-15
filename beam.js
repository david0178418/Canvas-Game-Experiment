function Beam (_dir, _pow, _x, _y) {
	var dir =_dir,
		power = _pow,
		interval = 7,
		position = {
			'x':_x,
			'y':_y
		},
		end = {
			'x':_x,
			'y':_y
		},
		modifier = {
			'x':0,
			'y':0
		};
	
	function draw(ctx) {
		ctx.beginPath();
		ctx.arc(position.x, position.y, power * 1, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.strokeStyle = '#111111'
		ctx.lineCap = 'round';
		ctx.lineWidth = _pow;
		ctx.moveTo(position.x, position.y)
		ctx.lineTo(position.x + end.x, position.y + end.y);
		
		ctx.stroke();
		ctx.closePath();
		end.x += modifier.x;
		end.y += modifier.y;
		console.log(end);
		console.log(modifier);
	}
	
	function drawClear(ctx) {
		ctx.strokeStyle = '#FFFFFF'
		ctx.lineCap = 'round';
		ctx.lineWidth = _pow + 1;
		ctx.moveTo(position.x, position.y)
		ctx.lineTo(position.x + modifier.x, end.y + end.y);
	}
	
	function getModifierMagnitudes() {console.log(dir);
		switch(dir) {
			case 1:
				modifier.x = interval;
				modifier.y = 0;
				break;
			case 2: 
				modifier.x = interval;
				modifier.y = -interval;
				break;
			case 3: 
				modifier.x = 0;
				modifier.y = -interval;
				break;
			case 4: 
				modifier.x = -interval;
				modifier.y = -interval;
				break;
			case 5: 
				modifier.x = -interval;
				modifier.y = 0;
				break;
			case 6: 
				modifier.x = -interval;
				modifier.y = interval;
				break;
			case 7: 
				modifier.x = 0;
				modifier.y = interval;
				break;
			case 8: 
				modifier.x = interval;
				modifier.y = interval;
				break;
		}
	}
	
	getModifierMagnitudes();
	
	return {
		draw		: draw,
		drawClear	: drawClear
	};
}
