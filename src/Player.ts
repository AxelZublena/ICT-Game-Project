class Player {
	private speed: number;
	private xPos: number;
	private yPos: number;
	private counter: number;
	private i: number;
	private skipFrame: number;
	private image: HTMLImageElement;

	private keyListener: KeyListener;
	private canvas: HTMLCanvasElement;

	private sprites: any[];
	private sprites_left: any[];
	private sprites_right: any[];
	private sprites_downwards: any[];

	constructor(image: string, canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.image = this.loadNewImage(image);
		this.speed = 5;

		this.keyListener = new KeyListener();

		this.sprites = [
			"./assets/img/player/player-0.gif",
			"./assets/img/player/player-1.gif",
			"./assets/img/player/player-2.gif",
			"./assets/img/player/player-3.gif",
			"./assets/img/player/player-4.gif",
			"./assets/img/player/player-5.gif",
		];

		this.sprites_left = [
			"./assets/img/player/left/player-0.gif",
			"./assets/img/player/left/player-1.gif",
			"./assets/img/player/left/player-2.gif",
			"./assets/img/player/left/player-3.gif",
			"./assets/img/player/left/player-4.gif",
			"./assets/img/player/left/player-5.gif",
		];

		this.sprites_right = [
			"./assets/img/player/right/player-0.gif",
			"./assets/img/player/right/player-1.gif",
			"./assets/img/player/right/player-2.gif",
			"./assets/img/player/right/player-3.gif",
			"./assets/img/player/right/player-4.gif",
			"./assets/img/player/right/player-5.gif",
		];

		this.sprites_downwards = [
			"./assets/img/player/downwards/player-0.gif",
			"./assets/img/player/downwards/player-1.gif",
			"./assets/img/player/downwards/player-2.gif",
			"./assets/img/player/downwards/player-3.gif",
			"./assets/img/player/downwards/player-4.gif",
			"./assets/img/player/downwards/player-5.gif",
		];

		this.counter = 0;
		this.i = 0;
		this.skipFrame = 7;
	}

	public draw = (ctx: CanvasRenderingContext2D) => {
		// bottom wall detection
		this.wallDetection();

		this.movement();

		ctx.drawImage(
			this.image,
			this.xPos,
			this.yPos,
			this.image.width,
			this.image.height
		);
	};

	/**
	 * Function for the player to detect the wall and do not move out from the scope
	 */
	private wallDetection() {
		// Down
		if (this.keyListener.isKeyDown(40) || this.keyListener.isKeyDown(83)) {
			if (
				this.yPos + this.image.height < this.canvas.height * 0.89 ||
				(this.xPos > this.canvas.width * 0.33 &&
					this.xPos + this.image.width < this.canvas.width * 0.49)
			) {
				this.yPos += this.speed;
				this.image = this.loadNewImage(
					this.sprites_downwards[this.counter]
				);
			}
		}
		// Up
		if (this.keyListener.isKeyDown(38) || this.keyListener.isKeyDown(87)) {
			if (
				this.yPos > this.canvas.height * 0.18 ||
				(this.xPos > this.canvas.width * 0.41 &&
					this.xPos + this.image.width < this.canvas.width * 0.59)
			) {
				this.yPos -= this.speed;
				this.image = this.loadNewImage(this.sprites[this.counter]);
			}
		}
		// Left
		if (this.keyListener.isKeyDown(37) || this.keyListener.isKeyDown(65)) {
			if (
				this.xPos > this.canvas.width * 0.24 ||
				(this.yPos + this.image.height > this.canvas.height * 0.63 &&
					this.yPos < this.canvas.height * 0.53)
			) {
				this.xPos -= this.speed;
				this.image = this.loadNewImage(this.sprites_left[this.counter]);
			}
		}
		// Right
		if (this.keyListener.isKeyDown(39) || this.keyListener.isKeyDown(68)) {
			if (
				this.xPos + this.image.width < this.canvas.width * 0.76 ||
				(this.yPos + this.image.height > this.canvas.height * 0.5 &&
					this.yPos < this.canvas.height * 0.35)
			) {
				this.xPos += this.speed;
				this.image = this.loadNewImage(
					this.sprites_right[this.counter]
				);
			}
		}
	}

	/**
	 * Iterating the moving images
	 */
	private movement = () => {
		if (
			this.keyListener.isKeyDown(40) ||
			this.keyListener.isKeyDown(38) ||
			this.keyListener.isKeyDown(37) ||
			this.keyListener.isKeyDown(39) ||
			this.keyListener.isKeyDown(83) ||
			this.keyListener.isKeyDown(87) ||
			this.keyListener.isKeyDown(65) ||
			this.keyListener.isKeyDown(68)
		) {
			this.i++;
			if (this.i % this.skipFrame == 0) {
				this.counter = this.i / this.skipFrame;
			}
			if (this.counter == 6) {
				this.counter = 0;
				this.i = 0;
			}
		}
	};

	//Getters
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

    // Setters
	public setPositionX = (xPos: number) => {
        this.xPos = xPos;
	};
	public setPositionY = (yPos: number) => {
        this.yPos = yPos;
	};
    public setImage = (image: string) => {
        this.image.src = image;
    }

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
