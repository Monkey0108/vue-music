<template>
  <div id="app">
  	<m-header></m-header>
  	<m-tab></m-tab>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
  	
  </div>
</template>

<script>
	import MHeader from 'components/m-header'
	import MTab from 'components/m-tab'
	
	export default {
		components:{
			MHeader,
			MTab
		},
		mounted(){
			
    	this._setFont();
    },
    methods:{
    	_setFont(){
    		setTimeout(function(){
	    		let fontSize=document.querySelector('html').getBoundingClientRect().width/18;
	    		document.querySelector('html').style.fontSize=fontSize+'px';
	    	},20)
    	}
    }
	}
</script>

<style lang="stylus">
	
</style>
