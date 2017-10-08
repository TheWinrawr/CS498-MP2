import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import SearchBar from './SearchBar/SearchBar.jsx'
import PokemonList from './PokemonList/PokemonList.jsx'

class ListView extends Component {
	constructor(props) {
		super(props);
        this.state = {
            list: []
        }

        this.updateList = this.updateList.bind(this);
	}

    updateList(newList) {
        this.setState({list: newList});
    }

    render() {

        return(
            <div className="ListView">
                <SearchBar updateList = {this.updateList}/>
                <PokemonList list = {this.state.list}/>
            </div>
        )
    }
}

export default ListView
