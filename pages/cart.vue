<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

useHead({
    title: 'Easetrail | Cart ',
    meta: [
        { name: 'description', content: 'About Us' }
    ]
})

const removeItem = (item) => {
    cartStore.addRemoveCart({ product: item, toAdd: false })
    if (cartStore.cart.length == 0) {
        navigateTo('/')
    }
}
</script>
<template>
  <div class="columns mt-2">
                <!-- Cart Items Column -->
                <div class="column is-three-quarters">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                Shopping Cart
                            </p>
                        </header>
                        <div class="card-content">
                            <!-- Cart Items -->
                            <div class="content" v-for="item in cartStore.cart">
                                <div class="columns is-vcentered">
                                    <div class="column is-2">
                                        <figure class="image is-128x128">
                                            <img src="https://via.placeholder.com/128" alt="Product Image">
                                        </figure>
                                    </div>
                                    <div class="column ml-2">
                                        <p><strong>{{ item.name }}</strong></p>
                                        <p>Price: ${{ item.price }}</p>
                                        <p>Quantity: {{ item.qty }}</p>
                                    </div>
                                    <div class="column is-2">
                                        <CartAddRemove  :product="item" />
                                        <button @click="removeItem(item)" class="button is-danger is-small">Remove</button>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link to="/" class="card-footer-item button is-success" v-if="cartStore.cart.length == 0">Continue Shopping</nuxt-link>
                            
                            <!-- Add more cart items as needed -->

                        </div>
                    </div>
                </div>

                <!-- Summary Column -->
                <div class="column">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                Summary
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <p>Total Items: {{ cartStore.cart.length }}</p>
                                <p>Total Price: ₹{{ cartStore.cartTotal.toFixed(2) }}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <nuxt-link to="/checkout" class="card-footer-item button is-success">Checkout</nuxt-link>
                        </footer>
                    </div>
                </div>
            </div>
</template>