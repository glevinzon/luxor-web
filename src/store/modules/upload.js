import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'

export const UPLOAD_IMAGE = 'api/UPLOAD_IMAGE'
export const UPLOAD_IMAGE_SUCCESS = 'api/UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAIL = 'api/UPLOAD_IMAGE_FAIL'

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

export const actions = {
  uploadImage
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
    uploadImageError: null
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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  upload: null,
  target: null,
  uploadImageError: false,
  uploadingImageSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

