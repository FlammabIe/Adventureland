// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true

var stuckCounter = 0;
var anchor_x = character.x;
var anchor_y = character.y;

const invite_list = ["mageBot", "priestBot", "merchBot"];

for (const i in invite_list){
	let name = invite_list[i];
	send_party_invite(name);
}

function anchor(){
	if(anchor_x!= 0 && anchor_y!= 0)
	{
	move(
		anchor_x,
		anchor_y
		);	
	}
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

setInterval(function(){

	use_hp_or_mp();
	loot();
	set_message("Attacking");
	
	var merchBot = get_player("merchBot");

	if(!attack_mode || character.rip) return;

	var target=get_targeted_monster();
	if(!target)
	{
		anchor();
		if(character.x!=anchor_x || character.y!=anchor_y)
		{
			return;
		}
		stuckCounter = 0;
		target=get_nearest_monster({min_xp:100,max_att:200});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(distance(character, target) - 90 < 0 && stuckCounter < 15)
	{
		set_message("Kiting");
		kiteClose(target);
		stuckCounter++;
	}
	else if(!in_attack_range(target))
	{
		move(
			character.x+(target.x-character.x)/3,
			character.y+(target.y-character.y)/3
			);
		
		// Walk one third the distance
	}
	else if(can_attack(target))
	{
		if(character.mp>400 && can_use("supershot")){
			set_message("Activating supershot");
			use_skill("supershot", target);
		}else{
			set_message("Attacking");
			attack(target);
		}
	}
	if(!(merchBot == null) && in_attack_range(merchBot)){
		send_gold(merchBot, character.gold);
		var send = 0;
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
