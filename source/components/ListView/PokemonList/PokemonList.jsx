import React, { Component } from 'react'
import { Button, Image, Label, List } from 'semantic-ui-react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import PropTypes from 'prop-types';

import './type-colors.scss'

import helper from '../../../utils/utility.js'

class PokemonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageIndex: 0,
			maxPageIndex: 0,
			itemsPerPage: 5,
			list: []
		}
		
		this.setPage = this.setPage.bind(this)
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
	}

	setPage(index, list = this.props.list) {
		let start = index * this.state.itemsPerPage,
			end = start + this.state.itemsPerPage;
		let maxPageIndex = Math.ceil(list.length / this.state.itemsPerPage) - 1;
		maxPageIndex = maxPageIndex <= 0 ? 0 : maxPageIndex;

		this.setState({
			pageIndex: index,
			maxPageIndex: maxPageIndex,
			list: list.slice(start, end)
		})
	}

	componentDidMount() {
		this.setPage(0);
	}

	componentWillReceiveProps(nextProps) {
		this.setPage(0, nextProps.list);
	}

	prevPage() {
		this.setPage(this.state.pageIndex - 1);
	}

	nextPage() {
		this.setPage(this.state.pageIndex + 1);
	}

	render() {
		let idList = helper.getIdList(this.props.list);
		return (
			<div>
				<Button.Group>
					<Button content = 'Prev' disabled = {this.state.pageIndex === 0} onClick = {this.prevPage} />
					<Button active color='grey'>{ this.state.pageIndex + 1} / {this.state.maxPageIndex + 1 }</Button>
					<Button content = 'Next' disabled = {this.state.pageIndex === this.state.maxPageIndex} onClick = {this.nextPage}/>
				</Button.Group>

				<List divided relaxed className = 'PokemonList'>
					{
						this.state.list.map(item => {
							return <PokemonItem divided key = {item.id} value = {item} idList = {idList} />
						})
					}

				</List>
				
				
			</div>

		)
	}
}

PokemonList.propTypes = {
	list: PropTypes.array
}

class PokemonItem extends Component {
	render() {
		let name = this.props.value.name;
		let imgSrc = this.props.value.sprites["front_default"];
		let types = helper.getTypes(this.props.value);

		let linkParams = {
			pathname: '/detail/' + this.props.value.id,
			id: this.props.value.id,
			idList: this.props.idList
		}

		return (
			<List.Item>
				<Image avatar verticalAlign = 'middle' size = 'tiny' src = {imgSrc} />
				<List.Content verticalAlign = 'middle' className = 'PokemonItem'>
					<Link to = {linkParams}>
						<List.Header>{name}</List.Header>
						<List.Description>
							<span className = {"type-" + types[0]}>{types[0]}</span> <span className = {"type-" + types[1]}>{types[1]}</span>
						</List.Description>
					</Link>
				</List.Content>
			</List.Item>
		)
	}
}

PokemonItem.propTypes = {
	value: PropTypes.object,
	idList: PropTypes.array
}

export default PokemonList