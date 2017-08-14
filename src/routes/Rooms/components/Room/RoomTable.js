import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import RoomImagesModal from './RoomImagesModal'
import RoomUploadModal from './RoomUploadModal'
import RoomModal from './RoomModal'

class RoomTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false,
      show: false,
      open: false,
      uploadSuccess: null,
      selectedRoom: null,
      selectedRoomUploads: null,
      updateModal: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let { uploadingImageSuccess, fetchingUploadsByRoomIdSuccess, selectedRoomUploads, deletingUploadsByCodesSuccess } = nextProps
    if (uploadingImageSuccess) {
      this.props.getUploadsByRoomId(this.state.selectedRoom.get('id'))
      this.setState({
        alert: (
          <SweetAlert success title='Upload Success' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
          )
      })
    }

    if (deletingUploadsByCodesSuccess) {
      this.props.getUploadsByRoomId(this.state.selectedRoom.get('id'))
      this.setState({
        alert: (
          <SweetAlert success title='Delete Success' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
          )
      })
    }

    if (fetchingUploadsByRoomIdSuccess) {
      this.setState({selectedRoomUploads: nextProps.uploadsByRoomId})
      nextProps.getDumb()
    }

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

    if (nextProps.creatingRoomSuccess) {
      this.setState({
        updateModal: false
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

  handleRoomImageUploads = (room) => {
    this.props.getUploadsByRoomId(room.get('id'))
    this.setState({selectedRoom: room, show: true})
  }

  render () {
    let { branches, rooms, fetchingRooms } = this.props
    let { selectedRoom, selectedRoomUploads } = this.state
    if (rooms) {
      var data = rooms.get('data')
    }

    if (branches) {
      var branchesData = branches.get('data')
    }

    return (
      <div>
        {this.state.delete}
        {this.state.alert}
        {this.state.uploadSuccess}
        {<RoomImagesModal
          room={selectedRoom}
          roomImages={selectedRoomUploads}
          show={this.state.show}
          onOpenUploadModal={e => { this.setState({open: true}) }}
          onCloseCb={e => { this.setState({show: false}) }}
          deleteUploadsByCodes={this.props.deleteUploadsByCodes} />}
        {selectedRoom && (
          <RoomUploadModal room={selectedRoom} open={this.state.open} onCloseCb={e => { this.setState({open: false}) }} uploadImage={this.props.uploadImage} />
        )}
        <RoomModal selectedRoom={this.state.selectedRoom || null} open={this.state.updateModal} onClose={e => { this.setState({ updateModal: false }) }} {...this.props} />
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Branch</th>
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
                      <td><a onClick={e => this.handleRoomImageUploads(room)}>{room.get('code')}</a></td>
                      <td>{branchesData && branchesData.map(branch => {
                        if (branch.get('id') === room.get('branch_id')) {
                          return (branch.get('name'))
                        }
                      })}</td>
                      <td>{room.get('name')}</td>
                      <td>{room.get('description')}</td>
                      <td>{room.get('type')}</td>
                      <td>{room.get('rate')}</td>
                      <td>{room.get('promo')}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary-outline' onClick={e => (this.setState({selectedRoom: room, updateModal: true}))}>
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
