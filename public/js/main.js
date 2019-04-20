import Compositor from './Compositor.js';
import { loadLevel } from './loader.js';
import { loadMarioSprites, loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; ++i) {
            sprite.draw('idle', context, pos.x, pos.y)
        }
    };
}

class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }
}

Promise.all([
        loadMarioSprites(),
        loadBackgroundSprites(),
        loadLevel('1-1'),
    ])
    .then(([marioSprite, backgroundSprites, level]) => {
        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const gravity = 0.5;

        const mario = new Entity();
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);

        const spriteLayer = createSpriteLayer(marioSprite, mario.pos);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);
            mario.pos.x += mario.vel.x;
            mario.pos.y += mario.vel.y;
            mario.vel.y += gravity;
            requestAnimationFrame(update);
        }
        update();
    });