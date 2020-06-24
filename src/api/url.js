const BaseURL = "https://chu.fengniaotuangou.cn"

const url = {
	// 登录
	'Login': BaseURL + '/login',	// 登录
	'Logout': BaseURL + '/logout',	// 退出
	'ResetPassword': BaseURL + '/reset/password', // 重置密码
	'Permissions': BaseURL + '/permissions', // 重置密码
	
	'HouseManagers': BaseURL + '/house/managers', // 住户列表
	'CheckManagers': BaseURL + '/check/managers', // 住户列表
	'Addresses': BaseURL + '/addresses', // 获取出租屋列表
	'Rooms': BaseURL + '/rooms', // 获取出租屋列表
	'Households': BaseURL + '/households', // 获取出租屋列表
}

module.exports = url;




