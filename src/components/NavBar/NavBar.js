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
              placement='right' overlay={<Tooltip id='stats'>Statistics</Tooltip>}>
              <NavLink to='/dashboard/stats'>
                <span className='icon icon-bar-graph' />
                <small className='iconav-nav-label visible-xs-block'>Statistics</small></NavLink></OverlayTrigger>
          </ul>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {

}

export default NavBar
