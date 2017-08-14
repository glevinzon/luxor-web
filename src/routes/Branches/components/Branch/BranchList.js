import React, { Component } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

class BranchList extends Component {
  popoverRight = (branch) => {
    return (
      <Popover id='popover-positioned-right'>
        <ul key={branch.get('code')} className='list-group'>
          {branch.get('code') && (<li className='list-group-item'>{branch.get('code')}</li>)}
          {branch.get('name') && (<li className='list-group-item'>{branch.get('name')}</li>)}
          {branch.get('address') && (<li className='list-group-item'>{branch.get('address')}</li>)}
          {branch.get('contact') && (<li className='list-group-item'>{branch.get('contact')}</li>)}
          {branch.get('coordinates') && (<li className='list-group-item'>{JSON.parse(branch.get('coordinates')).lat}, {JSON.parse(branch.get('coordinates')).lng}</li>)}
          {branch.get('roomTypes') && (<li className='list-group-item'>{JSON.parse(branch.get('roomTypes')).map(room => {
            return (<button type='button' className='btn btn-xs btn-pill btn-info'>{room.name}</button>)
          })}</li>)}
        </ul>
      </Popover>
    )
  }

  render () {
    let { branches, fetchingBranches } = this.props
    if (branches) {
      var total = branches.get('total')
      var currentPage = branches.get('currentPage')
      var lastPage = branches.get('lastPage')
      var data = branches.get('data')
    }

    return (
      <div className='list-group'>
        <h4 className='list-group-header'>
          Branches
        </h4>
        {data && (data.map(branch => {
          return (
            <OverlayTrigger trigger='hover' placement='right' overlay={this.popoverRight(branch)}>
              <a className='list-group-item' href='#'>
                {branch.get('name')}
              </a>
            </OverlayTrigger>
          )
        }))}
      </div>
    )
  }
}

BranchList.propTypes = {

}

export default BranchList
