import React, { Component } from 'react'
import { FormControl, InputGroup, DropdownButton,
  MenuItem, ControlLabel, Tabs, Tab, Form, FormGroup,
  Col, Checkbox, Button } from 'react-bootstrap'
import Preferences from './Preferences'

class Setting extends Component {
  state = {
    branchId: null,
    selectedBranch: null,
    selectedTab: null,
    preferences: null,
    alert: null
  }

  componentWillMount () {
    this.props.getBranches(1, 10)
  }

  onSubmit = () => {
    let data = this.state
    let branchId = data.branchId
    let preferences = data.preferences
    this.props.updateSettingWithCode('ga6bN', {branchId: branchId || null, preferences: JSON.stringify(preferences)})
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

  handleSettingsCb = (data, branch) => {
    let { preferences } = this.state
    let pref = {}

    if (preferences != null) {
      pref = preferences
      var arrKeys = Object.keys(data)
      arrKeys.map(key => {
        if (key == branch) {
          pref[`${branch}`] = data
        } else {
          pref[`${branch}`] = data
        }
      })
    } else {
      pref[`${branch}`] = data
    }

    this.setState({preferences: pref})
  }

  render () {
    let { branches } = this.props
    if (branches) {
      var total = branches.get('total')
      var currentPage = branches.get('currentPage')
      var lastPage = branches.get('lastPage')
      var data = branches.get('data')
    }

    console.log('RENDER_SETTINGS', this.state)

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
            <div className='flextable-item'>
              <button type='button' className='btn btn-pill btn-primary' onClick={this.onSubmit} style={{display: 'center'}}>Save Changes</button>
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
                  <Tab key={key} eventKey={key} title={branch.get('name')}>{<Preferences branch={branch} settingsCb={(data, branch) => this.handleSettingsCb(data, branch)} {...this.props} />}</Tab>
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
