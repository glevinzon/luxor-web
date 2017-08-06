import React, { Component } from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const API_KEY = 'AIzaSyD138yl7DnZmtPxV0qb_mLlht2f8jsG1Z8'

const params = {v: '3.exp', key: API_KEY}

class Map extends Component {
  state = {
    markers: null
  }

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
    let coordinates = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    this.props.latLngCb(coordinates)
    let marks = []
    marks.push({lat: `${e.latLng.lat()}`, lng: `${e.latLng.lng()}`})
    this.setState({ markers: marks })
  }

  componentWillReceiveProps (nextProps) {
    let { coordinates } = nextProps
    if (coordinates != null) {
      let marks = []
      marks.push(coordinates)
      this.setState({markers: marks})
    }
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
        onMapCreated={this.onMapCreated}
        onClick={this.onClick}>
        {this.state.markers && (this.state.markers.map((mark, key) => {
          return (
            <Marker key={key}
              lat={mark.lat}
              lng={mark.lng}
              draggable
              onDragEnd={this.onDragEnd} />
          )
        }))}
      </Gmaps>
    )
  }
}

Map.propTypes = {

}

export default Map
