import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_ACCOUNT = 'api/CREATE_ACCOUNT'
export const CREATE_ACCOUNT_SUCCESS = 'api/CREATE_ACCOUNT_SUCCESS'
export const CREATE_ACCOUNT_FAIL = 'api/CREATE_ACCOUNT_FAIL'
export const GET_ACCOUNTS = 'api/GET_ACCOUNTS'
export const GET_ACCOUNTS_SUCCESS = 'api/GET_ACCOUNTS_SUCCESS'
export const GET_ACCOUNTS_FAIL = 'api/GET_ACCOUNTS_FAIL'
export const DELETE_ACCOUNT = 'api/DELETE_ACCOUNT'
export const DELETE_ACCOUNT_SUCCESS = 'api/DELETE_ACCOUNT_SUCCESS'
export const DELETE_ACCOUNT_FAIL = 'api/DELETE_ACCOUNT_FAIL'
export const VERIFY_ACCOUNT = 'api/VERIFY_ACCOUNT'
export const VERIFY_ACCOUNT_SUCCESS = 'api/VERIFY_ACCOUNT_SUCCESS'
export const VERIFY_ACCOUNT_FAIL = 'api/VERIFY_ACCOUNT_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function verifyEmail (code, email) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/verify/email?code=${code}&email=${email}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [
          VERIFY_ACCOUNT,
          {
            type: VERIFY_ACCOUNT_SUCCESS,
            meta: {
              done: true,
              transition: {
                success: (prevState, nextState) => {
                  const { query, pathname } = prevState.router.locationBeforeTransitions

                  const redirectTo = pathname === '/verify/email' ? '/dashboard' : '/'

                  return ({
                    pathname: query.redirect || redirectTo
                  })
                }
              }
            }
          },
          VERIFY_ACCOUNT_FAIL]
      }
    })
  }
}

export function getAccounts (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/accounts?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function getAccountsWithStatus (status) {
  return (dispatch, getState) => {
    let endpoint = `/api/v1/accounts/${status}`
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_FAIL]
      }
    })
  }
}

export function createAccount (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/users',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ACCOUNT,
          {
            type: CREATE_ACCOUNT_SUCCESS,
            meta: {
              done: true,
              transition: {
                success: (prevState, nextState) => {
                  const { query, pathname } = prevState.router.locationBeforeTransitions

                  const redirectTo = pathname === '/signup' ? '/dashboard' : '/'

                  return ({
                    pathname: query.redirect || redirectTo
                  })
                }
              }
            }
          },
          CREATE_ACCOUNT_FAIL]
      }
    })
  }
}

export function updateAccount (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/account',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ACCOUNT,
          CREATE_ACCOUNT_SUCCESS,
          CREATE_ACCOUNT_FAIL]
      }
    })
  }
}

export function deleteAccount (code) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/account/${code}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_ACCOUNT,
          DELETE_ACCOUNT_SUCCESS,
          DELETE_ACCOUNT_FAIL]
      }
    })
  }
}

export function updateAccountWithCode (accountCode, data, token) {
  return {
    [CALL_API]: {
      endpoint: `/api/v1/account/${userCode}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_ACCOUNT,
        {
          type: CREATE_ACCOUNT_SUCCESS,
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
        CREATE_ACCOUNT_FAIL]
    }
  }
}

export const actions = {
  getAccounts,
  createAccount,
  deleteAccount,
  updateAccountWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ VERIFY_ACCOUNT ] = state => {
  return state.merge({
    verifyAccount: true,
    verifyAccountSuccess: false,
    verifyAccountError: null
  })
}

actionHandlers[ VERIFY_ACCOUNT_SUCCESS ] = (state, action) => {
  return state.merge({
    verifyAccount: false,
    verifyAccountSuccess: true,
    verifyAccountError: null
  })
}

actionHandlers[ VERIFY_ACCOUNT_FAIL ] = (state, action) => {
  return state.merge({
    verifyAccount: false,
    verifyAccountSuccess: false,
    verifyAccountError: action.payload.response.error
  })
}

actionHandlers[ CREATE_ACCOUNT ] = state => {
  return state.merge({
    creatingAccount: true,
    creatingAccountSuccess: false,
    createAccountError: null
  })
}

actionHandlers[ CREATE_ACCOUNT_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingAccount: false,
    creatingAccountSuccess: true,
    createAccountError: null,
    account: action.payload.data.user
  })
}

actionHandlers[ CREATE_ACCOUNT_FAIL ] = (state, action) => {
  return state.merge({
    creatingAccount: false,
    creatingAccountSuccess: false,
    createAccountError: action.payload.response.error
  })
}

actionHandlers[ GET_ACCOUNTS ] = state => {
  return state.merge({
    fetchingAccounts: true,
    fetchingAccountsSuccess: false,
    getAccountsError: null,
    creatingAccountSuccess: false,
    deletingAccountSuccess: false
  })
}

actionHandlers[ GET_ACCOUNTS_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAccounts: false,
    fetchingAccountsSuccess: true,
    getAccountsError: null,
    accounts: action.payload.data.accounts
  })
}

actionHandlers[ GET_ACCOUNTS_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAccounts: false,
    fetchingAccountsSuccess: false,
    getAccountsError: action.payload.response.error
  })
}

actionHandlers[ DELETE_ACCOUNT ] = state => {
  return state.merge({
    deletingAccount: true,
    deletingAccountSuccess: false,
    deleteAccountError: null
  })
}

actionHandlers[ DELETE_ACCOUNT_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingAccount: false,
    deletingAccountSuccess: true,
    deleteAccountError: null
  })
}

actionHandlers[ DELETE_ACCOUNT_FAIL ] = (state, action) => {
  return state.merge({
    deletingAccount: false,
    deletingAccountSuccess: false,
    deleteAccountError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  account: null,
  createAccountError: false,
  creatingAccountSuccess: false,
  accounts: null,
  getAccountsError: false,
  fetchingAccountSuccess: false,
  deleteAccountError: false,
  deletingAccountSuccess: false,
  verifyAccount: false,
  verifyAccountSuccess: false,
  verifyAccountError: null
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

