<template>
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
				}
			}
		}
	}
</script>

<style>
</style>