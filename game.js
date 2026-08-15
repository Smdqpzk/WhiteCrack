import {
    Input
} from "./engine/input.js";

import {
    Camera
} from "./engine/camera.js";

import {
    Renderer
} from "./engine/renderer.js";

import {
    collisionBlocked
} from "./engine/collision.js";

import {
    createPlayer,
    updatePlayer
} from "./player/player.js";

import {
    toggleSoul
} from "./player/soul.js";

import {
    createRoom,
    getRoom
} from "./world/rooms.js";

import {
    getNearbyObject
} from "./world/objects.js";

import {
    Dialogue
} from "./story/dialogue.js";

import {
    memories
} from "./story/memories.js";

import {
    flags
} from "./story/flags.js";


/* ==================================================
   Canvas
================================================== */

const canvas =
    document.getElementById("game");

const ctx =
    canvas.getContext("2d");


/*
    Pixel resolution.

    遊戲真正繪製在 320x180，
    再放大到螢幕。
*/

const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

ctx.imageSmoothingEnabled = false;


/* ==================================================
   Core systems
================================================== */

const input =
    new Input();

const camera =
    new Camera(
        GAME_WIDTH,
        GAME_HEIGHT
    );

const renderer =
    new Renderer(
        ctx,
        GAME_WIDTH,
        GAME_HEIGHT
    );

const dialogue =
    new Dialogue();


/* ==================================================
   Player
================================================== */

const player =
    createPlayer();


/* ==================================================
   Current room
================================================== */

let currentRoom =
    createRoom("wasteland");


/* ==================================================
   Game state
================================================== */

const game = {

    roomId: "wasteland",

    lantern: false,

    interacting: false,

    time: 0

};


/* ==================================================
   Room changing
================================================== */

function changeRoom(roomId) {

    currentRoom =
        createRoom(roomId);

    game.roomId =
        roomId;

    player.x =
        currentRoom.spawn.x;

    player.y =
        currentRoom.spawn.y;

}


/* ==================================================
   Save
================================================== */

function saveGame() {

    const save = {

        player: {
            ...player,

            inventory:
                [...player.inventory],

            memories:
                [...player.memories],

            effects:
                [...player.effects],

            flags:
                {...player.flags}

        },

        roomId:
            game.roomId,

        lantern:
            game.lantern

    };

    localStorage.setItem(
        "whiteCrackSave",
        JSON.stringify(save)
    );

    showInteraction(
        "遊戲已儲存"
    );

}


/* ==================================================
   Load
================================================== */

function loadGame() {

    const raw =
        localStorage.getItem(
            "whiteCrackSave"
        );

    if (!raw) {

        showInteraction(
            "沒有找到存檔"
        );

        return;

    }

    try {

        const save =
            JSON.parse(raw);

        Object.assign(
            player,
            save.player
        );

        game.roomId =
            save.roomId;

        game.lantern =
            save.lantern;

        currentRoom =
            createRoom(
                game.roomId
            );

        showInteraction(
            "已讀取存檔"
        );

    } catch {

        showInteraction(
            "存檔損壞"
        );

    }

}


/* ==================================================
   Interaction UI
================================================== */

let interactionTimer = 0;

function showInteraction(text) {

    const el =
        document.getElementById(
            "interaction"
        );

    el.textContent =
        text;

    el.style.display =
        "block";

    interactionTimer =
        120;

}


/* ==================================================
   Memory
================================================== */

function collectMemory(memoryId) {

    if (
        player.memories
            .includes(memoryId)
    ) {

        return;

    }

    const memory =
        memories[memoryId];

    if (!memory) return;

    player.memories.push(
        memoryId
    );

    player.flags[
        memory.flag
    ] = true;

    dialogue.start(
        memory.dialogue
    );

}


/* ==================================================
   Interaction
================================================== */

function interact() {

    const object =
        getNearbyObject(
            currentRoom,
            player
        );

    if (!object) {

        return;

    }


    if (
        object.type ===
        "memory"
    ) {

        collectMemory(
            object.memoryId
        );

        return;

    }


    if (
        object.type ===
        "npc"
    ) {

        dialogue.start(
            object.dialogue
        );

        return;

    }


    if (
        object.type ===
        "exit"
    ) {

        changeRoom(
            object.target
        );

    }

}


/* ==================================================
   Input events
================================================== */

input.onPress(
    "q",
    () => {

        toggleSoul(player);

    }
);


input.onPress(
    "e",
    () => {

        if (!dialogue.active) {

            interact();

        }

    }
);


input.onPress(
    "f",
    () => {

        game.lantern =
            !game.lantern;

        showInteraction(
            game.lantern
                ? "引魂燈已點燃"
                : "引魂燈已熄滅"
        );

    }
);


input.onPress(
    "k",
    saveGame
);


input.onPress(
    "l",
    loadGame
);


input.onPress(
    " ",
    () => {

        if (dialogue.active) {

            dialogue.next();

        }

    }
);


input.onPress(
    "enter",
    () => {

        if (dialogue.active) {

            dialogue.next();

        }

    }
);


/* ==================================================
   Update
================================================== */

function update() {

    game.time++;


    /*
        Dialogue blocks gameplay.
    */

    if (!dialogue.active) {

        updatePlayer(
            player,
            input,
            currentRoom
        );

    }


    /*
        Interaction
    */

    const nearby =
        getNearbyObject(
            currentRoom,
            player
        );


    if (
        nearby &&
        !dialogue.active
    ) {

        const text =
            nearby.prompt ||
            "E：互動";

        document.getElementById(
            "interaction"
        ).textContent =
            text;

        document.getElementById(
            "interaction"
        ).style.display =
            "block";

    } else if (
        interactionTimer <= 0
    ) {

        document.getElementById(
            "interaction"
        ).style.display =
            "none";

    }


    if (interactionTimer > 0) {

        interactionTimer--;

    }


    /*
        Camera
    */

    camera.follow(
        player.x,
        player.y,
        currentRoom.width,
        currentRoom.height
    );


    /*
        UI
    */

    updateUI();

}


/* ==================================================
   UI
================================================== */

function updateUI() {

    document.getElementById(
        "hp"
    ).textContent =
        Math.floor(player.hp);

    document.getElementById(
        "maxHp"
    ).textContent =
        player.maxHp;

    document.getElementById(
        "gold"
    ).textContent =
        player.gold;

    document.getElementById(
        "memoryCount"
    ).textContent =
        player.memories.length;

    document.getElementById(
        "soul"
    ).textContent =
        player.soul === "yang"
            ? "☀️ 陽相"
            : "🌙 陰相";


    const inventory =
        player.inventory;

    document.getElementById(
        "inventoryText"
    ).textContent =
        inventory.length
            ? inventory.join(", ")
            : "空";

}


/* ==================================================
   Render
================================================== */

function render() {

    renderer.clear();

    renderer.drawRoom(
        currentRoom,
        camera,
        game
    );

    renderer.drawPlayer(
        player,
        camera,
        game
    );

}


/* ==================================================
   Main loop
================================================== */

function loop() {

    update();

    render();

    requestAnimationFrame(
        loop
    );

}


loop();