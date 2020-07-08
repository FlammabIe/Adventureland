// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.

var loops=0;
var loc=0;
var isEmpty = checkInventory();

function townToSnakes()
{
	const town = [0, 0];
	const goos = [7, 732];
	const beesLeft = [286, 971];
	const crocsTop = [772, 1248];
	const crocs = [777, 1672];
	const snakesRight = [299, 1989];
	const snakes = [-110, 1910];
	const shop = [-201, -130];
	switch(loc)
	{
		case 0:
			checkPos(town, loc);
			break;
		case 1:
			checkPos(goos, loc);
			break;
		case 2:
			checkPos(beesLeft, loc);
			break;
		case 3:
			checkPos(crocsTop, loc);
			break;
		case 4:
			checkPos(crocs, loc);
			break;
		case 5:
			checkPos(snakesRight, loc);
			break;
		case 6:	
			checkPos(snakes, loc);
			break;
		case 7:
			use_skill("town");
			checkPos(town, loc);
			break;
		case 8:
			checkPos(shop, loc);
			break;
		case 9:
			loc = 0;
			return 1;
	}
	return 1;
}

function checkPos(location)
{
	if(character.x!=location[0] || character.y!=location[1])
	{
		move(location[0], location[1]);
		return;
	}
	loc++;
}

function locate_item(name)
{
	for(var i=0;i<42;i++)
	{
		if(character.items[i] && character.items[i].name==name) return i;
	}
	return -1;
}

function return_item(name)
{
	for(var i=0;i<42;i++)
	{
		if(character.items[i] && character.items[i].name==name) return character.items[i];
	}
	return -1;
}

function checkInventory()
{
	set_message("Checking");
	for(var i=0;i<42;i++)
	{
		var stack = 0;
		if(character.gold < 40000) continue;
		if(!character.items[i]) continue;
		var item=character.items[i];
		var def=G.items[item.name];
		for(var j=0;j<42;j++)
		{
			if(i!=j && item == character.items[j])
			{
				stack++;
			}
		}
			
		if(!def.upgrade && (item_grade(item) == 0 || item_grade(item) == 1))
		{
			return 0;
		}
		if(!def.compound && (item_grade(item) == 0 || item_grade(item) == 1) &&
		  stack == 2)
		{
			return 0;
		}	
	}
	return 1;
}

function upgradeSpam(){
	set_message("Upgrading");
	if(character.bank) return;
	if(locate_item("scroll0")==-1 || return_item("scroll0").q<1) buy("scroll0",1);
	if(locate_item("scroll1")==-1 || return_item("scroll1").q<1) buy("scroll1",1);
	for(var i=0;i<42;i++)
	{
		set_message("Searching");
		if(!character.items[i]) continue;
		var item=character.items[i];
		var def=G.items[item.name];
		if(!def.upgrade) continue; // check whether the item is upgradeable
		set_message("Found");
		if(item_grade(item)==2) continue; // rare item
		if(item_grade(item)==0) upgrade(i,locate_item("scroll0"));
		if(item_grade(item)==1) upgrade(i,locate_item("scroll1"));
		break;
	}
}

function compoundSpam(){
	set_message("Compounding");
	var stacktmp1 = 0;
	var stacktmp2 = 0;
	if(character.bank) return;
	if(locate_item("cscroll0")==-1 || return_item("cscroll0").q<1) buy("cscroll0",1);
	if(locate_item("cscroll1")==-1 || return_item("cscroll1").q<1) buy("cscroll1",1);
	for(var i=0;i<42;i++)
	{
		var stack = 0;
		if(!character.items[i]) continue;
		var item=character.items[i];
		var def=G.items[item.name];
		if(!def.compound) continue; // check whether the item is compoundable
		for(var j=0;j<42;j++)
		{
			if(!character.items[j]) continue;
			if((i!=j) && (character.items[i].name == character.items[j].name) &&
			   (character.items[i].level == character.items[j].level))
			{
				if(stack == 0)
				{
					stacktmp1 = j;
					stack++;
				}
				else if(stack == 1)
				{
					stacktmp2 = j;
					stack++;
				}
			}
		}
		if(stack < 2) continue;
		if(item_grade(item)==2) continue; // rare item
		if(item_grade(item)==0) compound(i, stacktmp1, stacktmp2, 
								locate_item("cscroll0"));
		if(item_grade(item)==1) compound(i, stacktmp1, stacktmp2, 
								locate_item("cscroll1"));
		break;
	}
}

function sendToRangeBot()
{
	var rangeBot = get_player("rangeBot");
	if(rangeBot!=null && rangeBot.visible == true)
	{
		send_item(rangeBot, 39, 1);
	}
}

function sendToMageBot()
{
	var mageBot = get_player("mageBot");
	if(mageBot!=null && mageBot.visible == true)
	{
		send_item(mageBot, 40, 1)
	}
}

function sendToPriestBot()
{
	var priestBot = get_player("priestBot");
	if(priestBot!=null && priestBot.visible == true)
	{
		send_item(priestBot, 41, 1);
	}
}

setInterval(function(){
	set_message("Loop start");
	
	if(isEmpty == 0)
	{
		upgradeSpam();
		compoundSpam();
	}
	else
	{
		set_message("Moving");
		isEmpty = townToSnakes();
	}
	//sendToRangeBot(); //sends slot 39 to rangeBot
	//sendToMageBot(); // sends slot 40 to mageBot
	//sendToPriestBot(); // sends slot 41 to priestBot
	

},1000); // Loops every second.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
