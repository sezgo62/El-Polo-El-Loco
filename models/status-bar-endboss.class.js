class Statusbarendboss extends Drawableobject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', //0
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'//5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 450;
        this.y = 20;
        this.height = 80;
        this.width = 250;

        this.setPercentage(100);
    }


}