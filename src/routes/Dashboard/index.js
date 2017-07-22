import { UserIsAuthenticated, UserIsNotAdmin} from 'utils/authWrappers'

export default (store) => ({
  path: '/dashboard',
  getIndexRoute (partialNextState, cb) {
    require.ensure([], require => {
      const DashboardContainer = require('./containers/DashboardContainer').default
      cb(null, { component: UserIsAuthenticated(UserIsNotAdmin(DashboardContainer)) })
    }, 'dashboard-index')
  },
  getChildRoutes (partialNextState, cb) {
    require.ensure([], require => {
      const ReservationContainer = require('./containers/ReservationContainer').default
      cb(null, [
        {
          path: 'reservations',
          component: UserIsAuthenticated(UserIsNotAdmin(ReservationContainer))
        }
      ])
    }, 'dashboard-reservations')
  }
})

