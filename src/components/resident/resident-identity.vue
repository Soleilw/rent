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
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 删除提示框 -->
		<el-dialog :visible.sync="dialogDel" title="删除年级" width="20%" align="center" :close-on-click-modal="false">
			<div style="font-size: 20px; margin-bottom: 30px;">是否删除该用户身份</div>
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
	export default {
		data() {
			return {
				loading: false,
				dialogIdentity: false,
				form: {
					identity: ''
				},
				
				tableData: [{}] ,// 表格数据
				dialogDel: false, // 操作
				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0
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
			
			handleDel() {
				var self = this;
				self.dialogDel = true;
			},
			// 确认删除
			toDel() {
				
			},
			// 分页
			handleCurrentChange(val) {
				
			},
			
			// 每页几条
			handleSizeChange(val) {
				
			}
		}
	}
</script>

<style>
</style>
