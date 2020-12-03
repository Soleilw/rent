<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="changeActive">
			<el-tab-pane label="角色管理" name="role">
				<v-role></v-role>
			</el-tab-pane>
			<el-tab-pane label="用户管理" name="user">
				<v-user></v-user>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import vRole from '@/components/permission/roles.vue'
	import vUser from '@/components/permission/user.vue'
	import API from '@/api/index.js'

	export default {
		components: {
			vRole,
			vUser
		},
		data() {
			return {
				activeName: 'role'
			}
		},
		methods: {
			changeActive() {
				if(this.activeName === 'role') {
					
				}
				if(this.activeName === 'user') {
					// API.getRole(1, 100).then(res => {
					// })
					// API.users(1, 10).then(res => {
					// })
				}
			}
		}
	}
</script>

<style>
</style>
