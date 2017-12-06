import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Button, AsyncStorage, FlatList } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import { getDecks, addDeck, addQuestion } from '../actions/index'
import { gray, white } from '../utils/colours'

class DecksView extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button title="Add Deck" color={white}
            onPress={() => navigation.navigate('AddDeckView')} />,
        headerLeft: null,
    })

    async componentDidMount() {
        if (await AsyncStorage.getAllKeys()) {
            AsyncStorage.clear()
        }
        await this.props.getDecks()
        await this.props.addDeck('First Deck')
        await this.props.addDeck('Second Deck')
        await this.props.addQuestion('First Deck', uuidv4(), 'How many states are there in the U.S.?', '50')
        this.props.addQuestion('First Deck', uuidv4(), 'How many provinces are there in Canada?', '10')
    }

    _renderItem = ({ item }) =>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', { title: item.title })}>  
            <View style={styles.item}>
                <Text style={[styles.centreText, { fontSize: 40 }]}>{item.title}</Text>
                <Text style={[styles.centreText, { fontSize: 30, color: gray }]}>{`${item.questionCount} card${item.questionCount < 2 ? '' : 's'}`}</Text>
            </View>
        </TouchableOpacity>

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                <FlatList data={decks} keyExtractor={item => item.title} renderItem={this._renderItem} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    item: {
        backgroundColor: white,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
    },
    centreText: {
        textAlign: 'center',
    }
})

const mapStateToProps = ({ entities: { decks } }) => ({
    decks: Object.values(decks),
})

export default connect(mapStateToProps, {
    getDecks,
    addDeck,
    addQuestion
})(DecksView)
