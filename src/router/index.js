import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home';
import NotFound from '@/pages/404';
import Error from '@/pages/500';
import About from '@/pages/About';
import ArticleList from '@/pages/ArticleList';
import Article from '@/pages/Article';
import Login from '@/pages/Login';
import Blink from '@/pages/Blink';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '*',
		name: 'NotFound',
		component: NotFound
	},
	{
		path: "/500",
		name: "Error",
		component: Error
	},
	{
		path: "/about",
		name: 'About',
		component: About
	},
	{
		path: "/article",
		name: 'ArticleList',
		component: ArticleList
	},
	{
		path: "/article/:id",
		name: "Article",
		component: Article
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/blink",
		name: "Blink",
		component: Blink
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router