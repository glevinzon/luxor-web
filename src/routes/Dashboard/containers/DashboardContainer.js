import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'

import { logout } from 'store/modules/auth'
import { getReservations } from 'store/modules/reserve'
import { getBranches, deleteBranch } from 'store/modules/branch'
import { getRooms, deleteRoom } from 'store/modules/room'

const mapActionCreators = {
  logout,
  getReservations,
  getBranches,
  deleteBranch,
  getRooms,
  deleteRoom
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  branches: state.branch.get('branches'),
  deletingBranchSuccess: state.branch.get('deletingBranchSuccess'),
  rooms: state.room.get('rooms'),
  deletingRoomSuccess: state.room.get('deletingRoomSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)

