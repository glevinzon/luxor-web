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
    rooms: null
  }

  componentWillMount () {
    this.props.getBranches(1, 10)
    this.props.getSettings('ga6bN')
  }

  componentWillReceiveProps (nextProps) {
    let { fetchingBranchSuccess, fetchingSettingsSuccess, branches, settings } = nextProps

    if (fetchingSettingsSuccess && settings) {
      let branchId = settings.get('branch_id')
      let preferences = JSON.parse(settings.get('preferences'))

      let data = branches.get('data')
      data.map(branch => {
        if (branch.get('id') == branchId) {
          var arrKeys = Object.keys(preferences)
          arrKeys.map(key => {
            if (branch.get('code') == key) {
              // console.log('ROOM', preferences[`${key}`])
              this.setState({selectedBranchCode: branch.get('code'), preferences: preferences[`${key}`], rooms: preferences[`${key}`].rooms.roomImages})
            }
          })
        }
      })

      this.setState({branchId})
    }
  }

  render () {
    return (
      <div id='page-top' className='page-top'>
        <MainNav />
        <Header {...this.props} preferences={this.state.preferences} />

        <Download preferences={this.state.preferences} />
        <Features room={this.state.rooms} />
        <Location />
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
