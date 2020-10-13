const dynamicRouter = [{
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
		children: [{
				path: '/houses',
				name: 'houses',
				component: () => import('@/views/house/houses.vue'),
				meta: {
					title: '房屋列表',
				}
			},
			// {
			// 	path: '/map',
			// 	name: 'map',
			// 	component: () => import('@/views/house/map.vue'),
			// 	meta: {
			// 	    title: '腾讯地图demo',
			// 	}
			// }
		]
	},
	{
		path: '/picture',
		name: 'picture',
		component: () => import('@/views/picture/index.vue'),
		meta: {
			title: '图文管理',
			icon: 'el-icon-picture-outline',
		},
		children: [{
				path: '/banner',
				name: 'banner',
				component: () => import('@/views/picture/banner.vue'),
				meta: {
					title: '轮播图管理'
				}
			},
			{
				path: '/message',
				name: 'message',
				component: () => import('@/views/picture/message.vue'),
				meta: {
					title: '资讯管理'
				}
			},
			{
				path: '/document',
				name: 'document',
				component: () => import('@/views/picture/document.vue'),
				meta: {
					title: '文档管理'
				}
			}
		]
	},

	{
		path: '/buy',
		name: 'buy',
		component: () => import('@/views/buy/buy.vue'),
		meta: {
			title: '购买服务管理',
			icon: 'el-icon-bank-card'
		}
	},

	{
		path: '/suspected',
		name: 'suspected',
		component: () => import('@/views/suspected/suspected.vue'),
		meta: {
			title: '可疑人物信息',
			icon: 'el-icon-picture'
		}
	},
	{
		path: '/switch',
		name: 'switch',
		component: () => import('@/views/switch/index'),
		meta: {
            title: '人脸开关管理',
            icon: 'el-icon-key',
        }
	},
	{
		path: '/refund',
		name: 'refund',
		component: () => import('@/views/refund/refund'),
		meta: {
            title: '用户返现',
            icon: 'el-icon-coin',
        }
	},
	// {
	// 	path: '/total',
	// 	name: 'total',
	// 	component: () => import('@/views/total/index.vue'),
	// 	meta: {
	// 		title: '统计',
	// 		icon: 'el-icon-pie-chart'
	// 	},
	// 	children: [{
	// 		path: '/rentersTotal',
	// 		name: 'rentersTotal',
	// 		component: () => import('@/views/total/total.vue'),
	// 		meta: {
	// 			title: '出租屋人数总统计'
	// 		}
	// 	}, ]
	// },

	{
		path: '/permission',
		name: 'permission',
		component: () => import('@/views/permission/permission.vue'),
		meta: {
			title: '权限管理',
			icon: 'el-icon-setting'
		}
	}
]

export default dynamicRouter