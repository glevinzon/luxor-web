import RoomContainer from './containers/RoomContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'rooms',
  component: UserIsAuthenticated(UserIsAdmin(RoomContainer))
})
