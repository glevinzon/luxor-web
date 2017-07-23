import React, { Component } from 'react'

class ReservationTable extends Component {
  render () {
    return (
      <div>
        <div className='table-full'>
          <div className='table-responsive'>
            <table className='table' data-sort='table'>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Customer Name</th>
                  <th>Note</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href='#'>#10001</a></td>
                  <td>First Last</td>
                  <td>Admin theme, marketing theme</td>
                  <td>01/01/2015</td>
                  <td>admin@email.com</td>
                  <td>$200.00</td>
                  <td>
                    <div className='btn-group'>
                      <button type='button' className='btn btn-primary-outline'>
                        <span className='icon icon-pencil' />
                      </button>
                      <button type='button' className='btn btn-primary-outline'>
                        <span className='icon icon-erase' />
                      </button>
                    </div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='text-center'>
          <ul className='pagination'>
            <li>
              <a href='#' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            <li className='active'><a href='#'>1</a></li>
            <li><a href='#'>2</a></li>
            <li><a href='#'>3</a></li>
            <li><a href='#'>4</a></li>
            <li><a href='#'>5</a></li>
            <li>
              <a href='#' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ReservationTable.propTypes = {

}

export default ReservationTable
