<template>
	<div v-loading="loading">
		<div class="btn">
			<el-button type="primary" @click="addIdentity">添加用户身份</el-button>
		</div>
		<el-dialog title="添加用户身份" :visible.sync="dialogIdentity">
			<div class="box">
				<el-form :model="form" label-width="100px">
					<el-form-item label="用户身份">
						<el-input v-model="form.identity" placeholder="请输入用户身份"></el-input>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newIdentity">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
		
		<!-- 表格数据 -->
		<el-table :data="tableData">
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
		
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
			 :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="totalPage" @size-change="handleSizeChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				dialogIdentity: false,
				form: {
					identity: ''
				},
				
				tableData: [{}] ,// 表格数据
				
				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0,
				
				dialogLogs: false, // 进出记录
				logsData: [], 
				currentLogsPage: 1,
				pageSizeLogs: 10,
				totalLogsPage: 0
			}
		},
		mounted() {
			this.getIdentity();
		},
		methods: {
			// 获取身份列表
			getIdentity() {
				
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
			
			handleAudit() {
				
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
