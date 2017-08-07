import React, { Component } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

class ReservationList extends Component {
  popoverRight = (reservation) => {
    return (
      <Popover id='popover-positioned-left'>
        <ul key={reservation.get('code')} className='list-group'>
          {reservation.get('code') && (<li className='list-group-item'>{reservation.get('code')}</li>)}
          {reservation.get('fullName') && (<li className='list-group-item'>{reservation.get('fullName')}</li>)}
          {reservation.get('email') && (<li className='list-group-item'>{reservation.get('email')}</li>)}
          {reservation.get('contact') && (<li className='list-group-item'>{reservation.get('contact')}</li>)}
          {reservation.get('address') && (<li className='list-group-item'>{reservation.get('address')}</li>)}
          {reservation.get('note') && (<li className='list-group-item'>{reservation.get('note')}</li>)}
        </ul>
      </Popover>
    )
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
      <div className='list-group'>
        <h4 className='list-group-header'>
          Reservations
        </h4>
        {data && (data.map(reservation => {
          return (
            <OverlayTrigger key={reservation.get('code')} trigger='hover' placement='left' overlay={this.popoverRight(reservation)}>
              <a className='list-group-item' href='#'>
                <span className='list-group-progress' style={{ width: '62.4%' }}></span>
                <span className='pull-right text-muted'>62.4%</span>
                {reservation.get('fullName')}
              </a>
            </OverlayTrigger>
          )
        }))}
      </div>
    )
  }
}

ReservationList.propTypes = {

}

export default ReservationList
