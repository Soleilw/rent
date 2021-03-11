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
			icon: 'el-icon-office-building'
		},
		children: [{
				path: '/houses',
				name: 'houses',
				component: () => import('@/views/house/houses.vue'),
				meta: {
					title: '房屋列表',
				}
			},
			{
				path: '/renting',
				name: 'renting',
				component: () => import('@/views/house/renting.vue'),
				meta: {
				    title: '租赁列表',
				}
			},
			{
				path: '/demoIndex',
				name: 'demoIndex',
				component: () => import('@/views/house/demoIndex.vue'),
				meta: {
				    title: '信息模板发布',
				}
			},
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
			},
			{
				path: '/recruit',
				name: 'recruit',
				component: () => import('@/views/recruit/recruit.vue'),
				meta: {
					title: '人才招聘',
					icon: 'el-icon-suitcase-1'
				},
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
		path: '/order',
		name: 'order',
		component: () => import('@/views/order/order.vue'),
		meta: {
			title: '服务订单列表',
			icon: 'el-icon-s-order'
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
	// 	path: '/recruit',
	// 	name: 'recruit',
	// 	component: () => import('@/views/recruit/recruit.vue'),
	// 	meta: {
	// 		title: '人才招聘',
	// 		icon: 'el-icon-suitcase-1'
	// 	},
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