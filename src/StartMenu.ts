/// <reference path="View.ts" />

class StartMenu extends View {
	private startButton: Button;
    private language: string;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);

        this.language = "dutch";
        this.createButton("BEGIN");

        const NLButton = document.getElementById("NLStart");
        const ENButton = document.getElementById("ENStart");

        NLButton.addEventListener("click", () => {
            this.language = "dutch"
            this.createButton("BEGIN");
            NLButton.style.backgroundColor = "dodgerblue";
            ENButton.style.backgroundColor = "white";
        });
        ENButton.addEventListener("click", () => {
            this.language = "english"
            this.createButton("START");
            NLButton.style.backgroundColor = "white";
            ENButton.style.backgroundColor = "dodgerblue";
        });

		// load the image/logo
		this.image = this.loadNewImage("./assets/img/bg.jpg");
	}

    private createButton = (text: string) => {
        this.startButton = new Button(
            this.canvas,
            this.canvas.width * 0.20,
            this.canvas.height * 0.19,
            this.canvas.width / 2 - (this.canvas.width * 0.19)/2,
            this.canvas.height * 0.77 - (this.canvas.height * 0.19)/2,
            "dodgerblue",
            text
        );
    }

    public getLanguage = () => {
        return this.language;
    }

	/**
	 * Method to get the button's information
	 */
	public getButton = () => {
		return this.startButton;
	};

	/**
	 * Method to draw the start menu on the canvas
	 * @param {CanvasRenderingContext2D} ctx
	 */
	public draw = (ctx: CanvasRenderingContext2D) => {

		// Draw the background color
		ctx.fillStyle = Game.BASE_COLOR;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";

		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - this.image.width / 2,
            this.canvas.height / 2 - this.image.height / 2,
        );
        ctx.font = 'bold 150px Turret Road';
        ctx.textAlign = 'center'

        ctx.shadowBlur = 20;
        ctx.shadowColor = "purple";

        ctx.fillText('Agent Steve', this.canvas.width / 2, this.canvas.height * 0.53);
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";

        ctx.font = '30px Turret Road'
        
        if (this.language == 'english') { 
            ctx.fillText('MOVEMENT', this.canvas.width * 0.15, this.canvas.height * 0.7)
        } else {
            ctx.fillText('BESTURING', this.canvas.width * 0.15, this.canvas.height * 0.7);
        }
        ctx.drawImage(
            this.loadNewImage('./assets/img/wasd.png'),
			this.canvas.width * 0.085,
            this.canvas.height * 0.75,
            this.canvas.width/7.68,
            this.canvas.height/6.43
        );
	};

}

