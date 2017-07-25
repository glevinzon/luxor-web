import React, { Component } from 'react'
import Gallery from './Gallery'

class Features extends Component {

  makeUnsplashSrc = (id) => {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`
  }
  makeUnsplashSrcSet = (id, size) => {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`
  }
  makeUnsplashThumbnail = (id, orientation = 'landscape') => {
    const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159'

    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`
  }

  render () {
    const theme = {
	// container
      container: {
        background: 'rgba(255, 255, 255, 0.9)'
      },

	// arrows
      arrow: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        fill: '#222',
        opacity: 0.6,
        transition: 'opacity 200ms',

        ':hover': {
          opacity: 1
        }
      },
      arrow__size__medium: {
        borderRadius: 40,
        height: 40,
        marginTop: -20,

        '@media (min-width: 768px)': {
          height: 70,
          padding: 15
        }
      },
      arrow__direction__left: { marginLeft: 10 },
      arrow__direction__right: { marginRight: 10 },

	// header
      header: {
        height: 200
      },

      close: {
        fill: '#D40000',
        opacity: 0.6,
        transition: 'all 200ms',
        ':hover': {
          opacity: 1
        }
      },

	// footer
      footer: {
        color: 'black',
        height: 200
      },
      footerCount: {
        color: 'rgba(0, 0, 0, 0.6)'
      },

	// thumbnails
      thumbnail: {
      },
      thumbnail__active: {
        boxShadow: '0 0 0 2px #00D8FF'
      }
    }
    const DEFAULT_IMAGES = [
      { id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
      { id: '1471079502516-250c19af6928', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
      { id: '1454023492550-5696f8ff10e1', caption: 'Photo by Jessica Weiller', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
      { id: '1470854989922-5be2f7456d78', caption: 'Photo by Piotr Łaskawski', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
      { id: '1470317596697-cbdeda56f999', caption: 'Photo by Michel Bosma', orientation: 'landscape', useForDemo: true } // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
    ]
    return (
      <section id='features' className='features'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <div className='section-heading'>
                <h2>Great Location, Service and Stay.</h2>
                <p className='text-muted'>Check out all the rooms you can stay in! You feel comfortable!</p>
                <hr />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div className='device-container'>
                <div className='device-mockup iphone6_plus portrait white'>
                  <div className='device'>
                    <div className='screen'>
                        <img src='img/gensan-front.JPG' className='img-responsive' alt='' /> </div>
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
                      <h3>Lorem</h3>
                      <p className='text-muted'>Eiusmod magna amet amet aliqua commodo eu labore tempor dolor aliqua.</p>
                      <Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
                        src: this.makeUnsplashSrc(id),
                        thumbnail: this.makeUnsplashThumbnail(id, orientation),
                        srcset: [
                          this.makeUnsplashSrcSet(id, 1024),
                          this.makeUnsplashSrcSet(id, 800),
                          this.makeUnsplashSrcSet(id, 500),
                          this.makeUnsplashSrcSet(id, 320)
                        ],
                        caption,
                        orientation,
                        useForDemo
                      }))} />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='feature-item'>
                      <h3>Lorem</h3>
                      <p className='text-muted'>Irure mollit est id duis deserunt ut officia reprehenderit eiusmod.</p>
                      <Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
                        src: this.makeUnsplashSrc(id),
                        thumbnail: this.makeUnsplashThumbnail(id, orientation),
                        srcset: [
                          this.makeUnsplashSrcSet(id, 1024),
                          this.makeUnsplashSrcSet(id, 800),
                          this.makeUnsplashSrcSet(id, 500),
                          this.makeUnsplashSrcSet(id, 320)
                        ],
                        caption,
                        orientation,
                        useForDemo
                      }))} />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='feature-item'>
                      <h3>Lorem</h3>
                      <p className='text-muted'>Deserunt proident ut irure magna anim Lorem cillum elit id dolore.</p>
                      <Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
                        src: this.makeUnsplashSrc(id),
                        thumbnail: this.makeUnsplashThumbnail(id, orientation),
                        srcset: [
                          this.makeUnsplashSrcSet(id, 1024),
                          this.makeUnsplashSrcSet(id, 800),
                          this.makeUnsplashSrcSet(id, 500),
                          this.makeUnsplashSrcSet(id, 320)
                        ],
                        caption,
                        orientation,
                        useForDemo
                      }))} />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='feature-item'>
                      <h3>Lorem</h3>
                      <p className='text-muted'>Id tempor non minim sunt fugiat esse quis cillum reprehenderit officia.</p>
                      <Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
                        src: this.makeUnsplashSrc(id),
                        thumbnail: this.makeUnsplashThumbnail(id, orientation),
                        srcset: [
                          this.makeUnsplashSrcSet(id, 1024),
                          this.makeUnsplashSrcSet(id, 800),
                          this.makeUnsplashSrcSet(id, 500),
                          this.makeUnsplashSrcSet(id, 320)
                        ],
                        caption,
                        orientation,
                        useForDemo
                      }))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Features.propTypes = {

}

export default Features
