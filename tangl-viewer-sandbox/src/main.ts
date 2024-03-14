import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Viewer from "./viewer.vue"
const app = createApp(App);




const router = createRouter({
  routes: [
    {
      path: '/',
      component: app
    },
	{
    path: '/viewer',
    component: Viewer
  },
],
  history: createWebHistory()
})

app.use(router);
app.mount("#app");
