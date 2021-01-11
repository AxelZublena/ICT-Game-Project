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
}