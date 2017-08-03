import React, { Component } from 'react'
import BranchList from '../../Branches/components/Branch/BranchList'
import RoomList from '../../Rooms/components/Room/RoomList'
import { Link } from 'react-router'

class Dashboard extends Component {
  componentWillMount () {
    this.props.getBranches(1, 10)
    this.props.getRooms(1, 10)
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

        <div className='row'>
          <div className='col-sm-6 col-md-6'>
            <div className='statcard statcard-success'>
              <div className='p-a'>
                <span className='statcard-desc'>Page views</span>
                <h2 className='statcard-number'>
                  12,938
                  <small className='delta-indicator delta-positive'>5%</small>
                </h2>
                <hr className='statcard-hr m-b-0' />
              </div>
              <canvas
                className='sparkline'
                data-chart='spark-line'
                data-value='[{data:[28,68,41,43,96,45,100]}]'
                data-labels="['a','b','c','d','e','f','g']"
                width='378' height='94'>
              </canvas>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            <div>
              <canvas
                className='ex-line-graph'
                width='600' height='400'
                data-chart='bar'
                data-scale-line-color='transparent'
                data-scale-grid-line-color='rgba(255,255,255,.05)'
                data-scale-font-color='#a2a2a2'
                data-labels="['August','September','October','November','December','January','February']"
                data-value="[{ label: 'First dataset', data: [65, 59, 80, 81, 56, 55, 40] }, { label: 'Second dataset', data: [28, 48, 40, 19, 86, 27, 90] }]">
              </canvas>
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
            <div className='list-group'>
              <h4 className='list-group-header'>
                Reservations
              </h4>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>3,929,481</span>
                  Desktop (1920x1080)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>1,143,393</span>
                  Desktop (1366x768)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>938,287</span>
                  Desktop (1440x900)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>749,393</span>
                  Desktop (1280x800)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>695,912</span>
                  Tablet (1024x768)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>501,938</span>
                  Tablet (768x1024)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>392,842</span>
                  Phone (320x480)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>298,183</span>
                  Phone (720x450)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>193,129</span>
                  Desktop (2560x1080)
                </a>

                <a className='list-group-item' href='#'>
                  <span className='pull-right text-muted'>93,382</span>
                  Desktop (2560x1600)
                </a>

            </div>
            <a href='#' className='btn btn-primary-outline'>View all transactions</a>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {

}

export default Dashboard
