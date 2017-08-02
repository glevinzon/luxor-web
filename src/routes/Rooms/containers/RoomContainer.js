import {connect} from 'react-redux'
import Room from '../components/Room'

import { createRoom, getRooms, deleteRoom } from 'store/modules/room'

const mapActionCreators = {
  createRoom,
  getRooms,
  deleteRoom
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  rooms: state.room.get('rooms'),
  deletingRoomSuccess: state.room.get('deletingRoomSuccess'),
  room: state.room.get('room'),
  creatingRoomSuccess: state.room.get('creatingRoomSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Room)

