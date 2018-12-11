<template>
	
		<div class="playlist" ref="playList">
			<div class="top-info" ref="topInfo">
				<div class="info-wrap">
					<div class="playlist-info">
						<img :src="list.logo" class="left-img">
						<div class="right-info">
							<div class="title">{{list.dissname}}</div>
							<div class="singer"><img :src="list.headurl" class="singer-img"><span class="singer-name">{{list.nickname}}</span></div>
							<div class="play-numer">播放量:{{visitnum}}万</div>
						</div>
					</div>
					<div class="player-wrap" ref="playerWrap">
						<div class="btn_play">
							播放全部
						</div>
						<div class="player"></div>
					</div>
				</div>
				<img :src="list.logo" class="bg-img">
			</div>
			<scroll class="bottom-list" :data="songList" ref="bottomList" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
				<div class="song-list-wrapper">
					<div class="count-box">
						<div class="lef-count">歌单&nbsp;共{{songList.length}}首</div>
						<div class="right-collect"></div>
					</div>
					<div  class="song" v-for="item in songList" :key="item.id">
						<div class="song-name">{{item.songname}}</div>
						<div class="song-singer">{{item.singer}}·{{item.albumname}}</div>
					</div>
					
				</div>
			</scroll>
		</div>

</template>

<script>
	import Scroll from './base/scroll'
	import {prefixStyle} from 'common/js/dom'
	
	const transform = prefixStyle('transform')
	
	export default {
		props:{
			list:{
				type:Object
			}
		},
		computed:{
			visitnum(){
				let visitnum=Math.round(this.list.visitnum/10000*10)/10
				return visitnum
			},
			songList(){
				let song_list=[];
				
				let songlist=this.list.songlist;
				
				songlist.forEach((song)=>{
					let singer=song.singer;
					song_list.push({
						albummid:song.albummid,
						albumname:song.albumname,
						songname:song.songname,
						singer:this.getSinger(song.singer)
					})
				})
				return song_list
			}
		},
		data() {
			return {
				scrollY:0
			};
		},
		created(){
			this.listenScroll=true
			this.probeType=3
		},
		mounted(){
			setTimeout(()=>{
				this.setTop()
				
			},20)
		},
		methods:{
			getSinger(singers){
				let singer;
				singers.forEach((item,index)=>{
					if(index!==singers.length-1){
						singer=item.name+'/'
					}else{
						singer=item.name
					}
				})
				return singer
			},
			setTop(){
				this.infoHeight=this.$refs.topInfo.clientHeight;
				this.$refs.bottomList.$el.style.top=`${this.infoHeight}px`;
				
				this.maxScrollY=this.$refs.topInfo.clientHeight-this.$refs.playerWrap.clientHeight
				
				// this.$refs.bottomList.$el.style.height=`${clientHeight-infoHeight}px`
				this.$refs.bottomList.refresh()
			},
			scroll(pos){
				this.scrollY=pos.y
			}
		},
		watch:{
			scrollY(nowY){
				console.log(nowY)
				if(nowY<0&&Math.abs(nowY)<Math.abs(this.maxScrollY)){
					//this.$refs.bottomList.disable()
					this.$refs.playList.style[transform]=`translate3d(0,${nowY}px,0)`
				}else{
					
				}
				
			}
		},
		components:{
			Scroll
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/mixin'
	@import '~common/stylus/variable'
	.list-fade-enter-active, .list-fade-leave-active
		transition: opacity 0.3s
	.playlist
		position:fixed
		top:0
		bottom:0
		width:100%
		.top-info
			no-wrap-row2()
			position:relative
			.bg-img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
				z-index:3
				filter:blur(36px)
			.info-wrap
				padding:17px 16px 0
				position:relative
				background: rgba(0,0,0,.5);
				z-index: 4
			.playlist-info
				display:flex
				align-items:center
				.left-img
					width:125px
					height:125px
				.right-info
					flex:1
					padding-left:10px
					.title
						no-wrap-row2()
						font-size:$fontsize-large-x
						line-height:1.3
						max-height:47px
						color:$color-white
					.singer
						margin-top:8px
						display:flex
						align-items:center
						.singer-img
							width:24px
							height:24px
							margin-right:8px
							border-radius:50%
						.singer-name
							font-size:$fontsize-medium
							color:$color-white
					.play-numer
						no-wrap-row2()
						font-size:$fontsize-small
						margin-top:8px
						color:$color-white
		.player-wrap
			position:relative
			height: 84px
			padding:0 16px
			center-center()
			.btn_play
				center-center()
				width:170px
				height:40px
				background:$color-theme
				color:$color-white
				border-radius:20px
				font-size:$fontsize-large
				&:before
					content: "";
					display: block;
					height: 0;
					width: 0;
					margin-right: -3px;
					border-color: transparent transparent transparent $color-white
					border-width: 7px 11px;
					border-style: solid;
					border-radius: 2px;
		.bottom-list
			position:fixed
			width:100%
			bottom:0
			overflow:hidden
		.song-list-wrapper
			.count-box
				padding:0 16px
				height:54px
				line-height:54px
				display:flex
				justify-content:space-between
			.song
				padding:10px 16px
				.song-name
					font-size: 16px;
					color: #000;
				.song-singer
					no-wrap()
</style>
				
				
				