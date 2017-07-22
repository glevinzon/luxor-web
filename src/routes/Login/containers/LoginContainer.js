import { connect } from 'react-redux'

import Login from '../components/Login'

import { login, forgotPassword } from 'store/modules/auth'

const mapActionCreators = {
  login,
  forgotPassword
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapActionCreators)(Login)

