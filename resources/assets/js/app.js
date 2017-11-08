/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);

const NavbarComponent = Vue.component('navbar-component', require('./components/NavbarComponent.vue'));
const HomeComponent = Vue.component('home-component', require('./components/HomeComponent.vue'));
const CompetitionComponent = Vue.component('competition-component', require('./components/CompetitionComponent.vue'));
const GameEntryComponent = Vue.component('game-entry-component', require('./components/GameEntryComponent.vue'));
const CompeditorSelectModalComponent = Vue.component('competitor-select-modal-component', require('./components/CompetitorSelectModalComponent.vue'));


const routes = [

            { name: 'home', path: '/',  component: HomeComponent },
            { name: 'competition', path: '/competition/:id',  component: CompetitionComponent },
            { name: 'game-entry', path: '/competition/:id/game-entry',  component: GameEntryComponent },


];

const router = new VueRouter({
    routes
});

const app = new Vue({
    el: '#app',
    router
}).$mount('#app');


