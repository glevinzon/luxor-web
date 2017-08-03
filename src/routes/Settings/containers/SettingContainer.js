import {connect} from 'react-redux'
import Setting from '../components/Setting'

import { createSetting, getSettings, deleteSetting } from 'store/modules/setting'
import { getBranches } from 'store/modules/branch'
import { uploadImage, getDumb } from 'store/modules/upload'

const mapActionCreators = {
  createSetting,
  getSettings,
  deleteSetting,
  getBranches,
  uploadImage,
  getDumb
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  settings: state.setting.get('settings'),
  deletingSettingSuccess: state.setting.get('deletingSettingSuccess'),
  setting: state.setting.get('setting'),
  creatingSettingSuccess: state.setting.get('creatingSettingSuccess'),
  branches: state.branch.get('branches'),
  upload: state.upload.get('upload'),
  uploadingImageSuccess: state.upload.get('uploadingImageSuccess'),
  target: state.upload.get('target'),
  gettingDumbSuccess: state.upload.get('gettingDumbSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Setting)

