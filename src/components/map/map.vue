<template>
	<div>
		<div class="map">
			<div class="item">
				<el-input id="latLng" v-model="latlng" placeholder="坐标" :disabled="true"></el-input>
			</div>
			<div class="item">
				<el-cascader style="width: 300px;" v-model="mapvalue" placeholder="搜索省市区" :options="mapData" filterable :props="props"
				 @change="handleMapValue"></el-cascader>
			</div>
			<div class="item">
				<el-input v-model="mapAddress" placeholder="输入地址" @focus="handleAddress" class="search" @keyup.enter.native="search(mapAddress)"></el-input>
			</div>
			<div class="item btn">
				<el-button type="primary" @click="search(mapAddress)">搜索</el-button>
			</div>

			<iframe id="mapPage" width="100%" height="100%" frameborder=0 src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA&referer=myapp">
			</iframe>
		</div>
		<div id="container">

		</div>
	</div>
</template>

<script>
	import {
		map
	} from './map-data.js'
	import axios from 'axios'
	export default {
		props: ["mapAddress"],
		data() {
			return {
				latLng: {},
				latlng: '22.508949,113.321297', // 显示坐标
				// map_address: '中山市', // 地址
				getAddress: null,
				getAddCode: null,
				map: null,
				marker: null,
				mapvalue: '',
				mapData: map, // 显示省市区
				props: {
					label: 'label',
					value: 'label'
				},
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			handleAddress(val) {
				var self = this;
				self.mapAddress = '';
				if (!self.mapvalue) {
					self.$message.error("请先选择省市区");
				}
			},
			search(val) {
				window.addEventListener('message', function(event) {
					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == 'locationPicker') { //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
						console.log('location', loc);
					}
				}, false);
				var self = this;
				//通过getLocation();方法获取位置信息值
				self.getAddress.getLocation(self.mapvalue + self.mapAddress);
				console.log(2, self.mapAddress)
				// self.$emit('changeAddress', val)
			},
			handleMapValue() {
				this.search();
				this.mapAddress = '';
			},
			// 通过坐标获得地址
			getAddressCode() {
				var lat = parseFloat(this.latLng.lat);
				var lng = parseFloat(this.latLng.lng);
				var latLng = new qq.maps.LatLng(lat, lng);
				//调用获取位置方法
				this.getAddCode.getAddress(latLng);
				console.log(2, latLng)
				return latLng;
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
						self.mapAddress = result.detail.address;
						self.mapvalue = '';
						self.marker = new qq.maps.Marker({
							map: self.map,
							position: result.detail.location
						});
						console.log(3, self.mapAddress)
						self.$emit('changeAddress', self.mapAddress)
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
						console.log(4)
					}
				});

				self.getAddress.setError(function() {
					self.$message.error("请输入正确的地址");
				});

				self.search();
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
		border: solid 1px #ccc;
	}
</style>



<template>
	<div>
		<div class="welcome">
			管理员：
			<span style="color: #2a9f93;">{{username}}</span>
			当前时间：
			<span style="color: #F56C6C;">{{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</span>
		</div>

		<!-- 	<div class="view">
			<div class="view-box">
				<div class="title"><span>学校总览</span></div>
			</div>
			<div class="view-box">
				<div class="title"><span>出租屋总览</span></div>
			</div>
		</div> -->
		<div class="view">
			<el-tabs v-model="activeName" @tab-click="changeActive">
				<el-tab-pane label="学校总览" name="school">
					<div class="view-box">
						<div class="col">
							dd
						</div>
						<div class="col">
							dd
						</div>
						<div class="col">
							ddddd
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="出租屋总览" name="rent">
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import API from "@/api/index.js";
	export default {
		data() {
			return {
				username: localStorage.getItem("username"),
				nowDate: "", // 当前日期
				nowTime: "", // 当前时间
				nowWeek: "", // 当前星期

				activeName: 'school'
			};
		},
		mounted() {
			this.currentTime();
		},
		methods: {
			currentTime() {
				setInterval(this.getTime, 500);
			},
			getTime() {
				var self = this;
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let week = new Date().getDay();
				let hh = new Date().getHours();
				let mf =
					new Date().getMinutes() < 10 ?
					"0" + new Date().getMinutes() :
					new Date().getMinutes();
				let ss = new Date().getSeconds();
				switch (week) {
					case 1:
						self.nowWeek = "星期一";
						break;
					case 2:
						self.nowWeek = "星期二";
						break;
					case 3:
						self.nowWeek = "星期三";
						break;
					case 4:
						self.nowWeek = "星期四";
						break;
					case 5:
						self.nowWeek = "星期五";
						break;
					case 6:
						self.nowWeek = "星期六";
						break;
					case 7:
						self.nowWeek = "星期日";
				}
				self.nowTime = hh + ":" + mf + ":" + ss;
				self.nowDate = yy + "-" + mm + "-" + dd;
			},
		},
		// 销毁定时器
		beforeDestroy: function() {
			if (this.getTime) {
				clearInterval(this.getTime);
			}
		}
	};
</script>

<style scoped lang="scss">
	.welcome {
		padding: 20px 10px;
		box-shadow: 1px 1px 5px #ccc;
		font-size: 16px;
	}

	.welcome span {
		padding: 20px 5px;
	}

	.view {
		margin-top: 20px;
		height: 1000px;

		.view-box {
			display: flex;
			justify-content: space-around;
			
			
			.col {
				width: 33%;
				border: 1px red solid;
			}
		}
	}
</style>

