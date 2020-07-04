<template>
	<div>
		<div class="map">
			<div class="item">
				<el-input id="latLng" v-model="latlng" placeholder="坐标" :disabled="true"></el-input>
			</div>
			<div class="item">
				<el-cascader style="width: 300px;"  v-model="mapvalue" placeholder="搜索省市区" :options="mapData" filterable :props="props" @change="handleMapValue"></el-cascader>
			</div>
			<div class="item">
				<el-input v-model="address" placeholder="输入地址"  @focus="handleAddress" class="search" @keyup.enter.native="search(address)"></el-input>
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
	import { map } from './map-data.js'
	export default {
		data() {
			return {
				latLng: {},
				latlng: '22.508949,113.321297', // 显示坐标
				address: '中山市', // 地址
				getAddress: null,
				getAddCode: null,
				map: null,
				marker: null,
				mapvalue: '',
				mapData: map,// 显示省市区
				props: {
					label: 'label',
					value: 'label'
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			handleAddress() {
				var self = this;
				if(!self.mapvalue) {
					self.$message.error("请先选择省市区");
				}
			},
			search() {
				var self = this;
				//通过getLocation();方法获取位置信息值
				self.getAddress.getLocation(self.mapvalue + self.address);
			},
			handleMapValue() {
				this.search();
				this.address = '';
			},
			// 通过坐标获得地址
			getAddressCode() {
				var lat = parseFloat(this.latLng.lat);
				var lng = parseFloat(this.latLng.lng);
				var latLng = new qq.maps.LatLng(lat, lng);
				//调用获取位置方法
				this.getAddCode.getAddress(latLng);
			},
			init() {
				var self = this;
				var center = new qq.maps.LatLng(22.51595, 113.3926);
				self.map = new qq.maps.Map(document.getElementById('container'), {
					center: center,
					zoom: 15,
				});

				//创建一个Marker
				self.marker = new qq.maps.Marker({
					//设置Marker的位置坐标
					position: center,
					//设置显示Marker的地图
					map: self.map
				});
				

				// 监听坐标
				qq.maps.event.addListener(self.map, 'click', function(e) {
					self.latLng.lat = e.latLng.getLat();
					self.latLng.lng = e.latLng.getLng();
					self.latlng = `${self.latLng.lat},${self.latLng.lng}`;
					self.getAddressCode();
				});

				//通过坐标来显示地图地址
				self.getAddCode = new qq.maps.Geocoder({
					complete: function(result) {
						self.marker.setMap(null)
						self.address = result.detail.address;
						self.mapvalue = '';
						self.marker = new qq.maps.Marker({
							map: self.map,
							position: result.detail.location
						});
						
					}
				});

				self.getAddCode.setError(function() {
					self.$message.error("请输入正确的坐标");
				});

				//调用地址显示地图位置并设置地址
				self.getAddress = new qq.maps.Geocoder({
					complete: function(result) {
						self.marker.setMap(null)
						self.map.setCenter(result.detail.location);
						console.log(result.detail.location)
						self.latLng.lng = result.detail.location.lng;
						self.latLng.lat = result.detail.location.lat;
						self.latlng = `${self.latLng.lat},${self.latLng.lng}`;
						self.marker = new qq.maps.Marker({
							map: self.map,
							position: result.detail.location
						});
					}
				});

				self.getAddress.setError(function() {
					self.$message.error("请输入正确的地址");
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
			width: 300px;
			margin: 10px 5px;
		}
	}

	#container {
		width: 62.5rem;
		height: 40rem;
		border: solid 1px red;
	}
</style>
