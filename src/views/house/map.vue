<template>
	<div>
		<div class="map">
			<div class="item">
				<el-input v-model="latlng"></el-input>
			</div>
			<div class="item">
				<el-input v-model="address"></el-input>
			</div>
			<div class="btn">
				<el-button size="mini" type="primary">搜索</el-button>
			</div>
		</div>
		<div id="container">

		</div>
	</div>
</template>

<script>
	var geocoder, map, marker = null;
	export default {
		data() {
			return {
				center: '39.916527, 116.397128',
				latlng: '', // 坐标
				address: '', // 地址
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.center = new qq.maps.LatLng(39.916527, 116.397128);
				map = new qq.maps.Map(document.getElementById('container'), {
					center: center,
					zoom: 13
				});
				//地址和经纬度之间进行转换服务
				geocoder = new qq.maps.Geocoder();
				//设置服务请求成功的回调函数
				geocoder.setComplete(function(result) {
					map.setCenter(result.detail.location);
					var marker = new qq.maps.Marker({
						map: map,
						position: result.detail.location
					});
					//点击Marker会弹出反查结果
					var info = new qq.maps.InfoWindow({
						map: map
					});
					qq.maps.event.addListener(marker, 'click', function() {
						info.open();
						info.setContent('<div style="width:280px;height:100px;">' +
							result.detail.address + '</div>');
						info.setPosition(result.detail.location);
					});
				});
				//若服务请求失败，则运行以下函数
				geocoder.setError(function() {
					alert("出错了，请输入正确的经纬度！！！");
				});

			}
		}
	}
</script>

<style scoped lang="scss">
	.map {
		margin-bottom: 10px;
		
		.item {
			width: 200px;
			margin: 10px 0;
		}
	}

	#container {
		width: 62.5rem;
		height: 50rem;
		border: solid 1px red;
	}
</style>
