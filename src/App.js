import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const removedList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: removedList})
  }

  incrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    const requiredProduct = cartList.filter(eachItem => eachItem.id === id)
    const otherProducts = cartList.filter(eachItem => eachItem.id !== id)
    const increasedQuantity = requiredProduct[0].quantity + quantity
    const updatedProduct = requiredProduct.map(item => ({
      id: item.id,
      title: item.title,
      brand: item.brand,
      quantity: increasedQuantity,
      price: item.price,
      imageUrl: item.imageUrl,
    }))
    this.setState({cartList: [...otherProducts, updatedProduct[0]]})
  }

  decrementCartItemQuantity = (id, quantity) => {
    const {cartList} = this.state
    const requiredProduct = cartList.filter(eachItem => eachItem.id === id)
    if (requiredProduct[0].quantity > 1) {
      const otherProducts = cartList.filter(eachItem => eachItem.id !== id)
      const increasedQuantity = requiredProduct[0].quantity - quantity
      const updatedProduct = requiredProduct.map(item => ({
        id: item.id,
        title: item.title,
        brand: item.brand,
        quantity: increasedQuantity,
        price: item.price,
        imageUrl: item.imageUrl,
      }))
      this.setState({cartList: [...otherProducts, updatedProduct[0]]})
    } else {
      this.removeCartItem(id)
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const filteredListItems = cartList.filter(
      eachItem => eachItem.id === product.id,
    )

    if (filteredListItems.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id, product.quantity)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
