import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'

class Preferences extends Component {
  state = {
    headerTitle: '',
    headerBgImage: null,
    errors: [],
    isLoading: false,
    accepted: null,
    rejected: null
  }

  onDrop = (accepted, rejected) => {
    console.log(accepted, rejected)
    this.setState({ accepted, rejected })
  }

  render () {
    return (
      <form className='form-access container' style={{ paddingTop: '1em' }}>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.headerTitle}
              field='headerTitle'
              placeholder='Masthead Title'
              error={this.state.errors.headerTitle}
              />
          </div>
        </div>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
          <TextFieldGroup
            disabled
            onChange={this.onChange}
            value={this.state.headerBgImage}
            field='headerBgImage'
            placeholder='Masthead Background Image'
            error={this.state.errors.headerBgImage}
            />
          <Dropzone
            style={{ width: '100%',
              height: '500px',
              borderWidth: '2px',
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: '5px' }}
            multiple={false}
            accept='image/jpeg, image/png'
            onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}>
                {this.state.accepted && (<div className='headerBgImage' style={{ background: `url(${this.state.accepted[0].preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>)}
                {!this.state.accepted && (<p>Drop an image here, or click to select file to upload.</p>)}
            </Dropzone>
          </div>
        </div>
      </form>
    )
  }
}

Preferences.propTypes = {

}

export default Preferences
