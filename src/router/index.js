import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../pages/Home';
import NotFound from './../pages/404';
import About from './../pages/About';
import ArticleList from './../pages/ArticleList';
import Article from './../pages/Article';
import Login from './../pages/Login';

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
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router