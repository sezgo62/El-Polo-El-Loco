class Endboss extends MovableObject {

height = 400;
width = 250;
y =55;


IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
];

currentImage = 0;

constructor() {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_WALKING);

    this.x = 2500;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
    
    
}

animate() {

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
}, 100);
}
}