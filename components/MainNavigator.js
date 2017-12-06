import React from 'react'
import { StackNavigator } from 'react-navigation'

import DecksView from '../containers/DecksView'
import DeckView from '../containers/DeckView'
import AddDeckView from '../containers/AddDeckView'
import AddQuestionView from '../containers/AddQuestionView'
import QuizView from '../containers/QuizView'
import { white, red } from '../utils/colours'

const MainNavigator = StackNavigator({
    HomeView: {
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

export default MainNavigator
