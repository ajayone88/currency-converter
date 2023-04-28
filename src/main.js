import { createApp } from 'vue';
import App from './App.vue';
import VueApexCharts from "vue3-apexcharts";
import Store from './store/store';
import Router from './router/router';
import I18n from './i18n/i18n';

const app = createApp(App);

app.use(Store);
app.use(Router);
app.use(I18n);
app.use(VueApexCharts);

app.mount('#app');
