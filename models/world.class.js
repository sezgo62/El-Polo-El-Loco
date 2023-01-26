class World {

    character = new Character();
    
    throwableObject = [new ThrowableObject()];
    statusBar = new Statusbar();
    statusBarBottle = new Statusbarbottle();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {

        this.ctx = canvas.getContext('2d'); //ctx befähigt uns (Spezifische?)Funktionen hinzuzufügen.
        this.canvas = canvas; //Wir lagern canvas in canvas ein...
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; //??????????
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionWithCoin();
            this.checkThrowObjects();
     }, 1000);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                
            }
});
}


checkCollisionWithCoin() {
    this.level.enemies.forEach((enemy) => {
        if(this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            
        }
});
}


checkThrowObjects() {

if(this.keyboard.D) {
let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
this.throwableObject.push(bottle);
}

}

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// Das canvas wird gelöscht da alles, wie z.B. der Charackter dubliziert wird.

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        
        // ------space for fixed objects-------
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBar);
        
        
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);//Der Charakter wird hier gezeichnet
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        
        this.addObjectsToMap(this.throwableObject);
        
        this.ctx.translate(-this.camera_x, 0);

       

        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {//ruft vor jedem erneuten Rendern (»Refresh«) des Browserfensters die Animations-Funktion auf und
        self.draw();                      //erzeugt so einen weichen Übergang von einem Frame zum nächsten
        });
    }

addObjectsToMap(objects) {
    objects.forEach(o => {//Jedes einzelne Object wird addToMap übergeben
        this.addToMap(o);
    });
}

addToMap(mo) {

        if(mo.otherDirections) {
            this.flipImage(mo);
        }

    
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

    

        if(mo.otherDirections) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;  
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}