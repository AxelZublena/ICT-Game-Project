/// <reference path="View.ts" />

class Room extends View {

    private door0: Door;
    private door1: Door
    private door2: Door
    private door3: Door

    private doors: Door[];

    private player: Player;

    private nextRoom: boolean;
    
    private background: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement){
        super(canvas);
        
        this.player = new Player(this.canvas);

        this.doors = [];

        this.doors.push(new Door("Bank", "bottom", true, false, this.canvas));
        this.doors.push(new Door("Dog", "left", false, false, this.canvas));
        this.doors.push(new Door("Food", "top", false, false, this.canvas));
        this.doors.push(new Door("Home Adress", "right", true, false, this.canvas));
        
        this.nextRoom = false;
    }

    public draw = () => {
        const ctx = this.canvas.getContext("2d");

        this.doors.forEach(door => {
            door.draw(ctx, this.player.getPositionX(), this.player.getPositionY());
            if(door.getIsCrossed() === true){
                this.nextRoom = true;
            }
        });
        
        this.player.draw(ctx);

        // this.door0.draw(ctx);
        // this.door1.draw(ctx);
        // this.door2.draw(ctx);
        // this.door3.draw(ctx);

        // for(let i = 0; i < this.doors.length; i++){
        //     if(this.doors[i].getIsCrossed() === true){
        //         this.nextRoom = true;
        //     }
        // }
    }

    public getNextRoom = () => {
        return this.nextRoom;
    }
}