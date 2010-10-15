function Renderer() {
	var clearList = [],
		renderingList = [],
		ctx = $(GLOBAL.gameCanvasId)[0].getContext('2d');
	
	function registerDrawMethods(draw, clear) {
		
		renderingList.push(draw);
		clearList.push(clear);
	}
	
	function render() {
		var x;
		
		for(x = 0; x < renderingList.length; x++) {
			renderingList[x](ctx);
		}
		ctx.fill();
	}
	
	function clear() {
		for(x = 0; x < clearList.length; x++) {
			clearList[x](ctx);
		}
	}
	
	return {
		clear				: clear,
		render				: render,
		registerDrawMethods	: registerDrawMethods
	}
}
