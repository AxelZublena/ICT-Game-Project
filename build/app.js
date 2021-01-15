let areImgLoaded = false;
window.addEventListener("load", () => {
    while (true) {
        if (areImgLoaded === true) {
            const game = new Game(document.getElementById("canvas"));
            break;
        }
    }
    console.log("loading done.");
});
function loadImages() {
    let images = new Array();
    const baseURL = "./assets/img/";
    const character = ["player/", "enemy/"];
    const folder = ["", "downwards/", "left/", "right/"];
    const name = ["survivor-move_knife_", "skeleton-move_"];
    let paths = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            let limit;
            if (character[i] === "player/") {
                limit = 20;
            }
            else {
                limit = 17;
            }
            for (let h = 0; h < limit; h++) {
                paths.push(baseURL + character[i] + folder[j] + name[i] + h + ".png");
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        paths.push(baseURL + "background" + i + ".jpg");
    }
    for (let i = 0; i < paths.length; i++) {
        images[i] = new Image();
        images[i].src = paths[i];
    }
    areImgLoaded = true;
}
loadImages();
class Button {
    constructor(canvas, width, height, xPos, yPos, color, text) {
        this.getClicked = () => {
            return this.clicked;
        };
        this.resetClicked = () => {
            this.clicked = false;
        };
        this.getWidth = () => {
            return this.width;
        };
        this.getHeight = () => {
            return this.height;
        };
        this.getXPos = () => {
            return this.xPos;
        };
        this.getYPos = () => {
            return this.yPos;
        };
        this.getColor = () => {
            return this.color;
        };
        this.setWidth = (width) => {
            this.width = width;
        };
        this.setHeight = (height) => {
            this.height = height;
        };
        this.setXPos = (xPos) => {
            this.xPos = xPos;
        };
        this.setYPos = (yPos) => {
            this.yPos = yPos;
        };
        this.setColor = (color) => {
            this.color = color;
        };
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
}
class Character {
    constructor(image, canvas) {
        this.loadNewImage = (source) => {
            const img = new Image();
            img.src = source;
            img.width = this.canvas.width * 0.1;
            img.height = img.width;
            return img;
        };
        this.getPositionX = () => {
            return this.xPos;
        };
        this.getPositionY = () => {
            return this.yPos;
        };
        this.getWidth = () => {
            return this.image.width;
        };
        this.getHeight = () => {
            return this.image.height;
        };
        this.setPositionX = (xPos) => {
            this.xPos = xPos;
        };
        this.setPositionY = (yPos) => {
            this.yPos = yPos;
        };
        this.setImage = (image) => {
            this.image.src = image;
        };
        this.setSpeed = (newSpeed) => {
            this.speed = newSpeed;
        };
        this.frameCounter = (maxFrames) => {
            this.i++;
            if (this.i % this.skipFrame == 0) {
                this.counter = this.i / this.skipFrame;
            }
            if (this.counter == maxFrames) {
                this.counter = 0;
                this.i = 0;
            }
        };
        this.randomNumber = (min, max) => {
            return Math.round(Math.random() * (max - min) + min);
        };
        this.canvas = canvas;
        this.image = this.loadNewImage(image);
        this.keyListener = new KeyListener();
        this.counter = 0;
        this.i = 0;
        this.skipFrame = 2;
    }
}
class Door {
    constructor(data, position, isSensitive, isCrossed, canvas) {
        this.draw = (ctx, playerXPos, playerYPos, playerWidth, playerHeight) => {
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            const fontSize = this.canvas.width * 0.01;
            ctx.font = fontSize + "px Arial";
            ctx.beginPath();
            if (this.position === "bottom") {
                this.width = this.canvas.width * 0.2;
                this.height = this.canvas.height * 0.05;
                ctx.stroke();
                const words = this.data.name.split(" ");
                let i = 0;
                for (let j = 1; j < words.length; j++) {
                    i += fontSize;
                }
                words.forEach((word) => {
                    ctx.fillText(word, this.canvas.width * 0.41, this.canvas.height * 0.95 - i);
                    i -= fontSize;
                });
            }
            if (this.position === "top") {
                this.width = this.canvas.width * 0.2;
                this.height = this.canvas.height * 0.05;
                ctx.stroke();
                const words = this.data.name.split(" ").reverse();
                let wordCount = words.length;
                let i = 0;
                for (let j = 1; j < words.length; j++) {
                    i += fontSize;
                }
                words.forEach((word) => {
                    ctx.fillText(word, this.canvas.width * 0.5, this.canvas.height * 0.05 + i);
                    i -= fontSize;
                });
            }
            if (this.position === "left") {
                this.width = this.canvas.height * 0.05;
                this.height = this.canvas.width * 0.2;
                ctx.stroke();
                const words = this.data.name.split(" ");
                let i = 0;
                for (let j = 1; j < words.length; j++) {
                    i += fontSize;
                }
                words.forEach((word) => {
                    ctx.fillText(word, this.canvas.width * 0.12, this.canvas.height * 0.545 - i);
                    i -= fontSize;
                });
            }
            if (this.position === "right") {
                this.width = this.canvas.height * 0.05;
                this.height = this.canvas.width * 0.2;
                ctx.stroke();
                const words = this.data.name.split(" ");
                let i = 0;
                for (let j = 1; j < words.length; j++) {
                    i += fontSize;
                }
                words.forEach((word) => {
                    ctx.fillText(word, this.canvas.width * 0.88, this.canvas.height * 0.425 - i);
                    i -= fontSize;
                });
            }
            this.infoDot.setPlayerPosition(playerXPos, playerYPos, playerWidth, playerHeight);
            this.infoDot.draw(ctx);
            if (this.playerCollidesWithDoor(playerXPos, playerYPos, playerWidth, playerHeight)) {
                console.log(this.isSensitive + " " + this.data.name);
                this.isCrossed = true;
            }
        };
        this.playerCollidesWithDoor = (playerXPos, playerYPos, playerWidth, playerHeight) => {
            if (this.position === "bottom") {
                const playerYPosBottomRight = playerYPos + playerHeight;
                if (playerXPos > this.positionX - this.width &&
                    playerXPos < this.positionX + this.width / 2 &&
                    playerYPosBottomRight > this.positionY - this.height) {
                    return true;
                }
            }
            if (this.position === "top") {
                if (playerXPos > this.positionX - this.width &&
                    playerXPos < this.positionX + this.width / 2 &&
                    playerYPos < this.positionY + this.height) {
                    return true;
                }
            }
            if (this.position === "left") {
                if (playerXPos < this.positionX + this.width &&
                    playerYPos > this.positionY - this.height &&
                    playerYPos < this.positionY + this.height / 2) {
                    return true;
                }
            }
            if (this.position === "right") {
                const playerXPosBottomRight = playerXPos + playerWidth;
                if (playerXPosBottomRight > this.positionX - this.width &&
                    playerYPos > this.positionY - this.height &&
                    playerYPos < this.positionY + this.height / 2) {
                    return true;
                }
            }
            return false;
        };
        this.getXPosition = () => {
            return this.positionX;
        };
        this.getYPosition = () => {
            return this.positionY;
        };
        this.getPosition = () => {
            return this.position;
        };
        this.getWidth = () => {
            return this.width;
        };
        this.getHeight = () => {
            return this.height;
        };
        this.getName = () => {
            return this.data.name;
        };
        this.getExplaination = () => {
            return this.data.explaination;
        };
        this.getData = () => {
            return this.data;
        };
        this.getIsSensitive = () => {
            return this.isSensitive;
        };
        this.getIsCrossed = () => {
            return this.isCrossed;
        };
        this.data = data;
        this.position = position;
        this.isSensitive = isSensitive;
        this.isCrossed = isCrossed;
        this.canvas = canvas;
        this.infoDot = new Infodot(this.canvas, this.position, this.data.name);
        this.doorPositioner(position, canvas);
    }
    doorPositioner(position, canvas) {
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
}
class View {
    constructor(canvas) {
        this.draw = (ctx) => { };
        this.loadNewImage = (source, width = null, height = null) => {
            const img = new Image();
            img.src = source;
            if (width !== null) {
                img.width = width;
            }
            if (height !== null) {
                img.height = height;
            }
            return img;
        };
        this.writeTextToCanvas = (ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") => {
            ctx.font = `${fontSize}px Minecraft`;
            ctx.fillStyle = color;
            ctx.textAlign = alignment;
            ctx.fillText(text, xCoordinate, yCoordinate);
        };
        this.canvas = canvas;
    }
}
class End extends View {
    constructor(canvas, endText, lineColor, language) {
        super(canvas);
        this.getButton = () => {
            return this.backToStartMenuButton;
        };
        this.draw = (ctx) => {
            ctx.fillStyle = Game.BASE_COLOR;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.image, this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2) * 0.97, this.canvas.height / 2 - (this.canvas.height * 0.9) / 2, this.canvas.height * 0.9, this.canvas.height * 0.9);
            ctx.fillStyle = this.lineColor;
            ctx.fillRect(0, 50, this.canvas.width, 100);
            ctx.textAlign = "center";
            ctx.font = '25px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(this.endText, this.canvas.width / 2, 110);
        };
        document.getElementById("desTop").style.visibility = "hidden";
        document.getElementById("desLeft").style.visibility = "hidden";
        document.getElementById("desRight").style.visibility = "hidden";
        document.getElementById("desBottom").style.visibility = "hidden";
        let btnText = "";
        if (language === "dutch") {
            btnText = "Terug naar begin scherm";
        }
        else {
            btnText = "Back to start menu";
        }
        this.backToStartMenuButton = new Button(this.canvas, this.canvas.width * 0.20, this.canvas.height * 0.19, this.canvas.width / 2 - (this.canvas.width * 0.19) / 2, this.canvas.height * 0.77 - (this.canvas.height * 0.19) / 2, "purple", btnText);
        this.image = this.loadNewImage('./assets/img/hacker.png');
        this.endText = endText;
        this.lineColor = lineColor;
    }
}
class Enemy extends Character {
    constructor(image, canvas, xPos, yPos) {
        super(image, canvas);
        this.draw = (ctx, player) => {
            ctx.drawImage(this.image, this.xPos, this.yPos, this.image.width / 1.5, this.image.height / 1.5);
            this.zombieMovement(player);
            this.frameCounter(17);
        };
        this.zombieMovement = (player) => {
            if (Math.abs(player.getPositionX() - this.xPos) < 50 && Math.abs(player.getPositionY() - this.yPos) < 50) {
                this.dead = true;
                console.log('hello there');
            }
            if (player.getPositionX() <= this.xPos) {
                this.xPos -= this.speed;
                this.image = this.loadNewImage(this.sprites_left[this.counter]);
                if (player.getPositionY() <= this.yPos) {
                    this.yPos -= this.speed;
                    this.image = this.loadNewImage(this.sprites[this.counter]);
                }
            }
            if (player.getPositionX() >= this.xPos) {
                this.xPos += this.speed;
                this.image = this.loadNewImage(this.sprites_right[this.counter]);
                if (player.getPositionY() >= this.yPos) {
                    this.yPos += this.speed;
                    this.image = this.loadNewImage(this.sprites_downwards[this.counter]);
                }
            }
        };
        this.collisionDetection = (player) => {
            if (this.getPositionX() < player.getPositionX() + player.getWidth() / 3 &&
                this.getPositionX() + this.image.width / 3 > player.getPositionX() &&
                this.getPositionY() < player.getPositionY() + player.getHeight() / 3 &&
                this.getPositionY() + this.image.height / 3 > this.getPositionY()) {
                this.dead = true;
            }
        };
        this.getDead = () => {
            return this.dead;
        };
        this.canvas = canvas;
        this.speed = this.randomNumber(1, 3);
        this.xPos = xPos;
        this.yPos = yPos;
        this.dead = false;
        this.sprites = [
            "./assets/img/enemy/skeleton-move_0.png",
            "./assets/img/enemy/skeleton-move_1.png",
            "./assets/img/enemy/skeleton-move_2.png",
            "./assets/img/enemy/skeleton-move_3.png",
            "./assets/img/enemy/skeleton-move_4.png",
            "./assets/img/enemy/skeleton-move_5.png",
            "./assets/img/enemy/skeleton-move_6.png",
            "./assets/img/enemy/skeleton-move_7.png",
            "./assets/img/enemy/skeleton-move_8.png",
            "./assets/img/enemy/skeleton-move_9.png",
            "./assets/img/enemy/skeleton-move_10.png",
            "./assets/img/enemy/skeleton-move_11.png",
            "./assets/img/enemy/skeleton-move_12.png",
            "./assets/img/enemy/skeleton-move_13.png",
            "./assets/img/enemy/skeleton-move_14.png",
            "./assets/img/enemy/skeleton-move_15.png",
            "./assets/img/enemy/skeleton-move_16.png",
        ];
        this.sprites_left = [
            "./assets/img/enemy/left/skeleton-move_0.png",
            "./assets/img/enemy/left/skeleton-move_1.png",
            "./assets/img/enemy/left/skeleton-move_2.png",
            "./assets/img/enemy/left/skeleton-move_3.png",
            "./assets/img/enemy/left/skeleton-move_4.png",
            "./assets/img/enemy/left/skeleton-move_5.png",
            "./assets/img/enemy/left/skeleton-move_6.png",
            "./assets/img/enemy/left/skeleton-move_7.png",
            "./assets/img/enemy/left/skeleton-move_8.png",
            "./assets/img/enemy/left/skeleton-move_9.png",
            "./assets/img/enemy/left/skeleton-move_10.png",
            "./assets/img/enemy/left/skeleton-move_11.png",
            "./assets/img/enemy/left/skeleton-move_12.png",
            "./assets/img/enemy/left/skeleton-move_13.png",
            "./assets/img/enemy/left/skeleton-move_14.png",
            "./assets/img/enemy/left/skeleton-move_15.png",
            "./assets/img/enemy/left/skeleton-move_16.png",
        ];
        this.sprites_right = [
            "./assets/img/enemy/right/skeleton-move_0.png",
            "./assets/img/enemy/right/skeleton-move_1.png",
            "./assets/img/enemy/right/skeleton-move_2.png",
            "./assets/img/enemy/right/skeleton-move_3.png",
            "./assets/img/enemy/right/skeleton-move_4.png",
            "./assets/img/enemy/right/skeleton-move_5.png",
            "./assets/img/enemy/right/skeleton-move_6.png",
            "./assets/img/enemy/right/skeleton-move_7.png",
            "./assets/img/enemy/right/skeleton-move_8.png",
            "./assets/img/enemy/right/skeleton-move_9.png",
            "./assets/img/enemy/right/skeleton-move_10.png",
            "./assets/img/enemy/right/skeleton-move_11.png",
            "./assets/img/enemy/right/skeleton-move_12.png",
            "./assets/img/enemy/right/skeleton-move_13.png",
            "./assets/img/enemy/right/skeleton-move_14.png",
            "./assets/img/enemy/right/skeleton-move_15.png",
            "./assets/img/enemy/right/skeleton-move_16.png",
        ];
        this.sprites_downwards = [
            "./assets/img/enemy/downwards/skeleton-move_0.png",
            "./assets/img/enemy/downwards/skeleton-move_1.png",
            "./assets/img/enemy/downwards/skeleton-move_2.png",
            "./assets/img/enemy/downwards/skeleton-move_3.png",
            "./assets/img/enemy/downwards/skeleton-move_4.png",
            "./assets/img/enemy/downwards/skeleton-move_5.png",
            "./assets/img/enemy/downwards/skeleton-move_6.png",
            "./assets/img/enemy/downwards/skeleton-move_7.png",
            "./assets/img/enemy/downwards/skeleton-move_8.png",
            "./assets/img/enemy/downwards/skeleton-move_9.png",
            "./assets/img/enemy/downwards/skeleton-move_10.png",
            "./assets/img/enemy/downwards/skeleton-move_11.png",
            "./assets/img/enemy/downwards/skeleton-move_12.png",
            "./assets/img/enemy/downwards/skeleton-move_13.png",
            "./assets/img/enemy/downwards/skeleton-move_14.png",
            "./assets/img/enemy/downwards/skeleton-move_15.png",
            "./assets/img/enemy/downwards/skeleton-move_16.png",
        ];
    }
}
class Game {
    constructor(canvas) {
        this.step = () => {
            this.stop = false;
            this.handlers();
            this.draw();
            if (!this.stop) {
                requestAnimationFrame(this.step);
            }
        };
        this.draw = () => {
            if (this.currentView instanceof Room) {
                if (this.howBool) {
                    if (this.language === "dutch") {
                        document.getElementById("htpNL").style.visibility =
                            "visible";
                        const letsGoNL = document.getElementById("letsGoNL");
                        letsGoNL.addEventListener("click", () => {
                            document.getElementById("htpNL").style.visibility =
                                "hidden";
                            this.canvas.style.webkitFilter = "blur(0px)";
                        });
                    }
                    else {
                        document.getElementById("htpEN").style.visibility =
                            "visible";
                        const letsGoNL = document.getElementById("letsGoEN");
                        letsGoNL.addEventListener("click", () => {
                            document.getElementById("htpEN").style.visibility =
                                "hidden";
                            this.canvas.style.webkitFilter = "blur(0px)";
                        });
                    }
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
                    if (data.isGood === true) {
                        this.goodRoomCounter++;
                        this.allRoomCounter++;
                        if (this.goodRoomCounter === 5) {
                            if (this.language === "dutch") {
                                this.currentView = new End(this.canvas, "Gefeliciteerd! Nu ben je slim genoeg om te weten welke informatie je voor anderen geheim moet houden.", "green", "dutch");
                            }
                            else {
                                this.currentView = new End(this.canvas, "Congratulations! Now you are smart enough to know which information you have to keep secret from others.", "green", "english");
                            }
                            this.goodRoomCounter = 0;
                        }
                        else {
                            this.currentView = new Room(this.canvas, true, position, this.language);
                        }
                    }
                    else if (data.isGood === false) {
                        this.allRoomCounter++;
                        this.stop = true;
                        console.log(data.data.name);
                        document.getElementById("info").style.visibility =
                            "visible";
                        document.getElementById("name").innerText = data.data.name;
                        document.getElementById("explaination").innerText =
                            data.data.explaination;
                        this.canvas.style.webkitFilter = "blur(10px)";
                        const button = document.getElementById("understoodBtn");
                        if (this.language === "dutch") {
                            button.value = "Begrepen";
                        }
                        else {
                            button.value = "Understood";
                        }
                        button.addEventListener("click", () => {
                            document.getElementById("info").style.visibility =
                                "hidden";
                            this.failedRoomCounter.push(data.data);
                            this.canvas.style.webkitFilter = "blur(0px)";
                            this.currentView = new Room(this.canvas, false, position, this.language);
                            if (this.stop) {
                                this.step();
                            }
                        });
                    }
                }
            }
            if (this.currentView instanceof Room) {
                const player = this.currentView.getPlayer();
                this.currentView.getEnemies().forEach((enemy) => {
                    if (enemy.getDead()) {
                        if (this.language === "dutch") {
                            this.currentView = new End(this.canvas, `Helaas, je hebt ${this.goodRoomCounter}/${this.allRoomCounter} vragen goed. Probeer het opnieuw!`, "red", "dutch");
                        }
                        else {
                            this.currentView = new End(this.canvas, `You lost, you answered ${this.goodRoomCounter}/${this.allRoomCounter} questions right on your quest. Try again!`, "red", "english");
                        }
                        this.goodRoomCounter = 0;
                        this.allRoomCounter = 0;
                    }
                });
            }
            this.currentView.draw(this.ctx);
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "right";
            if (this.currentView instanceof Room) {
                this.ctx.fillText(`${this.goodRoomCounter + 1}/5 LEVEL`, this.canvas.width - 50, 50);
            }
        };
        this.startMenuHandler = () => {
            if (this.currentView instanceof StartMenu) {
                this.prevView = "start";
                if (this.currentView.getButton().getClicked()) {
                    document.querySelectorAll("button").forEach((button) => {
                        button.remove();
                    });
                    document.getElementById("NLENSwitchStart").style.visibility = "hidden";
                    this.language = this.currentView.getLanguage();
                    this.currentView = new Room(this.canvas, true, "center", this.language);
                }
            }
        };
        this.pauseMenuHandler = () => {
            if (this.keyboard.isKeyDown(27)) {
                this.stop = true;
                document.getElementById("pause").style.visibility = "visible";
                this.canvas.style.webkitFilter = "blur(10px)";
                const continueBtn = document.getElementById("continueBtn");
                const backBtn = document.getElementById("backBtn");
                if (this.language === "dutch") {
                    continueBtn.value = "Doorgaan";
                    backBtn.value = "Terug naar begin scherm";
                    document.getElementById("pauseTitle").innerText = "Pauze";
                }
                else {
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
        this.endHandler = () => {
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
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.keyboard = new KeyListener();
        this.startMenu = new StartMenu(this.canvas);
        document.getElementById("NLENSwitchStart").style.visibility = "visible";
        this.currentView = this.startMenu;
        this.goodRoomCounter = 0;
        this.failedRoomCounter = [];
        this.allRoomCounter = 0;
        this.stop = false;
        this.howBool = true;
        this.language = "dutch";
        this.step();
    }
    handlers() {
        this.startMenuHandler();
        this.pauseMenuHandler();
        this.endHandler();
    }
}
Game.BASE_COLOR = "#00A5DC";
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        this.onFrameStart = () => {
            this.keyCodeTyped = new Array();
            this.keyCodeStates.forEach((val, key) => {
                if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                    this.keyCodeTyped[key] = true;
                    this.previousState[key] = val;
                }
            });
        };
        this.isKeyDown = (keyCode) => {
            return this.keyCodeStates[keyCode] == true;
        };
        this.isKeyTyped = (keyCode) => {
            return this.keyCodeTyped[keyCode] == true;
        };
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class Player extends Character {
    constructor(image, canvas) {
        super(image, canvas);
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.xPos, this.yPos, this.image.width / 1.5, this.image.height / 1.5);
            this.wallDetection();
            this.movement();
        };
        this.movement = () => {
            if (this.keyListener.isKeyDown(40) ||
                this.keyListener.isKeyDown(38) ||
                this.keyListener.isKeyDown(37) ||
                this.keyListener.isKeyDown(39) ||
                this.keyListener.isKeyDown(83) ||
                this.keyListener.isKeyDown(87) ||
                this.keyListener.isKeyDown(65) ||
                this.keyListener.isKeyDown(68)) {
                this.frameCounter(20);
            }
        };
        this.speed = 5;
        this.sprites = [
            "./assets/img/player/survivor-move_knife_0.png",
            "./assets/img/player/survivor-move_knife_1.png",
            "./assets/img/player/survivor-move_knife_2.png",
            "./assets/img/player/survivor-move_knife_3.png",
            "./assets/img/player/survivor-move_knife_4.png",
            "./assets/img/player/survivor-move_knife_5.png",
            "./assets/img/player/survivor-move_knife_6.png",
            "./assets/img/player/survivor-move_knife_7.png",
            "./assets/img/player/survivor-move_knife_8.png",
            "./assets/img/player/survivor-move_knife_9.png",
            "./assets/img/player/survivor-move_knife_10.png",
            "./assets/img/player/survivor-move_knife_11.png",
            "./assets/img/player/survivor-move_knife_12.png",
            "./assets/img/player/survivor-move_knife_13.png",
            "./assets/img/player/survivor-move_knife_14.png",
            "./assets/img/player/survivor-move_knife_15.png",
            "./assets/img/player/survivor-move_knife_16.png",
            "./assets/img/player/survivor-move_knife_17.png",
            "./assets/img/player/survivor-move_knife_18.png",
            "./assets/img/player/survivor-move_knife_19.png"
        ];
        this.sprites_left = [
            "./assets/img/player/left/survivor-move_knife_0.png",
            "./assets/img/player/left/survivor-move_knife_1.png",
            "./assets/img/player/left/survivor-move_knife_2.png",
            "./assets/img/player/left/survivor-move_knife_3.png",
            "./assets/img/player/left/survivor-move_knife_4.png",
            "./assets/img/player/left/survivor-move_knife_5.png",
            "./assets/img/player/left/survivor-move_knife_6.png",
            "./assets/img/player/left/survivor-move_knife_7.png",
            "./assets/img/player/left/survivor-move_knife_8.png",
            "./assets/img/player/left/survivor-move_knife_9.png",
            "./assets/img/player/left/survivor-move_knife_10.png",
            "./assets/img/player/left/survivor-move_knife_11.png",
            "./assets/img/player/left/survivor-move_knife_12.png",
            "./assets/img/player/left/survivor-move_knife_13.png",
            "./assets/img/player/left/survivor-move_knife_14.png",
            "./assets/img/player/left/survivor-move_knife_15.png",
            "./assets/img/player/left/survivor-move_knife_16.png",
            "./assets/img/player/left/survivor-move_knife_17.png",
            "./assets/img/player/left/survivor-move_knife_18.png",
            "./assets/img/player/left/survivor-move_knife_19.png",
        ];
        this.sprites_right = [
            "./assets/img/player/right/survivor-move_knife_0.png",
            "./assets/img/player/right/survivor-move_knife_1.png",
            "./assets/img/player/right/survivor-move_knife_2.png",
            "./assets/img/player/right/survivor-move_knife_3.png",
            "./assets/img/player/right/survivor-move_knife_4.png",
            "./assets/img/player/right/survivor-move_knife_5.png",
            "./assets/img/player/right/survivor-move_knife_6.png",
            "./assets/img/player/right/survivor-move_knife_7.png",
            "./assets/img/player/right/survivor-move_knife_8.png",
            "./assets/img/player/right/survivor-move_knife_9.png",
            "./assets/img/player/right/survivor-move_knife_10.png",
            "./assets/img/player/right/survivor-move_knife_11.png",
            "./assets/img/player/right/survivor-move_knife_12.png",
            "./assets/img/player/right/survivor-move_knife_13.png",
            "./assets/img/player/right/survivor-move_knife_14.png",
            "./assets/img/player/right/survivor-move_knife_15.png",
            "./assets/img/player/right/survivor-move_knife_16.png",
            "./assets/img/player/right/survivor-move_knife_17.png",
            "./assets/img/player/right/survivor-move_knife_18.png",
            "./assets/img/player/right/survivor-move_knife_19.png",
        ];
        this.sprites_downwards = [
            "./assets/img/player/downwards/survivor-move_knife_0.png",
            "./assets/img/player/downwards/survivor-move_knife_1.png",
            "./assets/img/player/downwards/survivor-move_knife_2.png",
            "./assets/img/player/downwards/survivor-move_knife_3.png",
            "./assets/img/player/downwards/survivor-move_knife_4.png",
            "./assets/img/player/downwards/survivor-move_knife_5.png",
            "./assets/img/player/downwards/survivor-move_knife_6.png",
            "./assets/img/player/downwards/survivor-move_knife_7.png",
            "./assets/img/player/downwards/survivor-move_knife_8.png",
            "./assets/img/player/downwards/survivor-move_knife_9.png",
            "./assets/img/player/downwards/survivor-move_knife_10.png",
            "./assets/img/player/downwards/survivor-move_knife_11.png",
            "./assets/img/player/downwards/survivor-move_knife_12.png",
            "./assets/img/player/downwards/survivor-move_knife_13.png",
            "./assets/img/player/downwards/survivor-move_knife_14.png",
            "./assets/img/player/downwards/survivor-move_knife_15.png",
            "./assets/img/player/downwards/survivor-move_knife_16.png",
            "./assets/img/player/downwards/survivor-move_knife_17.png",
            "./assets/img/player/downwards/survivor-move_knife_18.png",
            "./assets/img/player/downwards/survivor-move_knife_19.png",
        ];
    }
    wallDetection() {
        if (this.keyListener.isKeyDown(40) || this.keyListener.isKeyDown(83)) {
            if (this.yPos + this.image.height < this.canvas.height * 0.89 ||
                (this.xPos > this.canvas.width * 0.33 &&
                    this.xPos + this.image.width < this.canvas.width * 0.49)) {
                this.yPos += this.speed;
                this.image = this.loadNewImage(this.sprites_downwards[this.counter]);
            }
        }
        if (this.keyListener.isKeyDown(38) || this.keyListener.isKeyDown(87)) {
            if (this.yPos > this.canvas.height * 0.18 ||
                (this.xPos > this.canvas.width * 0.41 &&
                    this.xPos + this.image.width < this.canvas.width * 0.59)) {
                this.yPos -= this.speed;
                this.image = this.loadNewImage(this.sprites[this.counter]);
            }
        }
        if (this.keyListener.isKeyDown(37) || this.keyListener.isKeyDown(65)) {
            if (this.xPos > this.canvas.width * 0.24 ||
                (this.yPos + this.image.height > this.canvas.height * 0.63 &&
                    this.yPos < this.canvas.height * 0.53)) {
                this.xPos -= this.speed;
                this.image = this.loadNewImage(this.sprites_left[this.counter]);
            }
        }
        if (this.keyListener.isKeyDown(39) || this.keyListener.isKeyDown(68)) {
            if (this.xPos + this.image.width < this.canvas.width * 0.76 ||
                (this.yPos + this.image.height > this.canvas.height * 0.5 &&
                    this.yPos < this.canvas.height * 0.35)) {
                this.xPos += this.speed;
                this.image = this.loadNewImage(this.sprites_right[this.counter]);
            }
        }
    }
}
class Room extends View {
    constructor(canvas, isGood, playerSpawnPosition, language) {
        super(canvas);
        this.spawnEnemies = (ctx) => {
            this.enemies.forEach((enemy) => {
                enemy.draw(ctx, this.player);
            });
        };
        this.isNextRoomGood = () => {
            for (let i = 0; i < this.doors.length; i++) {
                if (this.doors[i].getIsSensitive() === false &&
                    this.doors[i].getIsCrossed()) {
                    console.log(this.doors[i].getName() +
                        " : " +
                        this.doors[i].getExplaination());
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
        this.draw = () => {
            const ctx = this.canvas.getContext("2d");
            ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
            this.player.draw(ctx);
            this.doors.forEach((door) => {
                door.draw(ctx, this.player.getPositionX(), this.player.getPositionY(), this.player.getWidth(), this.player.getHeight());
                if (door.getIsCrossed() === true) {
                    this.nextRoom = true;
                }
            });
            if (this.isGood == false) {
                this.spawnEnemies(ctx);
            }
        };
        this.getNextRoom = () => {
            return this.nextRoom;
        };
        this.getEnemies = () => {
            return this.enemies;
        };
        this.getPlayer = () => {
            return this.player;
        };
        this.loadRandomBackground = () => {
            let random = this.random(0, 5);
            let src = "./assets/img/background";
            if (random === this.lastBackgroundIndex) {
                random++;
            }
            if (random === 1 || random === 5) {
                src += "0.jpg";
            }
            else if (random === 2) {
                src += "1.jpg";
            }
            else if (random === 3) {
                src += "2.jpg";
            }
            else if (random === 4) {
                src += "3.jpg";
            }
            else {
                src += "2.jpg";
            }
            return this.loadNewImage(src, this.canvas.width, this.canvas.height);
        };
        this.generateDoors = () => {
            let onlyOneNonSensitiveData = false;
            let alreadyUsedValues = [];
            for (let i = 0; i < 4; i++) {
                const position = ["top", "right", "bottom", "left"];
                if (this.random(1, 5) % 2 === 0 &&
                    onlyOneNonSensitiveData === false) {
                    onlyOneNonSensitiveData = true;
                    let index = 0;
                    if (this.language === "dutch") {
                        index = this.nonSensitiveDataObjects.length / 2 + this.random(0, this.nonSensitiveDataObjects.length / 2, alreadyUsedValues);
                    }
                    else {
                        index = this.random(0, this.nonSensitiveDataObjects.length / 2, alreadyUsedValues);
                    }
                    this.doors.push(new Door(this.nonSensitiveDataObjects[index], position[i], false, false, this.canvas));
                }
                else {
                    if (i === 3 && onlyOneNonSensitiveData === false) {
                        let index = 0;
                        if (this.language === "dutch") {
                            index = this.nonSensitiveDataObjects.length / 2 + this.random(0, this.nonSensitiveDataObjects.length / 2, alreadyUsedValues);
                        }
                        else {
                            index = this.random(0, this.nonSensitiveDataObjects.length / 2, alreadyUsedValues);
                        }
                        this.doors.push(new Door(this.nonSensitiveDataObjects[index], position[i], false, false, this.canvas));
                    }
                    else {
                        let index = 0;
                        if (this.language === "dutch") {
                            index = this.sensitiveDataObjects.length / 2 + this.random(0, this.sensitiveDataObjects.length / 2, alreadyUsedValues);
                        }
                        else {
                            index = this.random(0, this.sensitiveDataObjects.length / 2, alreadyUsedValues);
                        }
                        alreadyUsedValues.push(index);
                        this.doors.push(new Door(this.sensitiveDataObjects[index], position[i], true, false, this.canvas));
                    }
                }
            }
        };
        this.random = (min, max, alreadyUsedValues = [-1]) => {
            if (alreadyUsedValues[0] === -1) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            else if (alreadyUsedValues.length > 0) {
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
            }
            else {
                return Math.floor(Math.random() * (max - min) + min);
            }
        };
        this.language = language;
        this.background = this.loadRandomBackground();
        this.lastBackgroundIndex = 0;
        this.isGood = isGood;
        this.sensitiveDataObjects = [
            {
                language: "english",
                name: "Username + Password",
                explaination: "If somebody knows your username and password, they can log in to your gaming account 🎮 and delete your favorite games or sell everything 💸 you have collected so far. You don’t want that, do you? ☹",
            },
            {
                language: "english",
                name: "Home address",
                explaination: "If somebody knows your address, they can stalk you. 👀 Google will give them a picture of your house 🏠 or apartment and the directions ↩️ to get there. It is just weird, so you should keep it for yourself.",
            },
            {
                language: "english",
                name: "Bank card details",
                explaination: "You took a picture of your brand new bank card 💳 the last afternoon to show your friends that you are a grown-up person and can have your own card. You wake up the next morning, and all your money is gone 💸. You ignored covering the numbers on the card while taking that picture ☹ Maybe you should stick with cash 💰 for a while.",
            },
            {
                language: "english",
                name: "Picture of you",
                explaination: "If you don’t want to see yourself randomly appearing on the internet, don’t send away this one. Some smartphones 📱 can be unlocked by face identification, and if somebody stoles a picture of your face...well, it can be a problem later on.",
            },
            {
                language: "english",
                name: "Bills",
                explaination: "There are many information on bills: your address, full name and maybe some bank details too. It is just too much information! Pay attention when you take some random pictures at your home 🏠; check 👀 if there are no bills in the background! There are people out there who got into trouble by sending photographs, including their bills.",
            },
            {
                language: "english",
                name: "Medical pills you take",
                explaination: "This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
            },
            {
                language: "english",
                name: "History from your illnesses",
                explaination: "This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
            },
            {
                language: "english",
                name: "Your fingerprint",
                explaination: "Your fingerprint 👈 is unique so that you can be identified by it. Therefore it is considered sensitive 🔒. Just think about that: you can use it to unlock your phone 📱.",
            },
            {
                language: "english",
                name: "Political opinions",
                explaination: "Unfortunately, there are some places where other people or even companies can discriminate you based on your political views. Therefore the European Union considers this information private. Sometimes it is not wise to share it with strangers 🔒.",
            },
            {
                language: "english",
                name: "Alarm system’s passcode",
                explaination: "Sometimes you share this code with trusted people, but in general, it is just for you and for your family to protect your house 🏠 🔒. Never use it anywhere else, and do not use it as a password!",
            },
            {
                language: "english",
                name: "Photo about your holiday",
                explaination: "Housebreakers 😒 usually browse social media searching for “holiday-pictures.” This usually means that the family left the house, and it is empty to be robbed more easily 🏠 🔓.",
            },
            {
                language: "english",
                name: "Your birth date",
                explaination: "It is considered sensitive because you can be identified by it more easily: many times, when you call someone who needs to authorize you, you will need to give your birthdate to them. Do not give it to anyone else. It is not wise to provide it for Facebook or Instagram and set it to public. Never use it as your password ⛔! It can be easily guessed.",
            },
            {
                language: "english",
                name: "Your ID number",
                explaination: "It is considered sensitive because it is unique and only identifies you. Never share it on social media ⛔!",
            },
            {
                language: "dutch",
                name: "Gebruikersnaam + Wachtwoord: ",
                explaination: "Als iemand je gebruikersnaam en wachtwoord weet, kan hij/zij inloggen op jouw account 🎮 en je favoriete spellen verwijderen of alles verkopen 💸 dat je hebt verzameld. Dat wil je toch niet☹?",
            },
            {
                language: "dutch",
                name: "Adres",
                explaination: "Als iemand je adres kent, kunnen ze je stalken. 👀 Google geven ze een foto van je huis 🏠 of appartement en de routebeschrijving ↩️ hoe je daar komt. Het is gewoon raar, dus je moet het voor jezelf houden.",
            },
            {
                language: "dutch",
                name: "Bank gegevens",
                explaination: "Je hebt de afgelopen middag een foto gemaakt van je nieuwe bankpas 💳 om je vrienden te laten zien dat je een volwassen persoon bent en je eigen kaart hebt. Je wordt de volgende ochtend wakker en al je geld is op 💸. Je vergat de cijfers op de kaart bedekken terwijl je die foto maakt ☹ Misschien moet je een tijdje bij contant geld blijven 💰.",
            },
            {
                language: "dutch",
                name: "Foto van jou",
                explaination: "Als je jezelf niet willekeurig op internet wilt zien verschijnen, stuur deze dan niet weg. Sommige telefoons 📱 kunnen worden ontgrendeld door middel van gezichtsherkenning, en als iemand een foto van je gezicht steelt ... nou, dat kan een probleem worden later.",
            },
            {
                language: "dutch",
                name: "Rekening",
                explaination: "Er is veel informatie op een rekening: uw adres, naam en misschien ook enkele bankgegevens. Het is gewoon te veel informatie! Let goed op wanneer je wat foto's thuis maakt 🏠; controleer 👀 of er geen rekeningen op de achtergrond zijn! Er zijn mensen die in de problemen zijn gekomen door foto's te sturen, waar hun rekeningen zichtbaar zijn.",
            },
            {
                language: "dutch",
                name: "Medicijnen die je gebruikt",
                explaination: "Dit is heeft te maken met gezondheid en wordt als privé 🔒 en gevoelig beschouwd. Daarom, wanneer je contact opneemt met een nieuwe arts 👨‍⚕️ 👩‍⚕️, heeft hij/zij jouw toestemming nodig om toegang te krijgen tot jouw medische informatie.",
            },
            {
                language: "dutch",
                name: "Geschiedenis van ziekte",
                explaination: "Dit is heeft te maken met gezondheid en wordt als privé 🔒 en gevoelig beschouwd. Daarom, wanneer je contact opneemt met een nieuwe arts 👨‍⚕️ 👩‍⚕️, heeft hij/zij jouw toestemming nodig om toegang te krijgen tot jouw medische informatie.",
            },
            {
                language: "dutch",
                name: "Je vingerafdruk",
                explaination: "Jouw vingerafdruk is uniek, zodat je eraan kant worden herkend. Daarom wordt het als gevoelig data gezien 🔒. Denk daar maar eens over na: je kunt het gebruiken om uw telefoon te ontgrendelen 📱.",
            },
            {
                language: "dutch",
                name: "Politieke mening",
                explaination: "Helaas zijn er plaatsen of landen waar andere mensen je kunnen discrimineren op basis van jouw politieke mening. Daarom beschouwt de Europese Unie deze informatie als privé. Soms is het niet verstandig om het met vreemden te delen 🔒.",
            },
            {
                language: "dutch",
                name: "Alarmsysteem wachtwoord",
                explaination: "Soms deel je deze code met mensen die je vertrouw, maar over het algemeen is het alleen voor jou en je gezin om je huis te beschermen 🏠 🔒. Gebruik het nergens anders en/of gebruik het ook niet als wachtwoord!",
            },
            {
                language: "dutch",
                name: "Foto dat je op vakantie bent",
                explaination: "Inbrekers 😒 kijken meestal door sociale media en zijn op zoek naar 'vakantiefoto's'. Dit betekent meestal dat het gezin het huis heeft verlaten en dat het leeg is en gemakkelijker beroofd te worden🏠 🔓.",
            },
            {
                language: "dutch",
                name: "Je geboortedatum",
                explaination: "Het wordt als gevoelig data gezien omdat je er gemakkelijker door kunt worden herkend: vaak, wanneer je iemand belt en die wilt zeker weten dat jij het bent, moet je jouw geboortedatum aan hen doorgeven. Geef het aan niemand anders. Het is niet verstandig om het op Facebook of Instagram openbaar te maken. Gebruik het nooit als uw wachtwoord ⛔! Het is gemakkelijk te raden.",
            },
            {
                language: "dutch",
                name: "Je ID-nummer",
                explaination: "Het wordt als gevoelig data gezien omdat het uniek is en alleen jou identificeert. Deel het nooit op sociale media ⛔!",
            }
        ];
        this.nonSensitiveDataObjects = [
            {
                language: "english",
                name: "Favorite Color ",
                explaination: "",
            },
            {
                language: "english",
                name: "Nationality ",
                explaination: "",
            },
            {
                language: "english",
                name: "Username",
                explaination: "",
            },
            {
                language: "english",
                name: "Favorite Food",
                explaination: "",
            },
            {
                language: "english",
                name: "Email address",
                explaination: "",
            },
            {
                language: "english",
                name: "Your phone’s manufacturer",
                explaination: "",
            },
            {
                language: "english",
                name: "A picture of your clothes",
                explaination: "",
            },
            {
                language: "english",
                name: "Picture about your cat ",
                explaination: "",
            },
            {
                language: "english",
                name: "Your favorite game ",
                explaination: "",
            },
            {
                language: "english",
                name: "Your best friend",
                explaination: "",
            },
            {
                language: "english",
                name: "Religion",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Favoriete kleur",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Nationaliteit",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Gebruikersnaam",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Favoriete eten",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Geloof",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Email adres",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Je telefoon provider",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Foto van je kleding",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Foto van je kat",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Favoriete game",
                explaination: "",
            },
            {
                language: "dutch",
                name: "Beste vriend",
                explaination: "",
            }
        ];
        this.player = new Player("./assets/img/player/survivor-move_knife_0.png", this.canvas);
        switch (playerSpawnPosition) {
            case "center":
                this.player.setPositionX(canvas.width / 2 - this.player.getWidth() / 2);
                this.player.setPositionY(canvas.height / 2 - this.player.getHeight() / 2);
                break;
            case "bottom":
                this.player.setPositionX(canvas.width * 0.36);
                this.player.setPositionY(canvas.height * 0.68);
                this.playerSpawn = "bottom";
                break;
            case "top":
                this.player.setPositionX(canvas.width * 0.45);
                this.player.setPositionY(canvas.height * 0.2);
                this.player.setImage("./assets/img/player/downwards/survivor-move_knife_0.png");
                this.playerSpawn = "top";
                break;
            case "left":
                this.player.setPositionX(canvas.width * 0.24);
                this.player.setPositionY(canvas.height * 0.45);
                this.player.setImage("./assets/img/player/right/survivor-move_knife_0.png");
                this.playerSpawn = "left";
                break;
            case "right":
                this.player.setPositionX(canvas.width * 0.67);
                this.player.setPositionY(canvas.height * 0.32);
                this.player.setImage("./assets/img/player/left/survivor-move_knife_0.png");
                this.playerSpawn = "right";
                break;
        }
        switch (this.playerSpawn) {
            case 'left':
                this.zombie1X = this.canvas.width * 0.65;
                this.zombie1Y = this.canvas.height * 0.29;
                this.zombie2X = this.canvas.width * 0.65;
                this.zombie2Y = this.canvas.height * 0.65;
                break;
            case 'top':
                this.zombie1X = this.canvas.width * 0.65;
                this.zombie1Y = this.canvas.height * 0.65;
                this.zombie2X = this.canvas.width * 0.3;
                this.zombie2Y = this.canvas.height * 0.65;
                break;
            case 'right':
                this.zombie1X = this.canvas.width * 0.3;
                this.zombie1Y = this.canvas.height * 0.29;
                this.zombie2X = this.canvas.width * 0.3;
                this.zombie2Y = this.canvas.height * 0.65;
                break;
            case 'bottom':
                this.zombie1X = this.canvas.width * 0.3;
                this.zombie1Y = this.canvas.height * 0.29;
                this.zombie2X = this.canvas.width * 0.65;
                this.zombie2Y = this.canvas.height * 0.29;
                break;
            default:
        }
        ;
        this.enemies = [
            new Enemy('./assets/img/enemy/skeleton-move_0.png', this.canvas, this.zombie1X, this.zombie1Y),
            new Enemy('./assets/img/enemy/skeleton-move_0.png', this.canvas, this.zombie2X, this.zombie2Y),
        ];
        this.doors = [];
        this.generateDoors();
        this.nextRoom = false;
    }
}
class StartMenu extends View {
    constructor(canvas) {
        super(canvas);
        this.createButton = (text) => {
            this.startButton = new Button(this.canvas, this.canvas.width * 0.20, this.canvas.height * 0.19, this.canvas.width / 2 - (this.canvas.width * 0.19) / 2, this.canvas.height * 0.77 - (this.canvas.height * 0.19) / 2, "purple", text);
        };
        this.getLanguage = () => {
            return this.language;
        };
        this.getButton = () => {
            return this.startButton;
        };
        this.draw = (ctx) => {
            ctx.fillStyle = Game.BASE_COLOR;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.image, this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2) * 0.97, this.canvas.height / 2 - (this.canvas.height * 0.9) / 2, this.canvas.height * 0.9, this.canvas.height * 0.9);
        };
        this.language = "dutch";
        this.createButton("BEGIN");
        const NLButton = document.getElementById("NLStart");
        const ENButton = document.getElementById("ENStart");
        NLButton.addEventListener("click", () => {
            this.language = "dutch";
            this.createButton("BEGIN");
            NLButton.style.backgroundColor = "purple";
            ENButton.style.backgroundColor = "white";
        });
        ENButton.addEventListener("click", () => {
            this.language = "english";
            this.createButton("START");
            NLButton.style.backgroundColor = "white";
            ENButton.style.backgroundColor = "purple";
        });
        this.image = this.loadNewImage("./assets/img/hacker.png");
    }
}
class Infodot extends View {
    constructor(canvas, position, data) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.posX, this.posY, this.canvas.width / 50 * 1.8, this.canvas.height / 30 * 1.8);
            this.isTouched();
        };
        this.position = position;
        this.positioning();
        this.data = data;
        this.image = this.loadNewImage("./assets/img/infoButton.png");
    }
    positioning() {
        switch (this.position) {
            case "bottom": {
                this.posX = this.canvas.width * 0.39;
                this.posY = this.canvas.height * 0.75;
                break;
            }
            case "top": {
                this.posX = this.canvas.width * 0.48;
                this.posY = this.canvas.height * 0.28;
                break;
            }
            case "left": {
                this.posX = this.canvas.width * 0.3;
                this.posY = this.canvas.height * 0.5;
                break;
            }
            case "right": {
                this.posX = this.canvas.width * 0.675;
                this.posY = this.canvas.height * 0.4;
                break;
            }
            default: {
                alert("ERROR WHILE POSITIONING INFO-DOTS!");
                break;
            }
        }
    }
    isTouched() {
        if ((Math.abs((this.playerPosX + (this.playerWidth / 2)) - (this.posX + ((this.canvas.width / 50 * 1.8) / 2))) < 30) && (Math.abs((this.playerPosY + (this.playerHeight / 2)) - (this.posY + ((this.canvas.height / 30 * 1.8) / 2))) < 30)) {
            if (this.position == "top") {
                document.getElementById("desTop").style.visibility = "visible";
                document.getElementById("desh1Top").innerText = this.data;
            }
            if (this.position == "bottom") {
                document.getElementById("desBottom").style.visibility = "visible";
                document.getElementById("desh1Bottom").innerText = this.data;
            }
            if (this.position == "left") {
                document.getElementById("desLeft").style.visibility = "visible";
                document.getElementById("desh1Left").innerText = this.data;
            }
            if (this.position == "right") {
                document.getElementById("desRight").style.visibility = "visible";
                document.getElementById("desh1Right").innerText = this.data;
            }
            console.log();
        }
        else {
            if (this.position == "top") {
                document.getElementById("desTop").style.visibility = "hidden";
            }
            if (this.position == "bottom") {
                document.getElementById("desBottom").style.visibility = "hidden";
            }
            if (this.position == "left") {
                document.getElementById("desLeft").style.visibility = "hidden";
            }
            if (this.position == "right") {
                document.getElementById("desRight").style.visibility = "hidden";
            }
        }
    }
    ;
    setPlayerPosition(playerXPos, playerYPos, playerWidth, playerHeight) {
        this.playerPosX = playerXPos;
        this.playerPosY = playerYPos;
        this.playerWidth = playerWidth;
        this.playerHeight = playerHeight;
    }
}
//# sourceMappingURL=app.js.map