class Button{
    private width: number;
    private height: number;
    private xPos: number;
    private yPos: number;
    private color: string;

    public constructor(width: number, height: number, xPos: number, yPos: number, color: string){
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

}