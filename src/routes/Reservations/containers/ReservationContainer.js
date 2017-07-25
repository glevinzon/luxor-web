import {connect} from 'react-redux'
import Reservation from '../components/Reservation'

import { getReservations, deleteReservation } from 'store/modules/reserve'

const mapActionCreators = {
  getReservations,
  deleteReservation
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  reserves: state.reserve.get('reserves'),
  deletingReservationSuccess: state.reserve.get('deletingReservationSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Reservation)

