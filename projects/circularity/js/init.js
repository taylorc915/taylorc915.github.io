var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeRunner = function() {
        
        window.opspark.runner = {};
        var runner = window.opspark.runner;
        
        ////////////////////////////////////////////////////////////////
        // ALL CODE GOES BELOW HERE                                   //
        ////////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables //
        var circle;
        var circles = [];
        var drawCircle 
        // TODO 2 : Create a function that draws a circle  //
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas);
            view.addChild(circle);
            circles.push(circle);
        }
        // TODO 3 : Call the drawCircle function 5 times //
        for (var i = 0; i < 100; i++){
            drawCircle();
        }
        // TODO 7 : Create a Loop to call drawCircle 100 times

    
        view.addChild(fps);
        app.addUpdateable(fps);
    
        runner.checkCircleBounds = function(circle) {
            // TODO 5 : YOUR CODE STARTS HERE //////////////////////
            
            // if the circle has gone out the right side of the screen then place it off-screen left
            if ( circle.x > canvas.width + circle.radius ) {
                circle.x = 0- circle.radius;
            } 
            // TODO 5a) if the circle has gone out of the left side of the screen then place it off-screen right
            if ( circle.x < 0 - circle.radius ) {
                circle.x = canvas.width + circle.radius;
            } 

            // TODO 5b) if the circle has gone out of the top side of the screen then place it off-screen bottom
            if ( circle.y < 0 - circle.radius) {
                circle.y = canvas.height + circle.radius;
            }
            // TODO 5c) if the circle has gone out of the bottom side of the screen then place it off-screen top 
            if ( circle.y > canvas.height + circle.radius ) {
                circle.y = 0 - circle.radius;
            }
            // YOUR TODO 5 CODE ENDS HERE //////////////////////////
        }
    
        var update = function() {
            // TODO 4 : Update the circle's position //

            // TODO 6 : Call checkCircleBounds on your circles.

           
            // TODO 8 : Iterate over the array
            for (var k = 0; k < circles.length; k++){
               circle = circles[k];
               physikz.updatePosition(circle);
               runner.checkCircleBounds(circle)
           }

        }
        
        ////////////////////////////////////////////////////////////////////
        // NO CODE BELOW HERE                                             //
        ////////////////////////////////////////////////////////////////////
        
        runner.circle = circle;
        runner.circles = circles;
        runner.drawCircle = drawCircle;
        runner.update = update;
        
        app.addUpdateable(window.opspark.runner);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
