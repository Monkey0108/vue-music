import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

// banner
export function getSlider(){
	const url='/api/getSlider'
	const data=Object.assign({},commonParams,{
		format: 'json'
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res);
	})
}
// 推荐列表
export function getRecommend(){
	const url="/api/getRecommend"
	const data=Object.assign({},commonParams,{
		picmid:1,
		rnd:Math.random(),
		g_tk:5381,
		platform:'yqq',
		needNewCode: 0,
		categoryId:10000000,
		sortId:5,
		sin:0,
		ein:29,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then(res=>{
		return Promise.resolve(res);
	})
}

export function getPlaylist(dissid){
	const url="/api/getPlaylist";
	const data=Object.assign({},commonParams,{
		type: 1,
		json: 1,
		onlysong: 0,
		disstid: dissid,
		format: 'json',
		g_tk: 5381,
		notice: 0,
		platform: 'yqq',
		needNewCode: 0
	})
	return axios.get(url,{
		params:data
	}).then(res=>{
		return Promise.resolve(res);
	})
}
