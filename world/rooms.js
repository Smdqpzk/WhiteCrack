import {
    getRoomObjects
} from "./objects.js";


const roomData = {

    wasteland: {

        name:
            "白色荒原・記憶殘骸區",

        width:
            960,

        height:
            540,

        spawn: {

            x: 160,

            y: 270

        }

    },


    river: {

        name:
            "忘川河畔",

        width:
            960,

        height:
            540,

        spawn: {

            x: 100,

            y: 270

        }

    }

};


export function createRoom(id) {

    const data =
        roomData[id];

    if (!data) {

        throw new Error(
            "Unknown room: " + id
        );

    }


    return {

        id,

        name:
            data.name,

        width:
            data.width,

        height:
            data.height,

        spawn:
            {...data.spawn},

        objects:
            getRoomObjects(id)

    };

}


export function getRoom(id) {

    return roomData[id];

}