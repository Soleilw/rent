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
				self.address = '';
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
		border: solid 1px #ccc;
	}
	.ipt {
    width: 220px;
  }

  #tooles {
    height: 40px;
    background: #5688cb;
    position: relative;
    z-index: 100;
    color: white;
    width: 900px;
    margin-top: 10px;
  }

  #bside_left {
    width: 260px;
    height: 530px;
    border: 1px solid #ccc;
    float: left;
    overflow: auto;
    padding-left: 5px;
  }

  #cur_city,
  #no_value {
    height: 20px;
    position: absolute;
    top: 3px;
    left: 10px;
  }

  #cur_city .change_city {
    margin-left: 5px;
    cursor: pointer;
  }

  #level {
    margin-left: 20px;
  }

  .logo_img {
    width: 172px;
    height: 23px;
  }

  .poi {
    width: 570px;
    height: 41;
    padding-top: 12px;
    float: left;
    position: relative;
  }

  .poi_note {
    width: 63px;
    line-height: 26px;
    float: left;
  }

  .already {
    width: 52px;
    line-height: 26px;
    padding-left: 5px;
    float: left;
    color: red;
    display: none;
  }

  .info_list {
    margin-bottom: 5px;
    clear: both;
    cursor: pointer;
  }

  #txt_pannel {
    height: 500px;
  }

  #city {
    width: 356px;
    height: 433px;
    padding: 10px;
    border: 2px solid #d6d6d6;
    position: absolute;
    left: 44px;
    top: 20px;
    z-index: 999;
    background: #fff;
    overflow: auto;
    color: black;
  }

  #city .city_class {
    font-size: 12px;
    background: #fff;
    margin: 1px 0;
  }

  #city .city_container {
    margin-top: 10px;
    /*margin-bottom: 50px;*/
    background: #fff;
  }

  #city .city_container_left {
    width: 48px;
    float: left;
  }

  #city .style_color {
    color: #000;
    font-weight: 600;
  }

  #city .city_container_right {
    width: 289px;
    float: left;
  }

  #city .close {
    width: 20px;
    height: 20px;
    display: inline-block;
    /* float: right; */
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
    position: absolute;
    right: 10px;
  }

  #city .city_name {
    line-height: 20px;
    height: 20px;
    margin-left: 5px;
    color: #2f82c4;
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
  }

  #curCity {
    margin-right: 5px;
  }

  .hide {
    display: none;
  }

  #bside_rgiht {
    width: 631px;
    height: 530px;
    border: 1px solid #ccc;
    float: left;
    font-size: 12px;
  }

  #containers {
    width: 621px;
    height: 520px;
    border: 5px solid #fff;
  }

  #no_value {
    color: red;
    position: relative;
    width: 200px;
  }
</style>
