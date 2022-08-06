import React, { createContext } from 'react'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: [
            {
                ProductID: 1,
                ProductName: 'Vú sữa Lò Rèn - Vĩnh Kim', 
                ProductImg: 'Vu_sua_lo_ren.jpg',
                ProductPrice: 92000,
                ProductDes: "Kg",
            },
            {
                ProductID: 2,
                ProductName: 'Chuối Ngự Đại Hoàng', 
                ProductImg: 'chuoi.jpg', 
                ProductPrice: 62000,
                ProductDes: "Nải",
            },
            {
                ProductID: 3,
                ProductName: 'Chanh dây Sỹ Hải', 
                ProductImg: 'Chanh-Dây.jpg', 
                ProductPrice: 60000, 
                ProductDes: "Kg",
            },
            {
                ProductID: 4,
                ProductName:'Đu Đủ ruột đỏ Tiến Thắng', 
                ProductImg: 'dudu.jpg', 
                ProductPrice: 55000,  
                ProductDes: "Quả",
            },
            {
                ProductID: 5,
                ProductName: 'Xoài Cát Hòa Lộc', 
                ProductImg: 'Xoai_cat_hoa_loc.jpg', 
                ProductPrice: 75000,  
                ProductDes: "Kg",
            },
            {
                ProductID: 6,
                ProductName: 'Bưởi Madu', 
                ProductImg: 'buoi-madu.jpg', 
                ProductPrice: 85000, 
                ProductDes: "Quả",
            },
            {
                ProductID: 7,
                ProductName: 'Măng cụt Cái Mơn - Bến Tre', 
                ProductImg: 'măng-cụt.jpg', 
                ProductPrice: 79000,  
                ProductDes: "Kg",
            },
            {
                ProductID: 8,
                ProductName: 'Thanh Long Bình Thuận', 
                ProductImg: 'thanh-long.jpg',
                ProductPrice: 65000, 
                ProductDes: "Kg",
            },
    
        ],
    }

    componentDidMount() {
        const prevProducts = this.state.products;
        const ProductsContext = (state = prevProducts, action) => {
            switch(action.type){
                case "PRODUCT": 
                return {...state, product: state.products.find(product => product.ProductID === parseInt(action.ProductID))}
                default: 
                return state;
            }
        }
    }
    
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}


