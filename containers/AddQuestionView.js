import React, { Component } from 'react'
import { StyleSheet, TextInput, Platform, Keyboard, KeyboardAvoidingView, Button, TouchableWithoutFeedback } from 'react-native'
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TextInput placeholder='Question (140 characters)' placeholderColor={gray} multiline={true} maxLength={140}
                        style={[{ borderWidth: questionBorderWidth }, styles.input]} value={questionInput}
                        onChangeText={this._handleInputChange('questionInput')} onFocus={this._handleQuestionOnFocus}
                        onBlur={this._handleAnswerOnFocus}
                    />
                    <TextInput placeholder='Answer (140 characters)' placeholderColor={gray} multiline={true} maxLength={140}
                        style={[{ borderWidth: answerBorderWidth }, styles.input]} value={answerInput}
                        onChangeText={this._handleInputChange('answerInput')} onFocus={this._handleAnswerOnFocus}
                        onBlur={this.handleQuestionOnFocus}
                    />
                    <Button onPress={this._onSubmit} title='I want to add it now' color={red} />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    input: {
        height: 100,
        backgroundColor: white,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        borderColor: red,
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
    }
})

export default connect(null, {
    addQuestion,
})(AddQuestionView)
