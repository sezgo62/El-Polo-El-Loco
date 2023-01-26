class Drawableobject  {

    x = 120;
    y = 320;
    img;
    height = 150;
    width = 100;
    imageCache = {};

    drawFrame(ctx) { // Funktion dient dazu dass wir einen Ramen um das jeweilige Objekt bauen womit wir beser die Kolision berechnen können.
        if(this instanceof Character || this instanceof Chicken) { //Mit instanceof können wir wählen welches Objekt den Ramen bekommen soll.
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}



    loadImage(path) { // Diese Funktion befähigt den upload von Bildern.
        this.img = new Image(); //Das "Image()" ist nur das Abbild vom <img> tag.
        this.img.src = path;
    } 

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  //Hier wird das Bild gezeichnet.
    }
    
    loadImages(arr) {     // Alle Bilder werden in imageCache eingelagert.
        arr.forEach((path) => { //Jeder path wird als Parameter aus Characters oder Chicken reingegeben.
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}

