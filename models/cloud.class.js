class Cloud extends MovableObject {
    y = 100;
    width = 500;
    height = 150;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');


        this.x = 400 + Math.random() * 500; // Zufällige Zahl zwichen 200 und 700
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}