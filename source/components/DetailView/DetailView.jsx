import React, { Component } from 'react'
import { Button, Item, Container, Loader, Progress, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import helper from '../../utils/utility.js'

const axios = require('axios');

class DetailView extends Component {
	constructor(props) {
        super(props);
        let index = this.props.location.idList.findIndex(id => {
            return id === this.props.location.id;
        });

        this.state = {
            isLoaded: false,
            maxStatVal: 180,
            index: index,
            idList: this.props.location.idList,
            pokemon: {
                id: "",
                name: "",
                imgSrc: "",
                types: [],
                stats: {},
                abilities: ['(load failed)'],
                height: 0,
                weight: 0,
                moves: []
            }
        }

        this.setPokemon = this.setPokemon.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.renderStats = this.renderStats.bind(this);
        this.renderPokedexData = this.renderPokedexData.bind(this);
        this.renderMoves = this.renderMoves.bind(this);
	}

    componentWillMount() {
        this.setPokemon(this.props.location.id);
    }

    setPokemon(id) {
        helper.loadPokemon(id)
            .then(res => {
                console.log(res);
                this.setState({
                    isLoaded: true,
                    pokemon: {
                        id: res.id,
                        name: res.name,
                        imgSrc: res.sprites['front_default'],
                        types: helper.getTypes(res),
                        stats: helper.getStats(res),
                        abilities: helper.getAbilities(res),
                        height: res.height,
                        weight: res.weight,
                        moves: helper.getLearnedMoves(res)
                    }
                })

                console.log(helper.getStats(res));
            })
    }

    prevPage() {
        this.setPokemon(this.state.idList[this.state.index - 1]);
        this.setState({index: this.state.index - 1, isLoaded: false});
    }

    nextPage() {
        this.setPokemon(this.state.idList[this.state.index + 1]);
        this.setState({index: this.state.index + 1, isLoaded: false});
    }

    /**
     * Rendering function for generating a table of pokemon pokedex data.
     * @return {[type]} [description]
     */
    renderPokedexData() {
        if(!this.state.isLoaded) {
            return (<div></div>);
        }

        let types = this.state.pokemon.types;

        let Pokedex = (
            <Table collapsing definition striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan = '2'>Pokedex Data</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Id</Table.Cell>
                        <Table.Cell>{this.state.pokemon.id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>{this.state.pokemon.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Type</Table.Cell>
                        <Table.Cell>
                            <span className = {"type-" + types[0]}>{types[0]}</span> <span className = {"type-" + types[1]}>{types[1]}</span>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Abilities</Table.Cell>
                        <Table.Cell>
                            {
                                this.state.pokemon.abilities.map(ability => {
                                    return <div key = {ability}>{ability} <br /></div>
                                })
                            }
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Height</Table.Cell>
                        <Table.Cell>
                            {(this.state.pokemon.height / 10) + ' m'}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Weight</Table.Cell>
                        <Table.Cell>
                            {(this.state.pokemon.weight / 10) + ' kg'}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )

        return (
            <Item.Group>
                <Item>
                    <Item.Image size = 'medium' src = {this.state.pokemon.imgSrc} />
                    <Item.Content>
                        {Pokedex}
                    </Item.Content>
                </Item>
            </Item.Group>
        )

    }

    /**
     * Rendering function for generating a table of pokemon stats.
     * @return {[type]} [description]
     */
    renderStats() {
        if(!this.state.isLoaded) {
            return (<div></div>);
        }

        let statOrder = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
        return (
            <Table basic = 'very' definition striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan = '2'>Base Stats</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {statOrder.map(stat => {
                        let base_stat = this.state.pokemon.stats[stat].base_stat
                        let color = base_stat < 70 ? 'red' : (base_stat < 100 ? 'yellow' : 'green');
                        return <Table.Row key = {stat}>
                            <Table.Cell collapsing textAlign = 'right'>
                                {this.state.pokemon.stats[stat].name}
                            </Table.Cell>
                            <Table.Cell>
                                <Progress value = {base_stat} total = {this.state.maxStatVal} color = {color} size = 'tiny'>
                                    <Container textAlign = 'left'>{base_stat}</Container>
                                </Progress>
                            </Table.Cell>
                        </Table.Row>
                    })}


                </Table.Body>
            </Table>
        )
    }

    /**
     * Rendering function for generating a table of pokemon moves.
     * @return {[type]} [description]
     */
    renderMoves() {
        if(!this.state.isLoaded) {
            return (<div></div>);
        }

        return (
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Move</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {this.state.pokemon.moves.map(move => {
                        return <Table.Row key = {move.name}>
                            <Table.Cell collapsing textAlign = 'right'>{move.level}</Table.Cell>
                            <Table.Cell>{move.name}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        )
    }

    render() {
        let name = this.state.pokemon.name;
        let imgSrc = this.state.pokemon.imgSrc;
        let types = this.state.pokemon.types;

        let prevLink = '/detail/' + this.state.idList[this.state.index - 1];
        let nextLink = '/detail/' + this.state.idList[this.state.index + 1];

        console.log(prevLink);

        return(
            <div className = "DetailView">
                <Loader inline = 'centered' size = 'big' active = {!this.state.isLoaded}>Loading...</Loader>
                <Link to = {prevLink}>
                    <Button content = 'Prev' floated = 'left' onClick = {this.prevPage} disabled = {this.state.index === 0}/>
                </Link>
                <Link to = {nextLink}>
                    <Button content = 'Next' floated = 'right' onClick = {this.nextPage} disabled = {this.state.index === this.state.idList.length - 1}/>
                </Link>

                {this.renderPokedexData()}
                {this.renderStats()}
                {this.renderMoves()}
                <br />
            </div>

        )
    }
}

DetailView.propTypes = {
    location: PropTypes.object
}

export default DetailView
