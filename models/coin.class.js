class Coins extends MovableObject {

    x = 120;
    y = 340;

coins = [
         'img/8_coin/coin_1.png',
         'img/8_coin/coin_1.png',
         'img/8_coin/coin_1.png'
];

    constructor() {
        //super().loadImage('img/8_coin/coin_1.png');
        super().loadImages(this.coins);

        this.x = 400 + Math.random() * 800; // Zufällige Zahl zwichen 200 und 700
    }
    
}