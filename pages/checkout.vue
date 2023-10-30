<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

useHead({
    title: 'Easetrail | Cart ',
    meta: [
        { name: 'description', content: 'About Us' }
    ]
})

onMounted(() => {
    const script = document.createElement('script');
    script.src = '~/node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.min.js'; // Replace with the actual path to your script
    script.async = true;
    script.onload = () => {
      console.log('Script has been loaded!');
      // Code to run after the script has been successfully loaded
    };

    document.body.appendChild(script);
})

const removeItem = (item) => {
    cartStore.addRemoveCart({ product: item, toAdd: false })
    if (cartStore.cart.length == 0) {
        navigateTo('/')
    }
}


</script>

<template>
   <div class="columns is-centered">
        <div class="column">
            <h1 class="title">Checkout</h1>
            <div class="box">

                <section class="accordions">
  <article class="accordion is-active">
    <div class="accordion-header toggle">
      <p>Hello World</p>
    </div>
    <div class="accordion-body">
      <div class="accordion-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      </div>
    </div>
  </article>
  <article class="accordion">
    <div class="accordion-header">
      <p>Hello World</p>
      <button class="toggle" aria-label="toggle"></button>
    </div>
    <div class="accordion-body">
      <div class="accordion-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      </div>
    </div>
  </article>
  <article class="accordion">
    <div class="accordion-header">
      <p>Hello World</p>
      <button class="toggle" aria-label="toggle"></button>
    </div>
    <div class="accordion-body">
      <div class="accordion-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
      </div>
    </div>
  </article>
</section>


                <!-- User Information Form -->
                <form>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Full Name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="Email Address">
                        </div>
                    </div>
                    <!-- Add more user information fields as needed -->

                    <!-- Order Summary -->
                    <hr>
                    <h2 class="subtitle">Order Summary</h2>
                    <p>Product Name: Product Price</p>
                    <!-- Add more order summary details as needed -->

                    <!-- Payment Section -->
                    <hr>
                    <h2 class="subtitle">Payment</h2>
                    <div class="field">
                        <label class="label">Card Number</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Card Number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Expiration Date</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="MM/YYYY">
                        </div>
                    </div>
                    <!-- Add more payment fields as needed -->

                    <!-- Place Order Button -->
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-primary">Place Order</button>
                        </div>
                    </div>

                    <!-- <RazorpayPayment /> -->
                </form>
            </div>
        </div>
    </div>
</template>