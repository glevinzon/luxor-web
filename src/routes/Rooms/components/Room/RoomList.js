import React, { Component } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

class RoomList extends Component {
  popoverRight = (room) => {
    return (
      <Popover id='popover-positioned-right'>
        <ul key={room.get('code')} className='list-group'>
          {room.get('code') && (<li className='list-group-item'>{room.get('code')}</li>)}
          {room.get('name') && (<li className='list-group-item'>{room.get('name')}</li>)}
          {room.get('description') && (<li className='list-group-item'>{room.get('description')}</li>)}
          {room.get('type') && (<li className='list-group-item'>{room.get('type')}</li>)}
          {room.get('rate') && (<li className='list-group-item'>{room.get('rate')}</li>)}
          {room.get('promo') && (<li className='list-group-item'>{room.get('promo')}</li>)}
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
            <OverlayTrigger trigger='hover' placement='right' overlay={this.popoverRight(room)}>
              <a className='list-group-item' href='#'>
                <span className='list-group-progress' style={{ width: '62.4%' }}></span>
                <span className='pull-right text-muted'>62.4%</span>
                {room.get('name')}
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
