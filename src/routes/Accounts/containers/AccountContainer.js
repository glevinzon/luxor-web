import {connect} from 'react-redux'
import Account from '../components/Account'

import { getAccounts, updateAccount,
  deleteAccount } from 'store/modules/account'

const mapActionCreators = {
  getAccounts,
  updateAccount,
  deleteAccount
}

const mapStateToProps = (state) => ({
  accounts: state.account.get('accounts'),
  deletingReservationSuccess: state.account.get('deletingReservationSuccess'),
  creatingAccountSuccess: state.account.get('creatingAccountSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Account)

