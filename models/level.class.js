class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    chicken_small;
    character;

    level_end_x = 2800;


    constructor(enemies, clouds, backgroundObjects, coins, bottles, chicken_small) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.chicken_small = chicken_small;
    }

}