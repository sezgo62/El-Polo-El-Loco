class Statusbarbottle extends Drawableobject {

    
    
        IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        
        ];
    
        percentage = 100;
    
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 60;
        this.y = -20;
        this.height = 100;
        this.width = 250;
    }


}