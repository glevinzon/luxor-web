import React, { Component } from 'react'

class BranchesList extends Component {
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
            <a className='list-group-item' href='#'>
              <span className='list-group-progress' style={{ width: '62.4%' }}></span>
              <span className='pull-right text-muted'>62.4%</span>
              {branch.get('name')}
            </a>
          )
        }))}
      </div>
    )
  }
}

BranchesList.propTypes = {

}

export default BranchesList
