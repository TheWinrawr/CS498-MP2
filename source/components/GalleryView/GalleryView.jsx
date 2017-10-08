import React, { Component } from 'react'
import { Grid, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import helper from '../../utils/utility.js'

class GalleryView extends Component {
	constructor(props) {
		super(props);
        this.pokemonList = helper.getPokemonList();

        this.state = {
            list: this.pokemonList
        }
	}

    render() {

        return(
            <div className="GalleryView">
                <Grid container columns = {5}>
                    {
                        this.state.list.map(item => {
                            return <GalleryItem key = {item.id} value = {item} />
                        })
                    }
                </Grid>
            </div>
        )
    }
}

class GalleryItem extends Component {
    render() {
        let name = this.props.value.name;
        let imgSrc = this.props.value.sprites["front_default"];
        let types = helper.getTypes(this.props.value);

        return (
            <Grid.Column>
                <Item>
                    <Item.Image size = 'tiny' src = {imgSrc} />
                    <Item.Content>
                        <Item.Header>{name}</Item.Header>
                        <Item.Extra>
                            <span className = {"type-" + types[0]}>{types[0]}</span> <span className = {"type-" + types[1]}>{types[1]}</span>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Grid.Column>
        )
    }
}


export default GalleryView
