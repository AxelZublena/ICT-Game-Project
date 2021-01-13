class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private startMenu: StartMenu;
	private currentView: View;
	private prevView: string;
	private keyboard: KeyListener;

	private goodRoomCounter: number;
	private failedRoomCounter: Array<any>;

	private stop: boolean;
	private howBool: boolean;

	// "dutch" or "english"
	private language: string;

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
        document.getElementById("NLENSwitchStart").style.visibility = "visible";

		this.currentView = this.startMenu;

		this.goodRoomCounter = 0;
		this.failedRoomCounter = [];
		this.stop = false;
		this.howBool = true;

        // set the game's language
		this.language = "dutch";

		this.step();
	}

	/**
	 * This MUST be an arrow method in order to keep the `this` variable
	 * working correctly. It will be overwritten by another object otherwise
	 * caused by javascript scoping behaviour.
	 */
	step = () => {
		this.stop = false;

		//console.log(this.stop);

		// Handle the start menu button
		this.handlers();

		// draw the current view
		this.draw();

		// Call this method again on the next animation frame
		// The user must hit F5 to reload the game
		if (!this.stop) {
			requestAnimationFrame(this.step);
		}
	};

	/**
	 * Draw on the canvas
	 */
	private draw = () => {
		if (this.currentView instanceof Room) {
			// how to play at the launch of the game
			if (this.howBool) {
				// set the language
				if (this.language === "dutch") {
					document.getElementById("htpNL").style.visibility =
						"visible";
					const letsGoNL = document.getElementById("letsGoNL");
					letsGoNL.addEventListener("click", () => {
						document.getElementById("htpNL").style.visibility =
							"hidden";

						this.canvas.style.webkitFilter = "blur(0px)";
					});
				} else {
					document.getElementById("htpEN").style.visibility =
						"visible";
					const letsGoNL = document.getElementById("letsGoEN");
					letsGoNL.addEventListener("click", () => {
						document.getElementById("htpEN").style.visibility =
							"hidden";

						this.canvas.style.webkitFilter = "blur(0px)";
					});
				}
				//document.getElementById("details").innerHTML = ``;
				this.canvas.style.webkitFilter = "blur(10px)";

				this.howBool = false;
			}
			if (this.currentView.getNextRoom()) {
				const data = this.currentView.isNextRoomGood();

				let position = "center";
				switch (data.position) {
					case "bottom":
						position = "top";
						break;
					case "top":
						position = "bottom";
						break;
					case "left":
						position = "right";
						break;
					case "right":
						position = "left";
						break;
					default:
						position = "center";
						break;
				}

				// Player went through a non sensitive door
				if (data.isGood === true) {
					this.goodRoomCounter++;
					if (this.goodRoomCounter === 5) {
                        // set the language
                        if(this.language === "dutch"){
                            this.currentView = new End(
                                this.canvas,
                                "Gefeliciteerd! Nu ben je slim genoeg om te weten welke informatie je voor anderen geheim moet houden.",
                                "green",
                                "dutch"
                            );
                        }
                        else{
                            this.currentView = new End(
                                this.canvas,
                                "Congratulations! Now you are smart enough to know which information you have to keep secret from others.",
                                "green",
                                "english"
                            );
                        }
						this.goodRoomCounter = 0;
					} else {
						this.currentView = new Room(
							this.canvas,
							true,
							position,
							this.language
						);
					}
				}
				// Player went through a sensitive door
				else if (data.isGood === false) {
					this.stop = true;
					console.log(data.data.name);
					document.getElementById("info").style.visibility =
						"visible";
					document.getElementById("name").innerText = data.data.name;
					document.getElementById("explaination").innerText =
						data.data.explaination;
					this.canvas.style.webkitFilter = "blur(10px)";

					const button = document.getElementById("understoodBtn") as HTMLInputElement;

                    // set the language
                    if(this.language === "dutch"){
                        button.value = "Begrepen";
                    }
                    else{
                        button.value = "Understood";
                    }

					button.addEventListener("click", () => {
						document.getElementById("info").style.visibility =
							"hidden";

						this.failedRoomCounter.push(data.data);
						this.canvas.style.webkitFilter = "blur(0px)";

						this.currentView = new Room(
							this.canvas,
							false,
							position,
							this.language
						);
						if (this.stop) {
							this.step();
						}
					});
				}
			}
		}

		// Detects if player was hit
		if (this.currentView instanceof Room) {
			const player = this.currentView.getPlayer();

			this.currentView.getEnemies().forEach((enemy) => {
				if (enemy.collidesWithPlayer(enemy, player)) {
                    if(this.language === "dutch"){
                        this.currentView = new End(
                            this.canvas,
                            `Helaas, je hebt ${this.goodRoomCounter}/5 vragen goed. Probeer het opnieuw!`,
                            "red",
                            "dutch"
                        );
                    }
                    else {
                        this.currentView = new End(
                            this.canvas,
                            `You lost, you answered ${this.goodRoomCounter}/5 questions right on your quest. Try again!`,
                            "red",
                            "english"
                        );
                    }
					this.goodRoomCounter = 0;
				}
			});
		}

		// Draw the current view
		this.currentView.draw(this.ctx);

		// Draw the level number
		this.ctx.font = "30px Arial";
		this.ctx.fillStyle = "white";
		this.ctx.textAlign = "right";
		if (this.currentView instanceof Room) {
			this.ctx.fillText(
				`${this.goodRoomCounter + 1}/5 LEVEL`,
				this.canvas.width - 50,
				50
			);
		}
	};

	/**
	 * Handles the start menu
	 * Sets the current view to Levelmap
	 */
	private startMenuHandler = () => {
		if (this.currentView instanceof StartMenu) {
			this.prevView = "start";
			if (this.currentView.getButton().getClicked()) {
				document.querySelectorAll("button").forEach((button) => {
					button.remove();
				});
                // determine the selected language
                document.getElementById("NLENSwitchStart").style.visibility = "hidden";
                this.language = this.currentView.getLanguage();
				this.currentView = new Room(
					this.canvas,
					true,
					"center",
					this.language
				);
			}
		}
	};

	/**
	 * Handles the pause menu on the push of the ESC key
	 */
	private pauseMenuHandler = () => {
		if (this.keyboard.isKeyDown(27)) {
			this.stop = true;
			document.getElementById("pause").style.visibility = "visible";
            
			this.canvas.style.webkitFilter = "blur(10px)";

			const continueBtn = document.getElementById("continueBtn") as HTMLInputElement;
			const backBtn = document.getElementById("backBtn") as HTMLInputElement;

            // set the language
            if(this.language === "dutch"){
                continueBtn.value = "Doorgaan";
                backBtn.value = "Terug naar begin scherm";
                document.getElementById("pauseTitle").innerText = "Pauze";
            }
            else{
                continueBtn.value = "Continue";
                backBtn.value = "Back to menu";
                document.getElementById("pauseTitle").innerText = "Pause";
            }

			continueBtn.addEventListener("click", () => {
				if (this.stop) {
					this.step();
				}
				document.getElementById("pause").style.visibility = "hidden";

				this.canvas.style.webkitFilter = "blur(0px)";
			});

			backBtn.addEventListener("click", () => {
				if (this.stop) {
					this.step();
				}
				document.getElementById("pause").style.visibility = "hidden";
				this.canvas.style.webkitFilter = "blur(0px)";

                document.getElementById("NLENSwitchStart").style.visibility = "visible";
				this.currentView = new StartMenu(this.canvas);
			});
		}
	};

	/**
	 * Handles the finish and on the push of the button gets you back to the start menu
	 */
	private endHandler = () => {
		if (this.currentView instanceof End) {
			if (this.currentView.getButton().getClicked()) {
				document.querySelectorAll("button").forEach((button) => {
					button.remove();
				});
				this.failedRoomCounter = [];

                document.getElementById("NLENSwitchStart").style.visibility = "visible";
				this.currentView = new StartMenu(this.canvas);
			}
		}
	};

	/**
	 * Calling all the handlers in the step method
	 */
	private handlers() {
		// Start menu handler
		this.startMenuHandler();

		// Pause menu handler
		this.pauseMenuHandler();

		// End handler
		this.endHandler();
	}
}
