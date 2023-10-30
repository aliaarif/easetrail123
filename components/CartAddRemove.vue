<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
const props = defineProps({
    product: Object
})
const qty = ref(1)
// const loading = ref(false)



const addOrRemove = async (no) => {
    // loading.value = true 
    if (no == 1) { //add
        if (qty.value < 10) {
            qty.value++
            props.product.qty = qty.value
            cartStore.updateCart({ product: props.product })
            toast.success('Cart Updated', {
                position: 'bottom-right'
            })
        } else {
            toast.warning('You reached the limit', {
                position: 'bottom-right'
            })
        }
    }

    if (no == -1) { // remove
        if (qty.value > 1) {
            qty.value--
            props.product.qty = qty.value
            cartStore.updateCart({ product: props.product })
            toast.success('Cart Updated', {
                position: 'bottom-right',
                autoClose:1000
            })
        } else {
            toast.warning('You reached the limit')
        }
    }

    // loading.value = false 

}

onMounted(() => {
    qty.value = props.product.qty

})
</script>

<template>
    <div class="field has-addons" v-if="product">
        <div class="control">
            <button class="button is-small"  @click="addOrRemove(-1)">
                <span class="icon is-small">
                    <i class="fas fa-minus"></i>
                </span>
            </button>
        </div>
        <div class="control">
            <input class="input is-small" type="number"  v-model="qty" disabled>
        </div>
        <div class="control">
            <button class="button is-small"  @click="addOrRemove(1)">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
            </button>
        </div>
    </div>
</template>