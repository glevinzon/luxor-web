import React, { Component } from 'react'

class Contact extends Component {
  state = {
    twitter: null,
    facebook: null,
    gplus: null
  }
  componentWillReceiveProps (nextProps) {
    let { preferences } = nextProps
    if (preferences) {
      this.setState({twitter: preferences.twitter, facebook: preferences.facebook, gplus: preferences.gplus})
    }
  }

  render () {
    return (
      <section id='contact' className='contact bg-primary'>
        <div className='container'>
          <h2>We <i className='fa fa-heart'></i> our customers! Connect to us.</h2>
          <ul className='list-inline list-social'>
            <li className='social-twitter'>
              <a target='_blank' href={this.state.twitter}><i className='fa fa-twitter'></i></a>
            </li>
            <li className='social-facebook'>
              <a target='_blank' href={this.state.facebook}><i className='fa fa-facebook'></i></a>
            </li>
            <li className='social-google-plus'>
              <a target='_blank' href={this.state.gplus}><i className='fa fa-google-plus'></i></a>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

Contact.propTypes = {

}

export default Contact
