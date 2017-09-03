import { connect } from 'react-redux'

import ResetPassword from '../components/ResetPassword'

import { changePassword } from 'store/modules/account'

const mapActionCreators = {
  changePassword
}

const mapStateToProps = (state) => ({
  accounts: state.account
})

export default connect(mapStateToProps, mapActionCreators)(ResetPassword)

