class Game {

	private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

	private startMenu: StartMenu;
    private randomView: View;
    private currentView: View;

    public static readonly BASE_COLOR: string = "#00A5DC";

	constructor(canvas: HTMLElement) {
		this.canvas = <HTMLCanvasElement>canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        // create a start menu
		this.startMenu = new StartMenu(this.canvas, Game.BASE_COLOR);
        // event listener to handle mouse actions;
        this.mouseHandling();

        // randomView to test the start menu
        this.randomView = new Pause(this.canvas);

        this.currentView = this.startMenu;

		requestAnimationFrame(this.step);
	}

	/**
	 * This MUST be an arrow method in order to keep the `this` variable
	 * working correctly. It will be overwritten by another object otherwise
	 * caused by javascript scoping behaviour.
	 */
	step = () => {
        // draw the current view
        this.draw();

		// Call this method again on the next animation frame
		// The user must hit F5 to reload the game
		requestAnimationFrame(this.step);
	};

    /**
	 * Draw on the canvas
	 */
    private draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the current view
		this.currentView.draw(this.ctx);
    }

    /**
	 * Handle the mouse's events (only works for the start menu, but can and will be updated)
	 * 
	 */
    private mouseHandling(){
		this.canvas.addEventListener("mousemove", (event) => {
			if (this.startMenu.isOnButton(event, this.startMenu.getButton())) {
                this.startMenu.setButtonColor("grey");
				document.getElementById("canvas").style.cursor = "pointer";
			} else {
                this.startMenu.setButtonColor(Game.BASE_COLOR);
				document.getElementById("canvas").style.cursor = "default";
			}
		});
		this.canvas.addEventListener("mousedown", (event) => {
			if (this.startMenu.isOnButton(event, this.startMenu.getButton())) {
                this.currentView = this.randomView;
				console.log("Start the game!");
			} else {
				console.log("Don't start the game.");
			}
		});
    }
}

