import { connect } from 'react-redux'

import Signup from '../components/Signup'

import { createAccount } from 'store/modules/account'

const mapActionCreators = {
  createAccount
}

const mapStateToProps = (state) => ({
  account: state.account
})

export default connect(mapStateToProps, mapActionCreators)(Signup)

