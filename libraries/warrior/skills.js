//if in range and attack not on cooldown, attacks the target.
function basicAttack(target){
    if(!target) return;
    if(can_attack(target)){
        set_message("Attacking");
        attack(target);
    }
}

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

//call with the percentage of hp/mp you want to use potions at. (50 = 50%)
function use_potion(hpLimit, mpLimit){
	if(!can_use('use_hp')) return;
	if(character.hp / character.max_hp < hpLimit / 100) use('use_hp');
	else if(character.mp / character.max_mp < mpLimit / 100) use('use_mp');
	else if(character.hp < character.max_hp) use ('regen_hp');
	else if(character.mp < character.max_mp) use ('regen_mp');
}