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

function sendAll(name)
{
	for (var i=0;i<42;i++)
	{
		send_item(name, i, 1);
	}
	return;
}

setInterval(function(){
	
	var rangeBot = get_player("rangeBot");
	var priestBot = get_player("priestBot");
	var merchBot = get_player("merchBot");
	
	if(rangeBot!= null && !in_attack_range(rangeBot)){
		xmove(
			character.x+(rangeBot.x-character.x)/2,
			character.y+(rangeBot.y-character.y)/2
			);
		// Walk half the distance
	}
	
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
	
	if(distance(character, target) - 40 < 0)
	{
		set_message("Kiting");
		kiteClose(target);
	}
	else if(can_use("energize") && !(rangeBot == null) && character.mp>1){
		set_message("Activating energize");
		use_skill("energize", rangeBot);
	}else if(can_use("energize") && !(priestBot == null)){
		set_message("Activating energize");
		use_skill("energize", priestBot);
	}
		
	else if(!in_attack_range(target))
	{
		move(
			character.x+(target.x-character.x)/3,
			character.y+(target.y-character.y)/3
			);
		// Walk half the distance
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
},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
