import { connect } from 'react-redux'

import ForgotPassword from '../components/ForgotPassword'

import { forgotPassword } from 'store/modules/account'

const mapActionCreators = {
  forgotPassword
}

const mapStateToProps = (state) => ({
  accounts: state.account
})

export default connect(mapStateToProps, mapActionCreators)(ForgotPassword)

