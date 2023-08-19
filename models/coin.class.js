class Coins extends MovableObject {

    x = 120;
    y = 340;
    height = 100;
    width = 100;

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }


}