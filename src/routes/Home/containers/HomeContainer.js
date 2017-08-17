import { connect } from 'react-redux'

import HomeView from '../components/HomeView'
import { createReservation, checkAvailability, getDumbReservation } from 'store/modules/reserve'
import { getSettings } from 'store/modules/setting'
import { getBranches } from 'store/modules/branch'
import { getRoomsWithStatus } from 'store/modules/room'
import { getUploads, getDumb } from 'store/modules/upload'

const mapActionCreators = {
  createReservation,
  getSettings,
  getBranches,
  getRoomsWithStatus,
  getUploads,
  getDumb,
  checkAvailability,
  getDumbReservation
}

const mapStateToProps = (state) => ({
  reserve: state.reserve,
  reserves: state.reserve.get('reserves'),
  fetchingReservationsSuccess: state.reserve.get('fetchingReservationsSuccess'),
  settings: state.setting.get('settings'),
  fetchingSettingsSuccess: state.setting.get('fetchingSettingsSuccess'),
  fetchingSettings: state.setting.get('fetchingSettings'),
  branches: state.branch.get('branches'),
  fetchingBranchSuccess: state.branch.get('fetchingBranchSuccess'),
  rooms: state.room.get('rooms'),
  uploadsByRoomId: state.upload.get('uploadsByRoomId'),
  fetchingUploadsByRoomIdSuccess: state.upload.get('fetchingUploadsByRoomIdSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
