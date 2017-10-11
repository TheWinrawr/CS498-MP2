import React, { Component } from 'react'
import { Button, Grid, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import helper from '../../utils/utility.js'

class GalleryView extends Component {
	constructor(props) {
		super(props);
        this.pokemonList = helper.getPokemonList();
        this.filteredList = this.pokemonList;
        this.genList = helper.getGenList();
        this.state = {
            pageIndex: 0,
            maxPageIndex: 0,
            itemsPerPage: 100,
            list: []
        }
        
        this.setPage = this.setPage.bind(this)
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.filterGrid = this.filterGrid.bind(this);
	}

    componentDidMount() {
        this.setPage(0);
    }

    setPage(index, list = this.filteredList) {
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

    nextPage() {
        this.setPage(this.state.pageIndex + 1);
    }

    prevPage() {
        this.setPage(this.state.pageIndex - 1);
    }

    filterGrid(e, data) {
        this.filteredList = helper.filterByGen(this.pokemonList, data.tabIndex);
        this.setPage(0);
    }

    render() {
        let idList = helper.getIdList(this.state.list);

        return(
            <div className="GalleryView">
                <Button.Group>
                    <Button content = 'Prev' disabled = {this.state.pageIndex === 0} onClick = {this.prevPage} />
                    <Button active color='grey'>{ this.state.pageIndex + 1} / {this.state.maxPageIndex + 1 }</Button>
                    <Button content = 'Next' disabled = {this.state.pageIndex === this.state.maxPageIndex} onClick = {this.nextPage}/>
                </Button.Group> <br />

                <Button.Group>
                    {
                        this.genList.map(gen => {
                            return <Button content = {gen.text} tabIndex = {gen.key} key = {gen.key} onClick = {this.filterGrid} />
                        })
                    }
                </Button.Group>

                <Grid container columns = {5}>
                    {
                        this.state.list.map(item => {
                            return <GalleryItem key = {item.id} value = {item} idList = {idList} />
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

        let linkParams = {
            pathname: '/detail/' + this.props.value.id,
            id: this.props.value.id,
            idList: this.props.idList
        }

        return (
            <Grid.Column>
                <Link to = {linkParams}>
                    <Item className = 'GalleryItem'>
                        <Item.Image size = 'tiny' src = {imgSrc} />
                        <Item.Content>
                            <Item.Header>{name}</Item.Header>
                            <Item.Extra>
                                <span className = {"type-" + types[0]}>{types[0]}</span> <span className = {"type-" + types[1]}>{types[1]}</span>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Link>
            </Grid.Column>
        )
    }
}

GalleryItem.propTypes = {
    value: PropTypes.object,
    idList: PropTypes.array
}


export default GalleryView
