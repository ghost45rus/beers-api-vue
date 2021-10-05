import Vue from 'vue'
import App from './components/app/app.vue';
import store from './store/index';

new Vue({
    store,
    el: '#root',
    render: h => h(App)
});