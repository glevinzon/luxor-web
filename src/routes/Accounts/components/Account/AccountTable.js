import React, { Component } from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import cx from 'classnames'
import SweetAlert from 'react-bootstrap-sweetalert'
import _ from 'lodash'
import { Tabs, Tab, ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'

class AccountTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      delete: false,
      alert: false,
      approveAlert: null,
      role: 'user'
    }
  }

  componentWillReceiveProps (nextProps) {
    var deleteSuccess = nextProps.deletingReservationSuccess
    if (deleteSuccess) {
      this.setState({
        alert: (
          <SweetAlert success title='Deleted!' onConfirm={e => { this.setState({alert: null}) }}>
            Account has been deleted.
          </SweetAlert>
          )
      })
    }
  }

  handleDeleteAction = () => {
    this.setState({delete: null})
    this.props.deleteAccount(this.state.selected)
    this.props.getAccounts(1, 10)
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
      let { accounts } = this.props
      if (accounts) {
        var data = accounts.get('data')
      }
      if (data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getAccounts(page, count)
    this.setState({page})
  }

  handleSelect = (e) => {
    event.preventDefault()
    this.setState({ selectedTab: e })
  }

  renderStatus = (status, userId, role) => {
    var indicator = (<button type='button' className='btn btn-sm btn-pill btn-default'>Default</button>)
    if (status == '0') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-warning' onClick={e => {
        this.setState({approveAlert: (<SweetAlert
          info
          showCancel
          confirmBtnText='Yes, verify'
          confirmBtnBsStyle='success'
          cancelBtnText='Cancel'
          cancelBtnBsStyle='default'
          title='Are you sure?'
          onConfirm={e => { this.handleUpdateRoleOrStatus(userId, role, 1) }}
          onCancel={e => { this.setState({approveAlert: null}) }}
        >
        This will verify selected account.
        </SweetAlert>)})
      }}>Not yet verified</button>)
    } else if (status == '1') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-success'>Verified</button>)
    } else if (status == '11') {
      indicator = (<button type='button' className='btn btn-sm btn-pill btn-info'>Archieved</button>)
    }
    return indicator
  }

  handleUpdateRoleOrStatus = (userId, role, status) => {
    let data = this.state
    data.id = userId
    data.role = role
    data.verified = status
    this.props.updateAccount(data)
    this.setState({approveAlert: null})
  }

  onChange = (value) => {
    this.setState({ value })
  }

  renderRole = (status, userId, role) => {
    return (
      <DropdownButton title={_.toUpper(role)} value={role} id='bg-nested-dropdown'>
        <MenuItem eventKey='admin' onClick={e => { this.handleUpdateRoleOrStatus(userId, 'admin', status) }}>Admin</MenuItem>
        <MenuItem eventKey='user' onClick={e => { this.handleUpdateRoleOrStatus(userId, 'user', status) }}>User</MenuItem>
      </DropdownButton>
    )
  }

  renderTable = (data, filter) => {
    return (
      <div className='table-full'>
        <div className='table-responsive'>
          <table className='table' data-sort='table'>
            <thead>
              <tr>
                <th>Code</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && (data.map(account => {
                if (filter == account.get('verified')) {
                  return (
                    <tr key={account.get('id')}>
                      <td><a href='#'>{account.get('code')}</a></td>
                      <td>{account.get('username')}</td>
                      <td>{account.get('email')}</td>
                      <td>{this.renderRole(account.get('verified'), account.get('id'), account.get('role'))}</td>
                      <td>{this.renderStatus(account.get('verified'), account.get('id'), account.get('role'))}</td>
                      <td>
                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary-outline'>
                            <span className='icon icon-pencil' />
                          </button>
                          <button type='button' className='btn btn-primary-outline' onClick={e => { this.handleDelete(account.get('code')) }}>
                            <span className='icon icon-erase' />
                          </button>
                        </div></td>
                    </tr>
                  )
                }
              }))}
            </tbody>
          </table>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a aria-label='Previous' onClick={e => this.handlePaginationClick('prev')} style={{display: cx({'none': this.state.page < 2 || this.props.fetchingReservations})}} >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li>
              <a aria-label='Next' onClick={e => this.handlePaginationClick('next')} style={{display: cx({'none': (data && data.size === 0) || this.props.fetchingReservations})}} >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  render () {
    let { accounts } = this.props
    if (accounts) {
      var data = accounts.get('data')
    }

    return (
      <div>
        {this.state.delete}
        {this.state.alert}
        {this.state.approveAlert}
        <Tabs bsStyle='nav nav-bordered' activeKey={this.state.selectedTab || 'pending'} onSelect={this.handleSelect} id='controlled-tab-example'>
          <Tab style={{textAlign: 'left'}} key='pending' eventKey='pending' title='PENDING'>{this.renderTable(data, 0)}</Tab>
          <Tab style={{textAlign: 'left'}} key='approved' eventKey='approved' title='VERIFIED'>{this.renderTable(data, 1)}</Tab>
          <Tab style={{textAlign: 'left'}} key='archieved' eventKey='archieved' title='ARCHIEVED'>{this.renderTable(data, 11)}</Tab>
        </Tabs>
      </div>
    )
  }
}

AccountTable.propTypes = {

}

export default AccountTable
