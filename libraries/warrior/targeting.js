//contains functions for targeting, and for skills who may want to target something other than the main target.

//targets nearest monster if not in party.
//when in party, targets nearest monster targeted by allies.
function target(target) {

    if (character.party) {
        //checks if an ally in the party has a target. if a target is found, target it and return
        //will also check self for targets.
        for (i = 0; i < parent.party_list.size; i++) {
            partyMem = get_player(parent.party_list(i));
            partyTarget = get_target_of(partyMem);
            if (partyTarget) {
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

//returns a monster entity to taunt.
//If no applicable target, returns null.
//automatically returns null if not in a party (no need to taunt).
function tauntTarget(){
    if(!character.party) return;
    party = parent.party_list;
    for(i=0;i<party.size;i++){
        partyMem = get_player(party(i));
        partyTarget = get_target_of(partyMem);
        if(is_monster(party_target)){
            mobTarget = (get_target_of(partyTarget));
        }
        if(mobTarget != character && !mobTarget){
            return mobTarget;
        }
    }
    return;
}