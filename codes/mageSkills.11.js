//this file holds functions for mage skills.

//if a party member has less than half of their max mp, or if they are a ranger, energizes them.
function energize(){
	if(!character.party || !can_use('energize') || character.mp == 0) return;
	let party = parent.party_list;
	for(let name of party){
		let partyMem = get_player(name);
		if((distance(character, partyMem) < 320 && partyMem.mp<partyMem.max_mp/2) || partyMem.ctype == "ranger"){
			use_skill('energize', partyMem, character.mp/2);
			return;
		}
	}
}