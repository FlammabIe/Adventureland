//this file holds functions for merchant <> character interactions.

//sends all gold and items in inventory to merchant, except item in first inventory slot
function sendAllButFirst()
{
	for (var i=1;i<42;i++)
	{
		send_item("merchBot", i, 9999);
    }
    send_gold("merchBot", character.gold);
	return;
}

