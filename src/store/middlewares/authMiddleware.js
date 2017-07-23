import { push } from 'react-router-redux'

export default store => next => action => {
  if (action.payload && action.payload.name === 'ApiError') {
    const loadFail = action.type === 'auth/LOAD_FAIL'
    if (action.payload.status === 401 && !loadFail && action.payload.response) {
      if ([action.payload.response.name, action.payload.response.error].includes('InvalidCredentialsError')) {
        const state = store.getState()
        const currentLocation = state.router && state.router.locationBeforeTransitions
        const nextLocation = {
          ...currentLocation,
          pathname: '/login'
        }
        if (currentLocation && currentLocation.pathname && currentLocation.pathname !== '/login') {
          nextLocation.search = `?redirect=${currentLocation.pathname}`
          nextLocation.state = { expired: true }
        }
        store.dispatch(push(nextLocation))
        return null
      }
    }
  }
  return next(action)
}
