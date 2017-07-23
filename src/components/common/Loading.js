import React from 'react'
import LoaderImage from 'static/reload.svg'

class Loading extends React.Component {
  render () {
    const { hidden } = this.props
    return (
      <div hidden={hidden}>
        <img src={LoaderImage} alt='Loading...' title='Loading...' />
      </div>
    )
  }
}

Loading.propTypes = {
  hidden: React.PropTypes.bool.isRequired
}

export default Loading
