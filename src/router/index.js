import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('./../pages/Home');
const NotFound = () => import('./../pages/404');
const About = () => import('./../pages/About');
const ArticleList = () => import('./../pages/ArticleList');
const Article = () => import('./../pages/Article');
const Login = () => import('./../pages/Login');
const Blink = () => import('./../pages/Blink');

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

export default router