<template>
  <h1>Tier List</h1>
  <div class="tier_container"> 
    <div class="tier_row" v-for="(tier, index) in tiers" :key="tier.id">
      <div class="tier_header" :style="{ backgroundColor: colorize(index)}">
          <span>{{ tier.name || 'Placeholder' }}</span>
      </div>
      <ul 
        class="drop_zone" 
        @drop="onDrop($event, tier.id)"
        @dragend="onDragEnd($event)"
        @drag="onDragOver($event)"
        @dragenter.prevent
        @dragover.prevent
        >
        <!-- Ideally I would of conver this into a component but for sake of time and ease, I keep this in the App.vue -->
        <div 
          v-for="game in getTierItems(tier.id)" 
          @dragstart="startDrag($event, game)"
          draggable="true"
          :key="game.id" 
          class="tier_card"
        >
          <img v-bind:src="game.imgSrc" alt="Card">
          <!-- End -->
        </div>
      </ul>
    </div>
  </div>

  <h2>Games:</h2>
  <div 
    class="tile_bin"
    @drop="onDrop($event, TIERS.BIN)"
    @dragend="onDragEnd($event)"
    @drag="onDragOver($event)"
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
import { onMounted, Ref, ref } from 'vue';
import { default as partyGames } from './games.json';

/* Interfaces would go in constants.ts  */
interface TierCard {
  imgSrc: string, 
  id: number, 
  list: TIERS | number,
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
};

const ITEM_ID = 'itemID'

const colors = ['#FF7F7F', '#FFBF7F', '#FFDF7F', '#FFFF7F'];

const colorize = (index: number): string => {
  const fauxIndex = index % colors.length;
  return colors[fauxIndex];
}


let id: number = 1;
const tiers: Ref<Tiers[]> = ref([
  { id: id++, name: 'Love it', },
  { id: id++, name: 'Like it', },
  { id: id++, name: 'Leave it', },
  { id: id++, name: "Haven't played", },
]);

const games: Ref<TierCard[]> = ref([]);

onMounted(async () => {
  const { allGames: _allGames } = await getGames();
  games.value = _allGames.map((game, index) => ({ ...game, id: index, list: TIERS.BIN })); 
});


const getTierItems = (_list: TIERS): TierCard[] => { 
  return games.value.filter(({ list }) => _list === list); 
}

let currentIndex: number | null = null;
const startDrag = (event: DragEvent, game: TierCard): void => {
  console.log(`Grabbing Item from list: ${JSON.stringify(game)}`);
  (event.target as HTMLElement).style.opacity = '0.4';

  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  currentIndex = game.id
  event.dataTransfer!.setData(ITEM_ID, String(game.id));
};

const onDrop = (event: DragEvent, list: TIERS): void => {
  const dropItemID = event.dataTransfer!.getData(ITEM_ID);
  const dropItem = games.value.find(game => `${game.id}` === dropItemID);
  dropItem!.list = list;
}

const onDragEnd = (event: DragEvent) => {
  (event.target as HTMLElement).style.opacity = '1';
  currentIndex = null;
}

const onDragOver = (event: DragEvent) => {
  const selectedItem = (event.target as HTMLElement),
        list = selectedItem!.parentNode,
        x = event.clientX,
        y = event.clientY;

  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y)!;
  let newList = (document.elementFromPoint(x, y) as HTMLElement).closest('.drop_zone, .tile_bin')
 
  if (list === swapItem!.parentNode) {
    swapItem = swapItem !== selectedItem!.nextSibling ? swapItem : swapItem!.nextSibling as HTMLElement;
    list!.insertBefore(selectedItem as Node, swapItem);
  } else if (newList && !newList.contains(selectedItem)) {
    newList?.append(selectedItem as Node);
  }
}

//Mocking Fetch Data
const getGames = async (): Promise<{ allGames: { imgSrc: string }[] }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      allGames: partyGames.allGames
    }), 150)
  })
}

</script>

<style scoped>
.tier_container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 980px;
  border: 2px solid white;
  border-radius: 4px;
}

.tile_bin {
  border: 2px solid white;
  width: 980px;
  border-radius: 4px;
  display: grid;
  grid-template: repeat(9, auto) / repeat(5, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  place-items: center;
}


.tier_row  {
    display: flex;
    align-items: center;
    background-color: #404040;
    gap: 1px;
    min-height: 104px;
}

.drop_zone {
    flex: 1;
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    height: 100%;
}

.tier_card {
  display: flex;
}

.drop_zone .tier_card {
  flex-basis: 24%;
}

.tier_header {
    flex-basis: 20%;
    min-height: 80px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    text-align: center;
    height: 100%;
}

img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  pointer-events: none;
}

</style>
