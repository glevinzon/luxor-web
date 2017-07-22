import React from 'react'
import NavBar from 'components/NavBar'

export const DashboardLayout = ({ children }) => {
  const isLogin = /^\/login\/?\??/i.test(location.pathname)
  return (
    <div className='dashboard-wrapper'>
      <div className='with-iconav'>
        {!isLogin && <NavBar />}
        <div className='container'>
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
