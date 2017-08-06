import {connect} from 'react-redux'
import Reservation from '../components/Reservation'

import { getReservations, deleteReservation, updateReservationStatus } from 'store/modules/reserve'
import { getRooms } from 'store/modules/room'

const mapActionCreators = {
  getReservations,
  deleteReservation,
  getRooms,
  updateReservationStatus
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  reserves: state.reserve.get('reserves'),
  deletingReservationSuccess: state.reserve.get('deletingReservationSuccess'),
  rooms: state.room.get('rooms'),
  fetchingReservations: state.reserve.get('fetchingReservations')
})

export default connect(mapStateToProps, mapActionCreators)(Reservation)

