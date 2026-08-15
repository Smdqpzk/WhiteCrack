import {
    renderPixelPlayer
} from "../player/pixel-sprite.js";


export class Renderer {

    constructor(
        ctx,
        width,
        height
    ) {

        this.ctx = ctx;

        this.width = width;

        this.height = height;

        this.ctx.imageSmoothingEnabled =
            false;

    }


    /* =====================================================
       Clear
    ===================================================== */

    clear() {

        this.ctx.fillStyle =
            "#e8e8e8";

        this.ctx.fillRect(

            0,
            0,

            this.width,
            this.height

        );

    }


    /* =====================================================
       Room
    ===================================================== */

    drawRoom(
        room,
        camera,
        game
    ) {

        const ctx =
            this.ctx;


        /* =====================
           White sand
        ===================== */

        ctx.fillStyle =
            "#e9e9e9";

        ctx.fillRect(

            0,
            0,

            this.width,
            this.height

        );


        /* =====================
           Sand texture
        ===================== */

        const startX =
            Math.floor(
                camera.x / 8
            ) * 8;


        const startY =
            Math.floor(
                camera.y / 8
            ) * 8;


        for (
            let y = startY;

            y <
            camera.y +
            this.height +
            8;

            y += 8
        ) {

            for (
                let x = startX;

                x <
                camera.x +
                this.width +
                8;

                x += 8
            ) {

                const hash =
                    (
                        x * 17 +
                        y * 31
                    ) % 11;


                if (
                    hash < 2
                ) {

                    ctx.fillStyle =
                        "#d5d5d5";


                    ctx.fillRect(

                        Math.round(
                            x -
                            camera.x
                        ),

                        Math.round(
                            y -
                            camera.y
                        ),

                        1,
                        1

                    );

                }

            }

        }


        /* =====================
           Room objects
        ===================== */

        const objects =
            [
                ...room.objects
            ];


        /*
            Y sorting gives
            fake depth.
        */

        objects.sort(

            (a, b) =>
                a.y - b.y

        );


        for (
            const object
            of objects
        ) {

            this.drawObject(

                object,
                camera,
                game

            );

        }


        /* =====================
           Lantern
        ===================== */

        if (
            game.lantern
        ) {

            this.drawLantern(
                camera,
                game
            );

        }

    }


    /* =====================================================
       Objects
    ===================================================== */

    drawObject(
        object,
        camera,
        game
    ) {

        const ctx =
            this.ctx;


        const x =
            Math.round(
                object.x -
                camera.x
            );


        const y =
            Math.round(
                object.y -
                camera.y
            );


        /* =====================
           Tree
        ===================== */

        if (
            object.type ===
            "tree"
        ) {

            this.drawShadow(
                x,
                y + 4,
                12,
                4
            );


            /*
                Trunk
            */

            ctx.fillStyle =
                "#765037";


            ctx.fillRect(

                x - 3,
                y - 20,

                6,
                24

            );


            /*
                Dark foliage
            */

            ctx.fillStyle =
                "#314f35";


            ctx.beginPath();

            ctx.arc(

                x,
                y - 25,

                13,

                0,
                Math.PI * 2

            );

            ctx.fill();


            /*
                Light foliage
            */

            ctx.fillStyle =
                "#416b45";


            ctx.beginPath();

            ctx.arc(

                x - 6,
                y - 29,

                8,

                0,
                Math.PI * 2

            );

            ctx.fill();

        }


        /* =====================
           Rock
        ===================== */

        if (
            object.type ===
            "rock"
        ) {

            this.drawShadow(

                x,
                y + 3,

                9,
                3

            );


            ctx.fillStyle =
                "#8b8b8b";


            ctx.beginPath();

            ctx.ellipse(

                x,
                y - 3,

                8,
                6,

                0,

                0,
                Math.PI * 2

            );

            ctx.fill();


            /*
                Rock highlight
            */

            ctx.fillStyle =
                "#a7a7a7";


            ctx.fillRect(

                x - 3,
                y - 6,

                4,
                2

            );

        }


        /* =====================
           Memory
        ===================== */

        if (
            object.type ===
            "memory"
        ) {

            const pulse =
                Math.sin(
                    performance.now()
                    / 250
                ) * 2;


            /*
                Glow
            */

            ctx.fillStyle =
                "rgba(255,230,120,.18)";


            ctx.beginPath();

            ctx.arc(

                x,
                y - 8,

                8 + pulse,

                0,
                Math.PI * 2

            );

            ctx.fill();


            /*
                Core
            */

            ctx.fillStyle =
                "#fff4a3";


            ctx.beginPath();

            ctx.arc(

                x,
                y - 8,

                4 + pulse,

                0,
                Math.PI * 2

            );

            ctx.fill();


            /*
                Light
            */

            ctx.fillStyle =
                "#ffffff";


            ctx.fillRect(

                x - 1,
                y - 13,

                2,
                10

            );

        }


        /* =====================
           Lantern
        ===================== */

        if (
            object.type ===
            "lantern"
        ) {

            ctx.fillStyle =
                "#4a3a28";


            ctx.fillRect(

                x - 3,
                y - 10,

                6,
                10

            );


            ctx.fillStyle =
                "#ffd85c";


            ctx.fillRect(

                x - 4,
                y - 14,

                8,
                6

            );

        }


        /* =====================
           NPC
        ===================== */

        if (
            object.type ===
            "npc"
        ) {

            this.drawShadow(

                x,
                y + 4,

                8,
                3

            );


            /*
                Clothes
            */

            ctx.fillStyle =
                "#6c6c80";


            ctx.fillRect(

                x - 6,
                y - 15,

                12,
                15

            );


            /*
                Face
            */

            ctx.fillStyle =
                "#d9ad86";


            ctx.fillRect(

                x - 5,
                y - 23,

                10,
                10

            );

        }


        /* =====================
           Exit
        ===================== */

        if (
            object.type ===
            "exit"
        ) {

            ctx.fillStyle =
                "#7a687e";


            ctx.fillRect(

                x - 7,
                y - 14,

                14,
                14

            );


            ctx.fillStyle =
                "#d7c6e0";


            ctx.fillRect(

                x - 3,
                y - 10,

                6,
                10

            );

        }

    }


    /* =====================================================
       Shadow
    ===================================================== */

    drawShadow(
        x,
        y,
        rx,
        ry
    ) {

        const ctx =
            this.ctx;


        ctx.fillStyle =
            "rgba(50,50,50,.25)";


        ctx.beginPath();


        ctx.ellipse(

            Math.round(x),
            Math.round(y),

            rx,
            ry,

            0,

            0,
            Math.PI * 2

        );


        ctx.fill();

    }


    /* =====================================================
       Player
    ===================================================== */

    drawPlayer(
        player,
        camera,
        game
    ) {

        renderPixelPlayer(

            this.ctx,

            player,

            camera

        );

    }


    /* =====================================================
       Lantern vision
    ===================================================== */

    drawLantern(
        camera,
        game
    ) {

        const ctx =
            this.ctx;


        /*
            Very subtle warm tint.
        */

        ctx.fillStyle =
            "rgba(255,230,150,.07)";


        ctx.fillRect(

            0,
            0,

            this.width,
            this.height

        );


        /*
            Lantern glow
        */

        const centerX =
            this.width / 2;


        const centerY =
            this.height / 2;


        const gradient =
            ctx.createRadialGradient(

                centerX,
                centerY,

                10,

                centerX,
                centerY,

                85

            );


        gradient.addColorStop(
            0,
            "rgba(255,240,170,.18)"
        );


        gradient.addColorStop(
            1,
            "rgba(255,230,150,0)"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(

            0,
            0,

            this.width,
            this.height

        );

    }

}