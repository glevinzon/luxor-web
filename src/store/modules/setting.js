import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_SETTING = 'api/CREATE_SETTING'
export const CREATE_SETTING_SUCCESS = 'api/CREATE_SETTING_SUCCESS'
export const CREATE_SETTING_FAIL = 'api/CREATE_SETTING_FAIL'
export const GET_SETTINGS = 'api/GET_SETTINGS'
export const GET_SETTINGS_SUCCESS = 'api/GET_SETTINGS_SUCCESS'
export const GET_SETTINGS_FAIL = 'api/GET_SETTINGS_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getSettings (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/settings?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_SETTINGS, GET_SETTINGS_SUCCESS, GET_SETTINGS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function updateSettingWithCode (settingCode, data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/setting/${settingCode}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_SETTING,
          CREATE_SETTING_SUCCESS,
          CREATE_SETTING_FAIL]
      }
    })
  }
}

export const actions = {
  getSettings,
  updateSettingWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_SETTING ] = state => {
  return state.merge({
    creatingSetting: true,
    creatingSettingSuccess: false,
    createSettingError: null
  })
}

actionHandlers[ CREATE_SETTING_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingSetting: false,
    creatingSettingSuccess: true,
    createSettingError: null,
    setting: action.payload.data.setting
  })
}

actionHandlers[ CREATE_SETTING_FAIL ] = (state, action) => {
  return state.merge({
    creatingSetting: false,
    creatingSettingSuccess: false,
    createSettingError: action.payload.response.error
  })
}

actionHandlers[ GET_SETTINGS ] = state => {
  return state.merge({
    fetchingSettings: true,
    fetchingSettingsSuccess: false,
    getSettingsError: null,
    creatingSettingSuccess: false,
    deletingSettingSuccess: false
  })
}

actionHandlers[ GET_SETTINGS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingSettings: false,
    fetchingSettingsSuccess: true,
    getSettingsError: null,
    settings: action.payload.data.settings
  })
}

actionHandlers[ GET_SETTINGS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingSettings: false,
    fetchingSettingsSuccess: false,
    getSettingsError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  setting: null,
  createSettingError: false,
  creatingSettingSuccess: false,
  settings: null,
  getSettingsError: false,
  fetchingSettingSuccess: false,
  deleteSettingError: false,
  deletingSettingSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

