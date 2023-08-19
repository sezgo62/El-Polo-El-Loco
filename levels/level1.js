let level1;


function initLevel() {


    level1 = new Level(
        generateChickens(),
        generateClouds(),
        generateBackground(),
        generateCoins(),
        generateBottles(),
        generateChickenSmall(),

    );
};






function generateChickens() {
    return [
        new Chicken(800),
        new Chicken(1440),
        new Chicken(2400)
    ]
}

function generateBackground() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4),
    ]
}

function generateCoins() {
    return [
        new Coins(500, 50),
        new Coins(1000, 50),
        new Coins(1300, 300),
        new Coins(1700, 50),
        new Coins(1900, 300),
    ]
}

function generateClouds() {
    return [
        new Cloud()
    ]
}

function generateBottles() {
    return [
        new Bottle(300),
        new Bottle(500),
        new Bottle(800),
        new Bottle(1500),
        new Bottle(1900)
    ]
}

function generateChickenSmall() {
    return [
        new Chickensmall(900),
        new Chickensmall(1540),
        new Chickensmall(2800)
    ]
}