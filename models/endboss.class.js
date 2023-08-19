class Endboss extends MovableObject {

    height = 400;
    width = 250;
    x = 55;
    y = 80;
    accessAnimationBoss = true;
    accessRelease = false;
    hits = 0;
    accesHurt = false;
    accessDead = true;
    speed = 3.5;
    walkOtherDirection = false;
    walkLeft = true;

    BOSS_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    CHICKENWALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [

        'img/4_enemie_boss_chicken/2_alert/G7.png',

        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

        'img/4_enemie_boss_chicken/2_alert/G8.png',

        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

        'img/4_enemie_boss_chicken/2_alert/G9.png',


        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

        'img/4_enemie_boss_chicken/2_alert/G10.png',

        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

        'img/4_enemie_boss_chicken/2_alert/G11.png',

        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    BOSS_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'];

    currentImage = 0;
    currentImageBoss = 0;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.BOSS_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.CHICKENWALK);
        this.loadImages(this.BOSS_HURT);

        this.x = 3000;
        this.animate();
    }




    animate() {
        let endBoss_interval1 = setInterval(() => {
            this.walkLeftBoss();
            this.walkRightBoss();
        }, 1000 / 60);
        let endBoss_interval2 = setInterval(() => {
            this.playAnimationBossAlert();
        }, 200);
        let endBoss_interval3 = setInterval(() => {
            this.animationBossHurt();
        }, 900);
        let endBoss_interval4 = setInterval(() => {
            if (this.bossIsDead() && this.accessDead == true) {
                this.accessAnimationBoss = false;
                this.accessRelease = false;
                this.BossDeadAnimation();
            }
        }, 900);
        allIntervals.push(endBoss_interval1, endBoss_interval2, endBoss_interval3, endBoss_interval4);
    }




    BossDeadAnimation() {
        this.playAnimation(this.BOSS_DEAD);
        if (this.currentImage > 2) {

            this.accessDead = false;
            setTimeout(() => {
                gameWin();
            }, 2);
        }
    }

    animationBossHurt() {
        if (this.accessHurt == true && this.accessRelease == true) {
            this.playAnimation(this.BOSS_HURT);
            if (this.currentImage > 2) {
                this.accessHurt = false;
            }
        }
    }


    playAnimationBossAlert() {
        if (this.accessRelease == true && this.accessAnimationBoss == true) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    walkLeftBoss() {
        if (this.accessRelease == true && this.accessAnimationBoss == true && this.walkLeft) {
            this.x -= this.speed; // Die x Achse wird für 60 Frames pro 0.15 millisekunden nach links bewegt
        }
    }

    walkRightBoss() {
        if (this.walkOtherDirection) {
            this.x += this.speed;
        }
    }

}

