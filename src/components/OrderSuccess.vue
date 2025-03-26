<template>
    <div class="flex flex-col items-center py-5 md:py-18">
        <img src="/img/logo.svg" alt="Tebex logo" class="mb-18"/>
        <div class="flex justify-center items-center border-1 border-[#333333] rounded-[2px] py-5 px-2 md:px-10 lg:px-42 mx-3">
            <div class="text-center md:max-w-[450px]">
                <div class="flex justify-center">
                    <img src="/img/green_check.png" alt="Checkmark within green circle" class="h-12 w-12 mb-3"/>
                </div>
                <h1 class="text-[26px] font-extrabold text-white mb-4">Order Complete</h1>
                <p class="text-wrap text-white text-sm">Thank you for your payment. You will recieve your purchased products shortly.</p>

                <div class="border-1 border-[#333333] bg-[#1A1A1A] text-white mt-4 mb-3 py-2 px-4 w-full">
                    <p class="text-white"><span class="text-lg font-extrabold">Order number:</span> {{ order.transactionId }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ order: any }>();
</script>