import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'

import { logout } from 'store/modules/auth'
import { getReservations } from 'store/modules/reserve'

const mapActionCreators = {
  logout,
  getReservations
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user')
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)

