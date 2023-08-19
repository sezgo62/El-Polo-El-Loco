class ThrowableObject extends MovableObject {

    otherDirections;
    id;
    idThrowing;
    endBossGotHit = false;
    stopRotation = false;
    currentImage = 0;
    playAnimationsinterval = true;
    counter;

    BOTTLE_IMAGES = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BURSTING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirections, id, idThrowing) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.loadImages(this.BURSTING_BOTTLE);
        this.id = id;
        this.idThrowing = idThrowing;

        this.x = x;
        this.y = y;

        this.height = 60;
        this.width = 50;
        this.otherDirections = otherDirections;
        this.throw();
    }

    throw() {

        this.applyGravity();

        setInterval(() => {

            if (!this.otherDirections && !this.isBroken) {
                this.x += 10;
                this.y += 10;
            }

            if (this.otherDirections && !this.isBroken) {
                this.x -= 10;
                this.y += 10;
            }

        }, 25);

        this.playAnimationsinterval = setInterval(() => {
            if (!this.isBroken) {
                this.playAnimation(this.BOTTLE_IMAGES);
            } else {
                this.playAnimation(this.BURSTING_BOTTLE);
                setTimeout(() => clearInterval(this.playAnimationsinterval), 100 * this.BURSTING_BOTTLE.length)
            }
        }, 100);
    }
}