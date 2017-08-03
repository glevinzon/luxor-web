import React, { Component } from 'react'
import { FormControl, InputGroup, DropdownButton,
  MenuItem, ControlLabel, Tabs, Tab, Form, FormGroup,
  Col, Checkbox, Button } from 'react-bootstrap'
import Preferences from './Preferences'

class Setting extends Component {
  state = {
    selectedBranch: null,
    selectedTab: null,
    preferences: null
  }

  componentWillMount () {
    this.props.getBranches(1, 10)
  }

  onSubmit = () => {
    console.log('wew')
  }

  getBranchesMenu = (data) => {
    return (
      data.map((branch, key) => {
        return (
          <MenuItem key={key} onClick={e => this.setState({branchId: '' + branch.get('id'), selectedBranch: branch.get('name')})}>{branch.get('name')}</MenuItem>
        )
      })
    )
  }

  handleSelect = (e) => {
    event.preventDefault()
    this.setState({ selectedTab: e })
  }

  handleSettingsCb = (preferences, branch) => {
    console.log('CB', preferences)
    this.setState({preferences})
  }

  render () {
    let { branches } = this.props
    if (branches) {
      var total = branches.get('total')
      var currentPage = branches.get('currentPage')
      var lastPage = branches.get('lastPage')
      var data = branches.get('data')
    }

    return (
      <div className='container-fluid-spacious' style={{marginTop: '2%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Settings</h2>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' className='form-control input-block' placeholder='Search' />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
            <div className='flextable-item'>
              <button type='button' className='btn btn-pill btn-primary' onClick={this.onSubmit}>Save Changes</button>
            </div>
          </div>
          <div className='hr-divider m-t-lg m-b-md'>
            <h3 className='hr-divider-content hr-divider-heading'>Master</h3>
          </div>

          <div className='form-group row' >
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
            <ControlLabel>Default Branch</ControlLabel>
              <InputGroup>
                <FormControl className='reason-input' name='type' type='text' value={this.state.selectedBranch} placeholder='Default landing page' disabled />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Branches'
                  pullRight
                  >
                {data && this.getBranchesMenu(data)}
                </DropdownButton>
              </InputGroup>
            </div>
          </div>

          <div className='hr-divider m-t-lg m-b-md'>
            <h3 className='hr-divider-content hr-divider-heading'>In-Page</h3>
          </div>
          <Tabs bsStyle='nav nav-pills hr-divider-content hr-divider-tab' activeKey={this.state.selectedTab || 0} onSelect={this.handleSelect} id='controlled-tab-example'>
              {data && data.map((branch, key) => {
                return (
                  <Tab eventKey={key} title={branch.get('name')}>{<Preferences branch={branch} settingsCb={(data, branch) => this.handleSettingsCb(data, branch)} {...this.props} />}</Tab>
                )
              })}
            </Tabs>
        </div>
      </div>
    )
  }
}

Setting.propTypes = {

}

export default Setting
