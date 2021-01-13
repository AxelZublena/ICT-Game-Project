/// <reference path="View.ts" />

class Room extends View {
	private sensitiveDataObjects: Array<any>;
	private nonSensitiveDataObjects: Array<any>;

	private doors: Door[]; // array to contain 4 doors for the room

	private player: Player;
	private enemies: Enemy[];
	private isGood: boolean;

	private nextRoom: boolean; // true if the next room should be loaded

	private background: HTMLImageElement;
	private lastBackgroundIndex: number;

	constructor(
		canvas: HTMLCanvasElement,
		isGood: boolean,
		playerSpawnPosition: string
	) {
		super(canvas);

		this.background = this.loadRandomBackground();
		this.lastBackgroundIndex = 0;

		this.isGood = isGood;

		this.sensitiveDataObjects = [
			{
				name: "Username + Password",
				explaination:
					"If somebody knows your username and password, they can log in to your gaming account 🎮 and delete your favorite games or sell everything 💸 you have collected so far. You don’t want that, do you? ☹",
			},
			{
				name: "Home address",
				explaination:
					"If somebody knows your address, they can stalk you. 👀 Google will give them a picture of your house 🏠 or apartment and the directions ↩️ to get there. It is just weird, so you should keep it for yourself.",
			},
			{
				name: "Bank card details",
				explaination:
					"You took a picture of your brand new bank card 💳 the last afternoon to show your friends that you are a grown-up person and can have your own card. You wake up the next morning, and all your money is gone 💸. You ignored covering the numbers on the card while taking that picture ☹ Maybe you should stick with cash 💰 for a while.",
			},
			{
				name: "Picture of you",
				explaination:
					"If you don’t want to see yourself randomly appearing on the internet, don’t send away this one. Some smartphones 📱 can be unlocked by face identification, and if somebody stoles a picture of your face...well, it can be a problem later on.",
			},
			{
				name: "Bills",
				explaination:
					"There are many information on bills: your address, full name and maybe some bank details too. It is just too much information! Pay attention when you take some random pictures at your home 🏠; check 👀 if there are no bills in the background! There are people out there who got into trouble by sending photographs, including their bills.",
			},
			{
				name: "Medical pills you take",
				explaination:
					"This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
			},
			{
				name: "History from your illnesses",
				explaination:
					"This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
			},
			{
				name: "Your fingerprint",
				explaination:
					"Your fingerprint 👈 is unique so that you can be identified by it. Therefore it is considered sensitive 🔒. Just think about that: you can use it to unlock your phone 📱.",
			},
			{
				name: "Political opinions",
				explaination:
					"Unfortunately, there are some places where other people or even companies can discriminate you based on your political views. Therefore the European Union considers this information private. Sometimes it is not wise to share it with strangers 🔒.",
			},
			{
				name: "Alarm system’s passcode",
				explaination:
					"Sometimes you share this code with trusted people, but in general, it is just for you and for your family to protect your house 🏠 🔒. Never use it anywhere else, and do not use it as a password!",
			},
			{
				name: "Photo about your holiday",
				explaination:
					"Housebreakers 😒 usually browse social media searching for “holiday-pictures.” This usually means that the family left the house, and it is empty to be robbed more easily 🏠 🔓.",
			},
			{
				name: "Your birth date",
				explaination:
					"It is considered sensitive because you can be identified by it more easily: many times, when you call someone who needs to authorize you, you will need to give your birthdate to them. Do not give it to anyone else. It is not wise to provide it for Facebook or Instagram and set it to public. Never use it as your password ⛔! It can be easily guessed.",
			},
			{
				name: "Your ID number",
				explaination:
					"It is considered sensitive because it is unique and only identifies you. Never share it on social media ⛔!",
			},
		];
		this.nonSensitiveDataObjects = [
			{
				name: "Favorite Color ",
				explaination: "",
			},
			{
				name: "Nationality ",
				explaination: "",
			},
			{
				name: "Username",
				explaination: "",
			},
			{
				name: "Favorite Food",
				explaination: "",
			},
			{
				name: "Email address",
				explaination: "",
			},
			{
				name: "Your phone’s manufacturer",
				explaination: "",
			},
			{
				name: "A picture of your clothes",
				explaination: "",
			},
			{
				name: "Picture about your cat ",
				explaination: "",
			},
			{
				name: "Your favorite game ",
				explaination: "",
			},
			{
				name: "Your best friend",
				explaination: "",
			},
			{
				name: "Religion",
				explaination: "",
			},
		];

		this.player = new Player(
			"./assets/img/player/survivor-move_knife_0.png",
			this.canvas
		);

		// Player spawn position
		switch (playerSpawnPosition) {
			case "center":
				this.player.setPositionX(
					canvas.width / 2 - this.player.getWidth() / 2
				);
				this.player.setPositionY(
					canvas.height / 2 - this.player.getHeight() / 2
				);
				break;
			case "bottom":
				this.player.setPositionX(canvas.width * 0.36);
				this.player.setPositionY(canvas.height * 0.68);
				break;
			case "top":
				this.player.setPositionX(canvas.width * 0.45);
				this.player.setPositionY(canvas.height * 0.2);
				this.player.setImage(
					"./assets/img/player/downwards/survivor-move_knife_0.png"
				);
				break;
			case "left":
				this.player.setPositionX(canvas.width * 0.24);
				this.player.setPositionY(canvas.height * 0.45);
				this.player.setImage("./assets/img/player/right/survivor-move_knife_0.png");
				break;
			case "right":
				this.player.setPositionX(canvas.width * 0.67);
				this.player.setPositionY(canvas.height * 0.32);
				this.player.setImage("./assets/img/player/left/survivor-move_knife_0.png");
				break;
		}
		this.enemies = [
			new Enemy('./assets/img/enemy/skeleton-move_0.png', this.canvas),
			new Enemy(
				'./assets/img/enemy/skeleton-move_0.png', this.canvas
			),
		];

		this.doors = [];
		this.generateDoors();

		this.nextRoom = false;

		this.canvas.addEventListener("mousedown", (event) => {
			console.log("x: " + event.clientX + " AND y: " + event.clientY);
		});
	}

	/**
	 * Spawn enemies
	 */
	private spawnEnemies = (ctx: CanvasRenderingContext2D) => {
		this.enemies.forEach((enemy) => {
			const sAngle = 0;
			const eAngle = 2 * Math.PI;

			// draw each enemy from the ball array
			enemy.draw(ctx);
		});
	};

	/**
	 * Determines if the next room will be hostile based on the crossed door
	 */
	public isNextRoomGood = () => {
		for (let i = 0; i < this.doors.length; i++) {
			if (
				this.doors[i].getIsSensitive() === false &&
				this.doors[i].getIsCrossed()
			) {
				console.log(
					this.doors[i].getName() +
						" : " +
						this.doors[i].getExplaination()
				);
				return {
					isGood: true,
					data: this.doors[i].getData(),
					position: this.doors[i].getPosition(),
				};
			}
			if (this.doors[i].getIsCrossed()) {
				return {
					isGood: false,
					data: this.doors[i].getData(),
					position: this.doors[i].getPosition(),
				};
			}
		}

		return { isGood: false, data: null, position: null };
	};

	/**
	 *  Function to draw the room
	 */
	public draw = () => {
		const ctx = this.canvas.getContext("2d");

		ctx.drawImage(
			this.background,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);

		this.player.draw(ctx);

		this.doors.forEach((door) => {
			door.draw(
				ctx,
				this.player.getPositionX(),
				this.player.getPositionY(),
				this.player.getWidth(),
				this.player.getHeight()
			);
			if (door.getIsCrossed() === true) {
				this.nextRoom = true;
			}
		});
		if (this.isGood == false) {
			this.spawnEnemies(ctx);
		}
	};

	public getNextRoom = () => {
		return this.nextRoom;
	};

	public getEnemies = () => {
		return this.enemies;
	};

	public getPlayer = () => {
		return this.player;
	};

	// Load a random background
	private loadRandomBackground = (): HTMLImageElement => {
		let random = this.random(0, 5);
		let src: string = "./assets/img/background";
		if (random === this.lastBackgroundIndex) {
			random++;
		}

		if (random === 1 || random === 5) {
			src += "0.jpg";
		} else if (random === 2) {
			src += "1.jpg";
		} else if (random === 3) {
			src += "2.jpg";
		} else if (random === 4) {
			src += "3.jpg";
		} else {
			src += "2.jpg";
		}
		return this.loadNewImage(src, this.canvas.width, this.canvas.height);
	};

	/**
	 * Complete utterly garbage method but I couldn't do better.
	 * Use random number to create 4 doors (top, right, bottom, left).
	 * 1 sensitive data for 3 non-sensitive data.
	 * (The requirement above is the reason why the method is a mess)
	 * (+ my code formatter is not the best)
	 */
	private generateDoors = () => {
		let onlyOneNonSensitiveData: boolean = false;
		let alreadyUsedValues: number[] = [];
		for (let i = 0; i < 4; i++) {
			const position = ["top", "right", "bottom", "left"];

			// 1 non sensitive datum
			if (
				this.random(1, 5) % 2 === 0 &&
				onlyOneNonSensitiveData === false
			) {
				onlyOneNonSensitiveData = true;

				this.doors.push(
					new Door(
						this.nonSensitiveDataObjects[
							this.random(
								0,
								this.nonSensitiveDataObjects.length,
								alreadyUsedValues
							)
						],
						position[i],
						false,
						false,
						this.canvas
					)
				);
			} else {
				// make sure there is at least one sensitive data
				if (i === 3 && onlyOneNonSensitiveData === false) {
					this.doors.push(
						new Door(
							this.nonSensitiveDataObjects[
								this.random(
									0,
									this.nonSensitiveDataObjects.length,
									alreadyUsedValues
								)
							],
							position[i],
							false,
							false,
							this.canvas
						)
					);
				} else {
					const index = this.random(
						0,
						this.nonSensitiveDataObjects.length,
						alreadyUsedValues
					);

					alreadyUsedValues.push(index);

					this.doors.push(
						new Door(
							this.sensitiveDataObjects[index],
							position[i],
							true,
							false,
							this.canvas
						)
					);
				}
			}
		}
	};

	/**
	 * The returned value is no lower than (and may possibly equal) min,
	 * and is less than (and not equal) max.
	 */
	private random = (
		min: number,
		max: number,
		alreadyUsedValues: number[] = [-1]
	) => {
		if (alreadyUsedValues[0] === -1) {
			return Math.floor(Math.random() * (max - min) + min);
		} else if (alreadyUsedValues.length > 0) {
			let random = Math.floor(Math.random() * (max - min) + min);
			for (let i = 0; i < alreadyUsedValues.length; i++) {
				if (random === alreadyUsedValues[i]) {
					random = Math.floor(Math.random() * (max - min) + min);
					if (random !== alreadyUsedValues[i]) {
						return random;
					}
				}
			}
			return random;
		} else {
			return Math.floor(Math.random() * (max - min) + min);
		}
	};
}
