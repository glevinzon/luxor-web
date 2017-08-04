import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const UPLOAD_IMAGE = 'api/UPLOAD_IMAGE'
export const UPLOAD_IMAGE_SUCCESS = 'api/UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAIL = 'api/UPLOAD_IMAGE_FAIL'

export const GET_DUMB = 'api/GET_DUMB'
export const GET_DUMB_SUCCESS = 'api/GET_DUMB_SUCCESS'
export const GET_DUMB_FAIL = 'api/GET_DUMB_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function uploadImage (data, target) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/uploads/${target}`,
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
    })
  }
}

export function getDumb () {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = '/api/'
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [GET_DUMB, GET_DUMB_SUCCESS, GET_DUMB_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
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
    gettingDumb: true,
    gettingDumbSuccess: false,
    uploadingImageSuccess: false
  })
}

actionHandlers[ GET_DUMB_SUCCESS ] = (state, action) => {
  return state.merge({
    gettingDumb: false,
    gettingDumbSuccess: true
  })
}

actionHandlers[ GET_DUMB_FAIL ] = (state, action) => {
  return state.merge({
    gettingDumb: false,
    gettingDumbSuccess: false,
    getDumbError: action.payload.response.error
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
  gettingDumb: false,
  gettingDumbSuccess: false,
  getDumbError: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

