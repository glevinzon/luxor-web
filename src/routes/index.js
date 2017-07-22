import CoreLayout from '../layouts/CoreLayout'
import HomeRoute from './Home'
import DashboardRoute from './Dashboard'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    DashboardRoute(store)
  ]
})

export default createRoutes
