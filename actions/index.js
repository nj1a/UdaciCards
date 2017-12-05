import isEmpty from 'lodash/isEmpty'

import { Schemas } from '../middleware/api'
import * as api from '../utils/api'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

export const GET_DECKS_REQUEST = 'GET_DECKS_REQUEST'
export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS'
export const GET_DECKS_FAILURE = 'GET_DECKS_FAILURE'

export const getDecks = () => (dispatch, getState) => dispatch({
    types: [GET_DECKS_REQUEST, GET_DECKS_SUCCESS, GET_DECKS_FAILURE],
    call: api.getDecks,
    shouldCall: isEmpty(getState().entities.categories),
})

export const GET_DECK_REQUEST = 'GET_DECK_REQUEST'
export const GET_DECK_SUCCESS = 'GET_DECK_SUCCESS'
export const GET_DECK_FAILURE = 'GET_DECK_FAILURE'

export const getDeck = title => (dispatch, getState) => dispatch({
    types: [GET_DECK_REQUEST, GET_DECK_SUCCESS, GET_DECK_FAILURE],
    call: api.getDeck,
    shouldCall: isEmpty(getState().entities.decks),
    payload: { title },
})

export const ADD_DECK_REQUEST = 'ADD_DECK_REQUEST'
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS'
export const ADD_DECK_FAILURE = 'ADD_DECK_FAILURE'

export const addDeck = title => dispatch => dispatch({
    types: [ADD_DECK_REQUEST, ADD_DECK_SUCCESS, ADD_DECK_FAILURE],
    call: api.addDeck,
    payload: { title },
})

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST'
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS'
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE'

export const addQuestion = (deck, id, question, answer) => dispatch => dispatch({
    types: [ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_FAILURE],
    call: api.addQuestion,
    payload: { deck, id, question, answer },
})
