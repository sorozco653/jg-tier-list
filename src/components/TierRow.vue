<template>
    <div class="tier_row">
        <div class="tier_header">
            <span>{{ label || 'No Label Here' }}</span>
        </div>
        <ul class="drag_zone">
            <!-- Add TierCard -->
            <li class="tier_card" v-for="item in items" >{{item}}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  items: {
    default: [] as string[]
  }
})

</script>

<style scoped>

.tier_row  {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 80px;
}

.drag_zone {
    flex: 1;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tier_header {
    min-width: 100px;
    width: 100px;
    min-height: 80px;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    text-align: center;
    height: 100%;
}

</style>