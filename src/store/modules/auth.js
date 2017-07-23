import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'auth/LOGIN_FAIL'
export const LOAD = 'auth/LOAD'
export const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
export const LOAD_FAIL = 'auth/LOAD_FAIL'
export const LOGOUT = 'auth/LOGOUT'
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'

export const CREATE_USER = 'api/CREATE_USER'
export const CREATE_USER_SUCCESS = 'api/CREATE_USER_SUCCESS'
export const CREATE_USER_FAIL = 'api/CREATE_USER_FAIL'

export const FORGOT_PASSWORD = 'api/FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'api/FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAIL = 'api/FORGOT_PASSWORD_FAIL'
export const CHANGE_PASSWORD = 'api/CHANGE_PASSWORD'
export const CHANGE_PASSWORD_SUCCESS = 'api/CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'api/CHANGE_PASSWORD_FAIL'
export const CHECK_EMAIL = 'api/CHECK_EMAIL'
export const CHECK_EMAIL_SUCCESS = 'api/CHECK_EMAIL_SUCCESS'
export const CHECK_EMAIL_FAIL = 'api/CHECK_EMAIL_FAIL'
export const VERIFY_EMAIL = 'api/VERIFY_EMAIL'
export const VERIFY_EMAIL_SUCCESS = 'api/VERIFY_EMAIL_SUCCESS'
export const VERIFY_EMAIL_FAIL = 'api/VERIFY_EMAIL_FAIL'
export const RESEND_VERIFICATION = 'api/RESEND_VERIFICATION_EMAIL'
export const RESEND_VERIFICATION_SUCCESS = 'api/RESEND_VERIFICATION_SUCCESS'
export const RESEND_VERIFICATION_FAIL = 'api/RESEND_VERIFICATION_FAIL'
export const UPLOAD_PROFILE_PHOTO = 'api/UPLOAD_PROFILE_PHOTO'
export const UPLOAD_PROFILE_PHOTO_SUCCESS = 'api/UPLOAD_PROFILE_PHOTO_SUCCESS'
export const UPLOAD_PROFILE_PHOTO_FAIL = 'api/UPLOAD_PROFILE_PHOTO_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function login (username, password) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/auth/access-token',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
      types: [
        LOGIN,
        {
          type: LOGIN_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState, nextState) => {
                const { query, pathname } = prevState.router.locationBeforeTransitions

                const redirectTo = pathname === '/login' ? '/dashboard' : '/'

                return ({
                  pathname: query.redirect || redirectTo
                })
              }
            }
          }
        },
        LOGIN_FAIL]
    }
  }
}

export function load (token) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ]
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

export function createUser (data) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_USER,
        CREATE_USER_SUCCESS,
        CREATE_USER_FAIL]
    }
  }
}

export function forgotPassword (email) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/password/forgot',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
      types: [
        FORGOT_PASSWORD,
        {
          type: FORGOT_PASSWORD_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                // Redirect to login
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/login'
              })
            }
          }
        },
        FORGOT_PASSWORD_FAIL]
    }
  }
}

export function changePassword (email, code, password, confirmPassword) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/password/change',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code, password, confirmPassword }),
      types: [
        CHANGE_PASSWORD,
        {
          type: CHANGE_PASSWORD_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                // Redirect to login
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/login'
              })
            }
          }
        },
        CHANGE_PASSWORD_FAIL]
    }
  }
}

export function checkEmail (email) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/email/check',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
      types: [ CHECK_EMAIL, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAIL]
    }
  }
}

export function verifyEmail (email, code, hash, userCode, role) {
  // redirect to this path after email verification
  let redirectPath = '/signup'
  if (role === 'parent') {
    redirectPath = '/signupParent'
  }

  return {
    [CALL_API]: {
      endpoint: '/api/v1/verify/email',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code }),
      types: [
        VERIFY_EMAIL,
        {
          type: VERIFY_EMAIL_SUCCESS,
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                // Redirect to login
                pathname: prevState.router.locationBeforeTransitions.query.redirect || redirectPath,
                query: { email, code, hash, userCode, role }
              })
            }
          }
        },
        VERIFY_EMAIL_FAIL
      ]
    }
  }
}

export function resendVerification (email) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/verify/email/resend',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
      types: [
        RESEND_VERIFICATION,
        RESEND_VERIFICATION_SUCCESS,
        RESEND_VERIFICATION_FAIL
      ]
    }
  }
}

export function uploadProfilePhoto (data, token) {
  return {
    [CALL_API]: {
      endpoint: '/api/v1/me/profile-photo',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
      types: [
        UPLOAD_PROFILE_PHOTO,
        UPLOAD_PROFILE_PHOTO_SUCCESS,
        UPLOAD_PROFILE_PHOTO_FAIL
      ]
    }
  }
}

export function updateUserWithCode (userCode, hash, data, token) {
  data.hash = hash
  return {
    [CALL_API]: {
      endpoint: `/api/v1/users/${userCode}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_USER,
        {
          type: CREATE_USER_SUCCESS,
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
        CREATE_USER_FAIL]
    }
  }
}

export const actions = {
  login,
  load,
  logout,
  createUser,
  forgotPassword,
  changePassword,
  checkEmail,
  resendVerification,
  uploadProfilePhoto,
  updateUserWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ REHYDRATE ] = (state, action) => {
  const incoming = action.payload.auth

  return state.merge({
    accessToken: incoming && incoming.accessToken
  })
}

actionHandlers[ LOGIN ] = state => state.merge({
  loggingIn: true,
  loginSuccess: false,
  loginError: null
})

actionHandlers[ LOGIN_SUCCESS ] = (state, action) => state.merge({
  loggingIn: false,
  loginSuccess: true,
  user: action.payload.data.user,
  accessToken: action.payload.data.accessToken,
  loginError: null
})

actionHandlers[ LOGIN_FAIL ] = (state, action) => state.merge({
  loggingIn: false,
  loginSuccess: false,
  loginError: action.payload.response.error
})

actionHandlers[ LOAD ] = (state, action) => state.merge({
  loading: false,
  loadError: null,
  loaded: true
})

actionHandlers[ LOAD_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  loadError: null,
  loaded: true,
  user: action.payload.data
})

actionHandlers[ LOAD_FAIL ] = (state, action) => state.merge({
  loading: false,
  loadError: action.payload.response.error,
  loaded: false,
  accessToken: null, // clear token on failure
  user: null
})

actionHandlers[ CREATE_USER ] = state => {
  return state.merge({
    signingUp: true,
    success: false,
    error: null
  })
}

actionHandlers[ CREATE_USER_SUCCESS ] = (state, action) => {
  return state.merge({
    signingUp: false,
    success: true,
    loaded: true,
    error: null,
    accessToken: action.payload.data.accessToken,
    user: action.payload.data.user
  })
}

actionHandlers[ CREATE_USER_FAIL ] = (state, action) => {
  return state.merge({
    signingUp: false,
    success: false,
    error: action.payload.response.error
  })
}

actionHandlers[ FORGOT_PASSWORD ] = (state, action) => state.merge({
  loading: true
})

actionHandlers[ FORGOT_PASSWORD_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  forgot: action.payload.data
})

actionHandlers[ FORGOT_PASSWORD_FAIL ] = (state, action) => state.merge({
  loading: false,
  forgotError: action.payload.response.error
})

actionHandlers[ CHANGE_PASSWORD ] = (state, action) => state.merge({
  loading: true
})

actionHandlers[ CHANGE_PASSWORD_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  change: action.payload.data,
  accessToken: action.payload.data.accessToken
})

actionHandlers[ CHANGE_PASSWORD_FAIL ] = (state, action) => state.merge({
  loading: false,
  change: null,
  changeError: action.payload.response.error
})

actionHandlers[ CHECK_EMAIL ] = (state, action) => state.merge({
  loading: true,
  emailExists: null
})

actionHandlers[ CHECK_EMAIL_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  emailExists: false
})

actionHandlers[ CHECK_EMAIL_FAIL ] = (state, action) => state.merge({
  loading: false,
  emailExists: true,
  checkEmailError: action.payload.response.error
})

actionHandlers[ VERIFY_EMAIL ] = (state, action) => state.merge({
  loading: true,
  emailVerified: null
})

actionHandlers[ VERIFY_EMAIL_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  emailVerified: true
})

actionHandlers[ VERIFY_EMAIL_FAIL ] = (state, action) => state.merge({
  loading: false,
  emailVerified: false,
  verifyEmailError: action.payload.response.error
})

actionHandlers[ RESEND_VERIFICATION ] = (state, action) => state.merge({
  loading: true,
  resent: null
})

actionHandlers[ RESEND_VERIFICATION_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  resent: true
})

actionHandlers[ RESEND_VERIFICATION_FAIL ] = (state, action) => state.merge({
  loading: false,
  resent: false,
  resendVerificationError: action.payload.response.error
})

actionHandlers[ UPLOAD_PROFILE_PHOTO ] = (state, action) => state.merge({
  loading: true,
  uploaded: null
})

actionHandlers[ UPLOAD_PROFILE_PHOTO_SUCCESS ] = (state, action) => state.merge({
  loading: false,
  uploaded: true,
  profilePicture: action.payload.data
})

actionHandlers[ UPLOAD_PROFILE_PHOTO_FAIL ] = (state, action) => state.merge({
  loading: false,
  uploaded: false,
  uploadError: action.payload.response.error
})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  user: null,
  accessToken: null,
  loginError: null,
  loadError: null,
  loginSuccess: false,
  emailExists: null,
  emailVerified: null,
  uploaded: false,
  error: false,
  success: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

