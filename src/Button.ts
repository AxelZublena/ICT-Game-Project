class Button {
	private width: number;
	private height: number;
	private xPos: number;
	private yPos: number;
	private color: string;
    private text: string;

	private canvas: HTMLCanvasElement;

    private clicked: boolean;

	public constructor(
		canvas: HTMLCanvasElement,
		width: number,
		height: number,
		xPos: number,
		yPos: number,
		color: string,
        text: string
	) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.xPos = xPos;
		this.yPos = yPos;
		this.color = color;
        this.clicked = false;
        this.text = text;

		this.canvas.style.position = "absolute";

		const body = document.querySelector("body");
		body.style.position = "relative";

		const button = document.createElement("button");

		button.style.backgroundColor = this.color;
        button.style.borderRadius = "20px";
        button.style.borderWidth = "6px";
        button.style.borderStyle = "solid";
        button.style.borderColor = "white";

		button.style.position = "absolute";
		button.style.width = this.width.toString() + "px";
		button.style.height = this.height.toString() + "px";
		button.style.zIndex = "10";
		button.style.left = this.xPos.toString() + "px";
		button.style.top = this.yPos.toString() + "px";

        button.innerText = this.text;
        button.style.fontSize = "250%";
        button.style.color = "white";

		button.addEventListener("click", () => {
			console.log("Start the game!");
            this.clicked = true;
            button.remove();
		});
        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = "grey";
            button.style.cursor = "pointer";
        });
        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = this.color;
        });

		body.append(button);
	}



	public getClicked = () => {
		return this.clicked;
	};
	public resetClicked = () => {
		this.clicked = false;
	};

	public getWidth = () => {
		return this.width;
	};

	public getHeight = () => {
		return this.height;
	};

	public getXPos = () => {
		return this.xPos;
	};

	public getYPos = () => {
		return this.yPos;
	};

	public getColor = () => {
		return this.color;
	};

	public setWidth = (width: number) => {
		this.width = width;
	};

	public setHeight = (height: number) => {
		this.height = height;
	};

	public setXPos = (xPos: number) => {
		this.xPos = xPos;
	};

	public setYPos = (yPos: number) => {
		this.yPos = yPos;
	};

	public setColor = (color: string) => {
		this.color = color;
	};

}
