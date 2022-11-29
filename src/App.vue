<template>
  <h1>Create Your Own Tier List</h1>
  <div class="tier_container"> 
    <div class="tier_row" v-for="tier in tiers" :key="tier.id">
      <div class="tier_header">
          <span>{{ tier.name || 'Placeholder' }}</span>
      </div>
      <ul 
        class="drop_zone" 
        @drop="onDrop($event, tier.id)"
        @dragenter.prevent
        @dragover.prevent
        >
        <div 
          v-for="game in getTierItems(tier.id)" 
          @dragstart="startDrag($event, game)"
          draggable="true"
          :key="game.id" 
          class="tier_card"
        >
          <img v-bind:src="game.imgSrc" alt="Card">
        </div>
      </ul>
    </div>
  </div>

  <h3>Games:</h3>
  <div 
    class="tile_bin"
    @drop="onDrop($event, 0)"
    @dragenter.prevent
    @dragover.prevent
    >
    <div 
      v-for="game in getTierItems(TIERS.BIN)" 
      @dragstart="startDrag($event, game)"
      draggable="true"
      :key="game.id" 
      class="tier_card"
    >
      <img v-bind:src="game.imgSrc" alt="Card">
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, Ref, ref } from 'vue';
import { GameService } from './services/games';
import { default as partyGames } from '../src/services/games.json';

interface TierCard {
  imgSrc: string, 
  id: number, 
  list: number, // Add type safety for this list 
}

interface Tiers {
  id: number, 
  name: string,
}

enum TIERS {
  BIN = 0,
  LOVE_IT = 1,
  LIKE_IT = 2,
  LEAVE_IT = 3,
  HAVENT_PLAYED = 4
}

let id: number = 1;  // ID Zero is reserved for Bin;
const tiers: Ref<Tiers[]> = ref([
  { id: id++, name: 'Love it', },
  { id: id++, name: 'Like it', },
  { id: id++, name: 'Leave it', },
  { id: id++, name: "Haven't played", },
]);

const games: Ref<TierCard[]> = ref([]);

onMounted(async () => {
  const _games = await getGames() as { imgSrc: string }[];
  games.value = _games.map((game, index) => ({ ...game, id: index, list: TIERS.BIN })); 
  // Implememnt local storage
});


const getTierItems = (_list: number): TierCard[] => { // add ts TIERS
  return games.value.filter(({ list }) => _list === list); 
}

const startDrag = (event: DragEvent, game: any): void => { // Add type later...
  console.log(`Grabbing Item from list: ${JSON.stringify(game)}`);
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  event.dataTransfer!.setData('itemId', game.id)
};

const onDrop = (event: DragEvent, list: number): void => {
  const dropItemID = event.dataTransfer!.getData('itemId');
  const dropItem = games.value.find(game => `${game.id}` === dropItemID);
  dropItem!.list = list;
}

const getGames = async () => { //Mocking Fetch Data
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      games: partyGames.games
    }), Math.random() * 1000)
  })
}

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


.tier_row  {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 80px;
}

.drop_zone {
    flex: 1;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    height: 100%;
    border: 1px solid pink;
}

.drop_zone .tier_card {
  flex-basis: 23%;
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

img {
  max-width: 100%;
  height: auto;
}

</style>
