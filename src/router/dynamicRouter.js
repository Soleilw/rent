const dynamicRouter = [
	{
	    path: '/resident',
		name: 'resident',
	    component: () => import('@/views/resident/resident.vue'),
	    meta: {
	        title: '住户管理',
			icon: 'el-icon-s-custom'
	    }
	},
	{
	    path: '/house',
		name: 'house',
	    component: () => import('@/views/house/index.vue'),
	    meta: {
	        title: '房屋管理',
			icon: 'el-icon-s-home'
	    },
		children: [
			{
				path: '/houses',
				name: 'houses',
				component: () => import('@/views/house/houses.vue'),
				meta: {
				    title: '房屋列表',
				}
			}
		]
	},
]

export default dynamicRouter
