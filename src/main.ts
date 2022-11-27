import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { GameService } from './services/games';

const app = createApp(App);
app.provide('gameService', new GameService());
app.mount('#app');
