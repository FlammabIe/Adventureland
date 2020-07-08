//this file holds functions for merchant <> character interactions.

//sends all gold and items in inventory to merchant, except item in first inventory slot
//by making it dependant on 'use_hp' cooldown, limits function to once per 2 seconds or more. (avoids auto disconnect for too many calls)
function sendAllButFirst(){
    if(!get_player("merchBot") || !is_in_range(get_player("merchBot")) || !can_use('use_hp')) return;
    send_gold("merchBot", character.gold);
	for (var i=1;i<42;i++){
        if(get_player("merchBot").esize == 0) return;
        if(!character.items[i]) continue;
		send_item("merchBot", i, 9999);
    }
	return;
}

