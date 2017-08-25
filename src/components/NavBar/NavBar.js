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
          <img src='https://luxoronetravellersinn.com/icon.png' width='25' />
        </Link>
        <div className='iconav-slider'>
          <ul className='nav nav-pills iconav-nav' role='tablist'>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='reservations'>Reservations</Tooltip>}>
              <NavLink to='/dashboard/reservations' onlyActiveOnIndex>
                <span className='icon icon-text-document' />
                <small className='iconav-nav-label visible-xs-block'>Reservations</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='branches'>Branches</Tooltip>}>
              <NavLink to='/dashboard/branches' onlyActiveOnIndex>
                <span className='icon icon-flow-tree' />
                <small className='iconav-nav-label visible-xs-block'>Branches</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='rooms'>Rooms</Tooltip>}>
              <NavLink to='/dashboard/rooms' onlyActiveOnIndex>
                <span className='icon icon-key' />
                <small className='iconav-nav-label visible-xs-block'>Rooms</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='settings'>Accounts</Tooltip>}>
              <NavLink to='/dashboard/accounts' onlyActiveOnIndex>
                <span className='icon icon-users' />
                <small className='iconav-nav-label visible-xs-block'>Accounts</small></NavLink></OverlayTrigger>
            <OverlayTrigger
              placement='right' overlay={<Tooltip id='settings'>Settings</Tooltip>}>
              <NavLink to='/dashboard/settings' onlyActiveOnIndex>
                <span className='icon icon-cog' />
                <small className='iconav-nav-label visible-xs-block'>Settings</small></NavLink></OverlayTrigger>
          </ul>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {

}

export default NavBar
