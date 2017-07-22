import {connect} from 'react-redux'
import Dashboard from '../components/Dashboard'

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.get('accessToken'),
  user: state.auth.get('user')
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)

