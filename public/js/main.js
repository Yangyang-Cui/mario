import { loadLevel } from './loader.js';
import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        };
    });
}


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
        loadMarioSprites(),
        loadBackgroundSprites(),
        loadLevel('1-1'),
    ])
    .then(([marioSprite, sprites, level]) => {

        const pos = {
            x: 64,
            y: 64
        };

        function update() {
            level.backgrounds.forEach(background => {
                drawBackground(background, context, sprites);
            });
            marioSprite.draw('idle', context, pos.x, pos.y);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }
        update();
    });