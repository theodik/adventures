// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

setInterval(function(){

	use_hp_or_mp();
	//loot();

	if(character.rip || is_moving(character)) return;
	
	var buddy = get_player("Bublinator");
	const party = get_party();
	const needMP = Object.entries(get_party())
	.map(([name, char]) => [name, get_player(name)])
	.map(([name, char]) => [name, char.mp <= (char.max_mp / 2)])
	.find(([name, need]) => need)

	if (needMP && !is_on_cooldown("energize") && character.mp > (character.max_mp / 2)) {
		set_message(`Energize ${needMP[0]}`);
		const player = get_player(needMP[0]);
		if (!player) log(`Cant find player ${needMP[0]}`);
		use_skill("energize", player);
	}
	
	var target=get_targeted_monster();
	if (!target) {
		target = get_target_of(buddy);
	}
	
	if (!target) {
		set_message("Following");
		if (distance(character, buddy) >= 200) {
			move(
				character.x+(buddy.x-character.x)/2,
				character.y+(buddy.y-character.y)/2
			);
		}
		return;
	} else {
		set_message("Attacking");
	}
	/*	
	if(!target)	{		
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	} */
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		/*if(is_in_range(target, "burst") && 
		   !is_on_cooldown("burst") && 
		   character.mp >= G.skills.burst.mp) {
			use_skill("burst", target);
		} else {*/
			attack(target);
		//}
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
