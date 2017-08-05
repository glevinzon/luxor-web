import React, { Component } from 'react'
import MainNav from './MainNav'
import Header from './Header'
import Download from './Download'
import Features from './Features'
import Cta from './Cta'
import Location from './Location'
import Footer from './Footer'
import Contact from './Contact'

class HomeView extends Component {
  state = {
    branchId: null,
    selectedBranchCode: null,
    preferences: null,
    rooms: null,
    branch: null,
    branches: null
  }

  componentWillMount () {
    this.props.getBranches(1, 10)
    this.props.getSettings('ga6bN')
  }

  componentWillReceiveProps (nextProps) {
    let { fetchingBranchSuccess, fetchingSettingsSuccess, branches, settings } = nextProps

    if (fetchingSettingsSuccess && settings) {
      let branchId = this.state.branchId || settings.get('branch_id')
      let preferences = JSON.parse(settings.get('preferences'))

      let data = branches.get('data')
      data.map(branch => {
        if (branch.get('id') == branchId) {
          var arrKeys = Object.keys(preferences)
          arrKeys.map(key => {
            if (branch.get('code') == key) {
              // console.log('ROOM', preferences[`${key}`])
              this.setState({selectedBranchCode: branch.get('code'), preferences: preferences[`${key}`], rooms: preferences[`${key}`].rooms.roomImages, branch: branch})
            }
          })
        }
      })

      this.setState({branchId, branches: data})
    }
  }

  handleSwitchBranch = (branch) => {
    let branchId = branch.target.name
    this.setState({branchId})
    this.props.getBranches(1, 10)
    this.props.getSettings('ga6bN')
  }

  render () {
    let { branches, branchId } = this.state
    return (
      <div id='page-top' className='page-top'>
        {branches && (<MainNav branchId={branchId} switchBranchCb={branch => this.handleSwitchBranch(branch)} branches={branches} />)}
        <Header {...this.props} preferences={this.state.preferences} />
        <Download preferences={this.state.preferences} />
        <Features branch={this.state.branch} rooms={this.state.rooms} />
        <Location branch={this.state.branch} />
        <Cta />

        <Contact />
        <Footer />
      </div>
    )
  }
}

HomeView.propTypes = {

}

export default HomeView
