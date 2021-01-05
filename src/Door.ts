class Door {
	private canvas: HTMLCanvasElement;

	private name: string;

	private positionX: number;
	private positionY: number;
	private position: string;
	private width: number;
	private height: number;

	private isSensitive: boolean;
	private isCrossed: boolean;

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

	public draw = (
		ctx: CanvasRenderingContext2D,
		playerXPos: number,
		playerYPos: number,
		playerWidth: number,
		playerHeight: number
	) => {
		ctx.beginPath();
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

		ctx.stroke();

		// TODO
		if (
			this.playerCollidesWithDoor(
				playerXPos,
				playerYPos,
				playerWidth,
				playerHeight
			)
		) {
			this.isCrossed = true;
		}
	};

	// TODO
	private playerCollidesWithDoor = (
		playerXPos: number,
		playerYPos: number,
		playerWidth: number,
		playerHeight: number
	): boolean => {
		// if(playerXPos > this.positionX && playerXPos < this.positionX + this.width){
		//     console.log(this.position + " detected");
		//     //return true;
		// }
		// return false;

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
            
            console.log(this.positionY - this.width/2 + " AND " + playerXPosBottomRight);

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
