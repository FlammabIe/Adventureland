//contains functions for targeting, and for skills which may want to target something other than the main target.
//TODO: 3shot, 5shot, poisonarrow, 4fingers, piercingshot

//when in party, targets nearest monster targeted by allies.
//if no allies have targets or not in a party, targets nearest enemy.
function newTarget(target) {

    //if already targeting something, return
    if (target) return;

    if (character.party) {
        //checks if an ally in the party has a target. if a target is found, target it and return
        for (i = 0; i < parent.party_list.size; i++) {
            partyMem = get_player(parent.party_list(i));
            partyTarget = get_target_of(partyMem);
            if (partyTarget) {
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