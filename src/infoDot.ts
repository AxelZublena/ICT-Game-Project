class Infodot extends View{

    private posX: number;
    private posY: number;
    private playerPosX: number;
    private playerPosY: number;
    private playerWidth: number;
    private playerHeight: number;
    private data: string;
    private position: string; // the position of the dot (left,right,bottom,top)
    private touched: boolean;

    public constructor(canvas: HTMLCanvasElement,position: string, data:string){
        super(canvas);
        this.position = position;
        this.positioning();
        this.data = data;
        this.image = this.loadNewImage("./assets/img/infoButton.png");
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        
        

        ctx.drawImage(
			this.image,
			this.posX,
            this.posY,
            this.canvas.width /50 * 1.8,
            this.canvas.height /30 * 1.8
        );

        
        this.isTouched();
        
        
    }

    private positioning(){

        switch(this.position) { 
            case "bottom": { 
                this.posX = this.canvas.width *0.39;
                this.posY = this.canvas.height *0.75; 
                
               break; 
            } 
            case "top": { 
                this.posX = this.canvas.width *0.48;
                this.posY = this.canvas.height *0.28; 
               break; 
            } 
            case "left": { 
                this.posX = this.canvas.width *0.3;
                this.posY = this.canvas.height *0.5; 
                break; 
            } 
            case "right": { 
                this.posX = this.canvas.width *0.675;
                this.posY = this.canvas.height *0.4; 
                break; 
            } 
            default: { 
               alert("ERROR WHILE POSITIONING INFO-DOTS!"); 
               break; 
            } 
         } 

        
    }


    private isTouched(){

        if ((Math.abs((this.playerPosX + (this.playerWidth / 2)) - (this.posX + ( (this.canvas.width /50 * 1.8)/2))) < 30) && (Math.abs((this.playerPosY + (this.playerHeight / 2)) - (this.posY + ( (this.canvas.height /30 * 1.8)/2))) < 30))  {
           // console.log(this.playerPosX + (this.playerWidth / 2),this.posX + ( (this.canvas.width /50 * 1.8)/2),this.playerPosY + (this.playerHeight / 2),this.posY + ((this.canvas.height /30 * 1.8) / 2));

           if (this.position == "top") {
            document.getElementById("desTop").style.visibility = "visible";
            document.getElementById("desh1Top").innerText = this.data;
           }
           if (this.position == "bottom") {
            document.getElementById("desBottom").style.visibility = "visible";
            document.getElementById("desh1Bottom").innerText = this.data;
           }
           if (this.position == "left") {
            document.getElementById("desLeft").style.visibility = "visible";
            document.getElementById("desh1Left").innerText = this.data;
           }
           if (this.position == "right") {
            document.getElementById("desRight").style.visibility = "visible";
            document.getElementById("desh1Right").innerText = this.data;
           }

           console.log();


        } else{
             
            if (this.position == "top") {
                document.getElementById("desTop").style.visibility = "hidden";  
            }
            if (this.position == "bottom") {
                document.getElementById("desBottom").style.visibility = "hidden";  
            }
            if (this.position == "left") {
                document.getElementById("desLeft").style.visibility = "hidden";  
            }
            if (this.position == "right") {
                document.getElementById("desRight").style.visibility = "hidden";  
            }
       
        }
       
    };

    public setPlayerPosition(playerXPos: number, playerYPos: number, playerWidth: number, playerHeight: number){
        this.playerPosX = playerXPos;
        this.playerPosY = playerYPos;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
	}

}