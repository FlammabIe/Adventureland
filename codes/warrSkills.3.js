//this file contains functions only usable by warriors.

//if in range and not on cooldown, taunts the target.
function taunt(target){
    if(!target) return;
    if(distance(target) < 200 && can_use('taunt')){
        use_skill('taunt', target);
    }
}

//if not on cooldown, attempts to use charge.
function charge(){
    if(can_use('charge')){
        use_skill('charge');
    }
}