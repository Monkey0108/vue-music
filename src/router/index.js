import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'pages/recommend'
import TopList from 'pages/top-list'
import Search from 'pages/search'
import RecommendPlaylist from 'pages/recommend-playlist'

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
					path:'recommend-playlist',
					component:RecommendPlaylist
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
