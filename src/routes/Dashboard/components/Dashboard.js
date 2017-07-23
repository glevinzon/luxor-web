import React, { Component } from 'react'

class Dashboard extends Component {

  handleLogout = (e) => {
    this.props.logout()
  }

  render () {
    console.log('PROPS', this.props)
    return (
      <div className='container-fluid container-fluid-spacious' style={{ marginTop: '2%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Informations</h2>
            </div>

            <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item'>
                <button type='button' className='btn btn-pill btn-danger' onClick={e => { this.handleLogout() }}>Logout</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {

}

export default Dashboard
