import React, { Component } from 'react'
import {
    View, Text, SafeAreaView, StyleSheet,
    Button, TextInput, Alert, ActivityIndicator
} from 'react-native'
import axios from 'axios'
import pokemon from 'pokemon'
import Pokemon from './components/Pokemon'
import { types } from '@babel/core'


const POKE_API_URL = 'https://pokeapi.co/api/v2'


export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            searchInput: '',
            name: '',
            pic: '',
            types: [],
            desc: ''

        }
    }
    render() {

        const { isLoading, searchInput, name, pic, types, desc } = this.state

        return (
            <SafeAreaView>
                <View>
                    <View>
                        <View>
                            <TextInput placeholder='serch poke' />
                        </View>
                        <View>
                            <Button title='Search' />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    searchPokemom = async () => {
        try {
            const pokemonID = pokemon.getId(this.state.searchInput)
            this.setState({ isLoading: true })

            const { data: pokemonData } = await axios.get(`${POKE_API_URL}
            /pokemon/${pokemonID}`)
            const { data: pokemonspecieData } = await axios.get(`${POKE_API_URL}
            /pokemonspecie/${pokemonID}`)

            const { name, sprites, types } = pokemonData
            const { flavor_text_entries } = pokemonspecieData


            this.setState({
                name,
                pic: sprites.front_default,
                types: this.getType(types),
                desc: this.getDescript(flavor_text_entries),
                isLoading: false

            })

        } catch (error) {
            Alert.alert('Error', 'Pokemon not found')
        }
    }

    getType = (types) => {
        types.map(({ slot, type }) => ({
            id: slot,
            name: type.name
        }))
    }

    getDescript = (entries) => {


    }

}