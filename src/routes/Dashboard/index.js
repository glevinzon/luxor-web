import { UserIsAuthenticated, UserIsAdmin} from 'utils/authWrappers'
import LoginRoute from '../Login'
import ReservationRoute from '../Reservations'
import BranchRoute from '../Branches'
import RoomsRoute from '../Rooms'
import SettingsRoute from '../Settings'
import SignupRoute from '../Signup'
import VerifyRoute from '../Verify'
import ResetPasswordRoute from '../ResetPassword'
import ForgotPasswordRoute from '../ForgotPassword'
import AccountRoute from '../Accounts'

export default (store) => ({
  path: 'dashboard',
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
    }, 'dashboard')
  },
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const DashboardContainer = require('./containers/DashboardContainer').default
      cb(null, { component: UserIsAuthenticated(UserIsAdmin(DashboardContainer)) })
    }, 'dashboard-index')
  },
  childRoutes: [
    LoginRoute(store),
    ReservationRoute(store),
    BranchRoute(store),
    RoomsRoute(store),
    SettingsRoute(store),
    SignupRoute(store),
    VerifyRoute(store),
    ForgotPasswordRoute(store),
    ResetPasswordRoute(store),
    AccountRoute(store)
  ]
  // path: '/dashboard',
  // onEnter: async (nextState, replace, cb) => {
  //   const auth = JSON.parse(localStorage.getItem('reduxPersist:auth'))
  //   if (auth && auth.token && auth.token.token) {
  //     const authActions = require('store/modules/auth').actions
  //     await store.dispatch(authActions.load(auth.token.token))
  //   }
  //   cb()
  // },
  // component: DashboardLayout,
  // getIndexRoute (partialNextState, cb) {
  //   require.ensure([], require => {
  //     const DashboardContainer = require('./containers/DashboardContainer').default
  //     cb(null, { component: UserIsAuthenticated(UserIsNotAdmin(DashboardContainer)) })
  //   }, 'dashboard-index')
  // },
  // getChildRoutes (partialNextState, cb) {
  //   require.ensure([], require => {
  //     const ReservationContainer = require('./containers/ReservationContainer').default
  //     cb(null, [
  //       {
  //         path: 'reservations',
  //         component: UserIsAuthenticated(UserIsNotAdmin(ReservationContainer))
  //       }
  //     ])
  //   }, 'dashboard-reservations')
  // }
})

