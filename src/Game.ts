class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private startMenu: StartMenu;
	private pauseMenu: Pause;
	private currentView: View;

	public static readonly BASE_COLOR: string = "#00A5DC";

	constructor(canvas: HTMLElement) {
		this.canvas = <HTMLCanvasElement>canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		// create a start menu
        this.startMenu = new StartMenu(this.canvas);


		this.currentView = this.startMenu;
    
        this.step();
    }

	/**
	 * This MUST be an arrow method in order to keep the `this` variable
	 * working correctly. It will be overwritten by another object otherwise
	 * caused by javascript scoping behaviour.
	 */
	step = () => {
        if(this.currentView instanceof StartMenu){
            if(this.currentView.getButton().getClicked()){
                this.currentView.getButton().resetClicked();
                this.currentView.close();
                this.currentView = new Pause(this.canvas); 
            }
        }
		// draw the current view
		this.draw();

		// Call this method again on the next animation frame
		// The user must hit F5 to reload the game
		requestAnimationFrame(this.step);
	};

	/**
	 * Draw on the canvas
	 */
	private draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw the current view
		this.currentView.draw(this.ctx);
	}

}
