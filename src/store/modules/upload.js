import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const UPLOAD_IMAGE = 'api/UPLOAD_IMAGE'
export const UPLOAD_IMAGE_SUCCESS = 'api/UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAIL = 'api/UPLOAD_IMAGE_FAIL'

export const GET_DUMB = 'api/GET_DUMB'

export const GET_UPLOADS_BY_ROOMID = 'api/GET_UPLOADS_BY_ROOMID'
export const GET_UPLOADS_BY_ROOMID_SUCCESS = 'api/GET_UPLOADS_BY_ROOMID_SUCCESS'
export const GET_UPLOADS_BY_ROOMID_FAIL = 'api/GET_UPLOADS_BY_ROOMID_FAIL'

export const DELETE_UPLOADS_BY_ROOMCODES = 'api/DELETE_UPLOADS_BY_ROOMCODES'
export const DELETE_UPLOADS_BY_ROOMCODES_SUCCESS = 'api/DELETE_UPLOADS_BY_ROOMCODES_SUCCESS'
export const DELETE_UPLOADS_BY_ROOMCODES_FAIL = 'api/DELETE_UPLOADS_BY_ROOMCODES_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function uploadImage (data, target, roomId) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { accessToken } = getState().auth.toJS()
    let endpoint = `/api/v1/uploads/${target}`
    if (roomId) {
      endpoint = `/api/v1/uploads/${target}/${roomId}`
    }
    return dispatch({
      [CALL_API]: {
        endpoint: endpoint,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: data,
        types: [
          UPLOAD_IMAGE,
          UPLOAD_IMAGE_SUCCESS,
          UPLOAD_IMAGE_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getUploadsByRoomId (roomId = null) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    const { accessToken } = getState().auth.toJS()
    let endpoint = `/api/v1/uploads/${roomId}`
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_UPLOADS_BY_ROOMID, GET_UPLOADS_BY_ROOMID_SUCCESS, GET_UPLOADS_BY_ROOMID_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function deleteUploadsByRoomCodes (data) {
  console.log('SELECTED', data)
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/uploads',
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          DELETE_UPLOADS_BY_ROOMCODES,
          DELETE_UPLOADS_BY_ROOMCODES_SUCCESS,
          DELETE_UPLOADS_BY_ROOMCODES_FAIL]
      }
    })
  }
}

export function getDumb () {
  return {
    type: GET_DUMB
  }
}

export const actions = {
  uploadImage,
  getDumb
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ UPLOAD_IMAGE ] = state => {
  return state.merge({
    upload: null,
    target: null,
    uploadingImage: true,
    uploadingImageSuccess: false,
    uploadImageError: null,
    gettingDumbSuccess: false
  })
}

actionHandlers[ UPLOAD_IMAGE_SUCCESS ] = (state, action) => {
  return state.merge({
    uploadingImage: false,
    uploadingImageSuccess: true,
    uploadImageError: null,
    upload: action.payload.data.upload,
    target: action.payload.data.target
  })
}

actionHandlers[ UPLOAD_IMAGE_FAIL ] = (state, action) => {
  return state.merge({
    uploadingImage: false,
    uploadingImageSuccess: false,
    uploadImageError: action.payload.response.error
  })
}

actionHandlers[ GET_DUMB ] = state => {
  return state.merge({
    uploadingImageSuccess: false,
    fetchingUploadsByRoomIdSuccess: false,
    deletingUploadsByRoomCodesSuccess: false
  })
}

actionHandlers[ GET_UPLOADS_BY_ROOMID ] = state => {
  return state.merge({
    uploadsByRoomId: [],
    fetchingUploadsByRoomId: true,
    fetchingUploadsByRoomIdSuccess: false,
    getUploadsByRoomIdError: null,
    uploadingImageSuccess: false
  })
}

actionHandlers[ GET_UPLOADS_BY_ROOMID_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingUploadsByRoomId: false,
    fetchingUploadsByRoomIdSuccess: true,
    getUploadsByRoomIdError: null,
    uploadsByRoomId: action.payload.data.uploads
  })
}

actionHandlers[ GET_UPLOADS_BY_ROOMID_FAIL ] = (state, action) => {
  return state.merge({
    fetchingUploadsByRoomId: false,
    fetchingUploadsByRoomIdSuccess: false,
    getUploadsByRoomIdError: action.payload.response.error
  })
}

actionHandlers[ DELETE_UPLOADS_BY_ROOMCODES ] = state => {
  return state.merge({
    deletingUploadsByRoomCodes: true,
    deletingUploadsByRoomCodesSuccess: false,
    deleteUploadsByRoomCodesError: null
  })
}

actionHandlers[ DELETE_UPLOADS_BY_ROOMCODES_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingUploadsByRoomCodes: false,
    deletingUploadsByRoomCodesSuccess: true,
    deleteUploadsByRoomCodesError: null
  })
}

actionHandlers[ DELETE_UPLOADS_BY_ROOMCODES_FAIL ] = (state, action) => {
  return state.merge({
    deletingUploadsByRoomCodes: false,
    deletingUploadsByRoomCodesSuccess: false,
    deleteUploadsByRoomCodesError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  upload: null,
  target: null,
  uploadImageError: false,
  uploadingImageSuccess: false,
  fetchingUploadsByRoomId: false,
  fetchingUploadsByRoomIdSuccess: false,
  getUploadsByRoomIdError: null,
  uploadsByRoomId: [],
  deletingUploadsByRoomCodes: false,
  deletingUploadsByRoomCodesSuccess: false,
  deleteUploadsByRoomCodesError: null
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

