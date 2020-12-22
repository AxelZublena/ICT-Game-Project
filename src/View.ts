abstract class View {

	protected canvas: HTMLCanvasElement;

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}
    
	/**
	 * Overidden method
	 * @param ctx 
	 */
	public draw = (ctx: CanvasRenderingContext2D) => { }


	/**
	 * Loads an image in such a way that the screen doesn't constantly flicker
	 * @param {HTMLImageElement} source
	 * @return HTMLImageElement - returns an image
	 */
	protected loadNewImage = (source: string): HTMLImageElement => {
		const img = new Image();
		img.src = source;
		return img;
	}

	/**
	 * Writes text to the canvas
	 * @param {string} text - Text to write
	 * @param {number} fontSize - Font size in pixels
	 * @param {number} xCoordinate - Horizontal coordinate in pixels
	 * @param {number} yCoordinate - Vertical coordinate in pixels
	 * @param {string} alignment - Where to align the text
	 * @param {string} color - The color of the text
	 */
	protected writeTextToCanvas = (
		ctx: CanvasRenderingContext2D,
		text: string,
		fontSize: number = 20,
		xCoordinate: number,
		yCoordinate: number,
		alignment: CanvasTextAlign = "center",
		color: string = "red"
	) => {
		ctx.font = `${fontSize}px Minecraft`;
		ctx.fillStyle = color;
		ctx.textAlign = alignment;
		ctx.fillText(text, xCoordinate, yCoordinate);

	}
}
