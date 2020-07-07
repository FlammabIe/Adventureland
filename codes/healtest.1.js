// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true

function on_party_invite(name){
	if(name == "rangeBot"){
		accept_party_invite(name);
	}
}

//returns target with lowest % HP
//check if player hp is below max before calling.
function check_party_hp(name1, name2, name3){
	var hp1 = name1.hp/name1.max_hp;
	var hp2 = name2.hp/name2.max_hp;
	var hp3 = name3.hp/name3.max_hp;
	if(hp1 < hp2 && hp1 < hp3){
		return name1;
	}else if(hp2 < hp1 && hp2 < hp3){
		return name2;
	}
	return name3;
}

function check_party_hp(name1, name2){
	var hp1 = name1.hp/name1.max_hp;
	var hp2 = name2.hp/name2.max_hp;
	if(hp1 < hp2){
		return name1;
	}
	return name2;
}
	
setInterval(function(){
	
	var rangeBot = get_player("rangeBot");
	var mageBot = get_player("mageBot");
	
	if(rangeBot!= null && !in_attack_range(rangeBot)){
		move(
			character.x+(rangeBot.x-character.x)/2,
			character.y+(rangeBot.y-character.y)/2
			);
		// Walk half the distance
	}else if(mageBot!= null && !in_attack_range(mageBot) && rangeBot == null){
		move(
			character.x+(rangeBot.x-character.x)/2,
			character.y+(rangeBot.y-character.y)/2
			);
		// Walk half the distance if rangeBot not here
	}
	
	use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;
	
	var target = check_party_hp(character, mageBot, rangeBot);
		
	if(character.hp<character.max_hp && 
	   rangeBot.hp<rangeBot.max_hp && 
	   mageBot.hp<mageBot.max_hp && 
	   can_use("partyheal") && character.mp>400 && 
	   !(rangeBot == null) && !(mageBot == null))
	{
		set_message("Activating party heal");
		use_skill("partyheal");
	}
	
	else if(!in_attack_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
	}
	
	else if(can_attack(target))
	{
		set_message("Healing");
		heal(target);
	}

	if(!(get_player("merchBot") == null))
	{
		send_gold("merchBot", character.gold);
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
