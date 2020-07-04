<template>
	<div>
		<div class="btn">
			<el-button type="primary" @click="addRole">添加角色</el-button>
		</div>

		<el-table :data="tableData">
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="name" label="角色名" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
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

		<el-dialog title="添加角色" :visible.sync="dialogRole" width="90%" :close-on-click-modal="false">
			<div class="box">
				<el-form :model="form" label-width="120px">
					<el-form-item label="角色名称">
						<el-input v-model="form.name" placeholder="请输入角色名" :disabled="disabledRole"></el-input>
					</el-form-item>
					<el-form-item label="选择权限">
						<el-checkbox v-model="checkAll" @change="AllChange">全选</el-checkbox>
						<div class="permission">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="student" @change="oneChange" border> <span style="font-weight: bold;">学生管理页</span></el-checkbox>
								<el-checkbox label="infomation" @change="oneChange">学生列表</el-checkbox>
								<el-checkbox label="infomationAdd" @change="oneChange">新增学生</el-checkbox>
								<el-checkbox label="infomationDel" @change="oneChange">删除学生</el-checkbox>
								<el-checkbox label="infomationEdit" @change="oneChange">编辑学生</el-checkbox>
								<el-checkbox label="infomationChangeFace" @change="oneChange">更换人脸</el-checkbox>
								<el-checkbox label="infomationBindFamily" @change="oneChange">绑定家长</el-checkbox>
								<el-checkbox label="infomationFaceLogs" @change="oneChange">查看进出记录</el-checkbox>
								<el-checkbox label="infomationGet" @change="oneChange">获取学生列表</el-checkbox>
								<el-checkbox label="infomationMore" @change="oneChange">批量录入学生</el-checkbox>
							</el-checkbox-group>

						</div>
						<div class="permission">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="grade" @change="oneChange" border><span style="font-weight: bold;">班级管理页</span></el-checkbox>
								<el-checkbox label="gradeAdd" @change="oneChange">新增年级</el-checkbox>
								<el-checkbox label="gradeDel" @change="oneChange">删除年级</el-checkbox>
								<el-checkbox label="gradeGet" @change="oneChange">获取年级列表</el-checkbox>
								<el-checkbox label="classAdd" @change="oneChange">新增班级</el-checkbox>
								<el-checkbox label="classDel" @change="oneChange">删除班级</el-checkbox>
								<el-checkbox label="classGet" @change="oneChange">获取班级列表</el-checkbox>
							</el-checkbox-group>
						</div>
						<div class="permission">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="family" @change="oneChange" border><span style="font-weight: bold;">家长信息页</span></el-checkbox>
								<el-checkbox label="familyGet" @change="oneChange">家长列表</el-checkbox>
							</el-checkbox-group>
						</div>
						<div class="permission">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="teacher" @change="oneChange" border><span style="font-weight: bold;">教职工管理页</span></el-checkbox>
								<el-checkbox label="teacherDel" @change="oneChange">删除教职工</el-checkbox>
								<el-checkbox label="teacherGet" @change="oneChange">获取教职工列表</el-checkbox>
								<!-- <el-checkbox label="teacherDetail" @change="oneChange">查看详情</el-checkbox> -->
								<el-checkbox label="teacherAudit" @change="oneChange">教职工审核</el-checkbox>
							</el-checkbox-group>
						</div>
						<div class="permission">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="permission" @change="oneChange" border><span style="font-weight: bold;">角色管理页</span></el-checkbox>
								<el-checkbox label="roleAdd" @change="oneChange">新增角色</el-checkbox>
								<el-checkbox label="roleDel" @change="oneChange">删除角色</el-checkbox>
								<el-checkbox label="roleEdit" @change="oneChange">编辑权限</el-checkbox>
								<el-checkbox label="roleGet" @change="oneChange">获取角色列表</el-checkbox>
							</el-checkbox-group>
						</div>
						<div class="permission" style="margin-left: 140px;">
							<el-checkbox-group v-model="form.permissions" class="permission-item">
								<el-checkbox label="manageAdd" @change="oneChange">新增管理员</el-checkbox>
								<el-checkbox label="manageDel" @change="oneChange">删除管理员</el-checkbox>
								<el-checkbox label="manageEdit" @change="oneChange">编辑管理员</el-checkbox>
								<el-checkbox label="manageGet" @change="oneChange">管理员列表</el-checkbox>
								<el-checkbox label="manageResetPwd" @change="oneChange">重置密码</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newRole">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>


	</div>
</template>

<script>
	import API from '@/api/index.js'


	export default {
		data() {
			return {
				dialogRole: false,
				form: {
					name: '',
					permissions: []
				},
				stateList: [{
						label: '启用',
						value: 1
					},
					{
						label: '禁用',
						value: 0
					}
				],
				tableData: [],

				checkAll: false,
				permissionList: [
					// "user", // 用户
					// "userGet", // 获取用户权限
					// "grantPermission", // 开通权限
					// "forbidPermission", // 禁止使用权限

					// "announcement", // 公告管理
					// "achievement", // 成绩管理

					// "school", // 学校管理
					// "schoolGet",
					// "schoolAdd",
					// "schoolUser",
					// "schoolFinance",
					// "schoolDel",
					// "schoolEdit",

					// "picture", // 图文管理
					// "banner", // 轮播图
					// "bannerAdd", 
					// "bannerGet",
					// "bannerDel",
					// "message", // 资讯管理
					// "messageAdd",
					// "messageGet",
					// "messageDel",
					// "messageEdit",
					// "typeAdd",
					// "typeGet",
					// "typeDel",
					// "document", // 文档管理
					// "documentAdd",
					// "documentGet",
					// "documentDel",
					// "documentEdit",

					// "buy", // 购买服务管理
					// "buyGet",
					// "buyAdd",
					// "buyEdit",




					"student", // 学生管理
					"infomation", // 学生列表
					"infomationGet",
					"infomationAdd",
					"infomationMore",
					"infomationEdit",
					"infomationDel",
					'infomationChangeFace',
					'infomationBindFamily',
					'infomationFaceLogs',


					"grade", // 年级管理
					"gradeGet",
					"gradeAdd",
					"gradeDel",
					"classGet",
					"classAdd",
					"studentDetail",
					"classDel",





					"family", // 家长信息
					"familyGet",

					"teacher", // 教职工管理
					"teacherGet",
					// "teacherDetail",
					"teacherDel",
					"teacherAudit",

					"permission", // 角色管理
					"roleGet",
					"roleAdd",
					"roleEdit",
					"roleDel",
					"manageGet",
					"manageAdd",
					"manageEdit",
					"manageDel",
					'manageResetPwd' // 重置密码
				],

				dialogDel: false,
				id: '', // 删除id
				disabledRole: false,
				// 分页
				currentPage: 1,
				totalPage: 0,


				permissions: localStorage.getItem('permissions'),
				role: localStorage.getItem('role'),
			}
		},
		mounted() {
			this.getRoles();
		},
		methods: {
			addRole() {
				var self = this
				self.dialogRole = true;
				self.form = {
					name: '',
					permissions: []
				}
				self.disabledRole = false;
				self.checkAll = true;
				if (self.checkAll === true) {
					self.form.permissions = self.checkAll ? self.permissionList : []
				}

			},
			getRoles() {
				var self = this;
				API.roles(self.currentPage).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},
			newRole() {
				var self = this;
				API.role(self.form).then(res => {
					self.dialogRole = false;
					self.$message.success('提交成功');
					self.getRoles();
					self.currentPage = 1;
					self.form = {};
					self.form.permissions = [];
				})
			},
			// 操作
			handleEdit(index, row) {
				var self = this
				self.dialogRole = true;
				self.disabledRole = true;
				self.form = row;
				self.form.permissions = row.permissions;
				self.checkAll = row.permissions.length === self.permissionList.length;
				row.permissions
			},
			AllChange(val) {
				var self = this;
				self.form.permissions = val ? self.permissionList : []
			},
			oneChange(val) {
				var self = this;
				console.log(self.form.permissions)
				self.checkAll = self.form.permissions.length === self.permissionList.length;
			},

			handleDel(index, row) {
				var self = this;
				self.dialogDel = true;
				self.id = row.id;
			},
			toDel() {
				var self = this;
				API.delRole(self.id).then(res => {
					self.$message.success('删除成功')
					self.dialogDel = false;
					self.getRoles();
					self.currentPage = 1
				})
			},

			// 分页
			handleCurrentChange(val) {
				var self = this;
				self.getRoles();
			},
			// 每页多少条
			handleSizeChange(val) {
				var self = this;
				API.roles(self.currentPage, val).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},
		},
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


<!-- <template>
	<el-row class="pa-20">
		<el-card class="table-card mt-20">
			<div class="deliverySetting">
				<div class="deliverySetting-table" v-for="(item, idx) in countries" :key="idx">
					<div class="table-body" v-for="(pro, idx2) in item.pros" :key="idx2">
						<div class="first-col">
							<span v-if="idx2 == 0" style="display: inline-block; line-height: 30px; cursor: pointer; ">
								<el-checkbox @change="handleChecked('country', item)" :label="item.one_title" v-model="item.checked" :key="item.one_router">{{ item.one_name }}</el-checkbox>
							</span>
						</div>
						<div class="width120">
							<div v-if="pro.two_name">
								<span style="display: inline-block; line-height: 30px; cursor: pointer; ">
									<el-checkbox @change="handleChecked('pro', pro)" :label="pro.two_title" v-model="pro.checked" :key="pro.two_router">{{ pro.two_name }}</el-checkbox>
								</span>
							</div>

						</div>
						<div class="width265">
							<el-checkbox v-for="c in pro.cities" v-model="c.checked" :label="c.way_title" :key="c.way_id" @change="handleChecked('city', c)">{{c.way_name}}</el-checkbox>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</el-row>
</template>
<script>
	import {
		school
	} from './permissionData.js'
	export default {
		name: "deliverySetting",
		components: {},
		props: {},
		data() {
			return {
				countries: school,
				checkedCities: [],
				permissions: []
			};
		},
		computed: {},
		methods: {
			initPage() {
				this.initAreaData();
			},
			//初始化数据
			initAreaData() {
				this.countries = this.countries.map(item => {
					let res = item;
					if (this.checkedCities.includes(item.way_id)) {
						res.checked = true;
					} else {
						res.checked = false;
					}
					return res;
				});

				let resCities = [];
				this.countries.forEach(item => {
					let obj = {};
					let existsCountry = resCities.find(c => {
						return c.one_router == item.one_router;
					});

					if (existsCountry) {
						obj = existsCountry;
					} else {
						obj.one_router = item.one_router;
						obj.one_title = item.one_title;
						obj.one_name = item.one_name;
					}

					obj.checked = false;

					if (!obj.pros) {
						obj.pros = [];
					}

					let existsPro = obj.pros.find(c => {
						return c.two_router == item.two_router;
					});

					if (!existsPro) {
						existsPro = {
							two_router: item.two_router,
							two_title: item.two_title,
							two_name: item.two_name,
							checked: false
						};
						obj.pros.push(existsPro);
					}

					if (!existsPro.cities) {
						existsPro.cities = [];
					}

					existsPro.cities.push({
						way_id: item.way_id,
						way_title: item.way_title,
						way_name: item.way_name,
						checked: item.checked
					});

					if (!existsCountry) {
						resCities.push(obj);
					}
				});

				this.countries = resCities;
				this.opreationData()
			},
			//操作数据
			opreationData() {
				this.countries.forEach(c => {
					c.pros.forEach(p => {
						if (p.cities && p.cities.length > 0) {
							p.checked = p.cities.every(p => p.checked)
						}
					})

					if (c.pros && c.pros.length > 0) {
						c.checked = c.pros.every(p => p.checked)
					}
				})
			},
			handleChecked(level, item) {
				let isChecked = item.checked
				switch (level) {
					case "country":
						if (item && item.pros) {
							if(item.checked === true) {
								this.permissions.push(item.one_title)
							} else if(item.checked === false) {
								this.permissions = []
							}
							console.log(this.permissions)
							item.pros.forEach(p => {
								this.permissions.push(p.two_title)
								if (p.cities) {
									p.cities.forEach(c => {
										c.checked = isChecked
											this.permissions.push(c.way_title)
									})
								}
							})
						}
						break;
					case "pro":
						if (item && item.cities) {
							console.log(item.two_title)
							console.log(this.permissions)
							item.cities.forEach(c => {
								c.checked = isChecked
							})
						}
						break;
					case "city":
						break;
				}
				this.opreationData()
			}
		},
		mounted() {
			this.initPage();
		},
	};
</script>
<style>
	.el-checkbox__label {
		padding-left: 5px;
	}

	.first-col {
		padding-left: 20px;
		width: 120px;
	}

	.deliverySetting {
		padding: 20px 0;
		position: relative;
	}

	.deliverySetting .el-table thead tr th {
		font-size: 14px;
	}

	.deliverySetting .el-table tbody tr td {
		vertical-align: baseline;
	}

	.deliverySetting .el-table tbody tr td p {
		line-height: 30px;
	}

	.deliverySetting .el-table tbody tr td .el-checkbox-group {
		display: flex;
		flex-direction: column;
	}

	.deliverySetting .el-table tbody tr td .el-checkbox-group label {
		line-height: 30px;
		margin-left: 0;
	}

	.deliverySetting .deliverySetting-table {
		font-size: 14px;
		color: #333;
	}

	.deliverySetting .deliverySetting-table .table-head,
	.deliverySetting .deliverySetting-table .table-body {
		display: flex;
		padding: 10px 0;
	}

	.deliverySetting .deliverySetting-table .table-head .selection,
	.deliverySetting .deliverySetting-table .table-body .selection {
		/* width: 45px; */
		text-align: center;
		line-height: 36px;
	}

	.deliverySetting .deliverySetting-table .table-head .width120,
	.deliverySetting .deliverySetting-table .table-body .width120 {
		width: 120px;
	}

	/* .deliverySetting .deliverySetting-table .table-head .width265,
.deliverySetting .deliverySetting-table .table-body .width265 {
  width: 265px;
} */
	.deliverySetting .deliverySetting-table .table-head {
		height: 36px;
		align-items: center;
		background-color: #e7f2ff;
	}

	.deliverySetting .deliverySetting-table .table-body {
		border-bottom: 1px solid #e4e4e4;
		color: #666;
	}

	.deliverySetting .deliverySetting-table .table-body:hover {
		background-color: #f5f7fa;
	}

	/* .deliverySetting .deliverySetting-table .table-body .width265 {
  display: flex;
  flex-direction: column;
} */
	.deliverySetting .deliverySetting-table .table-body .width265 label {
		line-height: 30px;
		margin-left: 0;
		color: #666;
		padding: 0 5px;
	}

	.deliverySetting .deliverySetting-table .table-body p {
		line-height: 30px;
	}

	.deliverySetting .deliverySetting-btn {
		/*width: 100%;*/
		height: 59px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		top: -55px;
		right: -16px;
		z-index: 100;
	}

	.deliverySetting .deliverySetting-btn .tabs-btn {
		min-width: 90px;
		height: 34px;
		line-height: 32px;
		padding: 0 10px;
		color: #2387f7;
		border: solid 1px #4fa2ff;
		background-color: #e7f2ff;
		cursor: pointer;
	}

	.deliverySetting .deliverySetting-btn .tabs-btn:nth-of-type(2) {
		margin: 0 15px;
	}

	.deliverySetting .deliverySetting-btn .tabs-btn input {
		border: none;
		background: transparent;
		color: inherit;
		cursor: inherit;
		outline: none;
		margin: 0;
		padding: 0;
	}

	.deliverySetting .deliverySetting-btn .tabs-btn:hover {
		color: #fff;
		background-color: #2387f7;
	}

	.deliverySetting .setDistributorDailog .el-input {
		width: 270px;
	}
</style> -->
