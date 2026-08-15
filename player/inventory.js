export function addItem(
    player,
    itemId
) {

    player.inventory.push(
        itemId
    );

}


export function hasItem(
    player,
    itemId
) {

    return player.inventory
        .includes(itemId);

}


export function removeItem(
    player,
    itemId
) {

    const index =
        player.inventory
            .indexOf(itemId);

    if (index !== -1) {

        player.inventory
            .splice(index, 1);

        return true;

    }

    return false;

}