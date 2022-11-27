<template>
  <h1>Create Your Own Tier List</h1>
  <div class="tier_container"> 
    <TierRow v-for="tier in tiers" :key="tier.id" :label="tier.name" :items="tier.items"/> 
  </div>
  <h3>Games:</h3>
  <div class="tile_bin">
    <TierCard v-for="game in games" :key="game.id" :img-src="game.imgSrc" />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, Ref, ref } from 'vue';
import TierCard from './components/TierCard.vue';
import TierRow from './components/TierRow.vue';
import { GameService } from './services/games';


let id: number = 0;
const tiers = ref([
  { id: id++, name: 'Love it', items: []},
  { id: id++, name: 'Like it', items: []},
  { id: id++, name: 'Leave it', items: []},
  { id: id++, name: "Haven't played", items: []},
]);

const games: Ref<{imgSrc: string, id: number}[]> = ref([]);
const gameService = inject('gameService') as GameService;

onMounted(() => {
  const _games = gameService.getGames();
  games.value = _games.map((game, index) => ({ ...game, id: index }));
  // Maybe setup Local Storage after MVP
})

</script>

<style scoped>
.tier_container {
  display: flex;
  flex-direction: column;
  border: 1px solid white;
}

.tile_bin {
  border: 1px solid white;
  display: grid;
  grid-template: repeat(5, 1fr) / repeat(9, 100px);
  gap: 0.5rem;
}

</style>
