import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../Config/Config'
import { CartContext } from '../Global/CartContext'
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom'

export const Cashout = (props) => {

    const history = useHistory();

    const { totalPrice, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                })
            }
            else {
                history.push('/login')
            }
        })
    })

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                db.collection('Buyer-info ' + user.uid).doc('_' + time).set({
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerPhone: phone,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                }).then(() => {
                    setPhone('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Bạn đã thanh toán thành công. Cảm ơn đã ghe thăm và mua sắm ở trang web chúng tôi. Màn hình sẽ trở về trang chủ sau 5s');
                    setTimeout(() => {
                        history.push('/')
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    }

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <br /><h2 class="heading">Cashout</h2>
                      <hr class="mx-auto"></hr><br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Tên</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Số điện thoại</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='' />
                    <br />
                    <label htmlFor="Delivery Address">Địa chỉ nhận hàng</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Tổng tiền phải trả</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <button type="submit" className='cashout-btn'>Thanh toán</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}
