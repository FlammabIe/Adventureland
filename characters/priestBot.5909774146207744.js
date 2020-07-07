// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true

setInterval(function(){
	
	//determine current party.
	var party = parent.party_list;
	
	//deploy code based on party composition.
	if(rangeBot){
		if(warrBot) rangeWarrior(rangeBot, warrBot);
		else if(mageBot) rangeMage(rangeBot, mageBot);
		else if(rougeBot) rangeRouge(rangeBot, rougeBot);
	}else if(warrBot){
		if(mageBot) warrMage(warrBot, mageBot);
		else if(rougeBot) warrRouge(warrBot, rougeBot);
	}else if(mageBot) mageRouge(mageBot, rougeBot);
	
	if(rangeBot && warrBot) rangeWarrior(rangeBot, warrBot);
	else if(rangeBot && mageBot) rangeMage(rangeBot, mageBot);
	else if(rangeBot && rougeBot) rangeRouge(rangeBot, rougeBot);
	else if(warrBot && mageBot) warrMage(warrBot, mageBot);
	else if(warrBot && rougeBot) warrRouge(warrBot, rougeBot);
	else if(mageBot && rougeBot)
	
	use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target && rangeBot == null)
	{
		target=get_nearest_monster({min_xp:100,max_att:100});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	else if(!target && rangeBot!= null)
	{
		target=get_target_of(rangeBot);
		if(!target)
		{
			target=get_nearest_monster({min_xp:100,max_att:200});	
		}
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(distance(character, target) - 30 < 0)
	{
		set_message("Kiting");
		kiteClose(target);
	}
	else if(character.mp>400 && can_use("partyheal") && 
	   (character.hp <= character.max_hp*0.5 ||
	   (rangeBot!= null && rangeBot.hp <= rangeBot.max_hp*0.5) ||
	   (mageBot!= null && mageBot.hp <= mageBot.max_hp*0.5)))
	{
		set_message("Activating party heal");
		use_skill("partyheal");
	}
	
	if(can_attack(rangeBot) && !(rangeBot == null) && rangeBot.hp <= rangeBot.max_hp*0.7){
		set_message("Healing");
		heal(rangeBot);
	}else if(can_attack(mageBot) && !(mageBot == null) && mageBot.hp <= mageBot.max_hp*0.7){
		set_message("Healing");
		heal(mageBot);
	}else if(can_attack(character) && character.hp<=character.max_hp*0.7){
		set_message("Healing");
		heal(character);
	}
		
	else if(!in_attack_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	
	else if(can_use("curse") && (target.hp > target.max_hp*.5) && character.mp>400)
	{
		set_message("Activating curse");
		use_skill("curse", target);
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
	if(!(merchBot == null) && in_attack_range(merchBot)){
		send_gold(merchBot, character.gold);
		for(var i=0;i<42;i++)
		{
			if(!merchBot.items[i])
			{
				for(var j=0;j<42;j++)
				{
					if(!character.items[j]) continue;
					send_item(merchBot, j, 1)
					break
				}
			}
		}
	}
},1000/4); // Loops ev

//strategy for party of priest - ranger - mage.
function rangeMage(){
	//stay in heal range of ranger
	if(!in_attack_range(rangeBot) && !){
		xmove(
			character.x+(rangeBot.x-character.x)/2,
			character.y+(rangeBot.y-character.y)/2
			);
	//stay in heal range of mage if ranger is dead
	}else if(mageBot!= null && !in_attack_range(mageBot) && rangeBot == null){
		xmove(
			character.x+(rangeBot.x-character.x)/2,
			character.y+(rangeBot.y-character.y)/2
			);
	}

//Accepts invites from specified characters.
function on_party_invite(name){
	if(name == "rangeBot" || name == "warrBot" || name == "mageBot" || name = "rougeBot"){
		accept_party_invite(name);
	}
}

//General kiting function, attempts to move diagonally away from target.
function kiteClose(target)
{
	var xmov;
	var ymov;
	if(!target)
	{
		return;	
	}
	if(character.real_x>target.real_x)
	{
		xmov = 15;	
	}
	else if(character.real_x<target.real_x)
	{
		xmov = -15;
	}
	if(character.real_y>target.real_y)
	{
		ymov = 15;	
	}
	else if(character.real_y<target.real_y)
	{	
		ymov = -15;
	}
	move(
		character.x+xmov,
		character.y+ymov
	);
	return;
}

//sends all items in inventory to specified character.
function sendAll(name)
{
	for (var i=0;i<42;i++)
	{
		send_item(name, i, 1);
	}
	return;
}
	
// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
