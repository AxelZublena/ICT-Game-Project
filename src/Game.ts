class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private startMenu: StartMenu;
	private pauseMenu: Pause;
    private level: View; 
	private currentView: View;
	private prevView: string;
	private keyboard: KeyListener;

	public static readonly BASE_COLOR: string = "#00A5DC";

	constructor(canvas: HTMLElement) {
		this.canvas = <HTMLCanvasElement>canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext("2d");

		// create keyboard listener
		this.keyboard = new KeyListener();

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
        // Handle the start menu button
        this.startMenuHandler();

		// Handle pause menu
		this.pauseMenuHandler();

		// Back handler
		this.backHandler();

		// Continue handler
		this.continueHandler();

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

	/**
	 * Handles the start menu
	 * Sets the current view to Levelmap
	 */
	private startMenuHandler = () => {
		if (this.currentView instanceof StartMenu) {
			this.prevView = 'start';
			if (this.currentView.getButton().getClicked()) {
				document.querySelectorAll('button').forEach(button => {
					button.remove();
				});
				this.currentView = new LevelMap(this.canvas);
				this.prevView = 'map';
			}
		}
	}

	/**
	 * Handles the continue button in the pause menu
	 * TODO: later when the levelmap will be dynamic, the last frame before hitting the escape will be stored to an empty view and it is going to load that back
	 */
	private continueHandler() {
		if (this.currentView instanceof Pause) {
			if (this.currentView.getContinueButton().getClicked()) {
				document.querySelectorAll('button').forEach(button => {
					button.remove();
				});
				if (this.prevView == 'start') {
					this.currentView = new StartMenu(this.canvas);
				} else if (this.prevView == 'map') {
					this.currentView = new LevelMap(this.canvas);
				}
			}
		}
	}

	/**
	 * Handles the back button in the pause menu
	 */
	private backHandler() {
		if (this.currentView instanceof Pause) {
			if (this.currentView.getBackButton().getClicked()) {
				document.querySelectorAll('button').forEach(button => {
					button.remove();
				});
				this.currentView = new StartMenu(this.canvas);
			}
		}
	}

	/**
	 * Handles the pause menu on the push of the ESC key
	 */
	private pauseMenuHandler() {
		if (this.keyboard.isKeyDown(27)) {
			document.querySelectorAll('button').forEach(button => {
				button.remove();
			});
			this.currentView = new Pause(this.canvas);
			
		}
	}
}
