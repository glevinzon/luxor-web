import React, { Component } from 'react'
import MainNav from './MainNav'
import Header from './Header'
import Footer from './Footer'
import Contact from './Contact'

class HomeView extends Component {
  render () {
    return (
      <div id='page-top' className='page-top'>
        <MainNav />
        <Header />

        <section id='download' className='download bg-primary text-center'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                <h2 className='section-heading'>Discover what all the buzz is about!</h2>
                <p>Our app is available on any mobile device! Download now to get started!</p>
                <div className='badges'>
                  <a className='badge-link' href='#'><img src='img/google-play-badge.svg' alt='' /></a>
                  <a className='badge-link' href='#'><img src='img/app-store-badge.svg' alt='' /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='features' className='features'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <div className='section-heading'>
                  <h2>Unlimited Features, Unlimited Fun</h2>
                  <p className='text-muted'>Check out what you can do with this app theme!</p>
                  <hr />>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='device-container'>
                  <div className='device-mockup iphone6_plus portrait white'>
                    <div className='device'>
                      <div className='screen'>
                          <img src='img/demo-screen-1.jpg' className='img-responsive' alt='' /> </div>
                      <div className='button'>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div className='col-md-8'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='feature-item'>
                                    <i className='icon-screen-smartphone text-primary'></i>
                                    <h3>Device Mockups</h3>
                                    <p className='text-muted'>Ready to use HTML/CSS device mockups, no Photoshop required!</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='feature-item'>
                                    <i className='icon-camera text-primary'></i>
                                    <h3>Flexible Use</h3>
                                    <p className='text-muted'>Put an image, video, animation, or anything else in the screen!</p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='feature-item'>
                                    <i className='icon-present text-primary'></i>
                                    <h3>Free to Use</h3>
                                    <p className='text-muted'>As always, this theme is free to download and use for any purpose!</p>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='feature-item'>
                                    <i className='icon-lock-open text-primary'></i>
                                    <h3>Open Source</h3>
                                    <p className='text-muted'>Since this theme is MIT licensed, you can use it commercially!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </section>

          <section className='cta'>
            <div className='cta-content'>
              <div className='container'>
                <h2>Stop waiting.<br />>Start building.</h2>
                <a href='#contact' className='btn btn-outline btn-xl page-scroll'>Let's Get Started!</a>
              </div>
            </div>
            <div className='overlay'></div>
          </section>

        <Contact />
        <Footer />
      </div>
    )
  }
}

HomeView.propTypes = {

}

export default HomeView
