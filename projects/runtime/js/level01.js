console.log("Obstacle FUNCTION");

var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;
        
        var createSawBlade = function(x,y){
        var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        myObstacle.x = x;
        myObstacle.y = y;
        game.addGameItem(myObstacle);  
        var obstacleImage = draw.bitmap('img/dean.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        myObstacle.addChild(obstacleImage);
        };
        
        function createPowerCube(x, y){
            var myCube = game.createObstacle(25, 25);
            myCube.x = x;
            myCube.y = y;
            game.addGameItem(myCube);
            var cubeImage = draw.bitmap('img/cube.jpeg');
            cubeImage.x = -25;
            cubeImage.y = -25;
            myCube.addChild(cubeImage);
        }
        
        function createEnemy(x, y){
        var enemy = game.createGameItem('enemy', 25);
        var enemyImage = draw.bitmap('img/finalboss.gif')
        enemyImage.x = -25;
        enemyImage.y = -25;
        enemy.addChild(enemyImage);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 0;
        enemy.onPlayerCollision = function(){
            game.changeIntegrity(-30);
            enemy.fadeOut();
        };
        enemy.onProjectileCollision = function(){
            game.increaseScore(100);
            enemy.shrink();
            
        };
      }
      

         function createReward(x, y){
            var reward = game.createGameItem('reward', 25); // NOTE: You should be using createGameItem, not createObstacle!
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            var rewardImage = draw.bitmap('img/bluebanner.png');
            rewardImage.x = -25;
            rewardImage.y = -130;
            reward.addChild(rewardImage);
            reward.velocityX = -1;
            reward.onPlayerCollision = function(){
                game.changeIntegrity(50);
                game.increaseScore(1000);
                reward.fadeOut();
                reward.flyTo(254, groundY - 254);
            };
         };
         function createGear(x, y){
            var myGear = game.createObstacle(25, 25);
            myGear.x = x;
            myGear.y = y;
            game.addGameItem(myGear);
            var gearImage = draw.bitmap('img/frcgear.jpg');
            gearImage.x = -25;
            gearImage.y = -25;
            myGear.addChild(gearImage);
            myGear.onPlayerCollision = function(){
                game.changeIntegrity(50);
                game.increaseScore(1000);
                myGear.fadeOut();
                myGear.flyTo(254, groundY - 254);
            };
        }
        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:320},
                {type: 'sawblade',x:600,y:455},
                {type: 'sawblade',x:900,y:440},
                {type: 'sawblade',x:1100,y:300},
                {type: 'sawblade',x:1300, y:435},
                {type: 'sawblade',x:2500,y:430},
                {type: 'sawblade',x:3600,y:360},
                {type: 'sawblade',x:3750,y:groundY},
                {type: 'powerCube',x:1500,y:340},
                {type: 'powerCube',x:3200,y:450},
                {type: 'powerCube',x:4100,y:groundY},
                {type: 'enemy',x:680,y:groundY - 50},
                {type: 'enemy',x:1500,y:groundY - 50},
                {type: 'enemy',x:2300,y:groundY - 50},
                {type: 'enemy',x:2600,y:groundY - 50},
                {type: 'enemy',x:2000,y:groundY - 50},
                {type: 'reward',x:1900,y:groundY - 100},
                {type: 'reward',x:4500,y:groundY - 100},
                {type: 'gear',x:2700,y:310}
                ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
    
         for(var i = 0; i < levelData.gameItems.length; i++){
             if(levelData.gameItems[i].type === 'sawblade'){
             createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
             if(levelData.gameItems[i].type === 'powerCube'){
             createPowerCube(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
         
             if(levelData.gameItems[i].type === 'enemy'){
             createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
         
             if(levelData.gameItems[i].type === 'reward'){
             createReward(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
             if(levelData.gameItems[i].type === 'gear'){
             createGear(levelData.gameItems[i].x, levelData.gameItems[i].y);
            }
         }
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}