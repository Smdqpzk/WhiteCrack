export class Renderer {

    constructor(
        ctx,
        width,
        height
    ) {

        this.ctx = ctx;

        this.width = width;
        this.height = height;

        ctx.imageSmoothingEnabled =
            false;

    }


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


    drawRoom(
        room,
        camera,
        game
    ) {

        const ctx =
            this.ctx;


        /*
            White sand
        */

        ctx.fillStyle =
            "#e9e9e9";

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );


        /*
            Sand texture
        */

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
            y < camera.y + this.height + 8;
            y += 8
        ) {

            for (
                let x = startX;
                x < camera.x + this.width + 8;
                x += 8
            ) {

                const hash =
                    (
                        x * 17 +
                        y * 31
                    ) % 11;


                if (hash < 2) {

                    ctx.fillStyle =
                        "#d5d5d5";

                    ctx.fillRect(

                        x - camera.x,
                        y - camera.y,

                        1,
                        1

                    );

                }

            }

        }


        /*
            Objects sorted by Y
        */

        const objects =
            [...room.objects];


        objects.sort(
            (a,b) =>
                a.y - b.y
        );


        /*
            Draw objects
        */

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


        /*
            Lantern vision
        */

        if (game.lantern) {

            this.drawLantern(
                camera,
                game
            );

        }

    }


    drawObject(
        object,
        camera,
        game
    ) {

        const ctx =
            this.ctx;

        const x =
            object.x -
            camera.x;

        const y =
            object.y -
            camera.y;


        /*
            Tree
        */

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


            ctx.fillStyle =
                "#765037";

            ctx.fillRect(
                x - 3,
                y - 20,
                6,
                24
            );


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


        /*
            Rock
        */

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

        }


        /*
            Memory
        */

        if (
            object.type ===
            "memory"
        ) {

            const pulse =
                Math.sin(
                    performance.now() / 250
                ) * 2;


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


            ctx.fillStyle =
                "#fff";

            ctx.fillRect(
                x - 1,
                y - 13,
                2,
                10
            );

        }


        /*
            Lantern
        */

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


        /*
            NPC
        */

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


            ctx.fillStyle =
                "#6c6c80";

            ctx.fillRect(
                x - 6,
                y - 15,
                12,
                15
            );


            ctx.fillStyle =
                "#d9ad86";

            ctx.fillRect(
                x - 5,
                y - 23,
                10,
                10
            );

        }


        /*
            Exit
        */

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
            x,
            y,
            rx,
            ry,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    drawPlayer(
        player,
        camera,
        game
    ) {

        const ctx =
            this.ctx;

        const x =
            player.x -
            camera.x;

        const y =
            player.y -
            camera.y;


        this.drawShadow(
            x,
            y + 4,
            8,
            3
        );


        /*
            Soul aura
        */

        if (
            player.soul ===
            "yang"
        ) {

            ctx.fillStyle =
                "rgba(255,190,80,.25)";

        } else {

            ctx.fillStyle =
                "rgba(150,180,255,.25)";

        }


        ctx.beginPath();

        ctx.arc(
            x,
            y - 8,
            13,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /*
            Body
        */

        ctx.fillStyle =
            player.soul === "yang"
                ? "#9b5139"
                : "#596d9b";


        ctx.fillRect(
            x - 6,
            y - 15,
            12,
            15
        );


        /*
            Head
        */

        ctx.fillStyle =
            "#d7a47d";

        ctx.fillRect(
            x - 5,
            y - 23,
            10,
            10
        );


        /*
            Hair
        */

        ctx.fillStyle =
            "#25242b";

        ctx.fillRect(
            x - 5,
            y - 25,
            10,
            4
        );


        /*
            Yang attack
        */

        if (
            player.attackTimer > 0 &&
            player.soul ===
            "yang"
        ) {

            ctx.strokeStyle =
                "#ffdc72";

            ctx.lineWidth = 2;

            ctx.beginPath();

            ctx.arc(
                x,
                y - 8,
                17,
                -1.1,
                1.1
            );

            ctx.stroke();

        }


        /*
            Yin chain
        */

        if (
            player.attackTimer > 0 &&
            player.soul ===
            "yin"
        ) {

            ctx.strokeStyle =
                "#a9d5ff";

            ctx.lineWidth = 2;

            ctx.beginPath();

            ctx.moveTo(
                x + 4,
                y - 9
            );

            ctx.lineTo(
                x + 24,
                y - 15
            );

            ctx.stroke();

        }

    }


    drawLantern(
        camera,
        game
    ) {

        /*
            This is a simple
            "冥視" overlay.

            Later we can make it
            reveal hidden objects.
        */

        const ctx =
            this.ctx;

        ctx.fillStyle =
            "rgba(255,230,150,.07)";

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }

}