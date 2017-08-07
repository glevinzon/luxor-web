import React, { Component } from 'react'
import { DropdownButton, MenuItem, Label } from 'react-bootstrap'

class MainNav extends Component {
  render () {
    let { branches, branchId } = this.props
    return (
      <nav id='mainNav' className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          {branches.map((branch, key) => {
            if (branchId == branch.get('id')) {
              return (<div key={branch.get('id')} className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
                  <span className='sr-only'>Toggle navigation</span> Menu <i className='fa fa-bars'></i>
                </button>
                <a className='navbar-brand page-scroll' href='#page-top'>Luxor One Traveller's Inn <Label bsStyle='warning'>{branch.get('name')}</Label></a>
              </div>
              )
            }
          })}
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a className='page-scroll' href='#features'>Rooms</a>
              </li>
              <li>
                <a className='page-scroll' href='#location'>Location</a>
              </li>
              <li>
                <a className='page-scroll' href='#contact'>Contact Us</a>
              </li>
              {(branches.length == 1) && (
                <li>
                  <a className='page-scroll'>
                    <DropdownButton bsSize='xsmall' title='Switch branch' id='dropdown-size-small'>
                      {branches.map((branch, key) => {
                        if (branchId != branch.get('id')) {
                          return (<MenuItem key={key} name={branch.get('id')} eventKey={branch.get('code')} onClick={e => this.props.switchBranchCb(e)}>{branch.get('name')}</MenuItem>)
                        }
                      })}
                    </DropdownButton>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

MainNav.propTypes = {

}

export default MainNav
