import Compositor from './Compositor.js';
import { loadLevel } from './loader.js';
import { createMario } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
        createMario(),
        loadBackgroundSprites(),
        loadLevel('1-1'),
    ])
    .then(([mario, backgroundSprites, level]) => {
        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        // comp.layers.push(backgroundLayer);

        const gravity = 30;
        mario.pos.set(64, 180);
        mario.vel.set(200, -600);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        let deltaTime = 0;
        let lastTime = 0;

        function update(time) {
            deltaTime = (time - lastTime) / 1000;
            console.log(deltaTime);

            comp.draw(context);
            mario.update(deltaTime);
            console.log(mario.pos);

            mario.vel.y += gravity;
            requestAnimationFrame(update);
            //setTimeout(update, 1000 / 144);

            lastTime = time;
        }

        update(0);
    });