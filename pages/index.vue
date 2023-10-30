<script setup>
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const isLoading = ref(true)
onBeforeMount(() => { isLoading.value = true });
useHead({
  title: "Store -  A Multivendor Online Store",
  meta: [
    {
      name: "Dummy Name",
      content: "Dummy Contents",
    },
  ],
});
const { data: products } = await useAsyncData("products", () => {
  return $fetch(`http://dev.multivendor-api/api/products`, {
    method: "get",
  })
});

// console.log(products.value.data)


</script>
<template>
 
<div class="columns is-multiline is-mobile mt-2">
    <div class="column is-3-tablet is-6-mobile animate__animated animate__flipInX" v-for="product in products.data" :key="product._id">
        <div class="card product-card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://via.placeholder.com/400x300" alt="Product Image">
                </figure>
            </div>
            <div class="card-content">
              <div class="mb-2">{{ product.name }}</div>
              <div class="mb-2">₹{{ product.price }}</div>
              <div class="mb-2">{{ product.vendor_id }}</div>
              <CartBtn :product="product"/>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.title {
  color: #363636;
  margin-top: 30px;
  margin-bottom: 0px;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 26px;
  }
}
.column.is-6-mobile.is-4-tablet.is-4-desktop.is-3-widescreen {
  padding: 10px;
}
.container.mt-2 section {
  margin-left: 20px;
  margin-right: 20px;
}

.heading-ct {
      margin-bottom: 25px;
      margin-top: -10px;
    }

    .is-peach {
      background-color: rgba(250,105,0,.1);
      margin-top: 40px;
      border-radius: 10px;
    }

    .is-orange {
      border: 2px solid #fa6900;
      background-color: transparent;
      border-radius: 50px;
      color: #fa6900;
      text-align: center;
    }

    .box.is-orange:hover {
      background-color: orange;
    }

    .is-orange:hover {
    color: white;
}
</style>
