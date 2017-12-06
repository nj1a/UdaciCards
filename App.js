import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { Constants } from 'expo'

import configureStore from './configureStore'
import MainNavigator from './components/MainNavigator'
import { setLocalNotification } from './utils/notifications'
import { white, red } from './utils/colours'

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }
    
    render() {
        return (
            <Provider store={configureStore()}>
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: red, height: Constants.statusBarHeight }}>
                        <StatusBar translucent barStyle="light-content" />
                    </View>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
