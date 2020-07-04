<template>
	<div>
		<div class="btn">
			<el-button type="primary" @click="addUser">添加用户</el-button>
		</div>
		<el-table :data="tableData">
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="username" label="账号" align="center"></el-table-column>
			<el-table-column prop="role" label="角色名" align="center"></el-table-column>
			<el-table-column prop="enable" label="状态" align="center">
				<template slot-scope="scope">
					<span v-text="scope.row.enable == '1' ? '启用' : '禁用'"></span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="300px">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="primary" size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :visible.sync="dialogDel" title="删除角色" width="20%" align="center" :close-on-click-modal="false">
			<div style="font-size: 20px; margin-bottom: 30px;">是否删除该角色</div>
			<span>
				<el-button type="primary" @click="toDel">删除</el-button>
				<el-button type="danger" @click="dialogDel = false">取消</el-button>
			</span>
		</el-dialog>

		<div class="block">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
			 :page-size="10" layout="sizes, prev, pager, next, jumper" :total="totalPage" @size-change="handleSizeChange">
			</el-pagination>
		</div>

		<el-dialog title="添加用户" :visible.sync="dialogUser" width="500px" :close-on-click-modal="false">
			<div class="box">
				<el-form :model="form" label-width="80px">
					<el-form-item label="账号">
						<el-input v-model="form.username" placeholder="请输入账号"></el-input>
					</el-form-item>
					<el-form-item label="输入密码">
						<el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
					</el-form-item>
					<el-form-item label="选择角色">
						<el-select v-model="form.role" placeholder="请选择角色">
							<el-option v-for="item in rolesList" :key="item.title" :label="item.name" :value="item.title"></el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="选择学校">
						<el-select v-model="form.school_id" placeholder="请选择学校">
							<el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item> -->

					<el-form-item label="选择状态">
						<el-select v-model="form.enable" placeholder="请选择状态">
							<el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newUser">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>

		<el-dialog title="修改密码" :visible.sync="dialogResetPassWord" width="500px" :close-on-click-modal="false">
			<div class="box">
				<el-form :model="pwdForm" label-width="120px">
					<el-form-item label="旧密码">
						<el-input v-model="pwdForm.old_password"></el-input>
					</el-form-item>
					<el-form-item label="新密码">
						<el-input v-model="pwdForm.new_password"></el-input>
					</el-form-item>
					<el-form-item label="再次确认新密码">
						<el-input v-model="pwdForm.confirm_password"></el-input>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="ChangePassword">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>


	</div>
</template>

<script>
	// import API from '@/api//index.js'

	export default {
		data() {
			return {
				dialogUser: false,
				form: {
					username: '',
					password: '',
					enable: '',
					role: '',
					// school_id: ''
				},
				stateList: [{
						label: '启用',
						value: 1
					},
					{
						label: '禁用',
						value: 2
					}
				],
				rolesList: [],
				schoolList: [],
				tableData: [],

				dialogResetPassWord: false, // 修改密码
				pwdForm: {
					new_password: '',
					old_password: '',
					confirm_password: '',
					id: ''
				},

				dialogDel: false,
				id: '', // 删除id

				// 分页
				currentPage: 1,
				totalPage: 0,


				permissions: localStorage.getItem('permissions'),
				role: localStorage.getItem('role'),
			}
		},
		mounted() {
			this.getSchool();
			this.getRoles();
			this.getUsers();
		},
		methods: {
			// 获取学校列表
			getSchool() {
				var self = this;
				if (self.role === 'super') {
					API.schools(self.currentPage, 100).then(res => {
						self.schoolList = res.data;
					})
				}
			},
			getRoles() {
				var self = this;
				API.roles(self.currentPage).then(res => {
					self.rolesList = res.data;
				})
			},
			getUsers() {
				var self = this;
				API.users(self.currentPage).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},
			addUser() {
				var self = this
				self.dialogUser = true;
				self.form = {
					username: '',
					password: '',
					enable: '',
					title: '',
					school_id: ''
				}

			},
			newUser() {
				var self = this;
				API.user(self.form).then(res => {
					self.dialogUser = false;
					self.$message.success('提交成功');
					self.getUsers();
					self.currentPage = 1;
					self.form = {};
				})

			},

			// 操作
			handleEdit(index, row) {
				var self = this
					self.dialogUser = true;
					self.form = row;
			},
			// 重置密码
			handleReset(index, row) {
				var self = this
					self.dialogResetPassWord = true;
					self.pwdForm.id = row.id;

			},
			ChangePassword() {
				var self = this;
				if (self.pwdForm.new_password === self.pwdForm.confirm_password) {
					API.resetPassword(self.pwdForm).then(res => {
						self.dialogResetPassWord = false;
						self.$message.success('修改成功');
						self.getUsers();
						self.currentPage = 1;
						self.pwdForm = {};
					})
				} else {
					self.$message.error('新密码与确认密码不一致');
				}
			},

			handleDel(index, row) {
				var self = this;
				self.dialogDel = true;
				self.id = row.id;
			},
			toDel() {
				var self = this;
				API.delUser(self.id).then(res => {
					self.$message.success('删除成功')
					self.dialogDel = false;
					self.getUsers();
					self.currentPage = 1
				})
			},


			// 分页
			handleCurrentChange(val) {
				var self = this;
				self.getUsers();
			},
			// 每页多少条
			handleSizeChange(val) {
				var self = this;
				API.users(self.currentPage, val).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},
		}
	}
</script>

<style scoped>
	.permission {
		display: flex;
		flex-wrap: wrap;
	}

	.permission-item {
		margin: 10px;
		padding: 0 10px;
	}
</style>
