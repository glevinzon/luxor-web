import {connect} from 'react-redux'
import Room from '../components/Room'

import { createRoom, getRooms, deleteRoom } from 'store/modules/room'
import { getBranches } from 'store/modules/branch'

const mapActionCreators = {
  createRoom,
  getRooms,
  deleteRoom,
  getBranches
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  rooms: state.room.get('rooms'),
  deletingRoomSuccess: state.room.get('deletingRoomSuccess'),
  room: state.room.get('room'),
  creatingRoomSuccess: state.room.get('creatingRoomSuccess'),
  branches: state.branch.get('branches')
})

export default connect(mapStateToProps, mapActionCreators)(Room)

