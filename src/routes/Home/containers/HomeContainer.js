import { connect } from 'react-redux'

import HomeView from '../components/HomeView'
import { createReservation } from 'store/modules/reserve'

const mapActionCreators = {
  createReservation
}

const mapStateToProps = (state) => ({
  reserve: state.reserve
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
