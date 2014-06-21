/* 
 * This code is adapted from the PhysicsJS library example for bouncing balls
 * that follow the mouse cursor.
 * Original example source code from: http://wellcaffeinated.net/PhysicsJS/
 * This modified version oreints the balls based on orientation events from the
 * accelerometer of a mobile device.
 * 
 * Author: rammar
 */

/* Define the PhysicsJS world, rolii bodies and handle attraction events. */
Physics(function (world) {

	// window dimensions
    var viewWidth = window.innerWidth;
    var viewHeight = window.innerHeight;
    var center = Physics.vector(viewWidth, viewHeight).mult(0.5); // center
	
	// bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // create a PhysicsJS renderer
    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: viewWidth,
        height: viewHeight
    });

    // add the renderer
    world.add(renderer);
	
    // render on each step
    world.on('step', function () {
        world.render();
    });

    // attract bodies to a point
    var attractor = Physics.behavior('attractor', {
        pos: center,
        strength: 10		
        //,order: 2 // use 2 for newtonian gravity - this is the default value
    });

    // constrain objects to these bounds
    var edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds
        ,restitution: 0.2
        ,cof: 0.8
    });

    // window resize events
    window.addEventListener('resize', function () {

        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight;
		
        renderer.el.width = viewWidth;
        renderer.el.height = viewHeight;

        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		
        // update the boundaries
        edgeBounce.setAABB(viewportBounds);

    }, true);

    // move the attractor position to match the mouse coords
    renderer.el.addEventListener('mousemove', function( e ){
        attractor.position({ x: e.pageX, y: e.pageY });
    });
    
	// create the rolii body or bodies
    var numberOfRolii= 40; // number of rolii bodies
    var bodies = [];
	var roliiRadius= 20; // rolii has smallish pixel radius

    while (numberOfRolii != 0) {
        var currentBody = Physics.body('circle', {
            radius: roliiRadius,
			// start the rolii in random places on the screen
            x: getRandomInt(0, viewWidth),
            y: getRandomInt(0, viewHeight),
            styles: {
				// use a random color generator
				// you can set luminosity and hue properties to get pretty colours
                fillStyle: randomColor({ luminosity: "light" })
            }
        });
        bodies.push(currentBody);
		
		--numberOfRolii;
    }

    // add all the rolii to the world at once
    world.add( bodies );
	
	// define the world behaviour
    world.add([
        Physics.behavior('newtonian', {
            strength: 0.005
            ,min: 10
        })
        ,Physics.behavior('body-impulse-response')
        ,edgeBounce
        ,attractor
    ]);

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time ) {
        world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();
	
});


/* -- GENERAL HELPER FUNCTIONS -- */

/* Return a random integer in a range. */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}