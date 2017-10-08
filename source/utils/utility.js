import pokemonList from './pokemon.js'
const _ = require('lodash');
const axios = require('axios');

let cache = {};

exports.getPokemonList = function() {
	let arr = [];
	for(let k in pokemonList) {
		if(pokemonList.hasOwnProperty(k)) {
			arr.push(pokemonList[k]);
		}
	}
	return arr;
}

exports.filterByName = function(list, input) {

	return _.filter(list, item => {
		return item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1;
	});
}

exports.loadPokemon = function(id) {
	if(cache.hasOwnProperty(id)) {
		return new Promise((resolve, reject) => {
			resolve(cache[id]);
		})
	}
	return new Promise((resolve, reject) => {
		axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
			.then(res => {
				cache[res.data.id] = res.data;
				resolve(res.data);
			})
			.catch(err => {
				resolve(pokemonList[id]);
			});
	});
	
}

exports.getIdList = function(pokemon) {
	return _.map(pokemon, item => {
		return item.id;
	});
}
/* ============ POKEMON DATA PARSING FUNCTIONS ===================*/

exports.getTypes = function(pokemon) {
	let type1 = _.find(pokemon.types, {'slot': 1});
	let type2 = _.find(pokemon.types, {'slot': 2});
	type1 = type1.type.name;
	type2 = type2 === undefined ? "" : type2.type.name;
	return [type1, type2];
}

exports.getStats = function(pokemon) {
	let stats = {
		'speed': {
			'name': 'Speed'
		},
		'special-defense': {
			'name': 'Sp. Def'
		},
		'special-attack': {
			'name': 'Sp. Atk'
		},
		'defense': {
			'name': 'Defense'
		},
		'attack': {
			'name': 'Attack'
		},
		'hp': {
			'name': 'HP'
		}
	};

	Object.keys(stats).forEach(statType => {
		stats[statType].base_stat = _.find(pokemon.stats, {'stat': {'name': statType}}).base_stat;
	})
	return stats;
}

exports.getAbilities = function(pokemon) {
	if(!pokemon.hasOwnProperty('abilities')) {
		return [];
	}

	let abilities = [];
	for(let i = 1; i <= 3; i++) {
		let ability = _.find(pokemon.abilities, {'slot': i});
		if(ability !== undefined) {
			let name = ability.ability.name;
			name = ability.is_hidden ? (name + " (hidden ability)") : name;
			abilities.push(name);
		}
	}

	return abilities;

}

exports.getLearnedMoves = function(pokemon) {
	if(!pokemon.hasOwnProperty('moves')) {
		return [];
	}

	let learnedMoves = _.map(pokemon.moves, move => {
		let versionGroups = move['version_group_details'];
		let version = versionGroups[versionGroups.length - 1];
		return {
			'name': move['move']['name'],
			'move_learn_method': version['move_learn_method']['name'],
			'level': version['level_learned_at']
		}
	})

	learnedMoves = _.filter(learnedMoves, {'move_learn_method': 'level-up'});
	return _.orderBy(learnedMoves, ['level'], ['asc']);
}