const BaseURL = "https://chu.fengniaotuangou.cn"

const url = {
	// 登录
	'Login': BaseURL + '/login',	// 登录
	'Logout': BaseURL + '/logout',	// 退出
	'ResetPassword': BaseURL + '/reset/password', // 重置密码
	'Permissions': BaseURL + '/permissions', // 重置密码
	
	// 房屋管理
	'HouseManagers': BaseURL + '/house/managers', // 住户列表
	'CheckManagers': BaseURL + '/check/managers', // 住户列表
	'Addresses': BaseURL + '/addresses', // 获取出租屋列表
	'Rooms': BaseURL + '/rooms', // 获取出租屋列表
	'Households': BaseURL + '/households', // 获取出租屋列表
	'Household': BaseURL + '/household', // 删除住户
	
	// 轮播图管理
	'Banner': BaseURL + '/banner', // 上传轮播图
	'Banners': BaseURL + '/banners', // 获取轮播图
	'Document': BaseURL + '/help/doc', // 文档管理
	'Documents': BaseURL + '/help/docs', // 获取文档
	'DelDocument': BaseURL + '/help/doc', // 获取文档
	'Message': BaseURL+ '/document', // 新增资讯管理
	'Messages': BaseURL + '/documents', // 获取资讯管理
	'MessageType': BaseURL + '/document/type', // 新增资讯类型
	'MessageTypes': BaseURL + '/document/type', // 获取资讯类型
	"DocumentDel": 	BaseURL + '/document',  // 删除文档
	"DelBanner": BaseURL + '/banner', // 删除轮播
	"DelDocumentType": BaseURL + '/document/type', // 资讯类型--删除
	
	'Role': BaseURL + '/role', // 添加角色
	
	'User': BaseURL + '/user', // 添加用户
	'Users': BaseURL + '/users', //  获取用户
	
	'Areas': BaseURL + '/areas', // 获取社区
}

module.exports = url;




