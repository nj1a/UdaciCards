import React, { Component } from 'react'
import { TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'

import { ContainerView, viewStyles } from '../components/Views'
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
            <ContainerView>
                <TextInput placeholder='Question (120 characters)' placeholderColor={gray} maxLength={120}
                    style={[{
                        borderWidth: questionBorderWidth, fontSize: 15, height: 70,
                    }, viewStyles.card]} value={questionInput}
                    onChangeText={this._handleInputChange('questionInput')} onFocus={this._handleQuestionOnFocus}
                    onBlur={this._handleAnswerOnFocus} multiline blurOnSubmit autoFocus
                />
                <TextInput placeholder='Answer (120 characters)' placeholderColor={gray} maxLength={120}
                    style={[{
                        borderWidth: answerBorderWidth, fontSize: 15, height: 70,
                    }, viewStyles.card]} value={answerInput}
                    onChangeText={this._handleInputChange('answerInput')} onFocus={this._handleAnswerOnFocus}
                    onBlur={this.handleQuestionOnFocus} multiline blurOnSubmit
                />
                <Button onPress={this._onSubmit} title='I want to add it now' color={red} />
            </ContainerView>
        )
    }
}

export default connect(null, {
    addQuestion,
})(AddQuestionView)
