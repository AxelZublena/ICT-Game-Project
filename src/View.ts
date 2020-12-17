abstract class View {

	protected canvas: HTMLCanvasElement;

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	/**
	 * Overidden method
	 * @param ctx 
	 */
	public draw(ctx: CanvasRenderingContext2D) { }

	

	/**
	 * Method to draw a rounded rectangle 
	 * @param ctx 
	 * @param x 
	 * @param y 
	 * @param width 
	 * @param height 
	 * @param radius 
	 * @param color 
	 * @param boderWidth 
	 * @param boderColor 
	 */
	protected roundRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		color: string,
		boderWidth: number,
		boderColor: string
	) => {
		if (width < 2 * radius) radius = width / 2;
		if (height < 2 * radius) radius = height / 2;
		x = x - width / 2;
		y = y - height / 2;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.moveTo(x + radius, y);
		ctx.arcTo(x + width, y, x + width, y + height, radius);
		ctx.arcTo(x + width, y + height, x, y + height, radius);
		ctx.arcTo(x, y + height, x, y, radius);
		ctx.arcTo(x, y, x + width, y, radius);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = boderColor;
		ctx.lineWidth = boderWidth;
		ctx.stroke();
	}

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
