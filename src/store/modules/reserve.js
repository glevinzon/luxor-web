import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_RESERVATION = 'api/CREATE_RESERVATION'
export const CREATE_RESERVATION_SUCCESS = 'api/CREATE_RESERVATION_SUCCESS'
export const CREATE_RESERVATION_FAIL = 'api/CREATE_RESERVATION_FAIL'
export const GET_RESERVATIONS = 'api/GET_RESERVATIONS'
export const GET_RESERVATIONS_SUCCESS = 'api/GET_RESERVATIONS_SUCCESS'
export const GET_RESERVATIONS_FAIL = 'api/GET_RESERVATIONS_FAIL'
export const DELETE_RESERVATION = 'api/DELETE_RESERVATION'
export const DELETE_RESERVATION_SUCCESS = 'api/DELETE_RESERVATION_SUCCESS'
export const DELETE_RESERVATION_FAIL = 'api/DELETE_RESERVATION_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getReservations (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/reserves?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_RESERVATIONS, GET_RESERVATIONS_SUCCESS, GET_RESERVATIONS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

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

export function deleteReservation (code) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/reserve/${code}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_RESERVATION,
          DELETE_RESERVATION_SUCCESS,
          DELETE_RESERVATION_FAIL]
      }
    })
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

export function updateReservationStatus (reserveId, status) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/reserve/${reserveId}/${status}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_RESERVATIONS, GET_RESERVATIONS_SUCCESS, GET_RESERVATIONS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export const actions = {
  getReservations,
  createReservation,
  deleteReservation,
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

actionHandlers[ GET_RESERVATIONS ] = state => {
  return state.merge({
    fetchingReservations: true,
    fetchingReservationsSuccess: false,
    getReservationsError: null,
    creatingReservationSuccess: false,
    deletingReservationSuccess: false
  })
}

actionHandlers[ GET_RESERVATIONS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingReservations: false,
    fetchingReservationsSuccess: true,
    getReservationsError: null,
    reserves: action.payload.data.reserves
  })
}

actionHandlers[ GET_RESERVATIONS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingReservations: false,
    fetchingReservationsSuccess: false,
    getReservationsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_RESERVATION ] = state => {
  return state.merge({
    deletingReservation: true,
    deletingReservationSuccess: false,
    deleteReservationError: null
  })
}

actionHandlers[ DELETE_RESERVATION_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingReservation: false,
    deletingReservationSuccess: true,
    deleteReservationError: null
  })
}

actionHandlers[ DELETE_RESERVATION_FAIL ] = (state, action) => {
  return state.merge({
    deletingReservation: false,
    deletingReservationSuccess: false,
    deleteReservationError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  reserve: null,
  createReservationError: false,
  creatingReservationSuccess: false,
  reserves: null,
  getReservationsError: false,
  fetchingReservationSuccess: false,
  deleteReservationError: false,
  deletingReservationSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

