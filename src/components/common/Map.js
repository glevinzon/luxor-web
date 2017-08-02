import React, { Component } from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const API_KEY = 'AIzaSyD138yl7DnZmtPxV0qb_mLlht2f8jsG1Z8'

const params = {v: '3.exp', key: API_KEY}

class Map extends Component {

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
      <Gmaps
        width={'auto'}
        height={'320px'}
        lat='7.0735836232495615'
        lng='125.60605650000002'
        zoom={15}
        loadingMessage={'Luxor One Travellers Inn'}
        params={params}
        onMapCreated={this.onMapCreated}>
      </Gmaps>
    )
  }
}

Map.propTypes = {

}

export default Map
