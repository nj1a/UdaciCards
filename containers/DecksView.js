import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { AsyncStorage, FlatList } from 'react-native'

import { getDecks, addDeck, addQuestion } from '../actions/index'
import { gray, white } from '../utils/colours'

class DecksView extends Component {
    async componentDidMount() {
        await AsyncStorage.clear()
        await this.props.getDecks()
        await this.props.addDeck('first')
        await this.props.addDeck('second')
        await this.props.addQuestion('first', uuidv4(), 'q1', 'a1')
        this.props.addQuestion('first', uuidv4(), 'q2', 'a2')
    }
    _renderItem = ({ item }) =>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', { title: item.title })}>  
            <View style={styles.item}>
                <Text style={[styles.centreText, { fontSize: 40 }]}>{item.title}</Text>
                <Text style={[styles.centreText, { fontSize: 30, color: gray }]}>{`${item.questionCount} card${item.questionCount < 2 ? '' : 's'}`}</Text>
            </View>
        </TouchableOpacity>

    render() {
        const { decks, questions } = this.props
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

const mapStateToProps = ({ entities: { decks, questions } }) => ({
    decks: Object.values(decks),
    questions: Object.values(questions),
})

export default connect(mapStateToProps, {
    getDecks,
    addDeck,
    addQuestion
})(DecksView)