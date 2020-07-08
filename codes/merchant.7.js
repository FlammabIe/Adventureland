//this file holds functions for merchant <> character interactions.

//sends all gold and items in inventory to merchant, except item in first inventory slot
function sendAllButFirst(){
    if(!get_player("merchBot") || !is_in_range(get_player("merchBot"))) return;
    send_gold("merchBot", character.gold);
	for (var i=1;i<42;i++){
        if(get_player("merchBot").esize == 0) return;
        if(!character.items[i]) continue;
		send_item("merchBot", i, 9999);
    }
	return;
}

