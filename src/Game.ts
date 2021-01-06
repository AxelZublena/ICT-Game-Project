class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private startMenu: StartMenu;
	private pauseMenu: Pause;
	private currentView: View;
	private prevView: string;
	private keyboard: KeyListener;

	private goodRoomCounter: number;
	private failedRoomCounter: Array<any>;

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

		this.goodRoomCounter = 0;
		this.failedRoomCounter = [];
    
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

		// Finish handler
		this.finishHandler();

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
		//this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if(this.currentView instanceof Room){
			if(this.currentView.getNextRoom()){
				const data = this.currentView.isNextRoomGood();
				// Player went through a non sensitive door
                if(data.isGood === true){
                    this.goodRoomCounter++;
                    if(this.goodRoomCounter === 5){
                        this.currentView = new Finish(this.canvas);
                    }
                    else{
                        this.currentView = new Room(this.canvas, true);
                    }
				}
				// Player went through a sensitive door
                else if(data.isGood === false){
					console.log(data.data.name);
					document.getElementById("info").style.visibility = "visible";
					document.getElementById("name").innerText = data.data.name;
					document.getElementById("explaination").innerText = data.data.explaination;
					this.canvas.style.webkitFilter = "blur(10px)";
					
					const button = document.getElementById("understoodBtn");
					button.addEventListener("click", () => {
						document.getElementById("info").style.visibility = "hidden";

						this.failedRoomCounter.push(data.data);
						this.canvas.style.webkitFilter = "blur(0px)";
						

						this.currentView = new Room(this.canvas, false);
						
					});
                }
			}
		}
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
				this.currentView = new Room(this.canvas, true);
			}
		}
	}

	/**
	 * Handles the continue button in the pause menu
	 * TODO: later when the levelmap will be dynamic, the last frame before hitting the escape will be stored to an empty view and it is going to load that back
	 */
	private continueHandler = () => {
		if (this.currentView instanceof Pause) {
			if (this.currentView.getContinueButton().getClicked()) {
				document.querySelectorAll('button').forEach(button => {
					button.remove();
				});
				if (this.prevView == 'start') {
					this.currentView = new StartMenu(this.canvas);
				} else if (this.prevView == 'map') {
					// this.currentView = new LevelMap(this.canvas);
				}
			}
		}
	}

	/**
	 * Handles the back button in the pause menu
	 */
	private backHandler = () => {
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
	private pauseMenuHandler = () => {
		if (this.keyboard.isKeyDown(27)) {
			document.querySelectorAll('button').forEach(button => {
				button.remove();
			});
			this.currentView = new Pause(this.canvas);
			
		}
	}

	/**
	 * Handles the finish and on the push of the button gets you back to the start menu
	 */
	private finishHandler = () => {
		if (this.currentView instanceof Finish) {
			if (this.currentView.getButton().getClicked()) {
				document.querySelectorAll('button').forEach(button => {
					button.remove();
				});
				this.failedRoomCounter = [];
				this.currentView = new StartMenu(this.canvas);
			}
		}
	}
}
