<template>
    <div class="tier_card">
        <img v-bind:src="imgSrc" alt="Card">
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imgSrc: String,
})

</script>

<style scoped>

img {
  max-width: 100%;
  height: auto;
}

</style>