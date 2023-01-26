class Chicken extends MovableObject {

    height = 100;
    width = 70;
    y = 350;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];
currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 500; // Zufällige Zahl zwichen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        
        
    }




    animate() {
        setInterval(() => {
            this.x -= this.speed; // Die x Achse wird für 60 Frames pro 0.15 millisekunden nach links bewegt
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
    }, 100);
    }
}