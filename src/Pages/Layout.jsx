import React from 'react'
import Nav from '../Common/Nav'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
      <Nav/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout
