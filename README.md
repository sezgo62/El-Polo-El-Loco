
-Einen Ramen um das Objekt herum bauen: 

drawFrame(ctx) { // Funktion dient dazu dass wir einen Ramen um das jeweilige Objekt bauen womit wir beser die Kolision berechnen können.
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof TreasureObjects) { //Mit instanceof können wir wählen welches Objekt den Ramen bekommen soll.
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }