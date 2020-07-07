//main .js for the warrior.
//uses functions from movement.js, skills.js, and targeting.js

//loads code for the functions used.
//warrior movement
load_code(2);
//warrior skills
load_code(3);
//warrior targeting
load_code(4);
//universal party setup
load_code(5);
//universal skills
load_code(6);

initParty();
//this interval manages combat and targeting.
setInterval(function(){

    //if character is dead, respawn
    if(character.rip) setTimeout(respawn, 15000);

    //set current target to target from previous interval, null if target died
    var target=get_targeted_monster();

    //if there is no current target, targets a new monster.
    newTarget(target);
    //update target.
    target=get_targeted_monster();

    //if more than 500 distance away from a party member, moves closer.
    //moves half the distance to target if not in range to attack.
    charge();
    movement(target);

    //if there is an applicable target, taunts it.
    taunt(tauntTarget());

    //basic attack the current target if in range.
    basicAttack(target);


}, 100); //runs 10 times per second

//this inverval manages looting and potion use and other functions.
setInterval(function(){

    //loots nearest chest if any
    loot();

    //uses health potions first if health is less than 70%
	//will use mana potions first if mana is less than 50% and hp > 70%
	//otherwise, will use regen health/mana if below max.
    use_potion(70, 50);

    //accepts party invites from other characters the player owns.
    on_party_invite();

}, 500); //runs 2 times per second