import React, { Component } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

class RoomList extends Component {
  popoverRight = (room) => {
    return (
      <Popover id='popover-positioned-right'>
        <ul key={room.code} className='list-group'>
          {room.code && (<li className='list-group-item'>{room.code}</li>)}
          {room.name && (<li className='list-group-item'>{room.name}</li>)}
          {room.description && (<li className='list-group-item'>{room.description}</li>)}
          {room.type && (<li className='list-group-item'>{room.type}</li>)}
          {room.rate && (<li className='list-group-item'>{room.rate}</li>)}
          {room.promo && (<li className='list-group-item'>{room.promo}</li>)}
        </ul>
      </Popover>
    )
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
      <div className='list-group'>
        <h4 className='list-group-header'>
          Rooms
        </h4>
        {data && (data.map(room => {
          return (
            <OverlayTrigger key={room.code} trigger='hover' placement='right' overlay={this.popoverRight(room)}>
              <a className='list-group-item' href='#'>
                {room.name}
              </a>
            </OverlayTrigger>
          )
        }))}
      </div>
    )
  }
}

RoomList.propTypes = {

}

export default RoomList
