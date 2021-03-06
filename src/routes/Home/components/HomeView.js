import React, { Component } from 'react'
import MainNav from './MainNav'
import Header from './Header'
import Download from './Download'
import Features from './Features'
import Cta from './Cta'
import Location from './Location'
import Footer from './Footer'
import Contact from './Contact'
import Slick from './Slick'

class HomeView extends Component {
  state = {
    branchId: null,
    selectedBranchCode: null,
    preferences: null,
    branch: null,
    branches: null,
    availableRooms: null,
    imageUploads: null
  }

  componentWillMount () {
    this.props.getRoomsWithStatus()
    this.props.getBranches(1, 10)
    this.props.getSettings('ga6bN')
    this.props.getUploads()
  }

  componentWillReceiveProps (nextProps) {
    let { fetchingBranchSuccess, fetchingSettingsSuccess, branches, settings, rooms, uploadsByRoomId } = nextProps

    if (fetchingSettingsSuccess && settings && branches) {
      let branchId = this.state.branchId || settings.get('branch_id')
      let preferences = JSON.parse(settings.get('preferences'))

      let data = branches.get('data')
      data.map(branch => {
        if (branch.get('id') == branchId) {
          var arrKeys = Object.keys(preferences)
          arrKeys.map(key => {
            if (branch.get('code') == key) {
              this.setState({selectedBranchCode: branch.get('code'), preferences: preferences[`${key}`], branch: branch})
            }
          })
        }
      })

      this.setState({branchId, branches: data, availableRooms: rooms, imageUploads: uploadsByRoomId})
    }
  }

  handleSwitchBranch = (branch) => {
    let branchId = branch.target.name
    this.setState({branchId})
    this.props.getBranches(1, 10)
    this.props.getSettings('ga6bN')
    this.props.getUploads()
  }

  render () {
    let { branches, branchId, imageUploads } = this.state

    return (
      <div id='page-top' className='page-top'>
        <MainNav branchId={branchId} switchBranchCb={branch => this.handleSwitchBranch(branch)} branches={branches} />
        <Header {...this.props} branch={this.state.branch} branchId={branchId} rooms={this.state.availableRooms} preferences={this.state.preferences} />

        <Download preferences={this.state.preferences} />
        <Features {...this.props} images={imageUploads} branchId={branchId} rooms={this.state.availableRooms} branch={this.state.branch} />
        <Location branch={this.state.branch} />
        <Cta preferences={this.state.preferences} />

        <Contact preferences={this.state.preferences} />
        <Footer />
      </div>
    )
  }
}

HomeView.propTypes = {

}

export default HomeView
