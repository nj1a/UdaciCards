import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, Button } from 'react-native'
import { connect } from 'react-redux'

import { gray, white, red } from '../utils/colours'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerLeft: <Button title="Home" color={white}
            onPress={() => navigation.navigate('HomeView')} />
    })

    render() {
        const { deck, navigation } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                    <Text style={[styles.centreText, { fontSize: 40 }]}>{deck.title}</Text>
                    <Text style={[styles.centreText, { fontSize: 30, color: gray }]}>
                        {`${deck.questionCount} card${deck.questionCount < 2 ? '' : 's'}`}
                    </Text>
                    <View style={{ marginTop: 30 }}>
                        <Button color={red} title='Add Card'
                            onPress={() => navigation.navigate('AddQuestionView', { deckTitle: deck.title })} />
                        {<Button color={red} title='Start Quiz' disabled={!deck.questionCount}
                            onPress={() => navigation.navigate('QuizView', { deckTitle: deck.title })} />}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    item: {
        backgroundColor: white,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
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
