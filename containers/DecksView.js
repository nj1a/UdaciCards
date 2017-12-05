import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { AsyncStorage, FlatList } from 'react-native'

import { getDecks, addDeck, addQuestion } from '../actions/index'

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
        <View key={item.title}>
            <Text>{item.title}</Text>
            <Text>{`${item.questionCount} card${item.questionCount < 2 ? '' : 's'}`}</Text>
        </View>

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
    },
})

const mapStateToProps = ({ entities: { decks, questions } }) => {
    return {
        decks: Object.values(decks),
        questions: Object.values(questions),
    }
}

export default connect(mapStateToProps, {
    getDecks,
    addDeck,
    addQuestion
})(DecksView)