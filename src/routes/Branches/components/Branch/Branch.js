import React, { Component } from 'react'
import BranchTable from './BranchTable'
import BranchModal from './BranchModal'
import SweetAlert from 'react-bootstrap-sweetalert'

class Branch extends Component {
  state = {
    open: false,
    alert: null
  }

  componentWillMount () {
    this.props.getBranches(1, 10)
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    let { creatingBranchSuccess, deletingBranchSuccess } = nextProps
    if (deletingBranchSuccess) {
      this.props.getBranches(1, 10)
    }

    if (creatingBranchSuccess) {
      this.setState({
        open: false,
        alert: (
          <SweetAlert success title='Info Sent' onConfirm={e => { this.setState({alert: null}) }}>
            Sweet!
          </SweetAlert>
        )
      })
      this.props.getBranches(1, 10)
    }
  }

  render () {
    return (
      <div className='container-fluid-spacious' style={{marginTop: '2%'}} >
      {this.state.alert}
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Branches</h2>
            </div>

            <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item' style={{ marginLeft: '0px' }}>

              </div>
            </div>
          </div>
          <div className='flextable'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' className='form-control input-block' placeholder='Search' />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
            <div className='flextable-item'>
              <button type='button' className='btn btn-pill btn-primary' onClick={e => { this.setState({open: true}) }}>Add New</button>
            </div>
          </div>
          <BranchModal open={this.state.open} onClose={e => { this.setState({ open: false }) }} {...this.props} />
          <BranchTable {...this.props} />

        </div>
      </div>
    )
  }
}

Branch.propTypes = {

}

export default Branch
