import SettingContainer from './containers/SettingContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'settings',
  component: UserIsAuthenticated(UserIsAdmin(SettingContainer))
})
