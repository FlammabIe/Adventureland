//contains functions for targeting with ranged characters.

//when in party, targets nearest monster targeted by allies.
//if no allies have targets or not in a party, targets nearest enemy.
function newTarget(target) {

    //if already targeting something, return
    if (target) return;

    if (character.party) {
        let party = parent.party_list;
        //checks if an ally in the party has a target. if a target is found, target it and return
        for (let name of party) {
            let partyMem = get_player(name);
            let partyTarget = get_target_of(partyMem);
            if (is_monster(partyTarget) && partyMem != character) {
                change_target(partyTarget);
                return;
            }
        }
    }

    //target the nearest monster that has a direct path available
    target = get_nearest_monster({ path_check: true });

    //if there is a monster, change target to that monster
    //else, return
    if (target) change_target(target);
    else {
        set_message("No Applicable Monsters");
        return;
    }
}