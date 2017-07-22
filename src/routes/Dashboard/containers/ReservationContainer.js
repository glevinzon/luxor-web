import {connect} from 'react-redux'
import Reservation from '../components/Reservation'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user')
})

export default connect(mapStateToProps, mapActionCreators)(Reservation)

