<template>
	<div>
		<div id="container">

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				var map = new qq.maps.Map(document.getElementById("container"), {
					// 地图的中心地理坐标。
					center: new qq.maps.LatLng(39.916527, 116.397128)
				})
				var listener = qq.maps.event.addListener(
					map,
					'click',
					function() {
						alert('您点击了地图。');
					}
				);
			}
		}
	}
</script>

<style scoped>
	#container {
		width: 62.5rem;
		height: 50rem;
		border: solid 1px red;
	}
</style>
