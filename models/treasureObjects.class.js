class TreasureObjects extends MovableObject {

    x = 120;
    y = 340;
    width = 100;
    maxNumber = 200 + Math.random() * 200;


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;

        this.getReward();
    }


    getReward() {

        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {
            if (this.maxNumber > 0) {
                this.y += 1;
                this.x += 5;
                this.maxNumber -= 10;

            }

        }, 25);
    }
}