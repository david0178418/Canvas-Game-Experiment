function Player() {
	var power,
	accelerationRate = 2,
	attackReleaseDirection = -1,
	beam = null,
	drag = 0.5,
	maxVelocity = 10,
	powerUpTick = false,
	powerUpRate = 200,
	renderer = window.CTX,
	size = 10,
	shotPower = 0,
	clearingSize = size + 1,
	accelerationDirection = {
		'left'	: false,
		'up'	: false,
		'right'	: false,
		'down'	: false
	},
	attackDirection = {
		'left'	: false,
		'up'	: false,
		'right'	: false,
		'down'	: false
	},
	position = {
		'x'	: 100,
		'y'	: 100
	},
	velocity = {
		'x'	: 0,
		'y'	: 0
	},
	Attack = {
		'left'	: [37],
		'up'	: [38],
		'right'	: [39],
		'down'	: [40]
	},
	Movement = {
		'up'	: [87, 119],
		'left'	: [65, 97],
		'down'	: [83, 115],
		'right'	: [68, 100]
	};
	
	function accelerate(dir) {
		accelerationDirection[dir] = true;
	}
	
	function decelerate(dir) {
		accelerationDirection[dir] = false;
	}
	
	function draw(ctx) {
		var color = '#010101';
		
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(position.x, position.y, size, 0, Math.PI * 2, false);
		ctx.closePath();
	}
	
	function drawClear(ctx) {
		ctx.clearRect(position.x - size - 1, position.y - clearingSize, clearingSize * 2 , clearingSize * 2);
	}
	
	function move(){
		_calculateVelocity();
		
		position.x += velocity.x;
		position.y += velocity.y;
	}
	
	function stopAction(event) {
		var moveDirection = _moveKeyPressed(event.keyCode),
		fireDirection;
		
		if(moveDirection) {
			decelerate(moveDirection);
			return;
		}
		else{
			fireDirection = _fireKeyPressed(event.keyCode);
		}
		
		if(fireDirection) {
			_unsetChargeAttackDirection(fireDirection);
		}
		
		return;
	}
	
	function triggerAction(event) {
		var moveDirection = _moveKeyPressed(event.keyCode),
		chargeDirection;
		
		if(moveDirection) {
			accelerate(moveDirection);
			return;
		}
		else{
			chargeDirection = _fireKeyPressed(event.keyCode);
		}
		
		if(chargeDirection) {
			_setChargeAttackDirection(chargeDirection);
		}
		
		return;
	}
	
	function _setChargeAttackDirection(dir) {
		attackDirection[dir] = true;
		if(!powerUpTick) {
			powerUpTick = setInterval(_powerUp, powerUpRate);
		}
	}
	
	/********************* PRIVATE ******************/
	function _unsetChargeAttackDirection(dir) {
		attackDirection[dir] = false;
		if(!(attackDirection['up'] ||
			attackDirection['right'] ||
			attackDirection['down'] ||
			attackDirection['left'])) {
			clearInterval(powerUpTick);
			powerUpTick = false;
			if(shotPower > 0) {
				console.log('fire at direction ' + attackReleaseDirection + ' with power ' + shotPower);
				shotPower = 0;
				//beam = Beam(attackReleaseDirection, shotPower, position.x, position.y);
				attackReleaseDirection = -1;
			}
			else {
				console.log('Not enough power charged');
			}
		}
	}
	
	function _calculateFireDirection() {
		if(attackDirection['left']) {
			if(attackDirection['up']) {
				attackReleaseDirection = 4;
			}
			else if(attackDirection['down']) {
				attackReleaseDirection = 6;
			}
			else {
				attackReleaseDirection = 5;
			}
		}
		else if(attackDirection['right']) {
			if(attackDirection['up']) {
				attackReleaseDirection = 2;
			}
			else if(attackDirection['down']) {
				attackReleaseDirection = 8;
			}
			else {
				attackReleaseDirection = 1;
			}
		}
		else if(attackDirection['up']) {
			attackReleaseDirection = 3;
		}
		else if(attackDirection['down']) {
			attackReleaseDirection = 7;
		}
	}
	
	function _calculateVelocity() {
		for(var dir in accelerationDirection) {
			if(accelerationDirection.hasOwnProperty(dir)) {
				//accelerate if needed
				if(accelerationDirection[dir]) {
					switch(dir) {
						case 'left' :
								if(velocity.x > maxVelocity  * -1) {
									velocity.x -= accelerationRate;
									
									if(velocity.x < maxVelocity * -1) {
										velocity.x = maxVelocity * -1;
									}
								}
							break;
							
						case 'up' :
								if(velocity.y > maxVelocity * -1) {
									velocity.y -= accelerationRate;
									
									if(velocity.y < maxVelocity * -1) {
										velocity.y = maxVelocity * -1;
									}
								}
							break;
						
						case 'right' :
								if(velocity.x < maxVelocity) {
									velocity.x += accelerationRate;
									
									if(velocity.x > maxVelocity) {
										velocity.x = maxVelocity;
									}
								}
							break;
							
						case 'down' :
								if(velocity.y < maxVelocity) {
									velocity.y += accelerationRate;
									
									if(velocity.y > maxVelocity) {
										velocity.y = maxVelocity;
									}
								}
							break;
					}
				}
				//otherwise, decelerate
				else {
					switch(dir) {
						case 'left' :
								if(velocity.x < 0) {
									velocity.x += drag;
									
									if(velocity.x > 0) {
										velocity.x = 0;
									}
								}
							break;
							
						case 'up' :
								if(velocity.y < 0) {
									velocity.y += drag;
									
									if(velocity.y > 0) {
										velocity.y = 0;
									}
								}
							break;
						
						case 'right' :
								if(velocity.x > 0) {
									velocity.x -= drag;
									
									if(velocity.x < 0) {
										velocity.x = 0;
									}
								}
							break;
							
						case 'down' :
								if(velocity.y > 0) {
									velocity.y -= drag;
									
									if(velocity.y < 0) {
										velocity.y = 0;
									}
								}
							break;
					}
				}
			}
		}
	}
	
	function _fireKeyPressed(keyCode) {
		return _keyInAction(keyCode, Attack);
	}
	
	//checks for key value associated with an enumerated set of actions and returns the associated action or false
	function _keyInAction(keyCode, actions) {
		for(var key in actions) {
			if(actions.hasOwnProperty(key)) {
				if($.inArray(keyCode, actions[key]) >= 0) {
					return key;
				}
			}
		}
		
		return false;
	}
	
	function _moveKeyPressed(keyCode) {
		return _keyInAction(keyCode, Movement);
	}
	
	function _powerUp() {
		shotPower++;
		_calculateFireDirection();
	}
	
	return {
		triggerAction	: triggerAction,
		stopAction		: stopAction,
		draw			: draw,
		drawClear		: drawClear,
		move			: move
	}
}
