import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'

export const CREATE_RESERVATION = 'api/CREATE_RESERVATION'
export const CREATE_RESERVATION_SUCCESS = 'api/CREATE_RESERVATION_SUCCESS'
export const CREATE_RESERVATION_FAIL = 'api/CREATE_RESERVATION_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function createReservation (data) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/reserve',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_RESERVATION,
        CREATE_RESERVATION_SUCCESS,
        CREATE_RESERVATION_FAIL]
    }
  }
}

export function updateReservationWithCode (reserveCode, data, token) {
  return {
    [CALL_API]: {
      endpoint: `/api/v1/reserve/${userCode}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_RESERVATION,
        {
          type: CREATE_RESERVATION_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                // Redirect to login
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/account'
              })
            }
          }
        },
        CREATE_RESERVATION_FAIL]
    }
  }
}

export const actions = {
  createReservation,
  updateReservationWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_RESERVATION ] = state => {
  return state.merge({
    creatingReservation: true,
    creatingReservationSuccess: false,
    createReservationError: null
  })
}

actionHandlers[ CREATE_RESERVATION_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingReservation: false,
    creatingReservationSuccess: true,
    createReservationError: null,
    reserve: action.payload.data.reserve
  })
}

actionHandlers[ CREATE_RESERVATION_FAIL ] = (state, action) => {
  return state.merge({
    creatingReservation: false,
    creatingReservationSuccess: false,
    createReservationError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  reserve: null,
  createReservationError: false,
  creatingReservationSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

