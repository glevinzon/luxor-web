import React, { Component, PropTypes } from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const API_KEY = 'AIzaSyD138yl7DnZmtPxV0qb_mLlht2f8jsG1Z8'

const params = {v: '3.exp', key: API_KEY}

class MapLocation extends Component {

  onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: false
    })
  }

  onDragEnd = (e) => {
  }

  onCloseClick = () => {
  }

  onClick = (e) => {
  }

  render () {
    return (
      <center id='map' className='maps-wrapper' style={{marginTop: '5%'}} >
      <Gmaps
        width={'auto'}
        height={'320px'}
        lat={this.props.lat}
        lng={this.props.lng}
        zoom={18}
        loadingMessage={'Luxor One Travellers Inn'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={this.props.lat}
          lng={this.props.lng}
          draggable
          onDragEnd={this.onDragEnd} />
      </Gmaps>
      </center>
    )
  }
}

MapLocation.propTypes = {

}

export default MapLocation
