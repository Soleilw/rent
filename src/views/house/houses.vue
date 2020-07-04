<template>
	<div v-loading="loading">
		<div class="btn">
			<el-button type="primary" @click="addHouses">添加房屋</el-button>
		</div>
		<div class="btn">
			<el-input v-model="house_id" placeholder="输入房屋地址" class="search" @keyup.enter.native="search(house_id)"></el-input>
		</div>
		<div class="btn">
			<el-button type="primary" @click="search(house_id)">搜索</el-button>
		</div>
		<el-dialog title="添加房屋" :visible.sync="dialogHouses" width="80%">
			<div class="box">
				<el-form :model="form" label-width="130px">
					<el-form-item label="房屋名">
						<el-input v-model="form.name" placeholder="请输入用户身份"></el-input>
					</el-form-item>
					<el-form-item label="人脸库">
						<el-input v-model="form.name" placeholder="请输入人脸库"></el-input>
					</el-form-item>
					<el-form-item label="负责人姓名">
						<el-input v-model="form.name" placeholder="请输入负责人姓名"></el-input>
					</el-form-item>
					<el-form-item label="负责人电话">
						<el-input v-model="form.name" placeholder="请输入负责人电话"></el-input>
					</el-form-item>
					<el-form-item label="是否开启访客功能">
						<el-radio-group v-model="form.sex">
							<el-radio :label='1'>是</el-radio>
							<el-radio :label='2'>否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="是否开启访客功能">
						<v-map></v-map>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>

		<!-- 表格数据 -->
		<el-table :data="tableData">
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="address" label="房屋地址" align="center"></el-table-column>
			<el-table-column prop="id" label="访客功能状态" align="center"></el-table-column>
			<el-table-column prop="id" label="负责人姓名" align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="400px">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleBuild(scope.$index, scope.row)">楼栋管理</el-button>
					<el-button type="primary" size="mini" @click="handleResident(scope.$index, scope.row)">查看住户</el-button>
					<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="查看住户" :visible.sync="dialogResident" width="80%">
			<div class="box">
				<el-table :data="residentData">
					<el-table-column prop="id" label="用户ID" align="center"></el-table-column>
					<el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
					<el-table-column prop="snapshot.name" label="真实姓名" align="center"></el-table-column>
					<el-table-column prop="typeString" label="用户身份" align="center"></el-table-column>
					<el-table-column prop="snapshot.card_number" label="身份证号" align="center"></el-table-column>
					<el-table-column prop="snapshot.phone" label="手机号" align="center"></el-table-column>
					<el-table-column prop="snapshot" label="人脸照片" align="center">
						<template slot-scope="scope">
							<div v-if="scope.row.snapshot">
								<el-popover placement="top-start" title="" trigger="click">
									<img :src="scope.row.snapshot.href" style="max-width:800px;max-height:800px;" />
									<img slot="reference" :src="scope.row.snapshot.href" style="max-width:180px;max-height:80px;">
								</el-popover>
							</div>
							<div v-else>
								<span>--暂无图片--</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @current-change="handleCurrentResident" :current-page.sync="currentResidentPage" :page-sizes="[10, 20, 30, 40, 50]"
				 :page-size="pageSizeResident" layout="sizes, prev, pager, next, jumper" :total="totalResidentPage" @size-change="handleSizeResident">
				</el-pagination>
			</div>
		</el-dialog>

		<el-dialog title="楼栋管理" :visible.sync="dialogBuild">
			<div class="box">
				<el-form :model="buildForm" label-width="100px">
					<div v-for="(item,index) in buildForm.rooms" :key="index">
						<el-form-item label="房屋编号">
							<el-input v-model="buildForm.rooms[index]" placeholder="请输入房屋编号"></el-input>
						</el-form-item>
					</div>
					<el-form-item label="操作">
						<el-button type="primary" @click="addRooms">添加房屋编号</el-button>
						<el-button type="primary" @click="delRooms">删除房屋编号</el-button>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newRooms">提交</el-button>
						</el-form-item>
					</div>
				</el-form>

			</div>
		</el-dialog>

		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
			 :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="totalPage" @size-change="handleSizeChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import API from '@/api/index.js'
	import vMap from './map.vue'
	
	export default {
		components: {
			vMap
		},
		data() {
			return {
				loading: false,
				dialogHouses: false,
				form: {
					name: '',
					sex: '',
					postion: ''
				},

				tableData: [], // 表格数据

				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0,

				dialogResident: false, // 查看住户
				residentData: [],
				currentResidentPage: 1,
				pageSizeResident: 10,
				totalResidentPage: 0,
				dialogBuild: false, // 房屋编号
				// rooms: '',
				// addrooms: [],
				buildForm: {
					address_id: '',
					rooms: []
				},
				id: '',
				house_id: '' // 搜索
			}
		},
		mounted() {
			this.getnewHouses();
		},
		methods: {
			// 获取房屋列表
			getnewHouses() {
				var self = this;
				API.addresses(self.currentPage, self.pageSize).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 搜索
			search() {
				var self = this;
				// if (self.house_id) {
				API.addresses(self.currentPage, self.pageSize, 0, self.house_id).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
					self.house_id = '';
					self.$message.success('搜索成功！');
				})
				// } else {
				// 	self.$message.warning('请输入ID');
				// }
			},


			addHouses() {
				var self = this;
				self.dialogHouses = true;
			},

			newHouses() {
				var self = this;
			},



			// 楼栋管理
			handleBuild(index, row) {
				var self = this;
				self.dialogBuild = true;
				self.buildForm.address_id = row.id;
			},

			// 房屋编号操作
			addRooms() {
				var self = this;
				self.buildForm.rooms.push('');
			},
			delRooms() {
				var self = this;
				self.buildForm.rooms.pop('');
			},

			newRooms() {
				var self = this;
				API.rooms(self.buildForm).then(res => {
					self.$message.success('提交成功');
					self.dialogBuild = false;
					self.buildForm.rooms = [];
					self.rooms = '';
				})
			},

			// 查看住户
			handleResident(index, row) {
				var self = this;
				self.dialogResident = true;
				self.house_id = row.id;
				API.households(1, 10, 0, self.house_id).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})
			},

			// 编辑
			handleEdit() {

			},

			// 删除
			handleDel() {

			},

			// 分页
			handleCurrentChange(val) {
				var self = this;
				self.currentPage = val;
				API.addresses(val, self.pageSize).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 每页几条
			handleSizeChange(val) {
				var self = this;
				self.pageSize = val;
				API.addresses(self.currentPage, val).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 进出记录
			handleCurrentResident(val) {
				var self = this;
				self.currentResidentPage = val;
				API.households(val, self.pageSizeResident, 0, self.house_id).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})
			},

			handleSizeResident(val) {
				var self = this;
				self.pageSizeResident = val;
				API.households(self.currentResidentPage, val, 0, self.house_id).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})

			},
		}
	}
</script>

<style scoped>
	#tooles {
		height: 40px;
		background: #5688CB;
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
		border: 2px solid #D6D6D6;
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
		float: right;
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
		color: #2F82C4;
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
