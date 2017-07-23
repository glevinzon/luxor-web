import React, { Component } from 'react'
import ReservationTable from './ReservationTable'

class Reservations extends Component {
  render () {
    return (
      <div className='container-fluid container-fluid-spacious' style={{ marginTop: '2%'}} >
        <div className='col-sm-12 content'>
          <div className='dashhead'>
            <div className='dashhead-titles'>
              <h6 className='dashhead-subtitle'>Dashboard</h6>
              <h2 className='dashhead-title'>Reservations</h2>
            </div>

            {/* <div className='btn-toolbar dashhead-toolbar'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' value='01/01/15 - 01/08/15' className='form-control' data-provide='datepicker' />
                <span className='icon icon-calendar' />
              </div>
            </div> */}
          </div>
          <div className='flextable table-actions'>
            <div className='flextable-item flextable-primary'>
              <div className='btn-toolbar-item input-with-icon'>
                <input type='text' className='form-control input-block' placeholder='Search' />
                <span className='icon icon-magnifying-glass' />
              </div>
            </div>
          </div>

          <ReservationTable />

        </div>
      </div>
    )
  }
}

Reservations.propTypes = {

}

export default Reservations
