<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="changeActive">
			<el-tab-pane label="用户白名单" name="role">
				<v-user></v-user>
			</el-tab-pane>
			<el-tab-pane label="户主佣金" name="user">
				<v-owner></v-owner>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import vOwner from '@/components/refund/owner.vue'
	import vUser from '@/components/refund/user.vue'
	import API from '@/api/index.js'

	export default {
		components: {
			vOwner,
			vUser
		},
		data() {
			return {
				activeName: 'role'
			}
		},
		methods: {
			changeActive() {
				if(this.activeName === 'owner') {
					
				}
				if(this.activeName === 'user') {
					// API.getRole(1).then(res => {
					// })
					// API.users(1).then(res => {
					// })
				}
			}
		}
	}
</script>

<style>
</style>
