import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'

import configureStore from './configureStore'
import { white, red } from './utils/colours'
import DecksView from './containers/DecksView'
import DeckView from './containers/DeckView'
import AddDeckView from './containers/AddDeckView'
import AddQuestionView from './containers/AddQuestionView'
import QuizView from './containers/QuizView'

export const MainNavigator = StackNavigator({
    Home: {
        screen: DecksView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: red,
            },
            title: 'Home',
        },
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: red,
            }
        }
    },
    AddQuestionView: {
        screen: AddQuestionView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: red,
            }
        }
    },
    AddDeckView: {
        screen: AddDeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: red,
            },
            title: 'Add Deck',
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: red,
            },
        }
    }
})

const App = () => (
    <Provider store={configureStore()}>
        <View style={styles.container}>
            <View style={{ backgroundColor: red, height: Constants.statusBarHeight }}>
                <StatusBar translucent barStyle="light-content" />
            </View>
            <MainNavigator />
        </View>
    </Provider>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App
