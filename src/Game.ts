class Game {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = 1000;
        this.canvas.height = 1000;
    }

}