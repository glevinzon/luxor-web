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

  handleMapClick = (loc) => {
    if (loc === 'gensan') {
      this.setState({
        lat: '6.128683',
        lng: '125.182129'
      })
    }
    if (loc === 'davao') {
      this.setState({
        lat: '7.129932',
        lng: '125.626664'
      })
    }
  }

  render () {
    return (
      <section id='location' className='cta'>
        <div className='cta-content'>
          <div className='container'>
            <h2>Visit us. Locate. Navigate.</h2>
            <a className='btn btn-outline btn-xl page-scroll' onClick={e => { this.handleMapClick('gensan') }} >Gensan</a> &nbsp;
            <a className='btn btn-outline btn-xl page-scroll' onClick={e => { this.handleMapClick('davao') }} >Davao</a>
            <MapLocation lat={this.state.lat} lng={this.state.lng} {...this.props} />
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
