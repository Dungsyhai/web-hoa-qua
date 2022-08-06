import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'

export const Products = () => {

    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <h2 class="heading">Products</h2>}
            <hr class="mx-auto"></hr>
            <div id="products" className='products-container'>
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                        <img src={`/images/${product.ProductImg}`} alt="something"/>
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Giá: {product.ProductPrice}<sup>đ</sup>/{product.ProductDes}
                        </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', ProductID: product.ProductID, product })}>Thêm vào giỏ hàng</button>
                    </div>
                ))}
            </div>
        </>
    )
}
