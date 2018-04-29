import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Tabs, Tab } from 'react-bootstrap'

class ReservationTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false,
      approveAlert: null
    }
  }

  componentWillReceiveProps (nextProps) {
    var deleteSuccess = nextProps.deletingReservationSuccess
    if (deleteSuccess) {
      this.setState({
        alert: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({alert: null}) }}>
            Reservation has been deleted.
          </SweetAlert>
          )
      })
    }
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteReservation(this.state.selected)
    this.props.getReservations(1, 10)
  }

  handleDelete = (code) => {
    this.setState({selected: code, delete: (<SweetAlert
      warning
      showCancel
      confirmBtnText='Yes, delete it!'
      confirmBtnBsStyle='danger'
      cancelBtnBsStyle='default'
      title='Are you sure?'
      onConfirm={this.handleDeleteAction}
      onCancel={e => { this.setState({delete: null}) }}
    >
    You will not be able to recover this record!
    </SweetAlert>)})
  }

  handlePaginationClick = (type) => {
    let { page, count } = this.state
    if (type === 'prev') {
      if (page === 1) {
        return
      }
      page -= 1
    } else {
      let { reserves } = this.props
      if (reserves) {
        var data = reserves.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getReservations(page, count)
    this.setState({page})
  }

  renderStatus = (status, room, reserveId) => {
    var indicator = (<button type='button' className='btn btn-sm btn-pill btn-default'>Default</button>)
    if (status == '10') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-danger'>Rejected</button>)
    } else if (status == '0') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-warning' onClick={e => {
        this.setState({approveAlert: (<SweetAlert
          info
          showCancel
          confirmBtnText='Yes, approve'
          confirmBtnBsStyle='success'
          cancelBtnText='Reject'
          cancelBtnBsStyle='danger'
          title='Are you sure?'
          onConfirm={e => { this.handleUpdateStatus(reserveId, 'approve') }}
          onCancel={e => { this.handleUpdateStatus(reserveId, 'reject') }}
        >
        This will approve selected request on {room.get('name')}({room.get('type')}).
        </SweetAlert>)})
      }}>Pending</button>)
    } else if (status == '1') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-success'>Approved</button>)
    } else if (status == '11') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-info'>Archieved</button>)
    }
    return indicator
  }

  handleUpdateStatus = (reserveId, status) => {
    this.props.updateReservationStatus(reserveId, status)
    this.setState({approveAlert: null})
  }

  handleSelect = (e) => {
    event.preventDefault()
    this.setState({ selectedTab: e })
  }

  renderTable = (data, roomsData, filter) => {
    return (
      <div className='table-full'>
        <div className='table-responsive'>
          <table className='table' data-sort='table'>
            <thead>
              <tr>
                <th>Code</th>
                <th>Customer Name</th>
                <th>Note</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Room Type</th>
                <th>Room Name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && (data.map(reserve => {
                return (
                  roomsData && roomsData.map(room => {
                    if ((reserve.get('room_id') == room.get('id') && (reserve.get('status') == filter))) {
                      return (
                        <tr key={reserve.get('id')}>
                          <td><a href='#'>{reserve.get('code')}</a></td>
                          <td>{reserve.get('fullName')}</td>
                          <td>{reserve.get('note')}</td>
                          <td>{reserve.get('contact')}</td>
                          <td>{reserve.get('email')}</td>
                          <td>{moment(reserve.get('startDate')).format('dddd, MM/DD/YY')}</td>
                          <td>{moment(reserve.get('endDate')).format('dddd, MM/DD/YY')}</td>
                          <td>{room.get('type')}</td>
                          <td>{room.get('name')}</td>
                          <td>{this.renderStatus(reserve.get('status'), room, reserve.get('id'))}</td>
                          {filter != 11
                          ? <td>
                          <div className='btn-group'>
                            <button type='button' className='btn btn-primary-outline'>
                              <span className='icon icon-pencil' />
                            </button>
                            <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(reserve.get('code')) }}>
                              <span className='icon icon-erase' />
                            </button>
                          </div></td>
                          : null}
                        </tr>
                      )
                    }
                  })
                )
              }))}
            </tbody>
          </table>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || this.props.fetchingReservations})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || this.props.fetchingReservations})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  render () {
    let { reserves, fetchingReservations, rooms } = this.props
    if (reserves) {
      var data = reserves.get('data')
    }

    if (rooms) {
      var roomsData = rooms.get('data')
    }

    return (
      <div>
        {this.state.delete}
        {this.state.alert}
        {this.state.approveAlert}
        <Tabs bsStyle='nav nav-bordered' activeKey={this.state.selectedTab || 'pending'} onSelect={this.handleSelect} id='controlled-tab-example'>
          <Tab style={{textAlign: 'left'}} key='pending' eventKey='pending' title='PENDING'>{this.renderTable(data, roomsData, 0)}</Tab>
          <Tab style={{textAlign: 'left'}} key='approved' eventKey='approved' title='APPROVED'>{this.renderTable(data, roomsData, 1)}</Tab>
          <Tab style={{textAlign: 'left'}} key='rejected' eventKey='rejected' title='REJECTED'>{this.renderTable(data, roomsData, 10)}</Tab>
          <Tab style={{textAlign: 'left'}} key='archieved' eventKey='archieved' title='ARCHIEVED'>{this.renderTable(data, roomsData, 11)}</Tab>
        </Tabs>
      </div>
    )
  }
}

ReservationTable.propTypes = {

}

export default ReservationTable
