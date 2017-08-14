import {connect} from 'react-redux'
import Branch from '../components/Branch'

import { createBranch, getBranches, deleteBranch, updateBranch } from 'store/modules/branch'
import { uploadImage, getDumb, getUploadsByBranchId, deleteUploadsByCodes } from 'store/modules/upload'

const mapActionCreators = {
  createBranch,
  getBranches,
  deleteBranch,
  updateBranch,
  getDumb,
  getUploadsByBranchId,
  deleteUploadsByCodes,
  uploadImage
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  branches: state.branch.get('branches'),
  deletingBranchSuccess: state.branch.get('deletingBranchSuccess'),
  branch: state.branch.get('branch'),
  creatingBranchSuccess: state.branch.get('creatingBranchSuccess'),
  upload: state.upload.get('upload'),
  uploadingImageSuccess: state.upload.get('uploadingImageSuccess'),
  target: state.upload.get('target'),
  gettingDumbSuccess: state.upload.get('gettingDumbSuccess'),
  uploadingImage: state.upload.get('uploadingImage'),
  uploadsByBranchId: state.upload.get('uploadsByBranchId'),
  fetchingUploadsByBranchIdSuccess: state.upload.get('fetchingUploadsByBranchIdSuccess'),
  deletingUploadsByCodesSuccess: state.upload.get('deletingUploadsByCodesSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Branch)

