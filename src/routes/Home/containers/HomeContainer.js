import { connect } from 'react-redux'

import HomeView from '../components/HomeView'
import { createReservation } from 'store/modules/reserve'
import { getSettings } from 'store/modules/setting'
import { getBranches } from 'store/modules/branch'

const mapActionCreators = {
  createReservation,
  getSettings,
  getBranches
}

const mapStateToProps = (state) => ({
  reserve: state.reserve,
  settings: state.setting.get('settings'),
  fetchingSettingsSuccess: state.setting.get('fetchingSettingsSuccess'),
  fetchingSettings: state.setting.get('fetchingSettings'),
  branches: state.branch.get('branches'),
  fetchingBranchSuccess: state.branch.get('fetchingBranchSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
