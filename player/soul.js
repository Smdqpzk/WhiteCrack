export function toggleSoul(player) {

    if (player.soul === "yang") {

        player.soul = "yin";

    } else {

        player.soul = "yang";

    }

    // 切換時重置動畫
    player.animationFrame = 0;
    player.animationTimer = 0;
    player.moving = false;

    console.log(
        "Soul switched to:",
        player.soul
    );

}
