/// <reference path="View.ts" />

class Room extends View {
    private language: string;

	private sensitiveDataObjects: Array<any>;
	private nonSensitiveDataObjects: Array<any>;

	private doors: Door[]; // array to contain 4 doors for the room

	private player: Player;
	private enemies: Enemy[];
	private isGood: boolean;

	private nextRoom: boolean; // true if the next room should be loaded

	private background: HTMLImageElement;
	private lastBackgroundIndex: number;

	private zombie1X: number;
	private zombie1Y: number;
	private zombie2X: number;
	private zombie2Y: number;

	private playerSpawn: string;

	constructor(
		canvas: HTMLCanvasElement,
		isGood: boolean,
		playerSpawnPosition: string,
        language: string
	) {
		super(canvas);

        this.language = language;

		this.background = this.loadRandomBackground();
		this.lastBackgroundIndex = 0;

		this.isGood = isGood;

		this.sensitiveDataObjects = [
			{
				language: "english",
				name: "Username + Password",
				explaination:
					"If somebody knows your username and password, they can log in to your gaming account 🎮 and delete your favorite games or sell everything 💸 you have collected so far. You don’t want that, do you? ☹",
			},
			{
				language: "english",
				name: "Home address",
				explaination:
					"If somebody knows your address, they can stalk you. 👀 Google will give them a picture of your house 🏠 or apartment and the directions ↩️ to get there. It is just weird, so you should keep it for yourself.",
			},
			{
				language: "english",
				name: "Bank card details",
				explaination:
					"You took a picture of your brand new bank card 💳 the last afternoon to show your friends that you are a grown-up person and can have your own card. You wake up the next morning, and all your money is gone 💸. You ignored covering the numbers on the card while taking that picture ☹ Maybe you should stick with cash 💰 for a while.",
			},
			{
				language: "english",
				name: "Picture of you",
				explaination:
					"If you don’t want to see yourself randomly appearing on the internet, don’t send away this one. Some smartphones 📱 can be unlocked by face identification, and if somebody stoles a picture of your face...well, it can be a problem later on.",
			},
			{
				language: "english",
				name: "Bills",
				explaination:
					"There are many information on bills: your address, full name and maybe some bank details too. It is just too much information! Pay attention when you take some random pictures at your home 🏠; check 👀 if there are no bills in the background! There are people out there who got into trouble by sending photographs, including their bills.",
			},
			{
				language: "english",
				name: "Medical pills you take",
				explaination:
					"This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
			},
			{
				language: "english",
				name: "History from your illnesses",
				explaination:
					"This is health-related information 💊, and it is considered private 🔒 and sensitive. Therefore, when you contact a new doctor 👨‍⚕️ 👩‍⚕️, they need your permission to access your medical information.",
			},
			{
				language: "english",
				name: "Your fingerprint",
				explaination:
					"Your fingerprint 👈 is unique so that you can be identified by it. Therefore it is considered sensitive 🔒. Just think about that: you can use it to unlock your phone 📱.",
			},
			{
				language: "english",
				name: "Political opinions",
				explaination:
					"Unfortunately, there are some places where other people or even companies can discriminate you based on your political views. Therefore the European Union considers this information private. Sometimes it is not wise to share it with strangers 🔒.",
			},
			{
				language: "english",
				name: "Alarm system’s passcode",
				explaination:
					"Sometimes you share this code with trusted people, but in general, it is just for you and for your family to protect your house 🏠 🔒. Never use it anywhere else, and do not use it as a password!",
			},
			{
				language: "english",
				name: "Photo about your holiday",
				explaination:
					"Housebreakers 😒 usually browse social media searching for “holiday-pictures.” This usually means that the family left the house, and it is empty to be robbed more easily 🏠 🔓.",
			},
			{
				language: "english",
				name: "Your birth date",
				explaination:
					"It is considered sensitive because you can be identified by it more easily: many times, when you call someone who needs to authorize you, you will need to give your birthdate to them. Do not give it to anyone else. It is not wise to provide it for Facebook or Instagram and set it to public. Never use it as your password ⛔! It can be easily guessed.",
			},
			{
				language: "english",
				name: "Your ID number",
				explaination:
					"It is considered sensitive because it is unique and only identifies you. Never share it on social media ⛔!",
			},
			{
				language: "dutch",
				name: "Gebruikersnaam + Wachtwoord: ",
				explaination:
					"Als iemand je gebruikersnaam en wachtwoord weet, kan hij/zij inloggen op jouw account 🎮 en je favoriete spellen verwijderen of alles verkopen 💸 dat je hebt verzameld. Dat wil je toch niet☹?",
			},
			{
				language: "dutch",
				name: "Adres",
				explaination:
					"Als iemand je adres kent, kunnen ze je stalken. 👀 Google geven ze een foto van je huis 🏠 of appartement en de routebeschrijving ↩️ hoe je daar komt. Het is gewoon raar, dus je moet het voor jezelf houden.",
			},
			{
				language: "dutch",
				name: "Bank gegevens",
				explaination:
					"Je hebt de afgelopen middag een foto gemaakt van je nieuwe bankpas 💳 om je vrienden te laten zien dat je een volwassen persoon bent en je eigen kaart hebt. Je wordt de volgende ochtend wakker en al je geld is op 💸. Je vergat de cijfers op de kaart bedekken terwijl je die foto maakt ☹ Misschien moet je een tijdje bij contant geld blijven 💰.",
			},
			{
				language: "dutch",
				name: "Foto van jou",
				explaination:
					"Als je jezelf niet willekeurig op internet wilt zien verschijnen, stuur deze dan niet weg. Sommige telefoons 📱 kunnen worden ontgrendeld door middel van gezichtsherkenning, en als iemand een foto van je gezicht steelt ... nou, dat kan een probleem worden later.",
			},
			{
				language: "dutch",
				name: "Rekening",
				explaination:
					"Er is veel informatie op een rekening: uw adres, naam en misschien ook enkele bankgegevens. Het is gewoon te veel informatie! Let goed op wanneer je wat foto's thuis maakt 🏠; controleer 👀 of er geen rekeningen op de achtergrond zijn! Er zijn mensen die in de problemen zijn gekomen door foto's te sturen, waar hun rekeningen zichtbaar zijn.",
			},
			{
				language: "dutch",
				name: "Medicijnen die je gebruikt",
				explaination:
					"Dit is heeft te maken met gezondheid en wordt als privé 🔒 en gevoelig beschouwd. Daarom, wanneer je contact opneemt met een nieuwe arts 👨‍⚕️ 👩‍⚕️, heeft hij/zij jouw toestemming nodig om toegang te krijgen tot jouw medische informatie.",
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
				this.playerSpawn = "bottom";
				break;
			case "top":
				this.player.setPositionX(canvas.width * 0.45);
				this.player.setPositionY(canvas.height * 0.2);
				this.player.setImage(
					"./assets/img/player/downwards/survivor-move_knife_0.png"
				);
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

		switch(this.playerSpawn) {
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
		};

		this.enemies = [
			new Enemy('./assets/img/enemy/skeleton-move_0.png', this.canvas, this.zombie1X, this.zombie1Y),
			new Enemy(
				'./assets/img/enemy/skeleton-move_0.png', this.canvas, this.zombie2X, this.zombie2Y
			),
		];

		this.doors = [];
		this.generateDoors();

		this.nextRoom = false;
	}

	/**
	 * Spawn enemies
	 */
	private spawnEnemies = (ctx: CanvasRenderingContext2D) => {
		

		this.enemies.forEach((enemy) => {

			enemy.draw(ctx, this.player);
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

                // Set the language
                let index = 0;
                if(this.language === "dutch"){
                   index = this.nonSensitiveDataObjects.length/2 + this.random(0,this.nonSensitiveDataObjects.length/2,alreadyUsedValues);
                }
                else{
                    index = this.random(0,this.nonSensitiveDataObjects.length/2,alreadyUsedValues);
                }

				this.doors.push(
					new Door(
						this.nonSensitiveDataObjects[index],
						position[i],
						false,
						false,
						this.canvas
					)
				);
			} else {
				// make sure there is at least one sensitive data
				if (i === 3 && onlyOneNonSensitiveData === false) {

                    // Set the language
                    let index = 0;
                    if(this.language === "dutch"){
                       index = this.nonSensitiveDataObjects.length/2 + this.random(0,this.nonSensitiveDataObjects.length/2,alreadyUsedValues);
                    }
                    else{
                        index = this.random(0,this.nonSensitiveDataObjects.length/2,alreadyUsedValues);
                    }

					this.doors.push(
						new Door(
							this.nonSensitiveDataObjects[index],
							position[i],
							false,
							false,
							this.canvas
						)
					);
				} else {
                    // Set the language
                    let index = 0;
                    if(this.language === "dutch"){
                       index = this.sensitiveDataObjects.length/2 + this.random(0,this.sensitiveDataObjects.length/2,alreadyUsedValues);
                    }
                    else{
                        index = this.random(0,this.sensitiveDataObjects.length/2,alreadyUsedValues);
                    }

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
