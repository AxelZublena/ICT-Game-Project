class Player {
    private canvas: HTMLCanvasElement;
    private name: string;
    private speed: number;
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;

    constructor(canvas: HTMLCanvasElement, name: string, image: string) {
        this.canvas = canvas;
        // this.image = this.loadNewImage(image);
        this.image = this.loadNewImage("https://img.icons8.com/plasticine/2x/arrow.png");
        this.name = name;
        this.speed = 5;
    }

    public movement = () => {};

    /**
     * Get the name of the player
     */
    public getName = (): string => {
        return this.name;
    };

    /**
     * Set the speed of the player
     * @param newSpeed number
     */
    public setSpeed = (newSpeed: number): void => {
        this.speed = newSpeed;
    };
    /**
     * Draw the player
     * @param ctx
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        // Draws the image/logo
        ctx.drawImage(
            this.image,
            this.canvas.width / 2,
            this.canvas.height / 2
            // this.canvas.height * 0.9,
            // this.canvas.height * 0.9
        );
    };

    /**
     * Load the image of the Player
     * @param source string
     */
    private loadNewImage = (source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        return img;
    };
}
