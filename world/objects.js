export function getRoomObjects(
    roomId
) {

    if (
        roomId ===
        "wasteland"
    ) {

        return [

            {
                type: "tree",
                x: 300,
                y: 150,
                radius: 14,
                solid: true
            },

            {
                type: "tree",
                x: 650,
                y: 380,
                radius: 14,
                solid: true
            },

            {
                type: "rock",
                x: 450,
                y: 300,
                radius: 10,
                solid: true
            },

            {
                type: "rock",
                x: 760,
                y: 170,
                radius: 10,
                solid: true
            },

            {
                type: "memory",
                x: 560,
                y: 230,
                radius: 8,
                solid: false,

                memoryId:
                    "blacksmith_01",

                prompt:
                    "E：拾取記憶碎片"

            },

            {
                type: "npc",
                x: 720,
                y: 300,
                radius: 8,
                solid: true,

                dialogue:
                    "old_man_01",

                prompt:
                    "E：與老者交談"

            },

            {
                type: "exit",
                x: 900,
                y: 270,
                radius: 15,
                solid: false,

                target:
                    "river",

                prompt:
                    "E：前往忘川河畔"

            }

        ];

    }


    if (
        roomId ===
        "river"
    ) {

        return [

            {
                type: "tree",
                x: 250,
                y: 130,
                radius: 14,
                solid: true
            },

            {
                type: "tree",
                x: 500,
                y: 420,
                radius: 14,
                solid: true
            },

            {
                type: "rock",
                x: 400,
                y: 240,
                radius: 10,
                solid: true
            },

            {
                type: "memory",
                x: 650,
                y: 200,
                radius: 8,
                solid: false,

                memoryId:
                    "river_01",

                prompt:
                    "E：拾取記憶碎片"

            },

            {
                type: "exit",
                x: 50,
                y: 270,
                radius: 15,
                solid: false,

                target:
                    "wasteland",

                prompt:
                    "E：返回白色荒原"

            }

        ];

    }


    return [];

}


export function getNearbyObject(
    room,
    player
) {

    let nearest = null;

    let nearestDistance =
        Infinity;


    for (
        const object
        of room.objects
    ) {

        const d =
            Math.hypot(
                player.x -
                object.x,

                player.y -
                object.y
            );


        if (
            d < 28 &&
            d < nearestDistance
        ) {

            nearest =
                object;

            nearestDistance =
                d;

        }

    }


    return nearest;

}