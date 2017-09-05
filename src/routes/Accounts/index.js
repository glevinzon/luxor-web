import AccountContainer from './containers/AccountContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'accounts',
  component: UserIsAuthenticated(UserIsAdmin(AccountContainer))
})
