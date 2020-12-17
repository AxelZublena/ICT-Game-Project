class Button{
    private width: number;
    private height: number;
    private xPos: number;
    private yPos: number;
    private color: string;
    private canvas: HTMLCanvasElement;

    public constructor(canvs: HTMLCanvasElement ,width: number, height: number, xPos: number, yPos: number, color: string){
        this.canvas = canvs;
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public getWidth(){
        return this.width;
    }

    public getHeight(){
        return this.height;
    }

    public getxPos(){
        return this.xPos;
    }

    public getyPos(){
        return this.yPos;
    }

    public getColor(){
        return this.color;
    }

    public setWidth(width: number){
        this.width = width;
    }

    public setHeight(height: number){
        this.height = height;
    }

    public setxPos(xPos: number){
        this.xPos = xPos;
    }

    public setyPos(yPos: number){
        this.yPos = yPos;
    }

    public setColor(color: string){
        this.color = color;
    }

    public mouseHandling(){

        
        this.canvas.addEventListener("mousemove", (event) => {
            if (this.isOnButton(event)) {
                this.setColor("grey");
                document.getElementById("canvas").style.cursor = "pointer";
            } else {
                this.setColor("purple");
                document.getElementById("canvas").style.cursor = "default";
            }
        })
        
    }


    /**
	 * Checks if the mouse is on the button
	 * @param event 
	 * @param buttonInfo 
	 */
	public isOnButton = (event: MouseEvent): boolean => {
		if (
			event.x > this.canvas.width / 2 - this.width / 2 &&
			event.x < this.canvas.width / 2 + this.width / 2 &&
			event.y > this.canvas.height / 2 + this.height &&
			event.y < this.canvas.height / 2 + this.height * 2
		) {
			return true;
		}
		return false;
	}

}