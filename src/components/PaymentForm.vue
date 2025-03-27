<template>
    <!-- Using VeeValidate for form valdidation -->
    <Form class="mt-6" :validation-schema="schema" @submit="submitForm">
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
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const emit = defineEmits<{
  (event: 'submitPayment', payload: { paymentDetails: object }): void;
}>();

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

const schema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email"),
    cardNumber: yup.string().required("Card number is required").matches(/^\d{16}$/, "Invalid card number"),
    cardExpiry: yup.string().required("Expiry date is required").matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
    cardCvc: yup.string().required("CVC/CVV is required").matches(/^\d{3,4}$/, "Invalid CVC"),
    postalCode: yup.string().required("Zip/Postal code is required"),
    nameOnCard: yup.string().required("Name on card is required"),
});

const submitForm = () => {
  emit('submitPayment', { paymentDetails: paymentDetails.value });
};

</script>