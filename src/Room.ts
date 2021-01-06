/// <reference path="View.ts" />

class Room extends View {
	private sensitiveData: string[]; // array to contain the sensitive words
	private nonSensitiveData: string[]; // array to contain the non-sensitive words

	private doors: Door[]; // array to contain 4 doors for the room

	private player: Player;

	private nextRoom: boolean; // true if the next room should be loaded

	private background: HTMLImageElement;
	private backgroundColor: string;

	constructor(canvas: HTMLCanvasElement, isGood: boolean) {
		super(canvas);

        this.background = this.loadNewImage("./assets/img/background.jpg", this.canvas.width, this.canvas.height);

		isGood === true
			? (this.backgroundColor = "green")
			: (this.backgroundColor = "red");

		this.sensitiveData = [
			"Login credentials",
			"Home address",
			"Card number",
			"Name",
			"Picture",
		];
		this.nonSensitiveData = [
			"Favorite color",
			"Nationality",
			"Username",
			"Favorite food",
			"Religion",
		];

		this.player = new Player("./assets/img/player/player-0.gif", this.canvas);

		this.doors = [];
		this.generateDoors();

		this.nextRoom = false;

        this.canvas.addEventListener("mousedown", (event) => {
            console.log("x: " + event.clientX + " AND y: " + event.clientY);
        });
	}

	/**
	 * Determines if the next room will be hostile based on the crossed door
	 */
	public isNextRoomGood = () => {
		for (let i = 0; i < this.doors.length; i++) {
			if (this.doors[i].getIsSensitive() === true && this.doors[i].getIsCrossed()) {
				console.log("Went through door: " + this.doors[i].getIsSensitive() + " : " + this.doors[i].getName());
				return true;
			}
		}
		return false;
	};

	/**
	 *  Function to draw the room
	 */
	public draw = () => {
		const ctx = this.canvas.getContext("2d");

		//ctx.fillStyle = this.backgroundColor;
		//ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        //this.canvas.width/2 - this.background.width/2

        ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

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

	};

	public getNextRoom = () => {
		return this.nextRoom;
	};

	/**
	 * Complete utterly garbage method but I couldn't do better.
	 * Use random number to create 4 doors (top, right, bottom, left).
	 * 1 sensitive data for 3 non-sensitive data.
	 * (The requirement above is the reason why the method is a mess)
	 * (+ my code formatter is not the best)
	 */
	private generateDoors = () => {
		let onlyOneSensitiveData: boolean = false;
		let alreadyUsedValues: number[] = [];
		for (let i = 0; i < 4; i++) {
			const position = ["top", "right", "bottom", "left"];

			// 1 sensitive datum
			if (this.random(1, 5) % 2 === 0 && onlyOneSensitiveData === false) {
				onlyOneSensitiveData = true;

				this.doors.push(
					new Door(
						this.sensitiveData[
							this.random(
								0,
								this.sensitiveData.length,
								alreadyUsedValues
							)
						],
						position[i],
						true,
						false,
						this.canvas
					)
				);
			}
			else {
				// make sure there is at least one sensitive data
				if (i === 3 && onlyOneSensitiveData === false) {
					this.doors.push(
						new Door(
							this.sensitiveData[
								this.random(
									0,
									this.sensitiveData.length,
									alreadyUsedValues
								)
							],
							position[i],
							true,
							false,
							this.canvas
						)
					);
				} else {
					const index = this.random(
						0,
						this.nonSensitiveData.length,
						alreadyUsedValues
					);

					alreadyUsedValues.push(index);

					this.doors.push(
						new Door(
							this.nonSensitiveData[index],
							position[i],
							false,
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
		} else if (alreadyUsedValues.length > 0){
			let random = Math.floor(Math.random() * (max - min) + min);
			for (let i = 0; i < alreadyUsedValues.length; i++) {
				if (random === alreadyUsedValues[i]) {
					random = Math.floor(Math.random() * (max - min) + min);
                    if(random !== alreadyUsedValues[i]){
                        return random;
                    }
				}
            }
			return random;
		}
        else{
			return Math.floor(Math.random() * (max - min) + min);
        }
	};
}

