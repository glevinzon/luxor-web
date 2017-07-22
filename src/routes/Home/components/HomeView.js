import React, { Component } from 'react'
import MainNav from './MainNav'
import Header from './Header'
import Download from './Download'
import Features from './Features'
import Cta from './Cta'
import Footer from './Footer'
import Contact from './Contact'

class HomeView extends Component {
  render () {
    return (
      <div id='page-top' className='page-top'>
        <MainNav />
        <Header />

        <Download />
        <Features />
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
