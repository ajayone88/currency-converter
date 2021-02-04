import { createApp } from 'vue';

import App from './App.vue';
import VueApexCharts from "vue3-apexcharts";
import Store from './store/store';

const app = createApp(App);

app.use(Store);
app.use(VueApexCharts);

app.mount('#app');
