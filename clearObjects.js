
function resetAllObjects() {

    /*------Reset chicken_small------*/
    //resetChickenSmall();
    /*-------------------------------*/


    /*------Reset chicken------*/
    //resetChicken();
    /*-------------------------------*/


    /*------Reset coins------*/

}




function clearAllObjects() {



    deleteAndCreateAllEnemies();

}

let allIntervals = [];

function stopIntervals() {
    allIntervals.forEach(clearInterval);
}

let allSounds = [];


function resetChickenSmall() {
    level1.chicken_small[0].x = 900;
    level1.chicken_small[1].x = 1540;
    level1.chicken_small[2].x = 2800;

    level1.chicken_small[0].accessAnimation = true;
    level1.chicken_small[1].accessAnimation = true;
    level1.chicken_small[2].accessAnimation = true;

    level1.chicken_small[0].loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    level1.chicken_small[1].loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    level1.chicken_small[2].loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
}

function resetChicken() {
    level1.enemies[0].x = 800;
    level1.enemies[1].x = 1440;
    level1.enemies[2].x = 2400;

    level1.enemies[0].accessAnimation = true;
    level1.enemies[1].accessAnimation = true;
    level1.enemies[2].accessAnimation = true;

    level1.enemies[0].loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    level1.enemies[1].loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    level1.enemies[2].loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
}

function deleteAndCreateAllEnemies() {
    level1.enemies.splice(0, 3);
    level1.chicken_small.splice(0, 3);
    level1.coins.splice(0, 5);
    level1.bottles.splice(0, 5);


    level1.enemies.push(new Chicken(800), new Chicken(1440), new Chicken(2400));
    level1.chicken_small.push(new Chickensmall(900), new Chickensmall(900), new Chickensmall(2800))
    level1.coins.push(new Coins(500, 50), new Coins(1000, 50), new Coins(1300, 300), new Coins(1700, 50), new Coins(1900, 300))
    level1.bottles.push(new Bottle(300), new Bottle(500), new Bottle(800), new Bottle(1500), new Bottle(1900))

}