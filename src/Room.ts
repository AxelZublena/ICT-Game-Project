/// <reference path="View.ts" />

class Room extends View {
	private sensitiveData: string[];
	private nonSensitiveData: string[];

	private doors: Door[];

	private player: Player;

	private nextRoom: boolean;

	private background: HTMLImageElement;
	private backgroundColor: string;

	constructor(canvas: HTMLCanvasElement, isGood: boolean) {
		super(canvas);

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
	}

	public isNextRoomGood = () => {
		for (let i = 0; i < this.doors.length; i++) {
			if (this.doors[i].getIsSensitive() === true && this.doors[i].getIsCrossed()) {
				console.log("Went through door: " + this.doors[i].getIsSensitive() + " : " + this.doors[i].getName());
				return true;
			}
		}
		return false;
	};

	public draw = () => {
		const ctx = this.canvas.getContext("2d");

		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

		this.player.draw(ctx);
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
			// 3 non-sensitive data
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
		if (alreadyUsedValues === [-1]) {
			return Math.floor(Math.random() * (max - min) + min);
		} else {
			let random = Math.floor(Math.random() * (max - min) + min);
			for (let i = 0; i < alreadyUsedValues.length; i++) {
				if (random === alreadyUsedValues[i]) {
					random = Math.floor(Math.random() * (max - min) + min);
				} else {
					return random;
				}
			}
			return random;
		}
	};
}

