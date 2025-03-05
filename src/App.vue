<script lang="ts" setup>
import { ref } from "vue";
import Welcome from "./components/Welcome.vue";

const name = ref("Tebex");
</script>

<template>
    <div>
        <Welcome :name="name" />
    </div>
</template>
