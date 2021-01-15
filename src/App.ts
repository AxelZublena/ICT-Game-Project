let areImgLoaded = false;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", () => {
    while(true){
        if(areImgLoaded === true) {
            const game = new Game(document.getElementById("canvas"));
            break;
        }
    }
    
    console.log("loading done.");
});

function loadImages(){
    let images = new Array();
    const baseURL = "./assets/img/";
    const character: string[] = ["player/", "enemy/"];
    const folder: string[] = ["", "downwards/", "left/", "right/"];
    const name: string[] = ["survivor-move_knife_", "skeleton-move_"];

    let paths: string[] = [];

    // create all the string of the pictures' paths
    for (let i = 0; i < 2; i++){
        for (let j = 0; j < 4; j++) {
            let limit: number;
            if(character[i] === "player/"){
                limit = 20;
            }
            else{
                limit = 17;
            }
            for (let h = 0; h < limit; h++) {
                paths.push(
                    baseURL + character[i] +folder[j] + name[i] + h + ".png"
                );
            }
        }
    }

    for(let i = 0; i < 4; i++){
        paths.push(baseURL + "background" + i + ".jpg");
    }

    for (let i = 0; i < paths.length; i++) {
        images[i] = new Image();
        images[i].src = paths[i];
    }

    areImgLoaded = true;
}

loadImages();
