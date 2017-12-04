import { AsyncStorage } from 'react-native'

/**
 * The AsyncStorage has the following schema:
 * 
 *  decks: {
 *      [title]: {
 *          title: string the name of this deck
 *          questions: [string] ids of questions belonging to this deck
 *      }
 *  }, 
 *  questions: {
 *      [id]: {
 *          id: string
 *          question: string
 *          answer: string
 *      }
 *  }
 */

const DECKS_ASYNC_STORAGE_KEY = 'UdaciCards:decks'
const CARDS_ASYNC_STORAGE_KEY = 'UdaciCards:cards'

export const getDecks = () => AsyncStorage
    .getItems(DECKS_ASYNC_STORAGE_KEY)
    .then(response => { decks: JSON.parse(response) })

export const addDeck = title => AsyncStorage
    .mergeItems(DECKS_ASYNC_STORAGE_KEY, JSON.stringify({ [title]: { title: title, questions: [] } }))
    .then(response => { decks: JSON.parse(response) })

export const addQuestion = async (title, id, question, answer) => ({
    decks: JSON.parse(await AsyncStorage.mergeItems(DECKS_ASYNC_STORAGE_KEY, JSON.stringify({ [title]: { questions: [id] } }))),
    questions: JSON.parse(await AsyncStorage.mergeItems(CARDS_ASYNC_STORAGE_KEY, JSON.stringify({ [id]: { id, question, answer } }))),
})
