import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import SearchBar from './SearchBar.jsx'

import styles from './Home.scss'

import pokemonList from '../../assets/pokemon.js'

let axios = require('axios');

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pokeList: []
		}
		this.pokemon = [];
	}

	loadPokemon() {
		Object.keys(pokemonList).forEach(k => {
			this.pokemon.push({
				id: k,
				name: pokemonList[k].name
			})
		})
	}

    render() {
    	this.loadPokemon();

        return(
            <div className="Home">
                <h1>Welcome to MP2!</h1>
                <SearchBar pokeList = {this.pokemon} />
            </div>
        )
    }
}

export default Home
