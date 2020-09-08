const BaseURL = "https://chu.fengniaotuangou.cn"
// const BaseURL = "http://192.168.0.104"

const url = {
	// 登录
	'Login': BaseURL + '/login', // 登录
	'Logout': BaseURL + '/logout', // 退出
	'ResetPassword': BaseURL + '/reset/password', // 重置密码
	'Permissions': BaseURL + '/permissions', // 重置密码

	// 房屋管理
	'HouseManagers': BaseURL + '/house/managers', // 住户列表
	'CheckManagers': BaseURL + '/check/managers', // 住户列表
	'Addresses': BaseURL + '/addresses', // 获取出租屋列表
	'Rooms': BaseURL + '/rooms', // 新增房间门牌, 获取门牌
	'Households': BaseURL + '/households', // 获取出租屋列表
	'Household': BaseURL + '/household', // 删除住户
	'AddressResidents': BaseURL + '/address/residents', // 获取住户信息
	'FaceLogs': BaseURL + '/face/logs', // 获取住户进出记录
	'DelBuilding': BaseURL + '/room', // 删除楼栋
	'PushAddressFace': BaseURL + '/push/address/face', // 全库推送人脸

	// 轮播图管理
	'Banner': BaseURL + '/banner', // 上传轮播图
	'Banners': BaseURL + '/banners', // 获取轮播图
	'Document': BaseURL + '/help/doc', // 文档管理
	'Documents': BaseURL + '/help/docs', // 获取文档
	'DelDocument': BaseURL + '/help/doc', // 获取文档
	'Message': BaseURL + '/document', // 新增资讯管理
	'Messages': BaseURL + '/documents', // 获取资讯管理
	'MessageType': BaseURL + '/document/type', // 新增资讯类型
	'MessageTypes': BaseURL + '/document/type', // 获取资讯类型
	"DocumentDel": BaseURL + '/document', // 删除文档
	"DelBanner": BaseURL + '/banner', // 删除轮播
	"DelDocumentType": BaseURL + '/document/type', // 资讯类型--删除

	'Role': BaseURL + '/role', // 添加角色

	'User': BaseURL + '/user', // 添加用户
	'Users': BaseURL + '/users', //  获取用户

	'Areas': BaseURL + '/areas', // 获取社区

	"Buys": BaseURL + '/products', // 获取服务
	"Buy": BaseURL + '/product', // 新增购买服务
	'Server': BaseURL + '/orders', // 服务订单
	"DelServer": BaseURL + '/product', // 删除服务
	"SetProduct": BaseURL + '/set/Product', // 后台设置用户商品
	"UserServes": BaseURL + '/user/serves', // 获取开通的服务

	"DangerFace": BaseURL + '/danger/face', // 获取可疑人物 & 添加可疑人物
	"Address": BaseURL + '/addresses', // 可疑人物获取地址列表
	"DangerLog": BaseURL + '/danger/log', // 进出记录
	"FailFace": BaseURL + '/failFace', // 禁用人脸
	"PushFace": BaseURL + '/pushFace', // 开通人脸

	'Statistics': BaseURL + '/statistics', // 统计

	'Visitors': BaseURL + '/visitors', // 访客
	'MatchFace': BaseURL + '/match/face', // 手动通过人脸对比
	'VerifyPerson': BaseURL + '/verify/person', // 手动验证身份
	'Creation': BaseURL + '/creation/household', // 创建账号
	'UserInfo': BaseURL + '/user/info', // 通过名字获取用户
	'EditFace': BaseURL + '/edit/href', // 修改人脸
	
}

module.exports = url;