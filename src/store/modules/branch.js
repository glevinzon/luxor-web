import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_BRANCH = 'api/CREATE_BRANCH'
export const CREATE_BRANCH_SUCCESS = 'api/CREATE_BRANCH_SUCCESS'
export const CREATE_BRANCH_FAIL = 'api/CREATE_BRANCH_FAIL'
export const GET_BRANCHES = 'api/GET_BRANCHES'
export const GET_BRANCHES_SUCCESS = 'api/GET_BRANCHES_SUCCESS'
export const GET_BRANCHES_FAIL = 'api/GET_BRANCHES_FAIL'
export const DELETE_BRANCH = 'api/DELETE_BRANCH'
export const DELETE_BRANCH_SUCCESS = 'api/DELETE_BRANCH_SUCCESS'
export const DELETE_BRANCH_FAIL = 'api/DELETE_BRANCH_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getBranches (page = 1, count = 10) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = `/api/v1/branches?page=${page}&count=${count}`
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        types: [GET_BRANCHES, GET_BRANCHES_SUCCESS, GET_BRANCHES_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createBranch (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/branch',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_BRANCH,
          CREATE_BRANCH_SUCCESS,
          CREATE_BRANCH_FAIL]
      }
    })
  }
}

export function updateBranch (data) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/branch',
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_BRANCH,
          CREATE_BRANCH_SUCCESS,
          CREATE_BRANCH_FAIL]
      }
    })
  }
}

export function deleteBranch (code) {
  return (dispatch, getState) => {
    const { accessToken } = getState().auth.toJS()
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/v1/branch/${code}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        types: [
          DELETE_BRANCH,
          DELETE_BRANCH_SUCCESS,
          DELETE_BRANCH_FAIL]
      }
    })
  }
}

export function updateBranchWithCode (branchCode, data, token) {
  return {
    [CALL_API]: {
      endpoint: `/api/v1/branch/${userCode}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      types: [
        CREATE_BRANCH,
        {
          type: CREATE_BRANCH_SUCCESS,
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
        CREATE_BRANCH_FAIL]
    }
  }
}

export const actions = {
  getBranches,
  createBranch,
  deleteBranch,
  updateBranchWithCode
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_BRANCH ] = state => {
  return state.merge({
    creatingBranch: true,
    creatingBranchSuccess: false,
    createBranchError: null
  })
}

actionHandlers[ CREATE_BRANCH_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingBranch: false,
    creatingBranchSuccess: true,
    createBranchError: null,
    branch: action.payload.data.branch
  })
}

actionHandlers[ CREATE_BRANCH_FAIL ] = (state, action) => {
  return state.merge({
    creatingBranch: false,
    creatingBranchSuccess: false,
    createBranchError: action.payload.response.error
  })
}

actionHandlers[ GET_BRANCHES ] = state => {
  return state.merge({
    fetchingBranches: true,
    fetchingBranchesSuccess: false,
    getBranchesError: null,
    creatingBranchSuccess: false,
    deletingBranchSuccess: false
  })
}

actionHandlers[ GET_BRANCHES_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingBranches: false,
    fetchingBranchesSuccess: true,
    getBranchesError: null,
    branches: action.payload.data.branches
  })
}

actionHandlers[ GET_BRANCHES_FAIL ] = (state, action) => {
  return state.merge({
    fetchingBranches: false,
    fetchingBranchesSuccess: false,
    getBranchesError: action.payload.response.error
  })
}

actionHandlers[ DELETE_BRANCH ] = state => {
  return state.merge({
    deletingBranch: true,
    deletingBranchSuccess: false,
    deleteBranchError: null
  })
}

actionHandlers[ DELETE_BRANCH_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingBranch: false,
    deletingBranchSuccess: true,
    deleteBranchError: null
  })
}

actionHandlers[ DELETE_BRANCH_FAIL ] = (state, action) => {
  return state.merge({
    deletingBranch: false,
    deletingBranchSuccess: false,
    deleteBranchError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  branch: null,
  createBranchError: false,
  creatingBranchSuccess: false,
  branches: null,
  getBranchesError: false,
  fetchingBranchSuccess: false,
  deleteBranchError: false,
  deletingBranchSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

