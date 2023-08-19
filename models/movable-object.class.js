class MovableObject extends Drawableobject {
    x = 120;
    y = 320;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.15;
    otherDirections = false;
    speedY = 38; //Geschwindigkeit
    acceleration = 2.5; //Beschleunigung
    energy = 100;
    energyBoss = 100
    lastHit = 0;
    accessReward = false;
    endBossGotHit = false;
    preventClearEndbossCache = false;
    isBroken = false;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { //Diese Funktion wird ausgeführt wenn der Character sich über dem Boden befindet.
                //Wenn der y Wert des Charakters unter 100 ist(Heisst dass er über dem Boden ist) oder wenn man die Sprungtaste drückt  
                //Funktion wird solange ausgeführt bis wegen " this.speedY -= this.acceleration; " speedY auf null gesetzt wird und deshalb 
                //die erste Kondition der if-Abfrage aktiviert wird und der Charakter somit fällt.
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if ((this instanceof TreasureObjects)) {

            return this.y < 315;
        }
        if (this instanceof ThrowableObject && !this.isBroken) { // Throwable object should always fall.
            // Da es früher zu der Ausgangsfunktion returnt wird wird es nicht mehr durch den else-Teil gecheckt ob es kleiner als y fällt.
            return true;
        }


        if (this instanceof Character) {
            // Da es früher zu der Ausgangsfunktion returnt wird wird es nicht mehr durch den else-Teil gecheckt ob es kleiner als y fällt.
            return this.y < 150; //Diese Funktion wird solange ausgeführt und es wird solange etwas zu der y-Achse hinzu addiert bis in diesem Fall erreicht ist.
        }
    }


    loadImage(path) { // Diese Funktion befähigt den upload von Bildern
        this.img = new Image(); //Das "Image()" ist nur das Abbild vom <img> tag.
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr 
     */
    loadImages(arr) {     // Alle Bilder werden in imageCache eingelagert.
        arr.forEach((path) => { //Jeder path wird als Parameter aus Characters oder Chicken reingegeben.
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {

        try {

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
        }
    }

    //Bessere Formel zur Kollisionsberechnung (Genauer) / Character is kolliding Chicken.
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    isCollidingWithCharacter(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    };


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitEndBoss() {
        this.energyBoss -= 20;
        if (this.energyBoss < 0) {
            this.energyBoss = 0;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000;  // Difference in s
        return timepassed < 1; //Die isHurt Funktion wird sehr oft ausgeführt wegen dem interval. Wenn die Zeit-Differenz mehr als eine Sekunde dauert wird false zurückgegeben.
    }

    isDead() {
        return this.energy == 0;
    }

    bossIsDead() {
        if (this.preventClearEndbossCache == false) {
            this.currentImage = 0;
            this.preventClearEndbossCache = true;

        }
        return this.energyBoss == 0;
    }

    playAnimation(images) {
        //walk animation
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;       //Wird der Character um den Wert der in Speed eingelagert ist nach rechts verschoben.
        this.otherDirections = false;
    }

    moveLeft() {
        this.x -= this.speed;     //Wird der Character um den Wert der in Speed eingelagert ist nach links verschoben.
        this.otherDirections = true;
    }

    jump() {
        this.speedY = 30;
    }

}