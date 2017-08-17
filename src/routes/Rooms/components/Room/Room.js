import React, { Component } from 'react'
import RoomTable from './RoomTable'
import RoomModal from './RoomModal'
import SweetAlert from 'react-bootstrap-sweetalert'
import TextFieldGroup from 'components/common/TextFieldGroup'
import _ from 'lodash'
const { List } = require('immutable')

class Room extends Component {
  state = {
    open: false,
    alert: null,
    search: '',
    errors: []
  }

  componentWillMount () {
    this.props.getRooms(1, 100)
    this.props.getBranches(1, 10)
  }

  componentWillReceiveProps (nextProps) {
    let { creatingRoomSuccess, deletingRoomSuccess } = nextProps
    if (deletingRoomSuccess) {
      this.props.getRooms(1, 10)
    }

    if (creatingRoomSuccess) {
      this.setState({
        open: false,
        alert: (
          <SweetAlert success title='Info Sent' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
        )
      })
      this.props.getRooms(1, 10)
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let { branches, rooms, fetchingRooms } = this.props
    let { search } = this.state

    if (rooms) {
      var data = rooms.get('data')
      data = data.toJSON()
      if (search != '') {
        data = _.filter(data, (room) => {
          if (room.code && room.code.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
          if (room.name && room.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
          if (room.description && room.description.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
          if (room.type && room.type.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
          if (room.rate && room.rate.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
          if (room.promo && room.promo.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            return room
          }
        })
      }
    }

    if (branches) {
      var branchesData = branches.get('data')
    }
    return (
      <div className='container-fluid-spacious' style={{marginTop: '2%'}} >
      {this.state.alert}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Rooms</h2>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.search}
                  inputBlock
                  field='search'
                  placeholder='Search'
                  error={this.state.errors.search}
                />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
            <div className='flextable-item'>
              <button type='button' className='btn btn-pill btn-primary' onClick={e => { this.setState({open: true}) }}>Add New</button>
            </div>
          </div>
          <RoomModal open={this.state.open} onClose={e => { this.setState({ open: false }) }} {...this.props} />
          <RoomTable roomsData={data} branchesData={branchesData} {...this.props} />

        </div>
      </div>
    )
  }
}

Room.propTypes = {

}

export default Room
