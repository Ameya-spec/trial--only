

function game2() {
  createCanvas(0,0);
engine = Engine.create();
world = engine.world;
render = Render.create({
  element: document.body,
  engine: engine,
options: {
      width: 500,
      height: 600,
      pixelRatio: 1,
      background: "skyblue",
      wireframeBackground: 'black',
      hasBounds: false,
      
      enabled: true,
      wireframes:true,
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
 

  var group = Body.nextGroup(true);

  var bridge = Composites.stack(160, 290, 15, 1, 0, 0, function(x, y) {
    return Bodies.rectangle(x - 20, y, 53, 20, { 
        // collisionFilter: { group: group },
        // chamfer: 5,
        density: 0.005,
        frictionAir: 0.05,
        render: {
            fillStyle: '#060a19'
        }
    });
});
  Composites.chain(bridge, 0.09, 0, -0.09, 0, { 
    stiffness: 1,
    length: 0,
    render: {
        visible: false
    }
});
var stack = Composites.stack(250, 50, 6, 3, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 50, 50, Common.random(20, 40));
});

World.add(world, [
  bridge,
  stack,
  Bodies.rectangle(30, 490, 220, 380, { 
      isStatic: true, 
     
      chamfer: { radius: 20 }
  }),
  Bodies.rectangle(770, 490, 220, 380, { 
      isStatic: true, 
      chamfer: { radius: 20 }
  }),
  Constraint.create({ 
      pointA: { x: 140, y: 300 }, 
      bodyB: bridge.bodies[0], 
      pointB: { x: -25, y: 0 },
      length: 2,
      stiffness: 0.9
  }),
  Constraint.create({ 
      pointA: { x: 660, y: 300 }, 
      bodyB: bridge.bodies[bridge.bodies.length - 1], 
      pointB: { x: 25, y: 0 },
      length: 2,
      stiffness: 0.9
  })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          stiffness: 0.1,
          render: {
              visible: false
          }
      }
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
//render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 }
});
return {
  engine: engine,
 
  render: render,
  canvas: render.canvas,
  stop: function() {
      Matter.Render.stop(render);

  }
};

}



