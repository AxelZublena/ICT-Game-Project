class Enemy {
    private speed: number;
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;

    private canvas: HTMLCanvasElement;

    constructor(image: string, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.image = this.loadNewImage(image);
        this.speed = 5;

        this.xPos = canvas.width / 2 - this.image.width / 2;
        this.yPos = canvas.height / 2 - this.image.height / 2;
    }

    /**
     * Draws the enemies during each frame
     * @param ctx
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        this.wallDetection();

        ctx.drawImage(this.image, this.xPos, this.yPos, this.image.width, this.image.height);
    };

    /**
     * Set the speed of the enemies
     * @param newSpeed number
     */
    public setSpeed = (newSpeed: number): void => {
        this.speed = newSpeed;
    };

    /**
     * Load the image of the enemies
     * @param source string
     */
    private loadNewImage = (source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        img.width = this.canvas.width * 0.1;
        img.height = img.width;
        return img;
    };

    /**
     * Function for the enemies to detect the wall and do not move out from the scope
     */
    private wallDetection() {
        if (this.yPos < this.canvas.height - this.image.height) {
            this.yPos += this.speed;
        }

        if (this.yPos > 0) {
            this.yPos -= this.speed;
        }
        if (this.xPos > 0) {
            this.xPos -= this.speed;
        }
        if (this.xPos < this.canvas.width - this.image.width) {
            this.xPos += this.speed;
        }
    }

    // getters and setters
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
}
