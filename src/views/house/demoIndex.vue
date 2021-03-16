<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="changeActive">
			<el-tab-pane label="发布模板消息" name="issue">
				<v-issue></v-issue>
			</el-tab-pane>
			<el-tab-pane label="新增信息模板" name="infoDemo">
				<v-infoDemo></v-infoDemo>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import vInfoDemo from '@/components/house/infoDemo.vue'
	import vIssue from '@/components/house/issue.vue'
	import API from '@/api/index.js'

	export default {
		components: {
			vInfoDemo,
			vIssue
		},
		data() {
			return {
				activeName: 'issue'
			}
		},
		methods: {
			changeActive() {
				if (this.activeName === 'infoDemo') {

				}
				if (this.activeName === 'issue') {
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