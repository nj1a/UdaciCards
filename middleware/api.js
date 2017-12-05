export default store => next => async ({ types, call, payload = {}, shouldCall = true }) => {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings')
    }
    if (typeof call !== 'function') {
        throw new Error('Expected the call to be a function')
    }
    if (!shouldCall) {
        return
    }

    const [requestType, successType, failureType] = types
    next({ payload, type: requestType, isLoading: true, })

    try {
        const normalizedResult = { entities: await call(payload) }
        next({ payload, type: successType, response: normalizedResult, isLoading: false, })
    } catch (error) {
        next({ payload, type: failureType, error: error.message || 'Something bad happened', isLoading: false, })
    }
}
