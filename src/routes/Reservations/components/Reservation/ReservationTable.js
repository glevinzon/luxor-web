import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'

class ReservationTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false
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

  render () {
    let { reserves, fetchingReservations } = this.props
    if (reserves) {
      var total = reserves.get('total')
      var currentPage = reserves.get('currentPage')
      var lastPage = reserves.get('lastPage')
      var data = reserves.get('data')
    }

    return (
      <div>
        {this.state.delete}
        {this.state.alert}
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
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data && (data.map(reserve => {
                  return (
                    <tr key={reserve.get('id')}>
                      <td><a href='#'>{reserve.get('code')}</a></td>
                      <td>{reserve.get('fullName')}</td>
                      <td>{reserve.get('note')}</td>
                      <td>{reserve.get('contact')}</td>
                      <td>{reserve.get('email')}</td>
                      <td>{moment(reserve.date).format('MM-DD-YYYY')}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary-outline'>
                            <span className='icon icon-pencil' />
                          </button>
                          <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(reserve.get('code')) }}>
                            <span className='icon icon-erase' />
                          </button>
                        </div></td>
                    </tr>
                  )
                }))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingReservations})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || fetchingReservations})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReservationTable.propTypes = {

}

export default ReservationTable
