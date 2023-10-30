<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const props = defineProps({
    product: Object
})
const toAdd = ref(true)
const item = ref([])

const addOrRemove = async () => {
    item.value.qty = 1
    cartStore.addRemoveCart({ product: item.value, toAdd: toAdd.value })
    let toastMsg
    toAdd.value ? toastMsg = 'Add to cart' : toastMsg = 'Removed from cart'
    toast(toastMsg, {
        autoClose: 1000,
        position: 'bottom-right'
    })
    toAdd.value = !toAdd.value
}

onMounted(() => {
    let cart = cartStore.cart
    let obj = cart.find(o => o.id === props.product.id)
    if (obj) {
        toAdd.value = false 
        item.value = obj
    } else {
        item.value = props.product
        toAdd.value = true 
    }
})
</script>

<template>
<div class="columns">
    <div class="column">
        <button class="button is-primary is-small" @click="addOrRemove"> Add to cart</button>
    </div>
    <div class="column">
        <CartAddRemove v-if="!toAdd" :product="item" />
    </div>
</div>
</template>