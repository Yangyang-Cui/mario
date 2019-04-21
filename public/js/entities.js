import Entity, { Trait } from "./Entity.js";
import { loadMarioSprites } from './sprites.js';

class Velocity extends Trait {
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}

export function createMario() {
    return loadMarioSprites()
        .then(sprite => {
            const mario = new Entity();

            mario.addTrait(new Velocity());

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            }

            return mario;
        });
};