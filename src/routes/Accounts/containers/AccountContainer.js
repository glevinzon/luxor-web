import {connect} from 'react-redux'
import Account from '../components/Account'

import { getAccounts } from 'store/modules/account'

const mapActionCreators = {
  getAccounts
}

const mapStateToProps = (state) => ({
  accounts: state.account.get('accounts'),
  deletingReservationSuccess: state.account.get('deletingReservationSuccess')
})

export default connect(mapStateToProps, mapActionCreators)(Account)

