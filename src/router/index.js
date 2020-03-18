import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home';
import NotFound from '@/pages/404';
import Error from '@/pages/500';
import About from '@/pages/About';
import ArticleList from '@/pages/ArticleList';
import Article from '@/pages/Article';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Blink from '@/pages/Blink';
import User from '@/pages/User';

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
		path: "/signup",
		name: "Signup",
		component: Signup
	},
	{
		path: "/blink",
		name: "Blink",
		component: Blink
	},
	{
		path: "/user/:id",
		name: "User",
		component: User
	},
	{
		path: "/user/:id/reply",
		name: "UserReply",
		component: User
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: (to, from, savedPosition) => {
		if (to.hash) {
			return {
				selector: to.hash
			};
		}
	}
});

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

export default router