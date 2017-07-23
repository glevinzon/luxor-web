import ReservationContainer from './containers/ReservationContainer'
import { UserIsAuthenticated, UserIsAdmin } from 'utils/authWrappers'

export default (store) => ({
  path: 'reservations',
  component: UserIsAuthenticated(UserIsAdmin(ReservationContainer))
})
