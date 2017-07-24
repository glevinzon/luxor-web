import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import app from './modules/app'
import auth from './modules/auth'
import reserve from './modules/reserve'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    app,
    auth,
    reserve,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
