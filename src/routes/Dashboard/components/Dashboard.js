import React, { Component } from 'react'
import BranchList from '../../Branches/components/Branch/BranchList'
import RoomList from '../../Rooms/components/Room/RoomList'
import ReservationList from '../../Reservations/components/Reservation/ReservationList'
import { Link } from 'react-router'

class Dashboard extends Component {
  componentWillMount () {
    this.props.getBranches(1, 10)
    this.props.getRooms(1, 10)
    this.props.getReservations(1, 10)
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{marginTop: '2%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Summary</h2>
            </div>

            <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item' style={{ marginLeft: '0px' }}>
                <button type='button' className='btn btn-pill btn-danger' onClick={e => { this.handleLogout() }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className='hr-divider m-t-lg m-b-md'>
          <h3 className='hr-divider-content hr-divider-heading'>Quick Info</h3>
        </div>

        <div className='row statcards'>
          <div className='col-sm-6 col-lg-3 m-b'>
            <div className='statcard statcard-success'>
              <div className='p-a'>
                <span className='statcard-desc'>Page views</span>
                <h2 className='statcard-number'>
                  12,938
                  <small className='delta-indicator delta-positive'>5%</small>
                </h2>
                <hr className='statcard-hr m-b-0' />
              </div>
              <canvas id='sparkline1' width='378' height='94' className='sparkline' data-chart='spark-line' data-value='[{data:[28,68,41,43,96,45,100]}]' data-labels="['a','b','c','d','e','f','g']" style={{width: '189px', height: '47px'}}></canvas>
            </div>
          </div>
          <div className='col-sm-6 col-lg-3 m-b'>
            <div className='statcard statcard-danger'>
              <div className='p-a'>
                <span className='statcard-desc'>Pending Requests</span>
                <h2 className='statcard-number'>
                  758
                  <small className='delta-indicator delta-negative'>1.3%</small>
                </h2>
                <hr className='statcard-hr m-b-0' />
              </div>
              <canvas id='sparkline1' width='378' height='94' className='sparkline' data-chart='spark-line' data-value='[{data:[4,34,64,27,96,50,80]}]' data-labels="['a', 'b','c','d','e','f','g']" style={{width: '189px', height: '47px'}}></canvas>
            </div>
          </div>
          <div className='col-sm-6 col-lg-3 m-b'>
            <div className='statcard statcard-info'>
              <div className='p-a'>
                <span className='statcard-desc'>Available Rooms</span>
                <h2 className='statcard-number'>
                  1,293
                  <small className='delta-indicator delta-positive'>6.75%</small>
                </h2>
                <hr className='statcard-hr m-b-0' />
              </div>
              <canvas id='sparkline1' width='378' height='94' className='sparkline' data-chart='spark-line' data-value='[{data:[12,38,32,60,36,54,68]}]' data-labels="['a', 'b','c','d','e','f','g']" style={{width: '189px', height: '47px'}}></canvas>
            </div>
          </div>
          <div className='col-sm-6 col-lg-3 m-b'>
            <div className='statcard statcard-warning'>
              <div className='p-a'>
                <span className='statcard-desc'>Facebook Likes</span>
                <h2 className='statcard-number'>
                  758
                  <small className='delta-indicator delta-negative'>1.3%</small>
                </h2>
                <hr className='statcard-hr m-b-0' />
              </div>
              <canvas id='sparkline1' width='378' height='94' className='sparkline' data-chart='spark-line' data-value='[{data:[43,48,52,58,50,95,100]}]' data-labels="['a', 'b','c','d','e','f','g']" style={{width: '189px', height: '47px'}}></canvas>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4 m-b'>
            <BranchList {...this.props} />
          </div>

          <div className='col-md-4 m-b'>
            <RoomList {...this.props} />
            <Link to='/dashboard/rooms' href='#' className='btn btn-primary-outline'>View all rooms</Link>
          </div>
          <div className='col-md-4 m-b'>
            <ReservationList {...this.props} />
            <Link to='/dashboard/reservations' href='#' className='btn btn-primary-outline'>View all reservations</Link>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {

}

export default Dashboard
