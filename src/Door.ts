class Door {
    private canvas: HTMLCanvasElement;

    private name: string;
    
	private positionX: number;
    private positionY: number;
    private position: string;
    private width: number;
    private height: number;

	private isSensitive: boolean;
    private isCrossed: boolean;

    
    

	constructor(
		name: string,
		position: string,
		isSensitive: boolean,
        isCrossed: boolean,
        canvas: HTMLCanvasElement,
	) {
        this.name = name;
        this.position = position;

		this.isSensitive = isSensitive;
        this.isCrossed = isCrossed;
        this.canvas = canvas;

        if(position === "bottom"){
            this.positionX = canvas.width/2;
            this.positionY = canvas.height;
        }
        if(position === "top"){
            this.positionX = canvas.width/2;
            this.positionY = 0;
        }
        if(position === "left"){
            this.positionX = 0;
            this.positionY = canvas.height/2;
        }
        if(position === "right"){
            this.positionX = canvas.width;
            this.positionY = canvas.height/2;
        }
    }
    
    public draw = (ctx: CanvasRenderingContext2D, playerXPos: number, playerYPos: number) => {
        ctx.beginPath();
        if(this.position === "bottom"){
            this.width = this.canvas.width * 0.20;
            this.height = this.canvas.height * 0.05;
            ctx.rect(this.positionX - this.width/2, this.positionY - this.height, this.width, this.height);
        }
        if(this.position === "top"){
            this.width = this.canvas.width * 0.20;
            this.height = this.canvas.height * 0.05;
            ctx.rect(this.positionX- this.width/2, this.positionY, this.width, this.height);
        }
        if(this.position === "left"){
            this.width = this.canvas.height * 0.05;
            this.height = this.canvas.width * 0.20;
            ctx.rect(this.positionX, this.positionY - this.height/2, this.width, this.height);
        }
        if(this.position === "right"){
            this.width = this.canvas.height * 0.05;
            this.height = this.canvas.width * 0.20;
            ctx.rect(this.positionX - this.width, this.positionY - this.height/2, this.width, this.height);
        }

        // TODO
        if(this.playerCollidesWithDoor(playerXPos, playerXPos)){
            this.isCrossed = true;
        }
        
        ctx.stroke();
    }

    // TODO
    private playerCollidesWithDoor = (playerXPos: number, playerYPos: number): boolean => {
        if(playerXPos > this.positionX - this.width && playerXPos < this.width){
            console.log("in the x coordinate");
            return true;
        }
        return false;
    }

	public getName = () => {
		return this.name;
    }
    public getIsSensitive = () => {
		return this.isSensitive;
    }
    public getIsCrossed = () => {
		return this.isCrossed;
    }
    
}
