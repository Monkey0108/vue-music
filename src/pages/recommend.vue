<template>
	<div class="recommend">
			<scroll class="recommend-content" :data="recommend">
				<div>
					<div class="slider-wrapper">
						<div class="slider-content">
							<slider v-if="slider.length">
								<div v-for="item in slider" :key="item.id">
									<a :href="item.linkUrl">
										<img :src="item.picUrl">
									</a>
								</div>
							</slider>
						</div>
					</div>
					<div class="recommend-list">
						<h1>推荐歌单</h1>
						<ul>
							<li @click="selectItem(index)" v-for="(item,index) in recommend" :key="item.id">
								<img :src="item.imgurl" width="60" height="60" class="left-img">
								<div class="right-info">
									<div class="name">{{item.name}}</div>
									<div class="desc" v-html="item.dissname"></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</scroll>
			<div class="loading-container" v-show="!recommend.length">
				<loading></loading>
			</div>
			
			<router-view></router-view>
	</div>
</template>

<script>
	import {getSlider,getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Slider from 'components/base/slider'
	import Scroll from 'components/base/scroll'
	import Loading from 'components/base/loading'
	
	import BScroll from 'better-scroll'
	
	export default{
		data(){
			return {
				slider:[],
				recommend:[]
			}
		},
		created(){
			setTimeout(()=>{
				this._getSlider();
				this._getRecommend();
			},20)
			
		},
		methods:{
			_getSlider(){
				getSlider().then(res=>{
					var d=res.data;
					if(d.code==ERR_OK){
						this.slider=d.data.slider
					}
				})
			},
			_getRecommend(){
				getRecommend().then(res=>{
					let d=res.data;
					if(d.code==ERR_OK){
						this.recommend=this._normalRecommend(d.data.list)
					}
				})
			},
			_normalRecommend(list){
				let normal_list=[];
				list.forEach((item)=>{
					normal_list.push({
						imgurl:item.imgurl,
						name:item.creator.name,
						dissname:item.dissname,
						dissid:item.dissid
						
					})
				})
				return normal_list
			},
			selectItem(currentIndex){
				
				this.$router.push({path:'/recommend/recommend-playlist',query:{dissid:this.recommend[currentIndex].dissid}})
			}
		},
		components:{
			Slider,
			Scroll,
			Loading
		}
		
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable'
	@import '~common/stylus/mixin'
.recommend
	position: fixed;
	width: 100%;
	top: 88px;
	bottom: 0;
	.recommend-content
		height: 100%;
		overflow: hidden;
		.slider-wrapper
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 40%;
			overflow: hidden;
			.slider-content
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
		.recommend-list
			h1
				height:65px;
				line-height:65px;
				text-align: center;
				font-size:$fontsize-large;
				color:$color-dark-grey;
			ul
				padding:0 20px;
				li
					display:flex;
					align-items:center;
					padding:10px 0;
					border-bottom:1px solid $color-light-grey-ss;
					&:last-type-of
						border:none;
					.right-info
						padding-left:20px;
						flex: 1;
						box-sizing:border-box;
						.name
							margin-bottom:10px;
							color:$color-grey;
							font-size:$fontsize-medium;
						.desc
							no-wrap()
							color: hsla(0,0%,100%,.3);
							color:$color-light-grey-s;
							font-size:$fontsize-small;
	</style>
		.loading-container
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)