import React, { Component } from 'react'
import { StyleSheet, StatusBar, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import configureStore from './configureStore'
import { white, red } from './utils/colours'
import DecksView from './containers/DecksView'
import DeckView from './containers/DeckView'
import AddDeckView from './containers/AddDeckView'
import AddQuestionView from './containers/AddQuestionView'

const Tabs = TabNavigator(
    {
        DecksView: {
            screen: DecksView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            },
        },
        AddDeckView: {
            screen: AddDeckView,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            },
        },
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? red : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : red,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
)

export const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
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
    }
})


export default class App extends Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: red, height: Constants.statusBarHeight }}>
                        <StatusBar translucent barStyle="light-content" />
                    </View>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
