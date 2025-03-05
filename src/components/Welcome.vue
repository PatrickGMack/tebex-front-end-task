<script lang="ts" setup>
defineProps<{
    name: string;
}>();
</script>

<template>
    <div class="welcome">
        <img src="/img/logo.svg" class="logo" alt="Tebex logo" />
        <h1>Welcome to the {{ name }} front-end task</h1>

        <p>All assets can be found in the /public directory</p>

        <img src="/img/products/medium_booster.png" alt="Medium booster" />
        <img src="/img/products/small_coins.png" alt="Small coins" />
    </div>
</template>

<style scoped>
.welcome {
    text-align: center;
}

.logo {
    height: 4em;
    padding: 1.5em;
    display: block;
    margin: 0 auto;
}
</style>
