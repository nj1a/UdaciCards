import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { getDecks, addDeck, addQuestion } from '../actions/index'
import { gray, white } from '../utils/colours'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    render() {
        const { deck } = this.props
        return (
            <View style={styles.item}>
                <Text style={[styles.centreText, { fontSize: 40 }]}>{deck.title}</Text>
                <Text style={[styles.centreText, { fontSize: 30, color: gray }]}>
                    {`${deck.questionCount} card${deck.questionCount < 2 ? '' : 's'}`}
                </Text>
                <TouchableOpacity style={{ marginTop: 30 }}
                    onPress={() => this.props.navigation.navigate('AddQuestionView', { deckTitle: deck.title })}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 30 }}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

const mapStateToProps = ({ entities: { decks } }, { navigation }) => ({
    deck: decks[navigation.state.params.title],
})

export default connect(mapStateToProps)(DeckView)