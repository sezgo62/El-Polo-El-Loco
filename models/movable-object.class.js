class MovableObject extends Drawableobject {
x = 120;
y = 320;
img;
height = 150;
width = 100;
imageCache = {};
speed = 0.15;
otherDirections = false;
speedY = 0; //Geschwindigkeit 
acceleration = 2.5; //Beschleunigung
energy = 100;
lastHit = 0;

applyGravity() {
    setInterval(() => {
        if(this.isAboveGround() || this.speedY > 0) { //Diese Funktion wird ausgeführt wenn der Character sich über dem Boden befindet.
                                            //Wenn der y Wert des Charakters unter 100 ist(Heisst dass er über dem Boden ist) oder wenn man die Sprungtaste drückt  
                                            //Funktion wird solange ausgeführt bis wegen " this.speedY -= this.acceleration; " speedY auf null gesetzt wird und deshalb 
                                            //die erste Kondition der if-Abfrage aktiviert wird und der Charakter somit fällt.
        this.y -= this.speedY;                       
        this.speedY -= this.acceleration;
        console.log(this.y);
        }
    }, 1000 / 25);
}

isAboveGround() {
    if(this instanceof ThrowableObject) { // Throwable object should always fall.
                                          // Da es früher zu der Ausgangsfunktion returnt wird wird es nicht mehr durch den else-Teil gecheckt ob es kleiner als y fällt.
        return true;
    }
    return this.y < 100; //Diese Funktion wird solange ausgeführt und es wird solange etwas zu der y-Achse hinzu addiert bis in diesem Fall erreicht ist. 
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
        } catch(e) {
            /*console.warn('Error loading image', e);
            console.log('couldnt load image', this.img);*/

        }
   
}

drawFrame(ctx) { // Funktion dient dazu dass wir einen Ramen um das jeweilige Objekt bauen womit wir beser die Kolision berechnen können.
    if(this instanceof Character || this instanceof Chicken) { //Mit instanceof können wir wählen welches Objekt den Ramen bekommen soll.
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
}
}

// Bessere Formel zur Kollisionsberechnung (Genauer) / Character is kolliding Chicken.
isColliding(mo) {
    return this.x + this.width > mo.x &&
    this.y + this.height > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height
}

hit() {
    this.energy -= 20;
    if(this.energy < 0) {
        this.energy = 0;
    } else {
    this.lastHit = new Date().getTime();
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