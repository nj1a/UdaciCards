import React, { Component } from 'react'
import { StyleSheet, TextInput, Platform, Button, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { addDeck } from '../actions/index'
import { gray, white, red } from '../utils/colours'

class AddDeckView extends Component {
    state = {
        titleInput: '',
        titleBorderWidth: 0,
    }

    _handleInputChange = input => value => {
        this.setState({ [input]: value })
    }

    _handleTitleOnFocus = () => {
        this.setState({ titleBorderWidth: 1, })
    }

    _handleTitleOnBlur = () => {
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
            <KeyboardAvoidingView behavior='position' style={styles.container}>
                <TextInput placeholder='Title of you new deck (32 characters)' placeholderColor={gray} maxLength={32}
                    style={[{ borderWidth: titleBorderWidth }, styles.input]} value={titleInput}
                    onChangeText={this._handleInputChange('titleInput')} onFocus={this._handleTitleOnFocus}
                    onBlur={this._handleTitleOnBlur} autoFocus
                />
                <Button onPress={this._onSubmit} title='I want to add it now' color={red} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 30,
        fontSize: 15,
        backgroundColor: white,
        margin: 20,
        padding: 5,
        borderColor: red,
        borderRadius: Platform.OS === 'ios' ? 4 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
    }
})

export default connect(null, {
    addDeck
})(AddDeckView)
