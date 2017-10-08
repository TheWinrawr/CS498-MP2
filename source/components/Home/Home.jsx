import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import ListView from '../ListView/ListView.jsx'
import GalleryView from '../GalleryView/GalleryView.jsx'
import DetailView from '../DetailView/DetailView.jsx'

import styles from './Home.scss'

let axios = require('axios');

class Home extends Component {
	constructor(props) {
		super(props)
	}

    render() {

        return(
            <Router>
                <div className="Home">
                    <h1>Welcome to MP2!</h1>
                    <Link to = "/list"><Button content = 'List' /></Link>
                    <Link to = "/gallery"><Button content = 'Gallery' /></Link>
                    
                    
                    <Route path = "/list" component = {ListView}/>
                    <Route path = "/gallery" component = {GalleryView} />
                    <Route path = "/detail/:id" component = {DetailView} />

                    <Route exact path = "/" render = {() => (<Redirect to = "/list" />)} />
                    
                </div>
            </Router>
        )
    }
}

export default Home
