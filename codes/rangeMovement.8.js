//this file contains movement for ranged characters.

//keeps within 500 distance of party members, but kites away from target if too close.
function movement(target){
	if(!target) return;
    if (character.party) {
        party = parent.party_list;
        for (i = 0; i < party.size; i++) {
            partyMem = get_player(party(i));
            if (distance(partyMem) > 500) {
                move(
                    character.x + (partyMem.x - character.x) / 2,
                    character.y + (pertyMem.y - character.y) / 2
                );
            }
        }
	}
	//if not in range to attack, moves one third the distance
	if(!is_in_range(target)){
		set_message("Moving");
        move(
            character.x + (target.x - character.x) / 3,
            character.y + (target.y - character.y) / 3
        );
	}

	xdist = character.real_x-target.real_x;
	ydist = character.real_y-target.real_y;
	abs_xdist = Math.abs(xdist);
	abs_ydist = Math.abs(ydist);

	//if less than 15 distance from target, moves away from target.
	if(sqrt(Math.pow(xdist, 2)+Math.pow(ydist, 2))<15){

		//determines if needs to move left or right
		if(xdist<0){ 
			xmov = -15;
		}else{ 
			xmov = 15;
		}

		//determines if needs to move up or down
		if(ydist<0){
			ymov = -15
		}else{
			ymov = 15
		}

		//if the character can move to the new location, moves.
		if(can_move_to(character.x+xmov, character.y+ymov)){ 
			move(
				character.x+xmov,
				character.y+ymov
			);
			return;
		}
	}
}