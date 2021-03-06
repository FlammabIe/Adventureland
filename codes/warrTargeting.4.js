//contains functions for melee targeting.

//targets nearest monster if not in party.
//when in party, targets nearest monster targeted by allies.
function newTarget(target) {

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

    //if already targeting something, return
    if (target) return;

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