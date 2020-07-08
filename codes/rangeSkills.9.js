//this file contains functions for renger specific skills.
//skills not complete: 3shot, 4fingers, 5shot, piercingshot, poisonarrow, track

//if target has more than a third of their max hp, attempts to use supershot.
function supershot(target){
	if(!can_use('supershot') || character.mp<400 || target.hp<target.max_hp/3) return;
	use_skill('supershot', target);
}

//if target has at least 90% hp, attempts to use hunter's mark
function huntersmark(target){
	if(!can_use('huntersmark') || character.mp<240 || target.hp<target.max_hp*0.9) return;
	use_skill('huntersmark', target);
}