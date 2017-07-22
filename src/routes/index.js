import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Dashboard from './Dashboard'

export const createRoutes = (store) => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      // AmenitiesRoute(store),
      // RoomsRoute(store),
      // PromosRoute(store)
    ]
  },
  {
    path: '/dashboard',
    onEnter: async (nextState, replace, cb) => {
      const auth = JSON.parse(localStorage.getItem('reduxPersist:auth'))
      if (auth && auth.accessToken) {
        const authActions = require('store/modules/auth').actions
        await store.dispatch(authActions.load(auth.accessToken))
      }
      cb()
    },
    getComponent (nextState, cb) {
      require.ensure([], require => {
        const DashboardLayout = require('layouts/DashboardLayout/DashboardLayout').default

        cb(null, DashboardLayout)
      }, 'core')
    },
    childRoutes: [
    ]
  }
])

export default createRoutes
