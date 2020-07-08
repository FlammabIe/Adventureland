//contains functions related to party management.

//array of all the characters I allow to be in a party.
var characters = [
	"mageBot",
	"priestBot",
	"rangeBot",
	"rougeBot",
	"palaBot",
	"warrBot",
	"merchBot"
];

//checks if the specified character is within visibility, then invites to party if true
function initParty(){
	for(name of characters){
		send_party_invite(name);
		send_party_request(name);
	}
}

//called by the game when invited to a party.
function on_party_invite(name){
	if(characters.includes(name)){
		accept_party_invite(name);
	}
}

//called by the game when someone requests to join your party.
function on_party_request(name){
	if(characters.includes(name)){
		accept_party_request(name);
	}
}