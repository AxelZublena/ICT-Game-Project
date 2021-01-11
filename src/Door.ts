class Door {
	private canvas: HTMLCanvasElement;

	private data: any;

	private infoDot: Infodot;

	private positionX: number;
	private positionY: number;
	private position: string; // the position of the door in the screen (left,right,top,bottom)
	private width: number;
	private height: number;

	private isSensitive: boolean; // The door contains sensitive data
	private isCrossed: boolean; // The player has touched the door

	constructor(
		data: object,
		position: string,
		isSensitive: boolean,
		isCrossed: boolean,
		canvas: HTMLCanvasElement
	) {
		this.data = data;
		this.position = position;
		this.isSensitive = isSensitive;
		this.isCrossed = isCrossed;
		this.canvas = canvas;
		this.infoDot = new Infodot(this.canvas,this.position,this.data.name);

		this.doorPositioner(position, canvas);
	}

	/**
	 * Function to draw the doors and detect collision with the player
	 * @param ctx
	 * @param playerXPos
	 * @param playerYPos
	 * @param playerWidth
	 * @param playerHeight
	 */
	public draw = (
		ctx: CanvasRenderingContext2D,
		playerXPos: number,
		playerYPos: number,
		playerWidth: number,
		playerHeight: number
	) => {
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		const fontSize = this.canvas.width * 0.01;
		ctx.font = fontSize + "px Arial";

		ctx.beginPath();

		if (this.position === "bottom") {
			this.width = this.canvas.width * 0.2;
			this.height = this.canvas.height * 0.05;
			// KEEP TO SEE THE DETECTION ZONE
			//ctx.rect(
			//this.positionX - this.width / 2,
			//this.positionY - this.height,
			//this.width,
			//this.height
			//);
			ctx.stroke();

			const words: string[] = this.data.name.split(" ");

			let i = 0;
			for (let j = 1; j < words.length; j++) {
				i += fontSize;
			}

			words.forEach((word: string) => {
				ctx.fillText(
					word,
					this.canvas.width * 0.41,
					this.canvas.height * 0.95 - i
				);
				i -= fontSize;
			});

			
		}
		if (this.position === "top") {
			this.width = this.canvas.width * 0.2;
			this.height = this.canvas.height * 0.05;
			// KEEP TO SEE THE DETECTION ZONE
			//ctx.rect(
			//this.positionX - this.width / 2,
			//this.positionY,
			//this.width,
			//this.height
			//);
			ctx.stroke();

			const words: string[] = this.data.name.split(" ").reverse();

			let wordCount = words.length;
			let i = 0;
			for (let j = 1; j < words.length; j++) {
				i += fontSize;
			}

			words.forEach((word: string) => {
				ctx.fillText(
					word,
					this.canvas.width * 0.5,
					this.canvas.height * 0.05 + i
				);
				i -= fontSize;
			});
		}
		if (this.position === "left") {
			this.width = this.canvas.height * 0.05;
			this.height = this.canvas.width * 0.2;
			// KEEP TO SEE THE DETECTION ZONE
			//ctx.rect(
			//this.positionX,
			//this.positionY - this.height / 2,
			//this.width,
			//this.height
			//);
			ctx.stroke();

			const words: string[] = this.data.name.split(" ");

			let i = 0;
			for (let j = 1; j < words.length; j++) {
				i += fontSize;
			}

			words.forEach((word: string) => {
				ctx.fillText(
					word,
					this.canvas.width * 0.12,
					this.canvas.height * 0.545 - i
				);
				i -= fontSize;
			});
		}
		if (this.position === "right") {
			this.width = this.canvas.height * 0.05;
			this.height = this.canvas.width * 0.2;
			// KEEP TO SEE THE DETECTION ZONE
			//ctx.rect(
			//this.positionX,
			//this.positionY - this.height / 2,
			//this.width,
			//this.height
			//);
			ctx.stroke();

			const words: string[] = this.data.name.split(" ");

			let i = 0;
			for (let j = 1; j < words.length; j++) {
				i += fontSize;
			}

			words.forEach((word: string) => {
				ctx.fillText(
					word,
					this.canvas.width * 0.88,
					this.canvas.height * 0.425 - i
				);
				i -= fontSize;
			});
		}

		
		this.infoDot.setPlayerPosition(playerXPos,playerYPos,playerWidth,playerHeight);
		this.infoDot.draw(ctx);

		// Checking if it the door has an overlap with the player
		if (
			this.playerCollidesWithDoor(
				playerXPos,
				playerYPos,
				playerWidth,
				playerHeight
			)
		) {
			console.log(this.isSensitive + " " + this.data.name);
			this.isCrossed = true;
		}
	};

	/**
	 * Function to determine if there is an overlap between the player and the door
	 * @param playerXPos
	 * @param playerYPos
	 * @param playerWidth
	 * @param playerHeight
	 */
	private playerCollidesWithDoor = (
		playerXPos: number,
		playerYPos: number,
		playerWidth: number,
		playerHeight: number
	): boolean => {
		if (this.position === "bottom") {
			const playerYPosBottomRight = playerYPos + playerHeight;
			if (
				playerXPos > this.positionX - this.width &&
				playerXPos < this.positionX + this.width / 2 &&
				playerYPosBottomRight > this.positionY - this.height
			) {
				return true;
			}
		}

		if (this.position === "top") {
			if (
				playerXPos > this.positionX - this.width &&
				playerXPos < this.positionX + this.width / 2 &&
				playerYPos < this.positionY + this.height
			) {
				return true;
			}
		}

		if (this.position === "left") {
			if (
				playerXPos < this.positionX + this.width &&
				playerYPos > this.positionY - this.height &&
				playerYPos < this.positionY + this.height / 2
			) {
				return true;
			}
		}
		if (this.position === "right") {
			const playerXPosBottomRight = playerXPos + playerWidth;

			if (
				playerXPosBottomRight > this.positionX - this.width &&
				playerYPos > this.positionY - this.height &&
				playerYPos < this.positionY + this.height / 2
			) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Determines the default position of the door
	 * @param position defines the position of the door
	 * @param canvas
	 */
	private doorPositioner(position: string, canvas: HTMLCanvasElement) {
		if (position === "bottom") {
			this.positionX = canvas.width * 0.41;
			this.positionY = canvas.height * 0.97;
		}
		if (position === "top") {
			this.positionX = canvas.width * 0.5;
			this.positionY = canvas.height * 0.11;
		}
		if (position === "left") {
			this.positionX = canvas.width * 0.18;
			this.positionY = canvas.height / 2;
		}
		if (position === "right") {
			this.positionX = canvas.width * 0.8;
			this.positionY = canvas.height * 0.37;
		}
	}

	// getters and setters

	public getXPosition = () => {
		return this.positionX;
	};
	public getYPosition = () => {
		return this.positionY;
	};
	public getPosition = () => {
		return this.position;
	};
	public getWidth = () => {
		return this.width;
	};
	public getHeight = () => {
		return this.height;
	};

	public getName = () => {
		return this.data.name;
	};
	public getExplaination = () => {
		return this.data.explaination;
	};
	public getData = () => {
		return this.data;
	};

	public getIsSensitive = () => {
		return this.isSensitive;
	};
	public getIsCrossed = () => {
		return this.isCrossed;
	};
}
