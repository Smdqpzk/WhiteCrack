import {
    collisionBlocked
} from "../engine/collision.js";


export function createPlayer() {

    return {

        x: 160,

        y: 90,

        radius: 5,

        speed: 1.5,

        hp: 100,

        maxHp: 100,

        gold: 0,

        soul: "yang",

        attackTimer: 0,

        attackCooldown: 0,

        inventory: [],

        effects: [],

        memories: [],

        flags: {}

    };

}


export function updatePlayer(
    player,
    input,
    room
) {

    let dx = 0;
    let dy = 0;


    if (
        input.isDown("w") ||
        input.isDown("arrowup")
    ) {

        dy -= 1;

    }


    if (
        input.isDown("s") ||
        input.isDown("arrowdown")
    ) {

        dy += 1;

    }


    if (
        input.isDown("a") ||
        input.isDown("arrowleft")
    ) {

        dx -= 1;

    }


    if (
        input.isDown("d") ||
        input.isDown("arrowright")
    ) {

        dx += 1;

    }


    /*
        Normalize diagonal movement
    */

    if (
        dx !== 0 ||
        dy !== 0
    ) {

        const length =
            Math.hypot(
                dx,
                dy
            );

        dx /= length;
        dy /= length;

    }


    /*
        Yin is faster
    */

    const speed =
        player.soul === "yin"
            ? player.speed * 1.35
            : player.speed;


    const nextX =
        player.x +
        dx * speed;

    const nextY =
        player.y +
        dy * speed;


    /*
        X collision
    */

    if (
        !collisionBlocked(
            nextX,
            player.y,
            player.radius,
            room
        )
    ) {

        player.x =
            nextX;

    }


    /*
        Y collision
    */

    if (
        !collisionBlocked(
            player.x,
            nextY,
            player.radius,
            room
        )
    ) {

        player.y =
            nextY;

    }


    if (
        player.attackTimer > 0
    ) {

        player.attackTimer--;

    }


    if (
        player.attackCooldown > 0
    ) {

        player.attackCooldown--;

    }


    /*
        Attack
    */

    if (
        input.isDown(" ") &&
        player.attackCooldown <= 0
    ) {

        player.attackTimer =
            8;

        player.attackCooldown =
            player.soul === "yang"
                ? 18
                : 28;

    }

}