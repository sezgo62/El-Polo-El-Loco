class Chickensmall extends MovableObject {



    height = 100;
    width = 70;
    y = 365;
    speed = 2;
    chickSound = new Audio('audio/chickSound.mp3');
    x;
    accessAnimation = true;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    chickenDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    currentImage = 0;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.animate();
        this.x = x;
    }




    animate() {

        this.walkAndSound();


        let chickWalk = setInterval(() => {
            if (this.accessAnimation == true) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        allSounds.push(this.chickSound);
        allIntervals.push(chickWalk);
    }

    walkAndSound() {
        let chicken_smallIntervall = setInterval(() => {
            if (this.accessAnimation == true) {
                this.chickSound.play();
                this.x -= this.speed; // Die x Achse wird für 60 Frames pro 0.15 millisekunden nach links bewegt
            }
            if (this.x < 0) {
                this.chickSound.muted = true;
            }
        }, 1000 / 60);
        allIntervals.push(chicken_smallIntervall, this.chickWalk);
    }


}