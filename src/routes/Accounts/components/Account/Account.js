import React, { Component } from 'react'
import AccountTable from './AccountTable'

class Accounts extends Component {
  componentWillMount () {
    this.props.getAccounts(1, 10)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.creatingAccountSuccess) {
      this.props.getAccounts(1, 10)
    }
    if (nextProps.changePasswordSuccess) {
      this.props.getAccounts(1, 10)
    }
  }

  render () {
    return (
      <div className='container-fluid-spacious' style={{marginTop: '2%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Accounts</h2>
            </div>
          </div>
          <div className='flextable table-actions'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' className='form-control input-block' placeholder='Search' />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
          </div>

          <AccountTable {...this.props} />

        </div>
      </div>
    )
  }
}

Accounts.propTypes = {

}

export default Accounts
