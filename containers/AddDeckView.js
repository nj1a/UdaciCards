import React, { Component } from 'react'
import { StyleSheet, TextInput, Platform, Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../actions/index'
import { gray, white, red } from '../utils/colours'

class AddDeckView extends Component {
    state = {
        titleInput: '',
        titleBorderWidth: 0,
    }

    handleInputChange = input => value => {
        this.setState({ [input]: value })
    }

    handleTitleOnFocus = () => {
        this.setState({ titleBorderWidth: 1, })
    }

    handleTitleOnBlur = () => {
        this.setState({ titleBorderWidth: 0, })
    }

    _onSubmit = () => {
        const { titleInput, } = this.state
        const { navigation, addDeck } = this.props
        addDeck(titleInput)
        navigation.goBack()
    }
    
    render() {
        const { titleInput, titleBorderWidth } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TextInput placeholder='Title of you new deck (32 characters)' placeholderColor={gray} maxLength={32}
                        style={[{ borderWidth: titleBorderWidth }, styles.input]} value={titleInput}
                        onChangeText={this.handleInputChange('titleInput')} onFocus={this.handleTitleOnFocus}
                        onBlur={this.handleTitleOnBlur}
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
    addDeck
})(AddDeckView)
