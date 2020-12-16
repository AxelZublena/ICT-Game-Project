/// <reference path="View.ts" />

class Pause extends View{
    
    private buttons: Button[]
	private continueButton: Button;
	private backButton: Button;
	private image: HTMLImageElement;
	
	public constructor(canvas: HTMLCanvasElement, buttonColor: string){
        super(canvas);
        this.buttons = [];
        this.continueButton = new Button(this.canvas.width * 0.28,this.canvas.height * 0.09,this.canvas.width / 2,this.canvas.height * 0.7,"purple");
		this.backButton = new Button(this.canvas.width * 0.28,this.canvas.height * 0.09,this.canvas.width / 2,this.canvas.height * 0.85,"purple")
        this.buttons.push(this.continueButton);
        this.buttons.push(this.backButton);
		
		// load the image/logo
		this.image = this.loadNewImage("/assets/img/hacker.png");
    }
    
    
    
   /**
	 * Method to get the button's information
	 */
	public getButtons() {
		return [this.continueButton, this.backButton];
	}


	public draw(ctx: CanvasRenderingContext2D){


        this.mouseHandling();
		// Draw the background color
		ctx.fillStyle = "purple";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		
		
		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2),
			this.canvas.height / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height * 0.9,
			this.canvas.height * 0.9
		);
			
	    // Draws a round rectangle
	    this.roundRect(
	    ctx,
	    this.continueButton.getxPos(),
	    this.continueButton.getyPos(),
	    this.continueButton.getWidth(),
	    this.continueButton.getHeight(),
	    20,
	    this.continueButton.getColor(),
	    8,
	    "white"
	    );
	 			
	    this.roundRect(
	    ctx,
	    this.backButton.getxPos(),
	    this.backButton.getyPos(),
	    this.backButton.getWidth(),
	    this.backButton.getHeight(),
	    20,
	    this.backButton.getColor(),
	    8,
	    "white"
	    );
		 			
	    // Write text in the button
	    this.writeTextToCanvas(
	    ctx,
	    "CONTINUE",
	    this.canvas.width * 0.03,
	    this.canvas.width * 0.5,
	    this.canvas.height * 0.722,
	    "center",
	    "white"
	    );
	 					
	    // Write text in the button
	    this.writeTextToCanvas(
	    ctx,
	    "BACK TO MENU",
	    this.canvas.width * 0.03,
	    this.canvas.width * 0.5,
	    this.canvas.height * 0.87,
	    "center",
	    "white"
        );
        
         // TODO
   
         
							
    }
    
    private mouseHandling(){

        this.buttons.forEach(button => {
            this.canvas.addEventListener("mousemove", (event) => {
                if (this.isOnButton(event, button)) {
                    button.setColor("grey");
                    document.getElementById("canvas").style.cursor = "pointer";
                } else {
                    button.setColor("purple");
                    document.getElementById("canvas").style.cursor = "default";
                }
            });
        });

		
		/* this.canvas.addEventListener("mousedown", (event) => {
			if (this.isOnButton(event, this.startMenu.getButton())) {
                this.currentView = this.randomView;
				console.log("Start the game!");
			} else {
				console.log("Don't start the game.");
			}
		}); */
    }

}
					