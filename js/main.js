
var myCanvas = document.getElementById('c');
var ctx = myCanvas.getContext("2d");
var flip = document.getElementById('flip');
var flipCount = 0
var cycle = 0

var Bodies = Matter.Bodies
var engine = Matter.Engine.create();
var world = engine.world;
var Query = Matter.Query;

var render = Matter.Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    background: '#36394f',
    wireframes: false,
    showAngleIndicator: false
  }
});

// 0.35
engine.world.gravity.y = .15;
engine.world.gravity.x = 0


var Mouse = Matter.Mouse
var MouseConstraint = Matter.MouseConstraint;
var mConstraint;

function flipMe() {
  if (flipCount == 0) {
    flip.setAttribute('style', 'transform:rotate(90deg); transition-duration: 1s;');
    flipCount += 90
  }
  else {
    flip.setAttribute('style', 'transform:rotate(' + flipCount + 'deg); transition-duration: 1s;');
  }
  flipCount += 90
};

var walls = [
  Matter.Bodies.rectangle(window.innerWidth / 2, 0, 4000, 50, {
    isStatic: true, render: {
      fillStyle: 'transparent',
    }
  }),
  Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight, 4000, 50, {
    isStatic: true, render: {
      fillStyle: 'transparent',
    }
  }),
  Matter.Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, 4000, {
    isStatic: true, render: {
      fillStyle: 'transparent',
    }
  }),
  Matter.Bodies.rectangle(0, window.innerHeight / 2, 50, 4000, {
    isStatic: true, render: {
      fillStyle: 'transparent',
    }
  })
]


window.addEventListener("resize", testFunc);
  Matter.World.add(world, linkBodies);
  Matter.World.add(world, fillers);
  Matter.World.add(world, [walls[1], walls[2], walls[3]
]);


setTimeout(function () { Matter.World.add(world, walls[0]); }, 4000);
Matter.Engine.run(engine);
Matter.Render.run(render);

function testFunc() {
  Matter.Body.setPosition(walls[2], { x: window.innerWidth, y: window.innerHeight / 2 });
  Matter.Body.setPosition(walls[1], { x: window.innerWidth / 2, y: window.innerHeight });


};
var canvasmouse = Mouse.create(myCanvas);
var options = {
  body: null,
  mouse: canvasmouse,
  constraint: {
    stiffness: 0,
    render: {
      visible: false
    }
  },

};

function invertGrav() {
  if (cycle == 0) {
    engine.world.gravity.y = 0
    engine.world.gravity.x = -0.5;
    cycle += 1
  } else if (cycle == 1) {
    engine.world.gravity.x = 0
    engine.world.gravity.y = -0.5;
    cycle += 1 // cycle = cycle + 1;
  } else if (cycle == 2) {
    engine.world.gravity.y = -0.3;
    engine.world.gravity.x = 0.5
    cycle += 1
  } else if (cycle == 3) {
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.35;
    cycle = 0
  }
}



mConstraint = MouseConstraint.create(engine, options);
console.log(mConstraint)
Matter.World.add(world, mConstraint);



Matter.Events.on(mConstraint, 'mousemove', function (event) {
  var foundObject = Query.point([...linkBodies, ...fillers], event.mouse.position)[0];
 
    if (foundObject) {
      foundObject.force = { x: 0, y: 0 };
      let {x,y} = foundObject.position;
     
      // Current pop-up
      var currentEl = document.getElementById(foundObject.label);
      // Find popups margin-left
      var currentElMarginLeft =  window.getComputedStyle(document.querySelector('.pop-up')).marginLeft
      // Pop-up left(x) origin
      var leftOrigin = x - parseInt(currentElMarginLeft);
       // Pop-up top(y) origin
      var topOrigin = y - 50;
      
      
      // For popup content
      if(foundObject.label === 'me') {
       currentEl.style.display = 'block';
       currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';
        mConstraint.body = null;
      } else if(foundObject.label === 'everyone-in') {
        currentEl.style.display = 'block';
        currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';
        mConstraint.body = null;
      } else if(foundObject.label === 'safe-clean-water') {
        currentEl.style.display = 'block';
        currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';

        mConstraint.body = null;
      } else if(foundObject.label === 'iam-2018') {
       currentEl.style.display = 'block';
       currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';

        mConstraint.body = null;
      } else if(foundObject.label === 'music') {
        currentEl.style.display = 'block';
        currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';

        mConstraint.body = null;
      } else if(foundObject.label === 'testimonials') {
        currentEl.style.display = 'block';
        currentEl.style.cssText = 'transform-origin:'+(leftOrigin)+'px '+(topOrigin)+'px; transform:scale(1);transition: transform 1s ease-in-out;';

        mConstraint.body = null;
      }  else {
        foundObject.force = { x: 0, y: -3 };
      }
    }
  // }
});