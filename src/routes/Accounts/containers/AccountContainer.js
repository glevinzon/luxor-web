import {connect} from 'react-redux'
import Account from '../components/Account'

import { getAccounts, updateAccount,
  deleteAccount, adminChangePassword } from 'store/modules/account'

const mapActionCreators = {
  getAccounts,
  updateAccount,
  deleteAccount,
  adminChangePassword
}

const mapStateToProps = (state) => ({
  accounts: state.account.get('accounts'),
  deletingReservationSuccess: state.account.get('deletingReservationSuccess'),
  creatingAccountSuccess: state.account.get('creatingAccountSuccess'),
  changePasswordSuccess: state.account.get('changePasswordSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Account)

