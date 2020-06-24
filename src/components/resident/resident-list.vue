<template>
	<div v-loading="loading">

		<!-- 表格数据 -->
		<el-table :data="tableData">
			<el-table-column prop="id" label="用户ID" align="center"></el-table-column>
			<el-table-column prop="name" label="用户名" align="center"></el-table-column>
			<el-table-column prop="phone" label="手机号" align="center"></el-table-column>
			<el-table-column prop="card_number" label="身份证" align="center"></el-table-column>
			<el-table-column prop="address" label="房屋地址" align="center"></el-table-column>
			<el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
			<el-table-column prop="href" label="人脸照片" align="center">
				<template slot-scope="scope">
					<img :src="scope.row.href" style="max-width:180px;max-height:80px;" />
				</template>
			</el-table-column>
			<el-table-column prop="type" label="用户身份" align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="200px">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
					<el-button type="primary" size="mini" @click="handleAudit(scope.$index, scope.row)">状态审核</el-button>
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
				dialogIdentity: false,
				form: {
					identity: ''
				},

				tableData: [{}], // 表格数据

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

			}
		},
		mounted() {
			this.getAllRent();
		},
		methods: {
			// 获取身份列表
			getAllRent() {
				var self = this;
				API.houser(self.currentPage, self.pageSize, 1654).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
					self.tableData.forEach(item => {
						switch (item.type) {
							case 1:
								item.type = "户主";
								break;
							case 2:
								item.type = "租客";
								break;
							case 3:
								item.type = "家庭成员";
								break;
							case 4:
								item.type = "物业";
						}
					});
				})
			},

			addIdentity() {
				var self = this;
				self.dialogIdentity = true;
			},

			newIdentity() {
				var self = this;
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
					
				})
			},
			unAudit() {
				var self = this;
				API.audit(self.renter_id, 3).then(res => {
					self.$message.success('提交成功');
					self.dialogAudit = false;
				})
			},

			// 分页
			handleCurrentChange(val) {

			},

			// 每页几条
			handleSizeChange(val) {

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
