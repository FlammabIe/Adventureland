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
	if(get_player("mageBot")) send_party_request("mageBot");
	if(get_player("priestBot")) send_party_request("priestBot");
	if(get_player("rangeBot")) send_party_request("mageBot");
	if(get_player("rougeBot")) send_party_request("rougeBot");
	if(get_player("palaBot")) send_party_request("palaBot");
	if(get_player("merchBot")) send_party_request("merchBot");
	if(get_player("warrBot")) send_party_request("warrBot");
}

//called by the game when invited to a party.
function on_party_invite(name){
	for(i=0;i<characters.size;i++){
		if(name == characters[i]){
			accept_party_invite(name)
			return;
		}
	}
}

//called by the game when someone requests to join your party.
function on_party_request(name){
	for(i=0;i<characters.size;i++){
		if(name == characters[i]){
			accept_party_request(name)
			return;
		}
	}
}