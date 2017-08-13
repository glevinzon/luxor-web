import React, { Component } from 'react'
import {Thumbnail, Button} from 'react-bootstrap'
import StackGrid, { transitions, easings } from 'react-stack-grid'

const transition = transitions.scaleDown

class Features extends Component {
  render () {
    return (
      <section id='features' className='features'>
        <div className='container-fluid' >
          <StackGrid
            monitorImagesLoaded
            columnWidth={300}
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
            <div key='key1'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key2'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key3'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key4'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key5'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key6'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key7'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key8'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
            <div key='key9'><Thumbnail src='/assets/thumbnaildiv.png' alt='242x200'>
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle='primary'>Reserve</Button>
              </p>
            </Thumbnail></div>
          </StackGrid>
        </div>
      </section>
    )
  }
}

Features.propTypes = {

}

export default Features
