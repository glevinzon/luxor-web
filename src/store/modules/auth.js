import moment from 'moment'
import { CALL_API } from 'redux-api-middleware'
import { REHYDRATE } from 'redux-persist/constants'
import { getToken } from './utils/auth'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD = 'luxor/auth/LOAD'
export const LOAD_SUCCESS = 'luxor/auth/LOAD_SUCCESS'
export const LOAD_FAIL = 'luxor/auth/LOAD_FAIL'
export const LOGIN = 'luxor/auth/LOGIN'
export const LOGIN_SUCCESS = 'luxor/auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'luxor/auth/LOGIN_FAIL'
export const LOGOUT = 'luxor/auth/LOGOUT'
export const LOGOUT_SUCCESS = 'luxor/auth/LOGOUT_SUCCESS'
export const CHANGE_PASSWORD = 'luxor:user:change_password'
export const CHANGE_PASSWORD_SUCCESS = 'luxor:user:change_password:success'
export const CHANGE_PASSWORD_FAIL = 'luxor:user:change_password:fail'

// ------------------------------------
// Actions
// ------------------------------------

export function load (token) {
  return {
    [CALL_API]: {
      endpoint: '/api/user',
      method: 'GET',
      headers: {
        Authorization: `${token}`
      },
      types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ]
    }
  }
}

export function changePassword (oldPassword, newPassword) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/user/password',
        method: 'POST',
        headers: {
          Authorization: `${getToken(getState())}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current: oldPassword,
          password: newPassword
        }),
        types: [ CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL ]
      }
    })
  }
}

export function login (email, password) {
  return {
    [CALL_API]: {
      endpoint: '/api/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      types: [
        LOGIN,
        {
          type: LOGIN_SUCCESS,
          payload: (action, state, res) => res.json(),
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/'
              })
            }
          }
        },
        LOGIN_FAIL
      ]
    }
  }
}

export function logout () {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT
    })
    await dispatch({
      type: LOGOUT_SUCCESS
    })
    window.location = '/'
    localStorage.removeItem('reduxPersist:auth')
    localStorage.removeItem('reduxPersist:app')
  }
}

export const actions = {
  load,
  login,
  logout,
  changePassword
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    const incoming = action.payload.auth
    return {
      ...state,
      token: (incoming && incoming.token) ? incoming.token : null
    }
  },
  [LOAD]: state => ({
    ...state,
    loading: true,
    otpVerifiedAt: null,
    verifyOtpError: null,
    error: null
  }),
  [LOAD_SUCCESS]: (state, action) => {
    const ret = {
      ...state,
      loading: false,
      user: action.payload,
      loaded: true
    }
    if (action.payload.otpVerifiedAt) {
      ret.otpVerifiedAt = moment(action.payload.otpVerifiedAt)
    }
    return ret
  },
  [LOAD_FAIL]: (state, action) => ({
    ...state,
    loading: false,
    user: null,
    loaded: false,
    token: null,  // clear token on failure
    error: action.payload
  }),
  [LOGIN]: (state) => ({
    ...state,
    loggingIn: true
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loggingIn: false,
    token: action.payload
  }),
  [LOGIN_FAIL]: (state) => ({
    ...state,
    loggingIn: false,
    token: null
  }),
  [LOGOUT]: state => ({
    ...state,
    loggingOut: true
  }),
  [LOGOUT_SUCCESS]: state => ({
    ...state,
    loggingOut: false,
    token: null
  }),
  [CHANGE_PASSWORD]: state => {
    return {
      ...state,
      settings: {
        success: null,
        error: null,
        loading: true
      }
    }
  },
  [CHANGE_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      settings: {
        success: action.payload.data,
        error: null,
        loading: false
      }
    }
  },
  [CHANGE_PASSWORD_FAIL]: (state, action) => {
    return {
      ...state,
      settings: {
        success: null,
        error: action.payload.response.message,
        loading: false
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  user: null,
  settings: {
    loading: false,
    error: null,
    success: null
  }
}
export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[ action.type ]

  return handler ? handler(state, action) : state
}
