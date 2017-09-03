import { connect } from 'react-redux'

import Verify from '../components/Verify'

import { verifyEmail } from 'store/modules/account'

const mapActionCreators = {
  verifyEmail
}

const mapStateToProps = (state) => ({
  accounts: state.account
})

export default connect(mapStateToProps, mapActionCreators)(Verify)

