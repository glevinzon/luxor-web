import {connect} from 'react-redux'
import Branch from '../components/Branch'

import { createBranch, getBranches, deleteBranch, updateBranch } from 'store/modules/branch'

const mapActionCreators = {
  createBranch,
  getBranches,
  deleteBranch,
  updateBranch
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  branches: state.branch.get('branches'),
  deletingBranchSuccess: state.branch.get('deletingBranchSuccess'),
  branch: state.branch.get('branch'),
  creatingBranchSuccess: state.branch.get('creatingBranchSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Branch)

