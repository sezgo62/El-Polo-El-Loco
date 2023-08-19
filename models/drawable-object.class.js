class Drawableobject {

    x = 120;
    y = 320;
    img;
    height = 150;
    width = 100;
    imageCache = {};


    drawFrame(ctx) { // Funktion dient dazu dass wir einen Ramen um das jeweilige Objekt bauen womit wir beser die Kolision berechnen können.
        if (this instanceof Character || this instanceof Chicken) { //Mit instanceof können wir wählen welches Objekt den Ramen bekommen soll.
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


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]; //Die returnte Zahl wird zur identifizierung des richtigen Bildes benutzt und in path gelagert.
        this.img = this.imageCache[path]; // Das jewielige Bild wird aus unserem imageCache geladen.
    }

    resolveImageIndex() {

        if (this.percentage == 0) {
            return 0
        } else if (this.percentage == 1) {
            return 1
        } else if (this.percentage == 2) {
            return 2
        } else if (this.percentage == 3) {
            return 3
        } else if (this.percentage == 4) {
            return 4
        } else if (this.percentage >= 5) {
            return 5
        }
    }



    /*setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexCoin()]; //Die returnte Zahl wird zur identifizierung des richtigen Bildes benutzt und in path gelagert.
        this.img = this.imageCache[path]; // Das jewielige Bild wird aus unserem imageCache geladen.
    }


    resolveImageIndexCoin() {
        if (this.percentage == 0) {
            return 0
        } else if (this.percentage == 1) {
            return 1
        } else if (this.percentage == 2) {
            return 2
        } else if (this.percentage == 3) {
            return 3
        } else if (this.percentage == 4) {
            return 4
        } else if (this.percentage == 5) {
            return 5
        }
    }


    setPercentageBoss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexBoss()]; //Die returnte Zahl wird zur identifizierung des richtigen Bildes benutzt und in path gelagert.

        this.img = this.imageCache[path]; //Das jewielige Bild wird aus unserem imageCache geladen.
    }

    resolveImageIndexBoss() {
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
    }*/




}