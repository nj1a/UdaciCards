import { combineReducers } from 'redux'
import merge from 'lodash/merge'

import { RESET_ERROR_MESSAGE } from '../actions'

const entities = (state = { decks: {}, questions: {}, }, { response }) =>
    (response && response.entities)
        ? merge({}, state, response.entities)
        : state

const errorMessage = (state = null, { type, error }) => {
    if (type === RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }
    return state
}

const isLoading = (state = null, { isLoading }) => {
    // should return true when isLoading is true or undefined
    return isLoading !== false
}

const rootReducer = combineReducers({
    entities,
    errorMessage,
    isLoading
})

export default rootReducer
