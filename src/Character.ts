abstract class Character {
    protected speed: number;
    protected xPos: number;
    protected yPos: number;
    protected counter: number;
    protected i: number;
    protected skipFrame: number;
    protected image: HTMLImageElement;
    protected keyListener: KeyListener;
    protected canvas: HTMLCanvasElement;
    protected sprites: any[];
	protected sprites_left: any[];
	protected sprites_right: any[];
    protected sprites_downwards: any[];
    
    constructor(image: string, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.image = this.loadNewImage(image);
        this.keyListener = new KeyListener();
        this.counter = 0;
		this.i = 0;
		this.skipFrame = 2;
    }

    /**
	 * Load the image of the Player
	 * @param source string
	 */
	protected loadNewImage = (source: string): HTMLImageElement => {
		const img = new Image();
		img.src = source;
		img.width = this.canvas.width * 0.1;
		img.height = img.width;
		return img;
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
	protected setSpeed = (newSpeed: number): void => {
		this.speed = newSpeed;
    };
    
    protected frameCounter = (maxFrames: number) => {
        this.i++;
		if (this.i % this.skipFrame == 0) {
			this.counter = this.i / this.skipFrame;
		}
		if (this.counter == maxFrames) {
			this.counter = 0;
			this.i = 0;
		}
    };

    protected randomNumber = (min: number, max: number) => {
        return Math.round(Math.random() * (max - min) + min);
    };
}