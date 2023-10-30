import { defineStore } from "pinia";


export const useCartStore = defineStore("cart", () => {
  const cart = ref([])
  const cartTotal = ref(0)

  const addRemoveCart = (payload) => {
    payload.toAdd ? cart.value.push(payload.product) : cart.value = cart.value.filter(p => p.id !== payload.product.id)
    cartTotal.value = cart.value.reduce((accumulator, object) => {
      return parseFloat(accumulator) + parseFloat(object.price * object.qty)
    }, 0)
    localStorage.cartTotal = JSON.stringify(cartTotal.value)
    localStorage.cart = JSON.stringify(cart.value)

    // console.log(cartTotal.value)
    // console.log(cart.value)
  }

  const updateCart = (payload) => {
    cart.value.find(o => o.id === payload.product.id).qty = payload.product.qty
    cartTotal.value = cart.value.reduce((accumulator, object) => {
      return parseFloat(accumulator) + parseFloat(object.price * object.qty)
    }, 0)
    localStorage.cartTotal = JSON.stringify(cartTotal.value)
    localStorage.cart = JSON.stringify(cart.value)

    // console.log(cartTotal.value)
    // console.log(cart.value)
  }

  const $resetCart = () => { cart.value = [] }

  return { cart, cartTotal, addRemoveCart, updateCart, $resetCart }
}, { persist: true })

  