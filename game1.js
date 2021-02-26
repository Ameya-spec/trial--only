


function game1() {
	createCanvas(0,0);
	engine = Engine.create();
	world = engine.world;
	render = Render.create({
	  element: document.body,
	  engine: engine,
	options: {
		  width: windowWidth,
		  height: windowHeight,
		  pixelRatio: 0.7,
		  background: backImg,
		  wireframeBackground: '#006680',
		  hasBounds: false,
		  enabled: true,
		  wireframes:false,
		  showSleeping: false,
		  showDebug: false,
		  showBroadphase: false,
		  showBounds: true,
		  showVelocity: true,
		  showCollisions: false,
		  showSeparations: false,
		  showAxes: false,
		  showPositions: false,
		  showAngleIndicator: false,
		  showIds: false,
		  showShadows: false,
		  showVertexNumbers: false,
		  showConvexHulls: false,
		  showInternalEdges: false,
		  showMousePosition: false
	  }});
	  Render.run(render);
	  Engine.run(engine);

	  World.add(world, [
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true,render:{fillStyle:"#ffce99"} }),
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true}),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

	var stack  = Composites.stack(50,120,11,5,0,0,function(x,y){
		switch (Math.round(Common.random(0, 1))) {

			case 0:
				if (Common.random() < 0.8) {
					return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50));
				} else {
					return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30));
				}
			case 1:
				return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 50));
	
			}
	})
	World.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);//end
	render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
         
        }
    };
};



function keyPressed(){
	if (keyCode === 38){
		engine.world.gravity.y = -1;
	}
    if (keyCode === 40){
		engine.world.gravity.y = 1;
	}
	if (keyCode === 37){
		engine.world.gravity.x = -1;
	}
	if (keyCode === 39){
		engine.world.gravity.x = 1;
	}
	
}

