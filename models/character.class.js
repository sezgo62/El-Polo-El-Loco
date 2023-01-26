class Character extends MovableObject {

    height = 350;
    width = 170;
    x = 120;
    y = 110; //y = 115;
   world;
    speed = 3;
    IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
];

IMAGES_JUMPING = [
  'img/2_character_pepe/3_jump/J-31.png',
  'img/2_character_pepe/3_jump/J-32.png',
  'img/2_character_pepe/3_jump/J-33.png',
  'img/2_character_pepe/3_jump/J-34.png',
  'img/2_character_pepe/3_jump/J-35.png',
  'img/2_character_pepe/3_jump/J-36.png',
  'img/2_character_pepe/3_jump/J-37.png',
  'img/2_character_pepe/3_jump/J-38.png',
  'img/2_character_pepe/3_jump/J-39.png',
    
];

IMAGES_DYING = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
];

IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
];




currentImage = 0;
walking_sound = new Audio('audio/running.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png'); 
          this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        }


        animate() {

            setInterval(() => {
                this.walking_sound.pause();
                if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { //Wenn die rechte Pfeiltaste gedrückt wird,
                    this.moveRight();
                    this.walking_sound.play();
                }

                if(this.world.keyboard.LEFT && this.x > 0) {//Wenn die linke Pfeiltaste gedrückt wird,
                   this.moveLeft();
                    this.walking_sound.play();
                }
                
                if(this.world.keyboard.SPACE && !this.isAboveGround()) { //Wenn die SPACE Taste betätigt wurde und der Charakter nicht über dem Boden ist.
                    this.jump();   
                }

                this.world.camera_x = -this.x + 100;
            }, 1000 / 60);

            setInterval(() => {


                
                if(this.isDead()) {
                    this.playAnimation(this.IMAGES_DYING);
                } else if(this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if(this.isAboveGround()) { // Wird ausgeführt wenn der Charakter sich über der Luft befindet.
                    this.playAnimation(this.IMAGES_JUMPING);
                }
                

                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        }
    

}