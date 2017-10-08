import React, { Component } from 'react'
import { Image, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PokemonList from '../PokemonList/PokemonList.jsx'

import helper from '../../../utils/utility.js'

const _ = require('lodash');

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.pokemonList = helper.getPokemonList();

		this.state = {
			list: this.pokemonList
		}

		//Binding functions cuz react doesn't do it automatically
		this.filterList = this.filterList.bind(this);
	}

	filterList(e) {
		let input = e.target.value;
		let filtered = helper.filterByName(this.pokemonList, input);
		this.setState({list: filtered});
	}

	render() {
		return (
			<div className = "SearchBar">
				<form>
					<input type = "text" placeholder = "Search" onChange = {this.filterList} />
				</form>
				<PokemonList list = {this.state.list}/>
			</div>
		)
	}
}

export default SearchBar