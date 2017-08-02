import React from 'react'
import NavBar from 'components/NavBar'
import LoadingBar from 'react-redux-loading-bar'

export const DashboardLayout = ({ children }) => {
  const isLogin = /^\/login\/?\??/i.test(location.pathname)
  return (
    <div className='dashboard-wrapper'>
      <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#009dc7', zIndex: 9999, height: 5}} />
      <div className='with-iconav'>
        {!isLogin && <NavBar />}
        <div className='container-fluid container-fluid-spacious'>
          {children}
        </div>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default DashboardLayout
