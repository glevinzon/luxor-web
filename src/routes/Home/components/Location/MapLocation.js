import React, { Component, PropTypes } from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const coords = {
  davao: {
    lat: 7.129932,
    lng: 125.626664
  },
  gensan: {
    lat: 6.128683,
    lng: 125.182129
  }
}

const API_KEY = 'AIzaSyD138yl7DnZmtPxV0qb_mLlht2f8jsG1Z8'

const params = {v: '3.exp', key: API_KEY}

class MapLocation extends Component {

  onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: false
    })
  }

  onDragEnd = (e) => {
    console.log('onDragEnd', e)
  }

  onCloseClick = () => {
    console.log('onCloseClick')
  }

  onClick = (e) => {
    console.log('onClick', e)
  }

  render () {
    return (
      <center className='maps-wrapper' style={{marginTop: '5%'}} >
      <Gmaps
        width={'auto'}
        height={'320px'}
        lat={this.props.lat}
        lng={this.props.lng}
        zoom={12}
        loadingMessage={'Luxor One Travellers Inn'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.davao.lat}
          lng={coords.davao.lng}
          draggable
          onDragEnd={this.onDragEnd} />
        <Marker
          lat={coords.gensan.lat}
          lng={coords.gensan.lng}
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
