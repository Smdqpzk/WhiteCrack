const PIXEL = 2;

const PALETTE = {
    ".": null,
    "K": "#14151a",   // outline
    "D": "#262932",   // deepest cloth
    "C": "#3b3f49",   // cloak
    "L": "#565c68",   // cloak light
    "G": "#bf8a3f",   // gold
    "H": "#e0b35f",   // gold highlight
    "S": "#e7b394",   // skin
    "E": "#171419",   // eyes
    "W": "#f0e7df"    // eye glint
};

function rows(...r) {
    return r.map(line => line.padEnd(16, ".").slice(0, 16));
}

/*
    16x16 pixel character.
    Each direction has 5 walking frames.
*/
const SPRITES = {
    down: [
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLCSSSCLLK..",
            ".KLCSSSSSCLK..",
            ".KLLCCCCLLLK..",
            ".KLLCGGGCLLK..",
            "..KLCGGGCLK...",
            "..KCCGGCCCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCC....CCK...",
            ".KDDK....KDDK..",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLCSSSCLLK..",
            ".KLCSSSSSCLK..",
            ".KLLCCCCLLLK..",
            ".KLLCGGGCLLK..",
            "..KLCGGGCLK...",
            "..KCCGGCCCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            ".KCCC....CCK...",
            "..KDDK..KDDK...",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLCSSSCLLK..",
            ".KLCSSSSSCLK..",
            ".KLLCCCCLLLK..",
            ".KLLCGGGCLLK..",
            "..KLCGGGCLK...",
            "..KCCGGCCCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            ".KCCCCCCCK....",
            "..KDDK..KDDK...",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLCSSSCLLK..",
            ".KLCSSSSSCLK..",
            ".KLLCCCCLLLK..",
            ".KLLCGGGCLLK..",
            "..KLCGGGCLK...",
            "..KCCGGCCCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCCCCCCK....",
            ".KDDK....KDDK..",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLCSSSCLLK..",
            ".KLCSSSSSCLK..",
            ".KLLCCCCLLLK..",
            ".KLLCGGGCLLK..",
            "..KLCGGGCLK...",
            "..KCCGGCCCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            ".KCCC....CCK...",
            "..KDDK..KDDK...",
            "................",
            "................"
        )
    ],

    up: [
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLLCCCCLLK..",
            ".KLLCCCCCCLK..",
            ".KLLCGGGCLLK..",
            ".KLCGGGGCLK...",
            "..KCGGGGCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCCCCCCCK...",
            ".KCC....CCK...",
            ".KDDK....KDDK..",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLLCCCCLLK..",
            ".KLLCCCCCCLK..",
            ".KLLCGGGCLLK..",
            ".KLCGGGGCLK...",
            "..KCGGGGCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCCCCCCCK...",
            ".KCCC....CCK...",
            "..KDDK..KDDK...",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLLCCCCLLK..",
            ".KLLCCCCCCLK..",
            ".KLLCGGGCLLK..",
            ".KLCGGGGCLK...",
            "..KCGGGGCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            ".KCCCCCCCK....",
            ".KCC....CCK...",
            "..KDDK..KDDK...",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLLCCCCLLK..",
            ".KLLCCCCCCLK..",
            ".KLLCGGGCLLK..",
            ".KLCGGGGCLK...",
            "..KCGGGGCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCCCCCCK....",
            ".KCC....CCK...",
            ".KDDK....KDDK..",
            "................",
            "................"
        ),
        rows(
            "....KKKKKK....",
            "...KLLLLLLK...",
            "..KLLCCCCLLK..",
            "..KLLCCCCLLK..",
            ".KLLCCCCCCLK..",
            ".KLLCGGGCLLK..",
            ".KLCGGGGCLK...",
            "..KCGGGGCK...",
            ".KCCCCCCCCCK..",
            ".KCCCGGGCCCK..",
            "..KCCCDCCCK...",
            "..KCCCCCCCK...",
            ".KCCC....CCK...",
            "..KDDK..KDDK...",
            "................",
            "................"
        )
    ],

    left: [
        rows(
            "...KKKKKKK....",
            "..KLLLLLLLK...",
            ".KLLCCCCCCK...",
            ".KLCSSCCCLK...",
            ".KLCSSCCCCK...",
            ".KLLCCCCCCK...",
            "..KLCGGGCK....",
            "..KCCGGGCK....",
            ".KCCCCCCCK....",
            ".KCCCGGGCK....",
            "..KCCCDCCK....",
            "...KCCCCC.K...",
            "...KCCC...K...",
            "..KDDK...KDK...",
            "................",
            "................"
        ),
        rows(
            "...KKKKKKK....",
            "..KLLLLLLLK...",
            ".KLLCCCCCCK...",
            ".KLCSSCCCLK...",
            ".KLCSSCCCCK...",
            ".KLLCCCCCCK...",
            "..KLCGGGCK....",
            "..KCCGGGCK....",
            ".KCCCCCCCK....",
            ".KCCCGGGCK....",
            "..KCCCDCCK....",
            "...KCCCCCK....",
            "...KCCC..K....",
            "..KDDK..KDK...",
            "................",
            "................"
        ),
        rows(
            "...KKKKKKK....",
            "..KLLLLLLLK...",
            ".KLLCCCCCCK...",
            ".KLCSSCCCLK...",
            ".KLCSSCCCCK...",
            ".KLLCCCCCCK...",
            "..KLCGGGCK....",
            "..KCCGGGCK....",
            ".KCCCCCCCK....",
            ".KCCCGGGCK....",
            "..KCCCDCCK....",
            "...KCCCK......",
            "...KCCCC.K....",
            "..KDDK..KDK...",
            "................",
            "................"
        ),
        rows(
            "...KKKKKKK....",
            "..KLLLLLLLK...",
            ".KLLCCCCCCK...",
            ".KLCSSCCCLK...",
            ".KLCSSCCCCK...",
            ".KLLCCCCCCK...",
            "..KLCGGGCK....",
            "..KCCGGGCK....",
            ".KCCCCCCCK....",
            ".KCCCGGGCK....",
            "..KCCCDCCK....",
            "...KCCCCK.....",
            "..KCC...K.....",
            "..KDDK...KDK..",
            "................",
            "................"
        ),
        rows(
            "...KKKKKKK....",
            "..KLLLLLLLK...",
            ".KLLCCCCCCK...",
            ".KLCSSCCCLK...",
            ".KLCSSCCCCK...",
            ".KLLCCCCCCK...",
            "..KLCGGGCK....",
            "..KCCGGGCK....",
            ".KCCCCCCCK....",
            ".KCCCGGGCK....",
            "..KCCCDCCK....",
            "...KCCCK......",
            "...KCCCC.K....",
            "..KDDK..KDK...",
            "................",
            "................"
        )
    ]
};

// Build right-facing frames by horizontal mirroring the left-facing frames.
SPRITES.right = SPRITES.left.map(frame =>
    frame.map(row => row.split("").reverse().join(""))
);

function drawPixelSprite(ctx, sprite, x, y, scale = 2) {
    const offsetX = Math.round(x - 8 * scale);
    const offsetY = Math.round(y - 15 * scale);

    for (let py = 0; py < 16; py++) {
        for (let px = 0; px < 16; px++) {
            const code = sprite[py][px];
            const color = PALETTE[code];
            if (!color) continue;

            ctx.fillStyle = color;
            ctx.fillRect(
                offsetX + px * scale,
                offsetY + py * scale,
                scale,
                scale
            );
        }
    }
}

export function getPixelPlayerFrame(direction, frame) {
    const frames = SPRITES[direction] || SPRITES.down;
    return frames[frame % frames.length];
}

export function renderPixelPlayer(ctx, player, camera) {
    const now = performance.now();

    const moving = !!player.moving;
    const direction = player.direction || "down";

    let frame = 0;

    if (moving) {
        frame = Math.floor(now / 120) % 5;
    }

    // Scale 2 means each logical pixel becomes 2x2 screen pixels.
    drawPixelSprite(
        ctx,
        getPixelPlayerFrame(direction, frame),
        player.x - camera.x,
        player.y - camera.y,
        2
    );
}
