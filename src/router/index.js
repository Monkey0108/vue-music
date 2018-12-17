import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'pages/recommend'
import TopList from 'pages/top-list'
import Search from 'pages/search'
import MusicList from 'pages/music-list'

Vue.use(Router)
export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
    	path: '/recommend',
      component:Recommend,
			children:[
				{
					path:'music-list',
          component: MusicList
				}
			]
    },
    {
    	path: '/topList',
      component:TopList
    },
    {
    	path:'/search',
    	component:Search
    }
  ]
})
