export class Camera {

    constructor(width, height) {

        this.width = width;
        this.height = height;

        this.x = 0;
        this.y = 0;

        this.smoothing = 0.12;

    }


    follow(
        targetX,
        targetY,
        worldWidth,
        worldHeight
    ) {

        const targetCameraX =
            targetX -
            this.width / 2;

        const targetCameraY =
            targetY -
            this.height / 2;


        this.x +=
            (
                targetCameraX -
                this.x
            ) *
            this.smoothing;


        this.y +=
            (
                targetCameraY -
                this.y
            ) *
            this.smoothing;


        const maxX =
            Math.max(
                0,
                worldWidth -
                this.width
            );

        const maxY =
            Math.max(
                0,
                worldHeight -
                this.height
            );


        this.x =
            Math.max(
                0,
                Math.min(
                    maxX,
                    this.x
                )
            );


        this.y =
            Math.max(
                0,
                Math.min(
                    maxY,
                    this.y
                )
            );

    }


    screenX(worldX) {

        return worldX - this.x;

    }


    screenY(worldY) {

        return worldY - this.y;

    }

}