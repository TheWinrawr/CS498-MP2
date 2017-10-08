import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import SearchBar from './SearchBar/SearchBar.jsx'

class ListView extends Component {
	constructor(props) {
		super(props)
	}

    render() {

        return(
            <div className="ListView">
                <SearchBar />
            </div>
        )
    }
}

export default ListView
