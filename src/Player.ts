class Player {
    private speed: number;
    private xPos: number;
    private yPos: number;
    private counter: number;
    private i: number;
    private image: HTMLImageElement;

    private keyListener: KeyListener;
    private canvas: HTMLCanvasElement;

    private sprites: any[]

	constructor(image: string, canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.image = this.loadNewImage(image);
        this.speed = 15;		

		this.keyListener = new KeyListener();
		
		this.xPos = canvas.width / 2 - this.image.width / 2;
        this.yPos = canvas.height / 2 - this.image.height / 2;

        this.sprites = ['./assets/img/player/player-0.gif', './assets/img/player/player-1.gif', './assets/img/player/player-2.gif', './assets/img/player/player-3.gif', './assets/img/player/player-4.gif', './assets/img/player/player-5.gif']
        
        this.counter = 0;
        this.i = 0;
	}

	public draw = (ctx: CanvasRenderingContext2D) => {

		// bottom wall detection
		if (this.keyListener.isKeyDown(40) && this.yPos < this.canvas.height - this.image.height) {
            this.yPos += this.speed;
            this.image = this.loadNewImage(this.sprites[this.counter]);
		}

		if (this.keyListener.isKeyDown(38) && this.yPos > 0) {
            this.yPos -= this.speed;
            this.image = this.loadNewImage(this.sprites[this.counter]);
		}
		if (this.keyListener.isKeyDown(37) && this.xPos > 0) {
            this.xPos -= this.speed;
            this.image = this.loadNewImage(this.sprites[this.counter]);
		}
		if (
			this.keyListener.isKeyDown(39) &&
			this.xPos < this.canvas.width - this.image.width
		) {
            this.xPos += this.speed;
            this.image = this.loadNewImage(this.sprites[this.counter]);
		}

		ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width,
			this.image.height
        );
        
        if (this.keyListener.isKeyDown(40) || this.keyListener.isKeyDown(38) || this.keyListener.isKeyDown(37) || this.keyListener.isKeyDown(39)) {
            this.i += 2;
            if (this.i % 2 == 0) {

            }
            if (this.counter == 6) {
                this.counter = 0;
            }
        };
	};

	public getPositionX = () => {
		return this.xPos;
	};
	public getPositionY = () => {
		return this.yPos;
	};
	public getWidth = () => {
		return this.image.width;
	};
	public getHeight = () => {
		return this.image.height;
	};

    /**
     * Set the speed of the player
     * @param newSpeed number
     */
    public setSpeed = (newSpeed: number): void => {
        this.speed = newSpeed;
    };

	/**
	 * Load the image of the Player
	 * @param source string
	 */
	private loadNewImage = (source: string): HTMLImageElement => {
		const img = new Image();
		img.src = source;
		img.width = this.canvas.width * 0.1;
		img.height = img.width;
		return img;
	};
}
