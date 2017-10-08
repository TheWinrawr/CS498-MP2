import React, { Component } from 'react'
import { Image, List, Form, Select } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PokemonList from '../PokemonList/PokemonList.jsx'

import helper from '../../../utils/utility.js'

const _ = require('lodash');

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.pokemonList = helper.getPokemonList();
		this.filterOptions = {
			name: "",
			types: [],
			stat: "",
			statOrder: "desc"
		}

		this.props.updateList(this.pokemonList);

		//Binding functions cuz react doesn't do it automatically
		this.filterList = this.filterList.bind(this);
		this.searchName = this.searchName.bind(this);
		this.selectType = this.selectType.bind(this);
		this.selectStat = this.selectStat.bind(this);
		this.selectStatOrder = this.selectStatOrder.bind(this);
	}

	componentDidUpdate() {

	}

	filterList() {
		let newList = helper.filterByName(this.pokemonList, this.filterOptions.name);
		newList = helper.filterByType(newList, this.filterOptions.types);
		newList = helper.orderByStat(newList, this.filterOptions.stat, this.filterOptions.statOrder);

		this.props.updateList(newList);
	}

	/**
	 * Called on user input on the search name form.
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	searchName(e) {
		let input = e.target.value;
		this.filterOptions.name = input;
		this.filterList();
	}

	/**
	 * Called on type selection on the type dropdown menu.
	 * @param  {[type]} e   [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	selectType(e, res) {
		this.filterOptions.types = res.value;
		this.filterList();
	}

	selectStat(e, res) {
		this.filterOptions.stat = res.value;
		this.filterList();
	}

	selectStatOrder(e, res) {
		this.filterOptions.statOrder = res.value;
		this.filterList();
	}

	render() {
		let typeOptions = helper.getTypeList();
		let statOptions = helper.getStatList();
		let sortOptions = [
			{
				'key': 'desc',
				'text': 'Descending',
				'value': 'desc'
			},
			{
				'key': 'asc',
				'text': 'Ascending',
				'value': 'asc'
			}
		];

		return (
			<div className = "SearchBar">
				<Form>
					<Form.Input label = 'Name' placeholder = 'Name' onChange = {this.searchName} />
					<Form.Dropdown multiple search selection closeOnChange control = {Select} options = {typeOptions} onChange = {this.selectType} label = 'Type' placeholder = 'Select Type'/>
					<Form.Group>
						<Form.Dropdown search selection control = {Select} options = {statOptions} onChange = {this.selectStat} label = 'Stat' placeholder = 'Select Stat' />
						<Form.Dropdown search selection control = {Select} options = {sortOptions} onChange = {this.selectStatOrder} label = 'Sort By' placeholder = 'Sort by' defaultValue = 'desc' />
					</Form.Group>
				</Form>
			</div>
		)
	}
}

export default SearchBar