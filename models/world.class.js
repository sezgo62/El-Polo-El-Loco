class World {

    treasure = new Treasure();
    character = new Character();
    sign = new Sign();
    endBoss = new Endboss();
    counter = 0;

    counterThrowing = 0;

    treasureObjects = [];

    throwableObject = [];//new ThrowableObject(100, 100) 
    statusBar = new Statusbar();
    statusBarCoin = new Statusbarcoin();
    statusBarBottle = new Statusbarbottle();
    statusBarEndBoss = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottlesAvailable = 1;
    coin = 0;
    treasureBottles = 0;
    chickenDead = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    chickenSmallDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    currentImage = 0;

    bottleBreak = new Audio('audio/bottleBreak.mp3');
    chickDead = new Audio('audio/chickDead.mp3');
    chickenisDead = new Audio('audio/chickenDead.mp3');
    coinSound = new Audio('audio/coinSound.mp3');
    bottleSound = new Audio('audio/bottleSound.mp3');




    BURSTING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');//ctx befähigt uns (Spezifische?)Funktionen hinzuzufügen.
        this.canvas = canvas;//Wir lagern canvas in canvas ein...
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.intervalForThrow();
        this.intervalForCheckHit();
        allSounds.push(this.bottleBreak, this.chickDead, this.chickenisDead, this.coinSound, this.bottleSound);
    }

    setWorld() {
        this.character.world = this;
    }



    run() {
        setInterval(() => {
            this.checkCollisions();
            this.intervalForTreasure();
            this.intervalForBottle();
            this.intervalForCoins();
            this.intervalForCheckHit();
            this.checkjumpOnEnemy();
            this.intervalForTreasureObject();
        }, 1000);
    }



    intervalForTreasure() {
        setInterval(() => {
            this.checkCollisionWithTreasure();
        }, 3000);
    }

    intervalForTreasureObject() {
        setInterval(() => {
            this.checkCollisionWithTreasureObject();
        }, 200);
    }



    intervalForBottle() {
        setInterval(() => {
            this.checkCollisionWithBottle();
        }, 200);
    }

    intervalForCoins() {
        setInterval(() => {
            this.checkCollisionWithCoin();
        }, 100);
    }

    intervalForThrow() {
        setInterval(() => {
            this.restoreCounter();
        }, 250);
    }

    intervalForCheckHit() {
        setInterval(() => {
            this.killEnemy();
        }, 100);
    }

    checkjumpOnEnemy() {
        setInterval(() => {
            this.jumpOnEnemy();
        }, 100);
    }

    checkCollisions() {

        this.level.chicken_small.forEach((chickenSmall) => {
            if (this.character.isColliding(chickenSmall) && chickenSmall.accessAnimation == true && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });


        if (this.character.isColliding(this.endBoss) && this.endBoss.accessAnimationBoss == true) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }


        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.accessAnimation == true && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }




    checkCollisionWithTreasure() {
        if (this.character.isColliding(this.treasure) && this.coin == 5 && this.character.treasureAnimation == true) {
            let bottles = new TreasureObjects(this.treasure.x + 200, this.treasure.y + 100);


            if (this.treasureBottles < 3) {
                this.treasureObjects.push(bottles);
                this.treasureBottles++;
            } else {
                this.character.treasureAnimation = false;
            }
        }
    }


    preventMove() {
        this.character.animate();
    }

    checkCollisionWithTreasureObject() {
        this.treasureObjects.forEach((treasureObject) => {
            if (this.character.isColliding(treasureObject)) {
                this.bottleSound.play();

                if (this.character.isColliding(treasureObject)) {
                    this.bottlesAvailable++;
                    const index = this.treasureObjects.indexOf(treasureObject);
                    this.treasureObjects.splice(index, 1);
                }
            }
        });
    }


    checkCollisionWithBottle() {


        for (let b = 0; b < this.level.bottles.length; b++) {
            const bottle = this.level.bottles[b];


            if (this.character.isColliding(bottle) && this.level.bottles[b].x == bottle.x) {
                this.bottleSound.play();

                const index = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(index, 1);
                this.bottlesAvailable++;
            }
        }
        this.statusBarBottle.setPercentage(this.bottlesAvailable);

    }

    checkCollisionWithCoin() {


        for (let b = 0; b < this.level.coins.length; b++) {
            const coin = this.level.coins[b];

            if (this.character.isCollidingWithCharacter(coin) && this.level.coins[b].x == coin.x) {
                this.coinSound.play();
                const index = this.level.coins.indexOf(coin);
                this.level.coins.splice(index, 1);
                this.coin++;
            }
        }
        this.statusBarCoin.setPercentage(this.coin);
    }



    indexBottles() {
        for (let b = 0; b < this.throwableObject.length; b++) {
            this.allBottles = this.throwableObject[b];
        }
    }

    killEnemy() {
        this.indexBottles();
        this.killingEndBoss();
        this.killingSmallChicken();
        this.killChickens();
    }


    killingEndBoss() {
        this.throwableObject.forEach((object) => {
            if (object.isColliding(this.endBoss) && !object.isBroken && this.counter == object.id) {
                let index = this.throwableObject.indexOf(object);
                this.throwableObject[index].counter = this.counter;
                this.bottleCounter(object);
                this.bottleBreak.play();
                this.deletingCollitedBottle(object);
                this.endBoss.hitEndBoss();
                this.statusBarEndBoss[0].setPercentage(this.endBoss.energyBoss);
                this.endBoss.accessHurt = true;
                this.endBoss.currentImage = 0;
                object.endBossGotHit = true;
            }
        });
    }

    killingSmallChicken() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.throwableObject.length > 0 && this.allBottles.isColliding(enemy)) {

                enemy.speed = 0;
                this.level.enemies[index].accessAnimation = false;
                this.level.enemies[index].loadImage(this.chickenDead);
                this.level.enemies[index].animate();

                setTimeout(() => {
                    const indexOfEnemie = this.level.enemies.indexOf(enemy);

                    this.level.enemies.splice(indexOfEnemie, 1);
                }, 1000);

            }
        });
    }

    killChickens() {
        this.level.chicken_small.forEach((chickenSmall, index) => {
            if (this.throwableObject.length > 0 && this.allBottles.isColliding(chickenSmall)) {
                this.chickDead.play();
                chickenSmall.speed = 0;
                this.level.chicken_small[index].accessAnimation = false;
                this.level.chicken_small[index].loadImage(this.chickenSmallDead);
                this.level.chicken_small[index].animate();
                setTimeout(() => {
                    const indexOfChick = this.level.chicken_small.indexOf(chickenSmall);
                    this.level.chicken_small.splice(indexOfChick, 1);
                }, 1000);
            }
        });
    }


    deletingCollitedBottle(object) {
        setTimeout(() => {
            let index = this.throwableObject.indexOf(object);
            this.throwableObject.splice(index, 1);
        }, 900);
    }

    bottleCounter(object) {
        this.counter++;
        object.isBroken = true;
    }

    jumpOnEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.accessAnimation == true && this.character.speedY < 0) {
                this.chickenisDead.play();
                this.character.jump();
                this.level.enemies[index].accessAnimation = false;
                enemy.playAnimation(this.chickenDead);
                enemy.loadImage(this.chickenDead);
                this.spliceEnemy(enemy);
            }
        });

        this.level.chicken_small.forEach((smallChick, index) => {
            if (this.character.isColliding(smallChick) && this.character.isAboveGround() && smallChick.accessAnimation == true && this.character.speedY < 0) {
                this.chickDead.play();
                this.character.jump();
                this.level.chicken_small[index].accessAnimation = false;
                this.level.chicken_small[index].loadImage(this.chickenSmallDead);
                this.spliceSmallChick(smallChick);
            }
        });
    }

spliceSmallChick(smallChick) {
    setTimeout(() => {
        const indexOfChick = this.level.chicken_small.indexOf(smallChick);

        this.level.chicken_small.splice(indexOfChick, 1);
    }, 1000);
}

spliceEnemy(enemy) {
    setTimeout(() => {
        const indexOfEnemie = this.level.enemies.indexOf(enemy);

        this.level.enemies.splice(indexOfEnemie, 1);
    }, 1000);
}

    restoreCounter() {
        if (this.keyboard.D && this.bottlesAvailable > 0) {

            this.counterThrowing = 0;

            this.checkThrowObjects();

        }
    }

    checkThrowObjects() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirections, this.counter, this.counterThrowing);
        this.throwableObject.push(bottle);
        this.bottlesAvailable -= 1;




    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// Das canvas wird gelöscht da alles, wie z.B. der Charackter dubliziert wird.

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.treasure);
        this.addToMap(this.sign);
        this.addObjectsToMap(this.level.clouds);



        // ------space for fixed objects-------
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (this.statusBarEndBoss.length == 1) {
            this.addObjectsToMap(this.statusBarEndBoss);
        }
        this.addToMap(this.statusBar);


        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.treasure);

        this.addToMap(this.character);//Der Charakter wird hier gezeichnet
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.chicken_small);



        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.treasureObjects);

        this.ctx.translate(-this.camera_x, 0);



        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {//ruft vor jedem erneuten Rendern (»Refresh«) des Browserfensters die Animations-Funktion auf und
            self.draw();                      //erzeugt so einen weichen Übergang von einem Frame zum nächsten
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {//Jedes einzelne Object wird addToMap übergeben
            this.addToMap(o);
        });
    }

    addToMap(mo) {

        if (mo.otherDirections) {
            this.flipImage(mo);
        }


        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);



        if (mo.otherDirections) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}