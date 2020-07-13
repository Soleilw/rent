<template>
	<div v-loading="loading">
		<div class="btn">
			<el-input v-model="renter_name" placeholder="输入用户名" class="search" @keyup.enter.native="search(renter_name)"></el-input>
		</div>
		<div class="btn">
			<el-button type="primary" @click="search(renter_name)">搜索</el-button>
		</div>

		<!-- 表格数据 -->
		<el-table :data="tableData" empty-text="暂无数据">
			<el-table-column prop="id" label="用户ID" align="center"></el-table-column>
			<el-table-column prop="snapshot.name" label="用户名" align="center"></el-table-column>
			<el-table-column prop="typeString" label="用户身份" align="center"></el-table-column>
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
			<el-table-column prop="snapshot.phone" label="手机号" align="center"></el-table-column>
			<el-table-column prop="snapshot.card_number" label="身份证" align="center" width="200px"></el-table-column>
		
			<el-table-column prop="address.address" label="房屋地址" align="center" width="300px"></el-table-column>
			<el-table-column prop="room.door_number" label="房屋编号" align="center"></el-table-column>
			<el-table-column prop="state" label="审核状态" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.state == 1">
						<span>待审核</span>
					</div>
					<div v-if="scope.row.state == 2">
						<span style="color: green;">已通过</span>
					</div>
					<div v-if="scope.row.state == 3">
						<span style="color: red;">未通过</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="300px">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
					<el-button type="primary" size="mini" v-if="scope.row.state == 1" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="进出记录" :visible.sync="dialogLogs">
			<div class="box">
				<el-table :data="logsData">
					<el-table-column prop="id" label="用户ID" align="center"></el-table-column>
					<el-table-column prop="id" label="用户名" align="center"></el-table-column>
					<el-table-column prop="id" label="手机号" align="center"></el-table-column>
					<el-table-column prop="id" label="房屋名称" align="center"></el-table-column>
					<el-table-column prop="id" label="房屋单元" align="center"></el-table-column>
					<el-table-column prop="id" label="人脸照片" align="center">
						<template slot-scope="scope">
							<img :src="scope" alt="" style="min-width: 80px; min-height: 80px;">
						</template>
					</el-table-column>
					<el-table-column prop="id" label="真实姓名" align="center"></el-table-column>
					<el-table-column prop="id" label="用户身份" align="center"></el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @current-change="handleCurrentLogs" :current-page.sync="currentLogsPage" :page-sizes="[10, 20, 30, 40, 50]"
				 :page-size="pageSizeLogs" layout="sizes, prev, pager, next, jumper" :total="totalLogsPage" @size-change="handleSizeLogs">
				</el-pagination>
			</div>
		</el-dialog>

		<el-dialog :visible.sync="dialogAudit" title="审核" width="20%" align="center">
			<div style="font-size: 20px; margin-bottom: 30px;">是否通过审核</div>
			<span>
				<el-button type="primary" @click="toAudit">通过</el-button>
				<el-button type="danger" @click="unAudit">不通过</el-button>
			</span>
		</el-dialog>

		<!-- 删除提示框 -->
		<el-dialog :visible.sync="dialogDel" title="删除年级" width="20%" align="center" :close-on-click-modal="false">
			<div style="font-size: 20px; margin-bottom: 30px;">是否删除该住户</div>
			<span>
				<el-button type="primary" @click="toDel">删除</el-button>
				<el-button type="danger" @click="dialogDel = false">取消</el-button>
			</span>
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

	export default {
		data() {
			return {
				loading: false,
				form: {
					identity: ''
				},

				tableData: [], // 表格数据
				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0,

				dialogLogs: false, // 进出记录
				logsData: [],
				currentLogsPage: 1,
				pageSizeLogs: 10,
				totalLogsPage: 0,
				dialogAudit: false, // 审核
				renter_id: '', // 住户id
				renter_name: '', // 住户名字
				id: '', // 删除id
				dialogDel: false

			}
		},
		mounted() {
			this.getAllRent();
		},
		methods: {
			// 获取身份列表
			getAllRent() {
				var self = this;
				API.households(self.currentPage, self.pageSize).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},
			
	
			
			// 搜索
			search() {
				var self = this;
					API.searchHousehold(self.currentPage, self.pageSize, self.renter_name).then(res => {
						self.tableData = res.data;
						self.totalPage = 1;
						self.renter_name = '';
						self.$message.success('搜索成功！');
					})
			},

			handleLogs() {
				var self = this;
				self.dialogLogs = true;
			},

			// 审核
			handleAudit(index, row) {
				var self = this;
				self.renter_id = row.id;
				self.dialogAudit = true;
			},
			toAudit() {
				var self = this;
				API.audit(self.renter_id, 2).then(res => {
					self.$message.success('提交成功');
					self.dialogAudit = false;
					self.getAllRent();
				})
			},
			unAudit() {
				var self = this;
				API.audit(self.renter_id, 3).then(res => {
					self.$message.success('提交成功');
					self.dialogAudit = false;
					self.getAllRent();
				})
			},

			handleDel(index, row) {
				var self = this;
				self.id = row.id;
				self.dialogDel = true;
			},

			toDel() {
				var self = this;
				API.delHousehold(self.id).then(res => {
					self.$message.success('删除成功');
					self.dialogDel = false;
					self.getAllRent();
				})
			},

			// 分页
			handleCurrentChange(val) {
				var self = this;
				self.currentPage = val;
				API.households(val, self.pageSize).then(res => {
					self.tableData = res.data;
				})
			},

			// 每页几条
			handleSizeChange(val) {
				var self = this;
				self.pageSize = val;
				API.households(self.currentPage, val).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
					self.currentPage = 1;
				})
			},

			// 进出记录
			handleCurrentLogs(val) {

			},

			handleSizeLogs(val) {

			}
		}
	}
</script>

<style>
</style>


<!-- <template>
	<div>
		<el-tabs v-model="activeName" @tab-click="changeActive">
			<el-tab-pane label="用户身份管理" name="identity">
				<resident-identity></resident-identity>
			</el-tab-pane>
			<el-tab-pane label="住户列表" name="list">
				<resident-list></resident-list>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import residentIdentity from '@/components/resident/resident-identity.vue'
	import residentList from '@/components/resident/resident-list.vue'
	import API from '@/api/index.js'

	export default {
		name: 'student',
		components: {
			residentIdentity,
			residentList
		},
		data() {
			return {
				activeName: 'identity'
			}
		},
		methods: {
			changeActive() {
				if(this.activeName === 'identity') {
				}
				
				if(this.activeName === 'list') {
					API.houser(1).then(res => {
					})
				}
			}
		}
	}
</script>

<style>
</style> -->
