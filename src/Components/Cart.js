import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/');
            }
        })
    })

    return (
        <>
            <Navbar user={user} />
            <div className='cart-container'>
            <h2 class="heading">Giỏ hàng của bạn</h2>
            <hr class="mx-auto"></hr>
                {shoppingCart.length > 0 ? <>
                <div className="row">
                    <div className="col-9">
                    <div className="cart_heading">
                        <div className="row">
                            <div className="col-2">Ảnh sản phẩm</div>
                            <div className="col-2">Tên sản phẩm</div>
                            <div className="col-2">Giá sản phẩm</div>
                            <div className="col-2">Số lượng</div>
                            <div className="col-2">Tổng tiền</div>
                            <div className="col-2">Xóa</div>
                        </div>
                    </div>
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={`/images/${cart.ProductImg}`} alt="something"/>
                            </div>
                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'> {cart.ProductPrice}<sup>đ</sup></div>

                            <div className="cart_incDec">
                                <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                    <Icon icon={ic_remove} size={14} />
                                </div>
                                <div className='quantity'>{cart.qty}</div>

                                <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                    <Icon icon={ic_add} size={14} />
                                </div>
                            </div>
                            
                            <div className='cart-price'>
                                {cart.TotalProductPrice}<sup>đ</sup>
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                        Giỏ hàng đợi thanh toán
                        </div>
                        <div className='cart-summary-price'>
                            <span>Số lượng:</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Tổng tiền:</span>
                            <span>{totalPrice}<sup>đ</sup></span>
                        </div>
                       
                        <Link to='cashout' className='cashout-link'>
                            <button className='cashout-btn'>
                                Thanh toán
                            </button>
                        </Link>
                    </div>}

                    </div>
                </div>
                </> :
                   <h3>Hiện tại không có sản phẩm nào trong giỏ hàng của bạn. Quay lại <Link to="/">Trang chủ</Link></h3>}
                </div>
        </>
    )
}