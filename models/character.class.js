class Character extends MovableObject {

    height = 330;
    width = 140;
    x = 120;
    y = 150;
    world;
    speedY = 0;
    speed = 3;
    characterMovement;
    treasureAnimation = true;
    characterWalking;
    hurtSound = new Audio('audio/ouch.mp3');
    accessRun = true;
    characterCondition;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',


    ];

    IMAGES_JUMPING_FALLING = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png'
    ];


    currentImage = 0;
    walking_sound = new Audio('audio/running.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_JUMPING);
        this.loadImages(this.IMAGES_JUMPING_FALLING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }


    animate() {
        this.characterMovement = setInterval(() => {
            this.walking_sound.pause();
            this.characterMovementAndPosition();
            this.generateStatusbarEndboss();
        }, 1000 / 60);

        this.characterCondition = setInterval(() => {
            this.characterConditionAndPlayAnimations();

            this.turningEndboss();
        }, 160);
        this.saveIntervals();
    }




    turningEndboss() {
        if (this.x > this.world.endBoss.x) {
            setTimeout(() => {
                this.turningEndbossRight();

            }, 1000);
        } else if (this.x < this.world.endBoss.x) {
            setTimeout(() => {
                this.turningEndbossLeft()

            }, 1000);
        }
    }


    characterConditionAndPlayAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DYING);
            this.energy = 100;
            gameOver();
        } else if (this.isHurt()) {
            this.isHurtAnimationAndSound();
        } else if (this.isAboveGround()) { //Wird ausgeführt wenn der Charakter sich über der Luft befindet.
            this.animationJumping();
        } else if (this.speedY > 0) {
            this.playAnimation(this.IMAGES_JUMPING_FALLING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        }
    }

    characterMovementAndPosition() {
        this.walkingRight();
        this.walkingLeft();
        this.jumping();
        this.EarthingCharacter();
        this.positioningCharacterOnCamera();
    }

    turningEndbossLeft() {
        this.world.endBoss.moveRight();
        this.world.endBoss.walkOtherDirection = false;
        this.world.endBoss.walkLeft = true;
    }

    turningEndbossRight() {
        this.world.endBoss.moveLeft();
        this.world.endBoss.walkOtherDirection = true;
        this.world.endBoss.walkLeft = false;
    }

    saveIntervals() {
        allIntervals.push(this.characterMovement, this.characterCondition, this.characterWalking);
        allSounds.push(this.hurtSound, this.walking_sound);
    }

    animationJumping() {
        if (this.speedY < 0) {
            this.playAnimation(this.IMAGES_JUMPING_JUMPING);
        }
    }

    isHurtAnimationAndSound() {
        this.hurtSound.play();
        this.playAnimation(this.IMAGES_HURT);
    }

    walkingRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { //Wenn die rechte Pfeiltaste gedrückt wird,
            this.moveRight();
            this.walking_sound.play();
        }
    }

    walkingLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) { //Wenn die linke Pfeiltaste gedrückt wird,
            this.moveLeft();
            this.walking_sound.play();
        }
    }

    generateStatusbarEndboss() {
        if (this.x >= 2649 && this.world.statusBarEndBoss.length <= 0) {

            this.world.endBoss.accessRelease = true;
            let pushStatusBoss = new Statusbarendboss();
            this.world.statusBarEndBoss.push(pushStatusBoss);
        }
    }

    jumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) { //Wenn die SPACE Taste betätigt wurde und der Charakter nicht über dem Boden ist.
            this.jump();
        }
    }

    EarthingCharacter() {
        if (this.y > 150) {
            this.y = 155;
        }
    }

    positioningCharacterOnCamera() {
        this.world.camera_x = -this.x + 100;

    }
}