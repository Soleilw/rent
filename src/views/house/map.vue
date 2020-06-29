<template>
	<div>
		<div class="map">
			<div class="item">
				<el-input v-model="latlng"></el-input>
			</div>
			<div class="item">
				<el-input v-model="address" placeholder="输入地址" class="search" @keyup.enter.native="search(address)"></el-input>
			</div>
			<div class="item btn">
				<el-button type="primary" @click="search(address)">搜索</el-button>
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
				latlng: '39.98174, 116.30631', // 坐标
				address: '', // 地址
			}
		},
		mounted() {
			this.init();
			this.getLating();
		},
		watch: {
			latlng: 'getLating'
		},
		methods: {
			getLating() {
				var self = this;
				self.address = geocoder.getAddress(self.latlng);
			},
			search(val) {
				var self = this;
				geocoder.getLocation(val);
			},
			init() {
				var self = this;
				var center = new qq.maps.LatLng(39.916527, 116.397128);
				console.log(center)
				map = new qq.maps.Map(document.getElementById('container'), {
					center: center,
					zoom: 15,
				});

				// 监听坐标
				qq.maps.event.addListener(map, 'click', function(e) {
					// self.latlng = `${e.latLng.lat}, ${e.latLng.lng}`;
					self.latlng = new qq.maps.LatLng(e.latLng.lat, e.latLng.lng);
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
					qq.maps.event.addListener(marker, 'click', function() {
						self.$message.success("坐标为： " + result.detail.location);
					});
				});
				//若服务请求失败，则运行以下函数
				geocoder.setError(function() {
					self.$message.error("出错了，请输入正确的地址！！！");
				});

			}
		}
	}
</script>

<style scoped lang="scss">
	.map {
		margin-bottom: 10px;

		.item {
			display: inline-block;
			width: 400px;
			margin: 10px 20px;
		}
	}

	#container {
		width: 62.5rem;
		height: 50rem;
		border: solid 1px red;
	}
</style>
