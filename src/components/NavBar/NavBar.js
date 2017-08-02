import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import activeComponent from 'react-router-active-component'

const NavLink = activeComponent('li')

class NavBar extends Component {
  render () {
    return (
      <nav className='iconav'>
        <Link to='/dashboard' className='iconav-brand'>
          <img src='icon.png' width='25' />
        </Link>
        <div className='iconav-slider'>
          <ul className='nav nav-pills iconav-nav' role='tablist'>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='reservations'>Reservations</Tooltip>}>
              <NavLink to='/dashboard/reservations' onlyActiveOnIndex>
                <span className='icon icon-text-document' />
                <small className='iconav-nav-label visible-xs-block'>Reservations</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='reservations'>Branches</Tooltip>}>
              <NavLink to='/dashboard/branches' onlyActiveOnIndex>
                <span className='icon icon-flow-tree' />
                <small className='iconav-nav-label visible-xs-block'>Branches</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='reservations'>Rooms</Tooltip>}>
              <NavLink to='/dashboard/rooms' onlyActiveOnIndex>
                <span className='icon icon-key' />
                <small className='iconav-nav-label visible-xs-block'>Rooms</small></NavLink></OverlayTrigger>
          </ul>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {

}

export default NavBar
