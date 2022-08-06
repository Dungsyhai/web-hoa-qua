import React from 'react'
import { Navbar } from './Navbar';
import { Products } from './Products'
import Banner from './Banner'
import About from './About'

export const Home = ({ user }) => {
    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Banner/>
            <About/>
            <Products />
        </div>
    )
}
