import { AsyncStorage } from 'react-native'

const DECKS_ASYNC_STORAGE_KEY = 'UdaciCards:decks'

export const getDecks = () => AsyncStorage.getItems(DECKS_ASYNC_STORAGE_KEY).then(JSON.parse)

export const getDeck = id => getDecks().then(decks => decks[id])

export const saveDeckTitle = title => AsyncStorage
    .setItems(DECKS_ASYNC_STORAGE_KEY, JSON.stringify({ [title]: { title: title, questions: [] } }))
    .then(getDeck(title))

export const addCardToDeck = (title, card) => AsyncStorage
    .mergeItems(DECKS_ASYNC_STORAGE_KEY, JSON.stringify({ [title]: { questions: [card] } }))
    .then(getDeck(title))
