import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)
      let totalAmount = 0
      cartList.forEach(item => {
        totalAmount += item.price * item.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="order">
            Order Total: <span className="totalValue">Rs {totalAmount}/-</span>
          </h1>
          <p className="length">{cartList.length} items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
