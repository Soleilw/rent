<template>
	<div v-loading="loading">
		<div class="btn">
			<el-button type="primary" @click="addHouses">添加房屋</el-button>
		</div>
		<el-dialog title="添加用户身份" :visible.sync="dialogHouses">
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
					<el-form-item label="房屋地址">
						<el-input v-model="form.name" placeholder="请输入用户身份"></el-input>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newHouses">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>

		<!-- 表格数据 -->
		<el-table :data="tableData">
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="id" label="房屋名" align="center"></el-table-column>
			<el-table-column prop="id" label="房屋地址" align="center"></el-table-column>
			<el-table-column prop="id" label="房屋类型" align="center"></el-table-column>
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

		<el-dialog title="查看住户" :visible.sync="dialogResident">
			<div class="box">
				<el-table :data="residentData">
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
				<el-pagination @current-change="handleCurrentResident" :current-page.sync="currentResidentPage" :page-sizes="[10, 20, 30, 40, 50]"
				 :page-size="pageSizeResident" layout="sizes, prev, pager, next, jumper" :total="totalResidentPage" @size-change="handleSizeResident">
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
				dialogHouses: false,
				form: {
					name: '',
					sex: ''
				},

				tableData: [{}], // 表格数据

				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0,

				dialogResident: false, // 查看住户
				logsData: [],
				currentResidentPage: 1,
				pageSizeResident: 10,
				totalResidentPage: 0
			}
		},
		mounted() {
			this.getnewHouses();
		},
		methods: {
			// 获取房屋列表
			getnewHouses() {

			},

			addHouses() {
				var self = this;
				self.dialogHouses = true;
			},

			newHouses() {
				var self = this;
			},

			// 楼栋管理
			handleBuild() {

			},

			// 查看住户
			handleResident() {

			},

			// 编辑
			handleEdit() {

			},

			// 删除
			handleDel() {

			},

			// 分页
			handleCurrentChange(val) {

			},

			// 每页几条
			handleSizeChange(val) {

			},

			// 进出记录
			handleCurrentResident(val) {

			},

			handleSizeResident(val) {

			}
		}
	}
</script>

<style>
</style>
