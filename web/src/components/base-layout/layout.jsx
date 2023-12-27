import React from 'react'
import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'

export default function BaseLayout(props) {
  return (
    <div>
        <Header/>
        {props.children}
        <Footer/>
    </div>
  )
}
