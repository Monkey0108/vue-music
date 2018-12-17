<template>
	<div class="tab">
		<ul class="tab_list">
			<template v-for="item in tab_list">
				<router-link tag="li" :to="item.path" class="tab_item" :key="item.id">{{item.label}}</router-link>
			</template>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tab_list:[
					{
						label:'推荐',
						path:'/recommend'
					},
					{
						label:'排行榜',
						path:'/topList'
					},
					{
						label:'搜索',
						path:'/search'
					}
				]
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable'
	.tab_list
		display:flex;
		.tab_item
			flex:1;
			height:40px;
			line-height: 40px;
			text-align: center;
			font-size: $fontsize-large;
		.router-link-active
			position:relative;
			color:#31c27c;
			&:after
				content: "";
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 2px;
				background: #31c27c;
</style>