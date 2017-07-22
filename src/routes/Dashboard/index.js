import DashboardContainer from './containers/DashboardContainer'
import { UserIsAuthenticated, CheckUserRole } from 'utils/authWrappers'
import { DEV_ADMIN, SUPER_ADMIN } from 'utils/UserRoles'
// Sync route definition
export default {
  component: UserIsAuthenticated(CheckUserRole(DashboardContainer, [ DEV_ADMIN, SUPER_ADMIN ]))
}
