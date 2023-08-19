class Chicken extends MovableObject {

    height = 100;
    width = 70;
    y = 365;
    speed = 0.80;
    chickenSound = new Audio('audio/chickenSound.mp3');
    accessAnimation = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    chickenDead = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    currentImage = 0;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.chickenDead);

        this.x = x;

        this.animate();

    }




    animate() {

        this.walkingAndSound();

        let chickenImages = setInterval(() => {
            if (this.accessAnimation == true) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        let chickenSound = this.chickenSound;
        this.pushChickenIntervalsAndSound(chickenSound, chickenImages);
        this.loadChickenDead();
    }


    loadChickenDead() {
        setInterval(() => {
            if (this.accessAnimation == false) {
                this.playAnimation(this.chickenDead);
            }
        }, 100);
    }

    pushChickenIntervalsAndSound(chickenSound, chickenImages) {
        allIntervals.push(chickenImages);
        allSounds.push(chickenSound);
    }


    walkingAndSound() {
        let chickenMovement = setInterval(() => {

            if (this.accessAnimation == true) {
                this.chickenSound.play();
                this.x -= this.speed; // Die x Achse wird für 60 Frames pro 0.15 millisekunden nach links bewegt
            } else {
                this.chickenSound.pause();
            }
        }, 1000 / 60);
        allIntervals.push(chickenMovement);
    }
}