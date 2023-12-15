import React from 'react'
import Header from '../header/header.jsx'
import Footer from '../footer/footer.jsx'
import Banner from '../banner/banner.jsx'

export default function BaseLayout(props) {
  return (
    <div>
        <Header/>
        <Banner/>
        {props.children}
        <Footer/>
    </div>
  )
}
