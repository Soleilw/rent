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
