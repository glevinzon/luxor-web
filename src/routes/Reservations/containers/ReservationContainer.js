import {connect} from 'react-redux'
import Reservation from '../components/Reservation'

import { getReservations } from 'store/modules/reserve'

const mapActionCreators = {
  getReservations
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  reserves: state.reserve.get('reserves')
})

export default connect(mapStateToProps, mapActionCreators)(Reservation)

