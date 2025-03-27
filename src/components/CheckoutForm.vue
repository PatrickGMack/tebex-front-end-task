<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
        <!-- Basket details -->
        <div class="flex flex-col justify-between w-full lg:w-1/2 bg-[#1A1A1A] px-5 md:px-20 lg:px-28 xl:px-34 py-8">
            <div>
                <img src="/img/logo.svg" alt="logo" />

                <h3 class="text-white text-xs font-bold mt-6">Your order</h3>

                <div v-if="basket" class="text-white mt-4">
                    <div v-for="product in basket.products" :key="product.name" class="text-sm flex justify-between items-center">
                        <div class="flex items-center">
                            <img :src="`/img/products/${product.image}`" :alt="product.name" class="w-12 h-12" />

                            <div class="ml-4 flex flex-col">
                                <label>{{ product.name }}</label>
                                <label class="text-xs">Qty: {{ product.quantity }}</label>
                            </div>
                        </div>
                        <label>{{ product.price }} {{ currency.code}}</label>
                    </div>
                </div>
                <p v-else class="text-white mt-4">Loading basket...</p>
            </div>

            <div class="mb-3 lg:mb-20">
                <h3 class="text-white text-xs font-bold mt-6">Coupon/Gift Card</h3>
                <div class="flex items-center h-10 mt-2">
                    <input type="text" placeholder="Enter code here" :class="['w-full h-full p-2 bg-[#262626] border-1 border-[#333333] rounded-[3px] mr-3', couponErrorMessage ? 'border-red-500' : '']" v-model="couponCode"/>
                    <button class="h-full bg-white text-black p-2 text-xs rounded-[3px] cursor-pointer duration-150 hover:bg-[#40c4c3]" @click="applyCoupon">Confirm</button>
                </div>

                <p v-if="couponErrorMessage" class="text-red-500 text-xs">{{ couponErrorMessage }}</p>

                <div v-if="basket" class="flex flex-col mt-6">
                    <div class="flex justify-between">
                        <label class="text-white text-xs mb-2">Subtotal:</label>
                        <p class="text-white text-xs">{{ currency.symbol + basket.subTotal }}</p>
                    </div>
                    <div class="flex justify-between">
                        <label class="text-white text-xs mb-2">Sales Tax:</label>
                        <p class="text-white text-xs">{{ currency.symbol + (basket.salesTax ? basket.salesTax.toFixed(2) : '0.00') }}</p>

                    </div>
                    <div v-if="basket.couponCode" class="mb-4">
                        <label class="text-white text-xs mb-1 block">Discounts:</label>
                        <div class="bg-[#4D4D4D] px-3 py-1 rounded-full inline-block">
                            <p class="text-white text-xs">{{ basket.couponCode }}</p>
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <label class="text-white text-[22px] font-extrabold">Total price:</label>
                        <p class="text-white text-[22px] font-extrabold">{{ currency.symbol + basket.total }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment form -->
        <div class="w-full lg:w-1/2 px-5 md:px-24 lg:px-20 xl:px-34 py-8 lg:mt-16">
            <!-- Breadcrumb -->
            <div class="flex items-center text-xs">
                <p class="text-[#40c4c3] mr-2">Make Payment</p>
                <span class="mr-2 text-[#b2b2b2]">></span>
                <p class="text-[#b2b2b2]">Order Confirmed</p>
            </div>

            <div>
                <!-- Using VeeValidate for form valdidation -->
                <Form class="mt-6" :validation-schema="schema" @submit="submitPayment">
                    <div class="mb-5">
                        <label class="text-xs text-white font-bold">Email*</label>
                        <Field name="email" v-model="paymentDetails.email" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="Enter your email address"/>
                        <ErrorMessage name="email" class="text-red-500 text-xs"/>
                    </div>

                    <div class="mb-5">
                        <label class="text-xs text-white font-bold">Card number*</label>
                        <Field name="cardNumber" v-model="paymentDetails.cardNumber" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="1234 5678 9101 1121"/>
                        <ErrorMessage name="cardNumber" class="text-red-500 text-xs"/>
                    </div>

                    <div class="flex flex-wrap sm:flex-nowrap mb-5 gap-3">
                        <div class="w-full sm:flex-1">
                            <label class="text-xs text-white font-bold">Expiry date*</label>
                            <Field name="cardExpiry" v-model="paymentDetails.cardExpiry" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="MM/YY"/>
                            <ErrorMessage name="cardExpiry" class="text-red-500 text-xs"/>
                        </div>

                        <div class="w-full sm:flex-1">
                            <label class="text-xs text-white font-bold">CVC/CVV*</label>
                            <Field name="cardCvc" v-model="paymentDetails.cardCvc" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="123"/>
                            <ErrorMessage name="cardCvc" class="text-red-500 text-xs"/>
                        </div>

                        <div class="w-full sm:flex-[1.5]">
                            <label class="text-xs text-white font-bold">Zip Code / Postal Code*</label>
                            <Field name="postalCode" v-model="paymentDetails.postalCode" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="PO12 1AB"/>
                            <ErrorMessage name="postalCode" class="text-red-500 text-xs"/>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label class="text-xs text-white font-bold">Name on card*</label>
                        <Field name="nameOnCard" v-model="paymentDetails.nameOnCard" class="w-full p-2 bg-[#262626] border border-[#333333] rounded-[3px]" placeholder="Enter your name as shown"/>
                        <ErrorMessage name="nameOnCard" class="text-red-500 text-xs"/>
                    </div>

                    <button type="submit" class="w-full bg-[#40c4c3] text-black text-xl py-3 cursor-pointer duration-150 hover:bg-white">Pay by Card</button>
                </Form>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const emit = defineEmits<{
  (event: 'orderSuccess', payload: { transactionId: string; }): void;
}>();

interface Basket {
    id: string;
    couponCode: string | null;
    subTotal: number;
    salesTax: number;
    total: number;
    products: { name: string; image: string; quantity: number; price: number }[];
}
interface PaymentDetails {
    email: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    postalCode: string;
    nameOnCard: string;
}
const paymentDetails = ref<PaymentDetails>({
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    postalCode: "",
    nameOnCard: "",
});
const basket = ref<Basket | null>(null);
const orderID = ref<string | null>(null);
const couponCode = ref<string | null>(null);
const couponErrorMessage = ref<string | null>(null);
const paymentErrorMessage = ref<string | null>(null);
const currency = {
    symbol: "$",
    code: "USD",
};

const schema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email"),
    cardNumber: yup.string().required("Card number is required").matches(/^\d{16}$/, "Invalid card number"),
    cardExpiry: yup.string().required("Expiry date is required").matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
    cardCvc: yup.string().required("CVC/CVV is required").matches(/^\d{3,4}$/, "Invalid CVC"),
    postalCode: yup.string().required("Zip/Postal code is required"),
    nameOnCard: yup.string().required("Name on card is required"),
});

// Get basket contents
const getBasket = async () => {
    const response = await fetch("/api/basket");
    const data = await response.json();
    basket.value = data;
    orderID.value = data.id;
};

// Apply coupon
const applyCoupon = async () => {
    if (!couponCode.value) return;
    if (!basket.value) return;

    const response = await fetch(`/api/basket/${basket.value.id}/coupon`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: couponCode.value,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        couponErrorMessage.value = data.message || "An unknown error occurred.";
        return;
    }

    const data = await response.json();
    couponCode.value = null;
    basket.value = data;
    couponErrorMessage.value = null;
};


// Submit payment
const submitPayment = async () => {
    if (!basket.value || !orderID.value) return;

    const response = await fetch(`/api/basket/${basket.value.id}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...paymentDetails.value,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        paymentErrorMessage.value = data.message || "An unknown error occurred.";
        return;
    }

    const data = await response.json();

    emit('orderSuccess', { transactionId: data.transactionId});
    paymentErrorMessage.value = null;
};

onMounted(() => {
  getBasket();
});
</script>