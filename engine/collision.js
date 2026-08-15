export function collisionBlocked(
    x,
    y,
    radius,
    room
) {

    /*
        World boundary
    */

    if (
        x - radius < 0 ||
        y - radius < 0 ||
        x + radius > room.width ||
        y + radius > room.height
    ) {

        return true;

    }


    /*
        Objects
    */

    for (
        const object
        of room.objects
    ) {

        if (!object.solid)
            continue;


        const r =
            object.radius || 0;


        const dx =
            x - object.x;

        const dy =
            y - object.y;


        const distance =
            Math.hypot(
                dx,
                dy
            );


        if (
            distance <
            radius + r
        ) {

            return true;

        }

    }


    return false;

}