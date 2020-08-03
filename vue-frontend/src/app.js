// Import Styling //
import 'bootstrap';
// import '@fortawesome/fontawesome-free/js/all'
import './scss/main.scss';

// Import Function //
import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './js/voucher/voucher.vue';
import "./js/main.js";

// Vue Component //
Vue.use(VueResource);
const bus = new Vue();

new Vue({
    el: '#app',
    render: h => h(App)
})