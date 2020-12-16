class Player {

    private name: string;
    private speed: number;
    private xPos: number;
    private yPos: number;
    private image: HTMLImageElement;

    constructor(name: string, image: string) {
        this.image = this.loadNewImage(image);
        this.name = name;
        this.speed = 5;
    }

    /**
     * Get the name of the player
     */
    public getName = (): string => {
        return this.name;
    }

    /**
     * Set the speed of the player
     * @param newSpeed number
     */
    public setSpeed = (newSpeed: number): void => {
        this.speed = newSpeed;
    }

    /**
     * Load the image of the Player
     * @param source string
     */
    private loadNewImage = (source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        return img;
    }
}