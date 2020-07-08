//this file contains functions only usable by warriors.

//if in range and not on cooldown, taunts the target.
function taunt(){
    if(!character.party || !can_use('taunt')) return;
    let party = parent.party_list;
    for(let name of party){
        let partyMem = get_player(name);
        partyTarget = get_target_of(partyMem);
        if(is_monster(partyTarget) && partyMem != character){
            break;
        }
    }
    if(!partyTarget) return;
    if(distance(character, partyTarget) < 200){
        use_skill('taunt', partyTarget);
    }
}

//if not on cooldown, attempts to use charge.
function charge(){
    if(can_use('charge')){
        use_skill('charge');
    }
}