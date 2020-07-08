//main .js for the mage.

//loads code for the functions used.
//ranged movement
load_code(8);
//mage skills
load_code(11);
//ranged targeting
load_code(10);
//universal party setup
load_code(5);
//universal skills
load_code(6);
//merchant interactions
load_code(7);

//invites the party.
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
    //moves one third the distance to target if not in range to attack.
    movement(target);

    //basic attack the current target if in range.
    basicAttack(target);


}, 100); //runs 10 times per second

//this inverval manages looting and potion use and other functions.
setInterval(function(){

    //loots nearest chest if any
    loot();

    //gives mana and an attack speed boost to an applicable target.
    energize();

    //uses health potions first if health is less than 70%
	//will use mana potions first if mana is less than 50% and hp > 70%
	//otherwise, will use regen health/mana if below max.
    use_potion(60, 60);

    //sends all gold and all items that are not in the first inventory slot to the merchant.
    sendAllButFirst();

}, 500); //runs 2 times per second