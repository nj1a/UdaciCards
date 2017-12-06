import React, { Component } from 'react'
import { StyleSheet, TextInput, Platform, Button, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import { addQuestion } from '../actions/index'
import { gray, white, red } from '../utils/colours'

class AddQuestionView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Add Card for ${navigation.state.params.deckTitle}`
    })

    state = {
        questionInput: '',
        answerInput: '',
        questionBorderWidth: 0,
        answerBorderWidth: 0,
    }

    _handleInputChange = input => value => {
        this.setState({ [input]: value })
    }

    _handleQuestionOnFocus = () => {
        this.setState({ questionBorderWidth: 1, answerBorderWidth: 0 })
    }

    _handleAnswerOnFocus = () => {
        this.setState({ questionBorderWidth: 0, answerBorderWidth: 1 })
    }

    _onSubmit = () => {
        const { questionInput, answerInput } = this.state
        const { navigation, addQuestion } = this.props
        addQuestion(navigation.state.params.deckTitle, uuidv4(), questionInput, answerInput)
        navigation.goBack()
    }

    render() {
        const { questionInput, answerInput, questionBorderWidth, answerBorderWidth } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} >
                <TextInput placeholder='Question (120 characters)' placeholderColor={gray} maxLength={120}
                    style={[{ borderWidth: questionBorderWidth }, styles.input]} value={questionInput}
                    onChangeText={this._handleInputChange('questionInput')} onFocus={this._handleQuestionOnFocus}
                    onBlur={this._handleAnswerOnFocus} multiline blurOnSubmit autoFocus
                />
                <TextInput placeholder='Answer (120 characters)' placeholderColor={gray} maxLength={120}
                    style={[{ borderWidth: answerBorderWidth }, styles.input]} value={answerInput}
                    onChangeText={this._handleInputChange('answerInput')} onFocus={this._handleAnswerOnFocus}
                    onBlur={this.handleQuestionOnFocus} multiline blurOnSubmit
                />
                <Button onPress={this._onSubmit} title='I want to add it now' color={red} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    input: {
        height: 70,
        fontSize: 15,
        backgroundColor: white,
        padding: 5,
        margin: 10,
        borderColor: red,
        borderRadius: Platform.OS === 'ios' ? 4 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
    }
})

export default connect(null, {
    addQuestion,
})(AddQuestionView)
