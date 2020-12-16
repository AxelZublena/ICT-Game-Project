/// <reference path="View.ts" />

class Pause extends View{
	
	private continueButton: any;
	private backButton: any;
	private buttonColor: string;
	private image: HTMLImageElement;
	
	public constructor(canvas: HTMLCanvasElement, buttonColor: string){
		super(canvas);
		
		// empty continueButton
		this.continueButton = {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		};
		
		// empty backButton
		this.backButton = {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		};
		
		// set the color of the button
		this.buttonColor = buttonColor;
		
		// load the image/logo
		this.image = this.loadNewImage("/assets/img/hacker.png");
    }
    
    /**
	 * Method to set the button's color
	 * @param {string} color
	 */
	public setButtonColor(color: string) {
		this.buttonColor = color;
    }
    
   

	public draw(ctx: CanvasRenderingContext2D){
		// Draw the background color
		ctx.fillStyle = "purple";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		// Gets the button's information in an object for isOnButton()
		this.continueButton.width = this.canvas.width * 0.28;
		this.continueButton.height = this.canvas.height * 0.09;
		this.continueButton.x = this.canvas.width / 2;
		this.continueButton.y = this.canvas.height * 0.7;
		
		// Gets the button's information in an object for isOnButton()
		this.backButton.width = this.canvas.width * 0.28;
		this.backButton.height = this.canvas.height * 0.09;
		this.backButton.x = this.canvas.width / 2;
		this.backButton.y = this.canvas.height * 0.85;
		
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
	    this.continueButton.x,
	    this.continueButton.y,
	    this.continueButton.width,
	    this.continueButton.height,
	    20,
	    this.buttonColor,
	    8,
	    "white"
	    );
	 			
	    this.roundRect(
	    ctx,
	    this.backButton.x,
	    this.backButton.y,
	    this.backButton.width,
	    this.backButton.height,
	    20,
	    this.buttonColor,
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
							
	}
}
					