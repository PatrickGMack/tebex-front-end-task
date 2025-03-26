<template>
    <div>
        <CheckoutForm v-if="!orderSuccess" @orderSuccess="handleOrderSuccess" />
        <OrderSuccess v-else :order="orderData" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CheckoutForm from './CheckoutForm.vue';
import OrderSuccess from './OrderSuccess.vue';

const orderSuccess = ref(false);
const orderData = ref(null);

const handleOrderSuccess = (order: any) => {
    orderData.value = order;
    orderSuccess.value = true;
};
</script>