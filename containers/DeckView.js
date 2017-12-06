import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

import { CardView, ContainerView } from '../components/Views'
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
            <ContainerView>
                <CardView>
                    <Text style={[styles.centreText, { fontSize: 30 }]}>{deck.title}</Text>
                    <Text style={[styles.centreText, { fontSize: 20, color: gray }]}>
                        {`${deck.questionCount} card${deck.questionCount < 2 ? '' : 's'}`}
                    </Text>
                    <View style={{ marginTop: 30 }}>
                        <Button color={red} title='Add Card'
                            onPress={() => navigation.navigate('AddQuestionView', { deckTitle: deck.title })} />
                        {<Button color={red} title='Start Quiz' disabled={!deck.questionCount}
                            onPress={() => navigation.navigate('QuizView', { deckTitle: deck.title })} />}
                    </View>
                </CardView>
            </ContainerView>
        )
    }
}

const styles = StyleSheet.create({
    centreText: {
        textAlign: 'center',
    }
}) 

const mapStateToProps = ({ entities: { decks } }, { navigation }) => ({
    deck: decks[navigation.state.params.title],
})

export default connect(mapStateToProps)(DeckView)
