//If in party, makes sure character is within 500 range of other members.
function movement(target) {
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
    //if not in range of target, moves half the distance.
    if (!is_in_range(target)) {
        set_message("Moving");
        move(
            character.x + (target.x - character.x) / 2,
            character.y + (target.y - character.y) / 2
        );
    }
}