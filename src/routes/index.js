import CoreLayout from '../layouts/CoreLayout'
import HomeRoute from './Home'
import DashboardRoute from './Dashboard'
import LoginRoute from './Login'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    DashboardRoute(store),
    LoginRoute(store)
  ]
})

export default createRoutes
