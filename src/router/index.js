import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../pages/Home';
import NotFound from './../pages/404';
import About from './../pages/About';

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Home',
	component: Home
},
{
	path: '*',
	name: '404',
	component: NotFound
},
{
	path: "/about",
	name: 'About',
	component: About
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router