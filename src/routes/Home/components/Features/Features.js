import React, { Component } from 'react'
import {Thumbnail, Button} from 'react-bootstrap'
import StackGrid, { transitions, easings } from 'react-stack-grid'

const transition = transitions.scaleDown

class Features extends Component {
  render () {
    return (
      <section id='features' className='features'>
        <div className='container-fluid' >
          <div className='hr-divider'>
            <h3 className='hr-divider-content hr-divider-heading'>
              <h3>King Bed Size</h3>
            </h3>
          </div>
          &nbsp;
          <StackGrid
            monitorImagesLoaded
            columnWidth={350}
            duration={600}
            gutterWidth={15}
            gutterHeight={15}
            easing={easings.cubicOut}
            appearDelay={60}
            appear={transition.appear}
            appeared={transition.appeared}
            enter={transition.enter}
            entered={transition.entered}
            leaved={transition.leaved}
          >
            <figure className='image' key='key1'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key2'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key3'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key4'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key5'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key6'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key7'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key8'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
            <figure className='image' key='key9'><Thumbnail style={{textAlign: 'center'}} src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
              </p>
            </Thumbnail></figure>
          </StackGrid>
        </div>
      </section>
    )
  }
}

Features.propTypes = {

}

export default Features
