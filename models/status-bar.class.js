class Statusbar extends Drawableobject {



    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', //0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'//5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 60;
        this.y = -20;
        this.height = 80;
        this.width = 250;

        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]; //Die returnte Zahl wird zur identifizierung des richtigen Bildes benutzt und in path gelagert.

        this.img = this.imageCache[path]; // Das jewielige Bild wird aus unserem imageCache geladen.
    }

    resolveImageIndex() {
        if (this.percentage == 100) { //Es wird eine Zahl returnt zu resolveImageIndex
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }

    }



}