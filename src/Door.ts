class Door {
	private canvas: HTMLCanvasElement;

	private name: string;

	private positionX: number;
	private positionY: number;
	private position: string; // the position of the door in the screen (left,right,top,bottom)
	private width: number;
	private height: number;

	private isSensitive: boolean; // The door contains sensitive data
	private isCrossed: boolean; // The player has touched the door

	constructor(
		name: string,
		position: string,
		isSensitive: boolean,
		isCrossed: boolean,
		canvas: HTMLCanvasElement
	) {
		this.name = name;
		this.position = position;
		this.isSensitive = isSensitive;
		this.isCrossed = isCrossed;
		this.canvas = canvas;

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

		// Determine the door's position and draw the door
		ctx.beginPath();
		this.determineDoorPosition(ctx);
		ctx.stroke();

		// Checking if it the door has an overlap with the player
		if (
			this.playerCollidesWithDoor(
				playerXPos,
				playerYPos,
				playerWidth,
				playerHeight
			)
		) {
            console.log(this.isSensitive + " " + this.name);
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
                playerXPos < this.positionX + this.width/2 &&
                playerYPosBottomRight > this.positionY - this.height
			) {
				return true;
            }
        }
        
		if (this.position === "top") {
			if (
				playerXPos > this.positionX - this.width &&
                playerXPos < this.positionX + this.width/2 &&
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
	 * Function to determine the door's position and draw it
	 * @param ctx 
	 */
	private determineDoorPosition(ctx: CanvasRenderingContext2D) {
		if (this.position === "bottom") {
			this.width = this.canvas.width * 0.2;
			this.height = this.canvas.height * 0.05;
			ctx.rect(
				this.positionX - this.width / 2,
				this.positionY - this.height,
				this.width,
				this.height
			);
		}
		if (this.position === "top") {
			this.width = this.canvas.width * 0.2;
			this.height = this.canvas.height * 0.05;
			ctx.rect(
				this.positionX - this.width / 2,
				this.positionY,
				this.width,
				this.height
			);
		}
		if (this.position === "left") {
			this.width = this.canvas.height * 0.05;
			this.height = this.canvas.width * 0.2;
			ctx.rect(
				this.positionX,
				this.positionY - this.height / 2,
				this.width,
				this.height
			);
		}
		if (this.position === "right") {
			this.width = this.canvas.height * 0.05;
			this.height = this.canvas.width * 0.2;
			ctx.rect(
				this.canvas.width - this.width,
				this.positionY - this.height / 2,
				this.width,
				this.height
			);
		}
	}

	/**
	 * Determines the default position of the door
	 * @param position defines the position of the door
	 * @param canvas 
	 */
	private doorPositioner(position: string, canvas: HTMLCanvasElement) {
		if (position === "bottom") {
			this.positionX = canvas.width / 2;
			this.positionY = canvas.height;
		}
		if (position === "top") {
			this.positionX = canvas.width / 2;
			this.positionY = 0;
		}
		if (position === "left") {
			this.positionX = 0;
			this.positionY = canvas.height / 2;
		}
		if (position === "right") {
			this.positionX = canvas.width;
			this.positionY = canvas.height / 2;
		}
	}

	// getters and setters

	public getXPosition = () => {
		return this.positionX;
	};
	public getYPosition = () => {
		return this.positionY;
	};
	public getWidth = () => {
		return this.width;
	};
	public getHeight = () => {
		return this.height;
	};

	public getName = () => {
		return this.name;
	};
	public getIsSensitive = () => {
		return this.isSensitive;
	};
	public getIsCrossed = () => {
		return this.isCrossed;
	};

}
