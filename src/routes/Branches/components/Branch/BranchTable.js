import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import BranchModal from './BranchModal'
import BranchImagesModal from './BranchImagesModal'
import BranchUploadModal from './BranchUploadModal'

class BranchTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false,
      selectedBranch: null,
      uploadSuccess: null,
      selectedBranchUploads: null,
      open: false,
      uploadOpen: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.uploadingImageSuccess) {
      this.props.getUploadsByBranchId(this.state.selectedBranch.get('id'))
      this.setState({
        alert: (
          <SweetAlert success title='Upload Success' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
          )
      })
    }

    if (nextProps.fetchingUploadsByBranchIdSuccess) {
      this.setState({selectedBranchUploads: nextProps.uploadsByBranchId})
      nextProps.getDumb()
    }

    if (nextProps.deletingUploadsByCodesSuccess) {
      this.props.getUploadsByBranchId(this.state.selectedBranch.get('id'))
      this.setState({
        alert: (
          <SweetAlert success title='Delete Success' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
          )
      })
    }

    var deleteSuccess = nextProps.deletingBranchSuccess
    if (deleteSuccess) {
      this.setState({
        alert: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({alert: null}) }}>
            Branch has been deleted.
          </SweetAlert>
          )
      })
    }
    if (nextProps.creatingBranchSuccess) {
      this.setState({
        open: false
      })
    }
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteBranch(this.state.selected)
  }

  handleDelete = (code) => {
    this.setState({selected: code, delete: (<SweetAlert
      warning
      showCancel
      confirmBtnText='Yes, delete it!'
      confirmBtnBsStyle='danger'
      cancelBtnBsStyle='default'
      title='Are you sure?'
      onConfirm={this.handleDeleteAction}
      onCancel={e => { this.setState({delete: null}) }}
    >
    You will not be able to recover this record!
    </SweetAlert>)})
  }

  handlePaginationClick = (type) => {
    let { page, count } = this.state
    if (type === 'prev') {
      if (page === 1) {
        return
      }
      page -= 1
    } else {
      let { branches } = this.props
      if (branches) {
        var data = branches.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getBranches(page, count)
    this.setState({page})
  }

  handleBranchImageUploads = (branch) => {
    this.props.getUploadsByBranchId(branch.get('id'))
    this.setState({selectedBranch: branch, show: true})
  }

  render () {
    let { branches, fetchingBranches } = this.props
    let { selectedBranch, selectedBranchUploads } = this.state
    if (branches) {
      var data = branches.get('data')
    }

    return (
      <div>
      {<BranchImagesModal
        branch={selectedBranch}
        branchImages={selectedBranchUploads}
        show={this.state.show}
        onOpenUploadModal={e => { this.setState({uploadOpen: true}) }}
        onCloseCb={e => { this.setState({show: false}) }}
        deleteUploadsByCodes={this.props.deleteUploadsByCodes} />}
      {selectedBranch && (
        <BranchUploadModal branch={selectedBranch} uploadOpen={this.state.uploadOpen} onCloseCb={e => { this.setState({uploadOpen: false}) }} uploadImage={this.props.uploadImage} />
      )}
      <BranchModal selectedBranch={this.state.selectedBranch || null} open={this.state.open} onClose={e => { this.setState({ open: false }) }} {...this.props} />
        {this.state.delete}
        {this.state.alert}
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Branch Name</th>
                  <th>Address</th>
                  <th>Geolocation</th>
                  <th>Contact</th>
                  <th>Branch Types</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data && (data.map(branch => {
                  return (
                    <tr key={branch.get('id')}>
                      <td><a href='#' onClick={e => this.handleBranchImageUploads(branch)}>{branch.get('code')}</a></td>
                      <td>{branch.get('name')}</td>
                      <td>{branch.get('address')}</td>
                      <td>{JSON.parse(branch.get('coordinates')).lat}, {JSON.parse(branch.get('coordinates')).lng}</td>
                      <td>{branch.get('contact')}</td>
                      <td>{branch.get('roomTypes') && JSON.parse(branch.get('roomTypes')).map(room => {
                        return (<button type='button' className='btn btn-xs btn-pill btn-info'>{room.name}</button>)
                      })}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary-outline' onClick={e => (this.setState({selectedBranch: branch, open: true}))}>
                            <span className='icon icon-pencil' />
                          </button>
                          <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(branch.get('code')) }}>
                            <span className='icon icon-erase' />
                          </button>
                        </div></td>
                    </tr>
                  )
                }))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || fetchingBranches})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || fetchingBranches})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

BranchTable.propTypes = {

}

export default BranchTable
