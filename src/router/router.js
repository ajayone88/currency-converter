import { createRouter, createWebHashHistory } from 'vue-router';
import Converter from '@/views/converter/index.vue';
import History from '@/views/history/index.vue';
import Chart from '@/views/chart/index.vue';

const routes = [
  { name: 'converter', path: '/converter', component: <Converter /> },
  { name: 'chart', path: '/chart', component: <Chart /> },
  { name: 'history', path: '/history', component: <History /> },
  { name: 'default', path: '/', redirect: { name: 'converter' } }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
})