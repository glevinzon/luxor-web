import React, { Component } from 'react'
import RoomTable from './RoomTable'
import RoomModal from './RoomModal'
import SweetAlert from 'react-bootstrap-sweetalert'

class Room extends Component {
  state = {
    open: false,
    alert: null
  }

  componentWillMount () {
    this.props.getRooms(1, 10)
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

  render () {
    return (
      <div className='container-fluid-spacious' style={{marginTop: '2%'}} >
      {this.state.alert}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Rooms</h2>
            </div>

            <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item' style={{ marginLeft: '0px' }}>

              </div>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' className='form-control input-block' placeholder='Search' />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
            <div className='flextable-item'>
              <button type='button' className='btn btn-pill btn-primary' onClick={e => { this.setState({open: true}) }}>Add New</button>
            </div>
          </div>
          <RoomModal open={this.state.open} onClose={e => { this.setState({ open: false }) }} {...this.props} />
          <RoomTable {...this.props} />

        </div>
      </div>
    )
  }
}

Room.propTypes = {

}

export default Room
