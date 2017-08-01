import BranchContainer from './containers/BranchContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'branches',
  component: UserIsAuthenticated(UserIsAdmin(BranchContainer))
})
