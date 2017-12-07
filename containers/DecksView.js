import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage, FlatList } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import { CardView, ContainerView } from '../components/Views'
import { getDecks, addDeck, addQuestion } from '../actions/index'
import { gray, white } from '../utils/colours'

class DecksView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button title="Add Deck" color={white}
            onPress={() => navigation.navigate('AddDeckView')} />,
        headerLeft: null,
    })

    async componentDidMount() {
        const isLoaded = await AsyncStorage.getItem('isLoaded')
        if (isLoaded === null) {
            const { getDecks, addDeck, addQuestion } = this.props
            await getDecks()
            await addDeck('First Deck')
            addDeck('Second Deck')
            await addQuestion('First Deck', uuidv4(), 'How many states are there in the U.S.?', '50')
            addQuestion('First Deck', uuidv4(), 'How many provinces are there in Canada?', '10')

            AsyncStorage.setItem('isLoaded', 'true')
        }
    }

    _renderItem = ({ item }) =>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', { title: item.title })}>  
            <CardView>
                <Text style={[styles.centreText, { fontSize: 40 }]}>{item.title}</Text>
                <Text style={[styles.centreText, { fontSize: 30, color: gray }]}>{`${item.questionCount} card${item.questionCount < 2 ? '' : 's'}`}</Text>
            </CardView>
        </TouchableOpacity>

    render() {
        const { decks } = this.props
        return (
            <ContainerView>
                <FlatList data={decks} keyExtractor={item => item.title} renderItem={this._renderItem} />
            </ContainerView>
        )
    }
}

const styles = StyleSheet.create({
    centreText: {
        textAlign: 'center',
    },
})

const mapStateToProps = ({ entities: { decks } }) => ({
    decks: Object.values(decks),
})

export default connect(mapStateToProps, {
    getDecks,
    addDeck,
    addQuestion
})(DecksView)
