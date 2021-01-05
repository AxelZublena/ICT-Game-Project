class Player {
    private speed: number;
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;

    private keyListener: KeyListener;
    private canvas: HTMLCanvasElement;

    private sprite: ["./assets/img/player.png", "./assets/img/arrow.png"];
    private newImage: string;

    constructor(canvas: HTMLCanvasElement) {
        // "./assets/img/player.png"
        this.image = this.loadNewImage(this.newImage);
        this.speed = 5;
        this.image.width = 100;
        this.image.height = 100;

        this.keyListener = new KeyListener();
        this.canvas = canvas;
        this.xPos = canvas.width / 2 - this.image.width / 2;
        this.yPos = canvas.height / 2 - this.image.height / 2;
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        const playerWidth = this.canvas.width * 0.05;
        const playerHeight = this.canvas.width * 0.05;

        if (this.keyListener.isKeyDown(40) && this.yPos < this.canvas.height - playerHeight) {
            this.yPos += this.speed;
        }
        if (this.keyListener.isKeyDown(38) && this.yPos > 0) {
            this.yPos -= this.speed;
        }
        if (this.keyListener.isKeyDown(37) && this.xPos > 0) {
            this.xPos -= this.speed;
        }
        if (this.keyListener.isKeyDown(39) && this.xPos < this.canvas.width - playerWidth) {
            this.xPos += this.speed;
        }

        ctx.drawImage(this.image, this.xPos, this.yPos, playerWidth, playerHeight);
    };

    /**
     * Get the player x position
     */
    public getPositionX = () => {
        return this.xPos;
    };

    /**
     * Get the player y postion
     */
    public getPositionY = () => {
        return this.yPos;
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
        return img;
    };
}
