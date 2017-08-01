import {connect} from 'react-redux'
import Branch from '../components/Branch'

import { getBranches, deleteBranch } from 'store/modules/branch'

const mapActionCreators = {
  getBranches,
  deleteBranch
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user'),
  branches: state.branch.get('branches'),
  deletingBranchSuccess: state.branch.get('deletingBranchSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Branch)

