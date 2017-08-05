import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_ROOM = 'api/CREATE_ROOM'
export const CREATE_ROOM_SUCCESS = 'api/CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_FAIL = 'api/CREATE_ROOM_FAIL'
export const GET_ROOMS = 'api/GET_ROOMS'
export const GET_ROOMS_SUCCESS = 'api/GET_ROOMS_SUCCESS'
export const GET_ROOMS_FAIL = 'api/GET_ROOMS_FAIL'
export const DELETE_ROOM = 'api/DELETE_ROOM'
export const DELETE_ROOM_SUCCESS = 'api/DELETE_ROOM_SUCCESS'
export const DELETE_ROOM_FAIL = 'api/DELETE_ROOM_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getRooms (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/rooms?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getRoomsWithStatus (status) {
  return (dispatch, getState) => {
    let endpoint = `/api/v1/rooms/${status}`
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAIL]
      }
    })
  }
}

export function createRoom (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/room',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ROOM,
          CREATE_ROOM_SUCCESS,
          CREATE_ROOM_FAIL]
      }
    })
  }
}

export function deleteRoom (code) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/room/${code}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_ROOM,
          DELETE_ROOM_SUCCESS,
          DELETE_ROOM_FAIL]
      }
    })
  }
}

export function updateRoomWithCode (roomCode, data, token) {
  return {
    [CALL_API]: {
      endpoint: `/api/v1/room/${userCode}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_ROOM,
        {
          type: CREATE_ROOM_SUCCESS,
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
        CREATE_ROOM_FAIL]
    }
  }
}

export const actions = {
  getRooms,
  createRoom,
  deleteRoom,
  updateRoomWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_ROOM ] = state => {
  return state.merge({
    creatingRoom: true,
    creatingRoomSuccess: false,
    createRoomError: null
  })
}

actionHandlers[ CREATE_ROOM_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingRoom: false,
    creatingRoomSuccess: true,
    createRoomError: null,
    room: action.payload.data.room
  })
}

actionHandlers[ CREATE_ROOM_FAIL ] = (state, action) => {
  return state.merge({
    creatingRoom: false,
    creatingRoomSuccess: false,
    createRoomError: action.payload.response.error
  })
}

actionHandlers[ GET_ROOMS ] = state => {
  return state.merge({
    fetchingRooms: true,
    fetchingRoomsSuccess: false,
    getRoomsError: null,
    creatingRoomSuccess: false,
    deletingRoomSuccess: false
  })
}

actionHandlers[ GET_ROOMS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingRooms: false,
    fetchingRoomsSuccess: true,
    getRoomsError: null,
    rooms: action.payload.data.rooms
  })
}

actionHandlers[ GET_ROOMS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingRooms: false,
    fetchingRoomsSuccess: false,
    getRoomsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_ROOM ] = state => {
  return state.merge({
    deletingRoom: true,
    deletingRoomSuccess: false,
    deleteRoomError: null
  })
}

actionHandlers[ DELETE_ROOM_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingRoom: false,
    deletingRoomSuccess: true,
    deleteRoomError: null
  })
}

actionHandlers[ DELETE_ROOM_FAIL ] = (state, action) => {
  return state.merge({
    deletingRoom: false,
    deletingRoomSuccess: false,
    deleteRoomError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  room: null,
  createRoomError: false,
  creatingRoomSuccess: false,
  rooms: null,
  getRoomsError: false,
  fetchingRoomSuccess: false,
  deleteRoomError: false,
  deletingRoomSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

