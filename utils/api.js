import { AsyncStorage } from 'react-native'

/**
 * The AsyncStorage has the following schema:
 * 
 *  decks: {
 *      [title]: {
 *          title: string the name of this deck
 *      }
 *  }, 
 *  questions: {
 *      [id]: {
 *          id: string
 *          question: string
 *          answer: string
 *          deck: string
 *      }
 *  }
 */

const DECKS_ASYNC_STORAGE_KEY = 'UdaciCards:decks'
const CARDS_ASYNC_STORAGE_KEY = 'UdaciCards:cards'

export const getDecks = () => AsyncStorage.getItem(DECKS_ASYNC_STORAGE_KEY).then(result => ({ decks: JSON.parse(result) || {} }))

export const addDeck = async ({ title }) => {
    await AsyncStorage.mergeItem(DECKS_ASYNC_STORAGE_KEY, JSON.stringify({ [title]: { title, questionCount: 0 }}))
    return getDecks()
}

export const addQuestion = async ({ deck, id, question, answer }) => {
    const currentDecks = await getDecks()
    await AsyncStorage.mergeItem(DECKS_ASYNC_STORAGE_KEY,
        JSON.stringify({ [deck]: { questionCount: currentDecks.decks[deck].questionCount + 1 } }))
    await AsyncStorage.mergeItem(CARDS_ASYNC_STORAGE_KEY, JSON.stringify({ [id]: { id, question, answer, deck } }))
    const [[, decks], [, questions]] = await AsyncStorage.multiGet([DECKS_ASYNC_STORAGE_KEY, CARDS_ASYNC_STORAGE_KEY])
    return { decks: JSON.parse(decks), questions: JSON.parse(questions) }
}
