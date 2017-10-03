import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'

const _ = require('lodash');

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}

		this.filterList = this.filterList.bind(this);
	}

	filterList(e) {
		let input = e.target.value.toLowerCase();
		let filtered = _.filter(this.props.pokeList, item => {
			return item.name.toLowerCase().indexOf(input) !== -1;
		});
		this.setState({list: filtered});
	}

	render() {
		return (
			<div>
				<form>
					<input type = "text" placeholder = "Search" onChange = {this.filterList} />
				</form>
				<List items = {this.state.list}/>
			</div>
		)
	}
}

class List extends Component {
	render() {
		return (
			<ul>
			{
				this.props.items.map(item => {
					return <li>{item.name}</li>
				})
			}
			</ul>
		)
	}
}

export default SearchBar