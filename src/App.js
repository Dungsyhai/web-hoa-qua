import React, { Component } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './Components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Signup } from './Components/Signup'
import { Login } from './Components/Login'
import NotFound  from './Components/NotFound'
import { auth, db } from './Config/Config'
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './Components/Cart'
import { Cashout } from './Components/Cashout'
import Footer from './Components/Footer'

export class App extends Component {

    state = {
        user: null,
    }

    componentDidMount() {

        // getting user info for navigation bar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        user: snapshot.data().Name
                    })
                })
            }
            else {
                this.setState({
                    user: null
                })
            }
        })
    }

    render() {
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Switch>
                        <Route exact path='/' component={() => <Home user={this.state.user} />} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/login" component={Login} />z
                            <Route path="/cart" component={() => <Cart user={this.state.user} />} />
                            <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                            <Route component={NotFound} />
                        </Switch>
                        <Footer/>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        )
    }
}

export default App
