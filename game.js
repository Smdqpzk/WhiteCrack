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
    createPlayer,
    updatePlayer
} from "./player/player.js";


import {
    toggleSoul
} from "./player/soul.js";


import {
    createRoom
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


/* =====================================================
   Canvas
===================================================== */

const canvas =
    document.getElementById(
        "game"
    );


const ctx =
    canvas.getContext(
        "2d"
    );


/*
    Internal pixel resolution
*/

const GAME_WIDTH =
    320;


const GAME_HEIGHT =
    180;


canvas.width =
    GAME_WIDTH;


canvas.height =
    GAME_HEIGHT;


ctx.imageSmoothingEnabled =
    false;


/* =====================================================
   Systems
===================================================== */

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


/* =====================================================
   Player
===================================================== */

const player =
    createPlayer();


/* =====================================================
   Game
===================================================== */

const game = {

    roomId:
        "wasteland",

    lantern:
        false,

    time:
        0

};


/* =====================================================
   Room
===================================================== */

let currentRoom =
    createRoom(
        game.roomId
    );


/* =====================================================
   Change room
===================================================== */

function changeRoom(
    roomId
) {

    currentRoom =
        createRoom(
            roomId
        );


    game.roomId =
        roomId;


    player.x =
        currentRoom.spawn.x;


    player.y =
        currentRoom.spawn.y;


    player.animationFrame =
        0;


    player.animationTimer =
        0;


    player.moving =
        false;

}


/* =====================================================
   Save
===================================================== */

function saveGame() {

    const data = {

        player: {

            ...player,

            inventory:
                [...player.inventory],

            effects:
                [...player.effects],

            memories:
                [...player.memories],

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

        JSON.stringify(data)

    );


    showMessage(
        "遊戲已儲存"
    );

}


/* =====================================================
   Load
===================================================== */

function loadGame() {

    const raw =
        localStorage.getItem(
            "whiteCrackSave"
        );


    if (!raw) {

        showMessage(
            "沒有找到存檔"
        );

        return;

    }


    try {

        const data =
            JSON.parse(
                raw
            );


        Object.assign(
            player,
            data.player
        );


        game.roomId =
            data.roomId ||
            "wasteland";


        game.lantern =
            !!data.lantern;


        currentRoom =
            createRoom(
                game.roomId
            );


        showMessage(
            "已讀取存檔"
        );


    } catch (
        error
    ) {

        console.error(
            error
        );


        showMessage(
            "存檔讀取失敗"
        );

    }

}


/* =====================================================
   Message
===================================================== */

let messageTimer =
    0;


function showMessage(
    text
) {

    const interaction =
        document.getElementById(
            "interaction"
        );


    interaction.textContent =
        text;


    interaction.style.display =
        "block";


    messageTimer =
        120;

}


/* =====================================================
   Memory
===================================================== */

function collectMemory(
    memoryId
) {

    if (
        player.memories
            .includes(
                memoryId
            )
    ) {

        showMessage(
            "這段記憶已經被拾回。"
        );

        return;

    }


    const memory =
        memories[
            memoryId
        ];


    if (!memory) {

        return;

    }


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


/* =====================================================
   Interaction
===================================================== */

function interact() {

    const object =
        getNearbyObject(

            currentRoom,

            player

        );


    if (!object) {

        return;

    }


    /* =====================
       Memory
    ===================== */

    if (
        object.type ===
        "memory"
    ) {

        collectMemory(
            object.memoryId
        );

        return;

    }


    /* =====================
       NPC
    ===================== */

    if (
        object.type ===
        "npc"
    ) {

        dialogue.start(
            object.dialogue
        );


        player.flags.metOldMan =
            true;


        return;

    }


    /* =====================
       Exit
    ===================== */

    if (
        object.type ===
        "exit"
    ) {

        changeRoom(
            object.target
        );

    }

}


/* =====================================================
   Controls
===================================================== */


/*
    Q = Soul switch
*/

input.onPress(

    "q",

    () => {

        if (
            dialogue.active
        ) {

            return;

        }


        toggleSoul(
            player
        );


        showMessage(

            player.soul === "yang"
                ? "☀️ 陽相"
                : "🌙 陰相"

        );

    }

);


/*
    E = Interact
*/

input.onPress(

    "e",

    () => {

        if (
            !dialogue.active
        ) {

            interact();

        }

    }

);


/*
    F = Lantern
*/

input.onPress(

    "f",

    () => {

        if (
            dialogue.active
        ) {

            return;

        }


        game.lantern =
            !game.lantern;


        showMessage(

            game.lantern
                ? "🕯️ 引魂燈已點燃"
                : "引魂燈已熄滅"

        );

    }

);


/*
    K = Save
*/

input.onPress(

    "k",

    saveGame

);


/*
    L = Load
*/

input.onPress(

    "l",

    loadGame

);


/*
    I = Load
    also supported
*/

input.onPress(

    "i",

    loadGame

);


/*
    Space = dialogue next
*/

input.onPress(

    " ",

    () => {

        if (
            dialogue.active
        ) {

            dialogue.next();

        }

    }

);


/*
    Enter = dialogue next
*/

input.onPress(

    "enter",

    () => {

        if (
            dialogue.active
        ) {

            dialogue.next();

        }

    }

);


/* =====================================================
   Update
===================================================== */

function update() {

    game.time++;


    /*
        Dialogue freezes player.
    */

    if (
        !dialogue.active
    ) {

        updatePlayer(

            player,

            input,

            currentRoom

        );

    }


    /* =====================
       Nearby object
    ===================== */

    const nearby =
        getNearbyObject(

            currentRoom,

            player

        );


    const interaction =
        document.getElementById(
            "interaction"
        );


    if (
        nearby &&
        !dialogue.active
    ) {

        interaction.textContent =
            nearby.prompt ||
            "E：互動";


        interaction.style.display =
            "block";


        messageTimer = 0;

    }

    else if (
        messageTimer <= 0
    ) {

        interaction.style.display =
            "none";

    }


    if (
        messageTimer > 0
    ) {

        messageTimer--;

    }


    /* =====================
       Camera
    ===================== */

    camera.follow(

        player.x,

        player.y,

        currentRoom.width,

        currentRoom.height

    );


    /* =====================
       UI
    ===================== */

    updateUI();

}


/* =====================================================
   UI
===================================================== */

function updateUI() {

    document.getElementById(
        "hp"
    ).textContent =
        Math.floor(
            player.hp
        );


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


/* =====================================================
   Render
===================================================== */

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


/* =====================================================
   Main loop
===================================================== */

function loop() {

    update();

    render();

    requestAnimationFrame(
        loop
    );

}


loop();