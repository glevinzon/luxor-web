import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT = 'api/CONNECT'
export const CONNECT_SUCCESS = 'api/CONNECT_SUCCESS'
export const CONNECT_FAIL = 'api/CONNECT_FAIL'
// ------------------------------------
// Actions
// ------------------------------------

export function connectToAPI () {
  return {
    [CALL_API]: {
      endpoint: '/api/',
      method: 'GET',
      types: [ CONNECT, CONNECT_SUCCESS, CONNECT_FAIL ]
    }
  }
}

export const actions = {
  connectToAPI
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {}

// ------------------------------------
// Connect to API action handlers
// ------------------------------------
ACTION_HANDLERS[CONNECT] = state => {
  return state.merge({
    connecting: true,
    success: false,
    error: null
  })
}

ACTION_HANDLERS[CONNECT_SUCCESS] = (state, action) => {
  return state.merge({
    connecting: false,
    success: true,
    connection: action.payload,
    error: null
  })
}

ACTION_HANDLERS[CONNECT_FAIL] = (state, action) => {
  return state.merge({
    connecting: false,
    success: false,
    error: action.payload.response.errors
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  error: null,
  connection: null
})

export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
