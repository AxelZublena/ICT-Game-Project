window.addEventListener('load', () => {
    const game = new Game(document.getElementById('canvas'));
});
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 1000;
        this.canvas.height = 1000;
    }
}
//# sourceMappingURL=app.js.map