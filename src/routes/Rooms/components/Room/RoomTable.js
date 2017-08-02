import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'

class RoomTable extends Component {
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
    var deleteSuccess = nextProps.deletingRoomSuccess
    if (deleteSuccess) {
      this.setState({
        alert: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({alert: null}) }}>
            Room has been deleted.
          </SweetAlert>
          )
      })
    }
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteRoom(this.state.selected)
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
      let { rooms } = this.props
      if (rooms) {
        var data = rooms.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getRooms(page, count)
    this.setState({page})
  }

  render () {
    let { rooms, fetchingRooms } = this.props
    if (rooms) {
      var total = rooms.get('total')
      var currentPage = rooms.get('currentPage')
      var lastPage = rooms.get('lastPage')
      var data = rooms.get('data')
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
                  <th>Room Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Rate</th>
                  <th>Promo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data && (data.map(room => {
                  return (
                    <tr key={room.get('id')}>
                      <td><a href='#'>{room.get('code')}</a></td>
                      <td>{room.get('name')}</td>
                      <td>{room.get('description')}</td>
                      <td>{room.get('type')}</td>
                      <td>{room.get('rate')}</td>
                      <td>{room.get('promo')}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary-outline'>
                            <span className='icon icon-pencil' />
                          </button>
                          <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(room.get('code')) }}>
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
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingRooms})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || fetchingRooms})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

RoomTable.propTypes = {

}

export default RoomTable
