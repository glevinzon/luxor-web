import React, { Component } from 'react'
import MapLocation from './MapLocation'

class Location extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: '6.128683',
      lng: '125.182129'
    }
  }

  componentWillReceiveProps (nextProps) {
    let {branch} = nextProps
    if (branch) {
      let coors = JSON.parse(branch.get('coordinates'))
      this.setState({lat: coors.lat, lng: coors.lng, address: branch.get('address')})
    }
  }

  render () {
    return (
      <section id='location' className='cta'>
        <div className='cta-content'>
          <div className='container'>
            <h2>Visit us. Locate. Navigate.</h2>
            <MapLocation lat={this.state.lat} lng={this.state.lng} {...this.props} />
            <p>{this.state.address}</p>
          </div>
        </div>
        <div className='overlay'></div>
      </section>
    )
  }
}

Location.propTypes = {

}

export default Location
