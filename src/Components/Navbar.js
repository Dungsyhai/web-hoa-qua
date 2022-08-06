import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Config/Config'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../Global/CartContext'
import { BiUser } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Navbar = ({ user }) => {

    const history = useHistory();
    const { totalQty } = useContext(CartContext);

    // handle logout
    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/');
        })
    }

    return (
        <div className='nav'>
            <div className="nav-text">
                <img src="/images/logo5.png" alt="logo"/>
            </div>
              <ul className="nav-menu menu-main">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#about">About</Link></li>
                    <li><Link to="#products">Sản phẩm</Link></li>
                    <li><Link to="#">Liên hệ</Link></li>
                </ul>

                <div className="navSearch">
                    <HiOutlineSearch className="iconSearch" />
                    <input type="text" placeholder = "Tìm kiếm ..."/>
                </div>

            {!user && <ul className='nav-container'>
                <Link to="/login">
                    <div className="basket">
                        <BiUser className="cart-icon" />
                    </div>
                </Link>
            </ul>}
            
            {user && <div className='nav-container'>
                <Link to="/" className='navlink'>{user}</Link>
                <Link to="/cart">
                    <div className="basket">
                      <AiOutlineShoppingCart className="cart-icon" />
                      <span>{totalQty}</span>
                    </div>
                </Link>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}
