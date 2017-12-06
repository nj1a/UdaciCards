import React, { Component } from 'react'
import { TextInput, Button } from 'react-native'
import { connect } from 'react-redux'

import { ContainerView, viewStyles } from '../components/Views'
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
            <ContainerView>
                <TextInput placeholder='Title of you new deck (32 characters)' placeholderColor={gray} maxLength={32}
                    style={[{
                        borderWidth: titleBorderWidth, height: 30, fontSize: 15,
                    }, viewStyles.card]} value={titleInput}
                    onChangeText={this._handleInputChange('titleInput')} onFocus={this._handleTitleOnFocus}
                    onBlur={this._handleTitleOnBlur} autoFocus
                />
                <Button onPress={this._onSubmit} title='I want to add it now' color={red} />
            </ContainerView>
        )
    }
}

export default connect(null, {
    addDeck
})(AddDeckView)
