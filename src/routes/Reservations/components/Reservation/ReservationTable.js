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
                  <th>Customer name</th>
                  <th>Note</th>
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
                <tr>
                  <td><a href='#'>#10002</a></td>
                  <td>Firstname Lastname</td>
                  <td>Admin theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10003</a></td>
                  <td>Name Another</td>
                  <td>Personal blog theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10004</a></td>
                  <td>One More</td>
                  <td>Marketing theme, personal blog theme, admin theme</td>
                  <td>01/01/2015</td>
                  <td>$300.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10005</a></td>
                  <td>Name Right Here</td>
                  <td>Personal blog theme, admin theme</td>
                  <td>01/02/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10006</a></td>
                  <td>First Last</td>
                  <td>Admin theme, marketing theme</td>
                  <td>01/01/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10007</a></td>
                  <td>Firstname Lastname</td>
                  <td>Admin theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10008</a></td>
                  <td>Name Another</td>
                  <td>Personal blog theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10009</a></td>
                  <td>One More</td>
                  <td>Marketing theme, personal blog theme, admin theme</td>
                  <td>01/01/2015</td>
                  <td>$300.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10010</a></td>
                  <td>Name Right Here</td>
                  <td>Personal blog theme, admin theme</td>
                  <td>01/02/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10011</a></td>
                  <td>First Last</td>
                  <td>Admin theme, marketing theme</td>
                  <td>01/01/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10012</a></td>
                  <td>Firstname Lastname</td>
                  <td>Admin theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10013</a></td>
                  <td>Name Another</td>
                  <td>Personal blog theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10014</a></td>
                  <td>One More</td>
                  <td>Marketing theme, personal blog theme, admin theme</td>
                  <td>01/01/2015</td>
                  <td>$300.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10015</a></td>
                  <td>Name Right Here</td>
                  <td>Personal blog theme, admin theme</td>
                  <td>01/02/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10016</a></td>
                  <td>First Last</td>
                  <td>Admin theme, marketing theme</td>
                  <td>01/01/2015</td>
                  <td>$200.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10017</a></td>
                  <td>Firstname Lastname</td>
                  <td>Admin theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10018</a></td>
                  <td>Name Another</td>
                  <td>Personal blog theme</td>
                  <td>01/01/2015</td>
                  <td>$100.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10019</a></td>
                  <td>One More</td>
                  <td>Marketing theme, personal blog theme, admin theme</td>
                  <td>01/01/2015</td>
                  <td>$300.00</td>
                </tr>
                <tr>
                  <td><a href='#'>#10020</a></td>
                  <td>Name Right Here</td>
                  <td>Personal blog theme, admin theme</td>
                  <td>01/02/2015</td>
                  <td>$200.00</td>
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
