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
            NLButton.style.backgroundColor = "purple";
            ENButton.style.backgroundColor = "white";
        });
        ENButton.addEventListener("click", () => {
            this.language = "english"
            this.createButton("START");
            NLButton.style.backgroundColor = "white";
            ENButton.style.backgroundColor = "purple";
        });

		// load the image/logo
		this.image = this.loadNewImage("./assets/img/hacker.png");
	}

    private createButton = (text: string) => {
        this.startButton = new Button(
            this.canvas,
            this.canvas.width * 0.20,
            this.canvas.height * 0.19,
            this.canvas.width / 2 - (this.canvas.width * 0.19)/2,
            this.canvas.height * 0.77 - (this.canvas.height * 0.19)/2,
            "purple",
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
        if(this.language === "dutch"){
        }
        else{
        }

		// Draw the background color
		ctx.fillStyle = Game.BASE_COLOR;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2) * 0.97,
			this.canvas.height / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height * 0.9,
			this.canvas.height * 0.9
		);
	};

}

