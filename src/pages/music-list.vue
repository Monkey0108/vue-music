<template>
	<transition name="slider">
		<div class="recommend-playlist">
			<Playlist :list="playlist"  v-if="Object.keys(playlist).length"></Playlist>
		</div>
	</transition>
</template>

<script>
	import {ERR_OK} from 'api/config'
	import {getPlaylist} from 'api/recommend'
	import Playlist from 'components/playlist'
	
	export default {
		data() {
			return {
				playlist:{}
			};
		},
		created(){
			setTimeout(()=>{
				this._getPlaylist();
			},20)
		},
		methods:{
			_getPlaylist(){
				let dissid=this.$route.query.dissid
				getPlaylist(dissid).then((res)=>{
					let d=res.data;
					if(d.code==ERR_OK){
						this.playlist=d.cdlist[0]
					
					}
				})
			},
			
		},
		components:{
			Playlist
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable'
	.recommend-playlist
		position:fixed
		top:0
		bottom:0
		width:100%
		background:$color-background-white
		z-index:200
	.slider-enter-active,.slider-lever-active
		transition: all 0.3s
	.slider-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>
