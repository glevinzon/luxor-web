import { connect } from 'react-redux'

import HomeView from '../components/HomeView'
import { createReservation } from 'store/modules/reserve'
import { getSettings } from 'store/modules/setting'
import { getBranches } from 'store/modules/branch'
import { getRoomsWithStatus } from 'store/modules/room'

const mapActionCreators = {
  createReservation,
  getSettings,
  getBranches,
  getRoomsWithStatus
}

const mapStateToProps = (state) => ({
  reserve: state.reserve,
  settings: state.setting.get('settings'),
  fetchingSettingsSuccess: state.setting.get('fetchingSettingsSuccess'),
  fetchingSettings: state.setting.get('fetchingSettings'),
  branches: state.branch.get('branches'),
  fetchingBranchSuccess: state.branch.get('fetchingBranchSuccess'),
  rooms: state.room.get('rooms')
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
