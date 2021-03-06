import axios from '@/plugins/axios'
import url from './url.js'

var API = {};

// 获取出租屋管理员列表
API.houser = function (page, limit, address_id) {
	return axios.get(url.HouseManagers, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}
// 审核
API.audit = function (id, state, self) {
	return axios.post(url.CheckManagers, {
		id: id,
		state: state,
		self: self
	})
}

API.addresses = function (page, limit, area_id, address) {
	return axios.get(url.Addresses, {
		page: page,
		limit: limit,
		area_id: area_id,
		address: address
	})
}

API.rooms = function (data) {
	return axios.post(url.Rooms, data)
}
// 获取门牌
API.gainRooms = function (page, limit, address_id) {
	return axios.get(url.Rooms, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}
// 删除楼栋
API.delBuilding = function (id) {
	return axios.del(url.DelBuilding, {
		id: id
	})
}

// 全库推送人脸
API.pushAddressFace = function (address_id) {
	return axios.post(url.PushAddressFace, {
		address_id: address_id
	})
}

// 新增房屋地址
API.createAddress = function (data) {
	return axios.post(url.CreateAddress, data)
}

//	获取可新增房屋地址
API.gainAddress = function (page, limit) {
	return axios.get(url.GainAddress, {
		page: page,
		limit: limit
	})
}
//	编辑出租屋是否收费按钮
API.addressState = function (data) {
	return axios.post(url.AddressState, data)
}

//	是否开启访客码
API.visitorCode = function (data) {
	return axios.post(url.VisitorCode, data)
}


API.households = function (page, limit, user_id, address_id, type, state, room_id, name) {
	return axios.get(url.Households, {
		page: page,
		limit: limit,
		user_id: user_id,
		address_id: address_id,
		type: type,
		state: state,
		room_id: room_id,
		name: name
	})
}
// 获取住户信息
API.addressResidents = function (page, limit, address_id, type) {
	return axios.get(url.AddressResidents, {
		page: page,
		limit: limit,
		address_id: address_id,
		type: type
	})
}
API.addResSearch = function (page, limit, address_id, name) {
	return axios.get(url.AddressResidents, {
		page: page,
		limit: limit,
		address_id: address_id,
		name: name
	})
}
// 获取进出记录
API.faceLogs = function (page, limit, face_id) {
	return axios.get(url.FaceLogs, {
		page: page,
		limit: limit,
		face_id: face_id
	})
}


// 搜索住户
API.searchHousehold = function (page, limit, name, keyword, type, state) {
	return axios.get(url.Households, {
		page: page,
		limit: limit,
		name: name,
		keyword: keyword,
		type: type,
		state: state
	})
}

// 删除住户
API.delHousehold = function (id, self) {
	return axios.del(url.Household, {
		id: id,
		self: self
	})
}

// 图文管理
// 获取轮播图
API.banners = function (page, limit) {
	return axios.get(url.Banners, {
		page: page,
		limit: limit
	})
}

// 新增轮播图
API.banner = function (data) {
	return axios.post(url.Banner, data)
}

// 新增资讯管理
API.message = function (data) {
	return axios.post(url.Message, data)
}

// 获取资讯类型
API.messages = function (page, limit) {
	return axios.get(url.Messages, {
		page: page,
		limit: limit
	})
}


// 新增资讯类型
API.messageType = function (data) {
	return axios.post(url.MessageType, data)
}

// 获取资讯类型
API.messageTypes = function (page, limit) {
	return axios.get(url.MessageTypes, {
		page: page,
		limit: limit
	})
}

// 删除资讯类型
API.delDocumentType = function (id) {
	return axios.del(url.DelDocumentType, {
		id: id
	})
}

// 获取文档
API.documents = function (page, limit) {
	return axios.get(url.Documents, {
		page: page,
		limit: limit
	})
}

// 删除文档
API.delDocument = function (id) {
	return axios.del(url.DelDocument, {
		id: id
	})
}

// 新增文档
API.document = function (data) {
	return axios.post(url.Document, data)
}

API.documentDel = function (id) {
	return axios.del(url.DocumentDel, {
		id: id
	})
}
API.delBanner = function (id) {
		return axios.del(url.DelBanner, {
			id: id
		})
	},

	// 权限管理
	// 创建角色
	API.role = function (data) {
		return axios.post(url.Role, data)
	}

// 获取角色
API.getRole = function (page, limit) {
	return axios.get(url.Role, {
		page: page,
		limit: limit
	})
}

// 删除角色
API.delRole = function (id) {
	return axios.del(url.Role, {
		id: id
	})
}

// 创建用户
API.user = function (data) {
	return axios.post(url.User, data)
}

// 获取用户
API.users = function (page, limit) {
	return axios.get(url.Users, {
		page: page,
		limit: limit
	})
}

// 删除用户
API.delUser = function (id) {
	return axios.del(url.User, {
		id: id
	})
}

// 获取社区列表（省市区选中）
API.areas = function (page, limit, parent_id) {
	return axios.get(url.Areas, {
		page: page,
		limit: limit,
		parent_id: parent_id
	})
}

// 获取服务
API.buys = function (page, limit) {
	return axios.get(url.Buys, {
		page: page,
		limit: limit
	})
}

// 新增购买服务
API.buy = function (data) {
	return axios.post(url.Buy, data)
}

// 获取服务订单
API.server = function (page, limit, product_id, keyword, areas_id) {
	return axios.get(url.Server, {
		page: page,
		limit: limit,
		product_id: product_id,
		keyword: keyword,
		areas_id: areas_id
	})
}

// 后台设置用户商品 
API.setProduct = function (data) {
	return axios.post(url.SetProduct, data)
}

// 获取开通的服务 
API.userServes = function (user_id, face_id) {
	return axios.get(url.UserServes, {
		user_id: user_id,
		face_id: face_id
	})
}

// // 获取开通的服务 
// API.userServes = function (user_id) {
// 	return axios.get(url.UserServes, {
// 		user_id: user_id,

// 	})
// }

// 删除服务
API.delServer = function (id) {
	return axios.del(url.DelServer, {
		id: id
	})
}

// 获取可疑人物
API.dangerFace = function (page, limit, address_id) {
	return axios.get(url.DangerFace, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}
// 创建可疑人物
API.addDangerFace = function (data) {
	return axios.post(url.DangerFace, data)
}
// 获取地址
API.address = function (page, limit, area_id) {
	return axios.get(url.Address, {
		page: page,
		limit: limit,
		area_id: area_id
	})
}
// 进出记录 
API.dangerLog = function (page, limit, danger_id) {
	return axios.get(url.DangerLog, {
		page: page,
		limit: limit,
		danger_id: danger_id
	})
}
// 禁用人脸
API.failFace = function (id) {
	return axios.post(url.FailFace, {
		id: id
	})
}
// 禁用人脸
API.pushFace = function (id) {
	return axios.post(url.PushFace, {
		id: id
	})
}

// 统计
API.statistics = function (page, limit, area_id, address_id) {
	return axios.get(url.Statistics, {
		page: page,
		limit: limit,
		area_id: area_id,
		address_id: address_id
	})
}

// 访客
API.visitors = function (page, limit, address_id, room_id) {
	return axios.get(url.Visitors, {
		page: page,
		limit: limit,
		address_id: address_id,
		room_id: room_id
	})
}
// 手动通过人脸对比
API.matchFace = function (user_id, self) {
	return axios.post(url.MatchFace, {
		user_id: user_id,
		self: self
	})
}
// 手动验证身份
API.verifyPerson = function (data) {
	return axios.post(url.VerifyPerson, data)
}
// 创建账号
API.creation = function (data) {
	return axios.post(url.Creation, data)
}

// 通过名字获取用户
API.userInfo = function (name) {
	return axios.get(url.UserInfo, {
		name: name
	})
}

// 修改人脸
API.editFace = function (user_id, self, href, id) {
	return axios.post(url.EditFace, {
		user_id: user_id,
		self: self,
		href: href,
		id: id
	})
}
// 获取开关
API.getConfigs = function () {
	return axios.get(url.Configs)
}

// 删除开关
API.delFaceSwitch = function (id) {
	return axios.del(url.Configs, {
		id: id
	})
}

// 添加开关
API.faceSwitch = function (data) {
	return axios.post(url.Configs, data)
}

// 获取白名单
API.withdraws = function (page, limit, name, keyword) {
	return axios.get(url.Withdraws, {
		page: page,
		limit: limit,
		name: name,
		keyword: keyword
	})
}

// 创建白名单
API.createRaw = function (data) {
	return axios.post(url.CreateRaw, data)
}
// 手动返现
API.withdraw = function (id) {
	return axios.post(url.Withdraw, {
		id: id
	})
}
// 返现记录
API.withdrawsRec = function (page, limit, user_id, address_id) {
	return axios.get(url.WithdrawsRec, {
		page: page,
		limit: limit,
		user_id: user_id,
		address_id: address_id
	})
}
// 删除
API.delWhite = function (id) {
	return axios.del(url.DelWhite, {
		id: id
	})
}

// 获取租客
API.rent = function (page, limit, address_id, type) {
	return axios.get(url.Households, {
		page: page,
		limit: limit,
		address_id: address_id,
		type: type
	})
}

// 获取返佣金白名单
API.commission = function (page, limit, name, keyword) {
	return axios.get(url.Commission, {
		page: page,
		limit: limit,
		name: name,
		keyword: keyword
	})
}

// 创建返佣金白名单
API.createCommission = function (data) {
	return axios.post(url.CreateCommission, data)
}

// 获取未添加白名单的地址
API.notCommission = function (area_id) {
	return axios.get(url.NotCommission, {
		area_id: area_id
	})
}

// 获取返佣记录
API.commissionRec = function (page, limit, address_id) {
	return axios.get(url.CommissionRec, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}

// 获取佣金来源
API.commissionRecord = function (page, limit, address_id) {
	return axios.get(url.CommissionRecord, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}

// 删除
API.delCommission = function (id) {
	return axios.del(url.DelCommission, {
		id: id
	})
}

// 返佣
API.payCommission = function (id) {
	return axios.post(url.PayCommission, {
		id: id
	})
}

// 统计佣金
API.manualCommission = function (address_id) {
	return axios.post(url.ManualCommission, {
		address_id: address_id
	})
}

API.passLose = function (addresses_id) {
	return axios.post(url.PassLose, {
		addresses_id: addresses_id
	})
}

// 查看房间成员
API.roomMenber = function (address_id, room_id) {
	return axios.get(url.RoomMenber, {
		address_id: address_id,
		room_id: room_id
	})
}

// 发布职位
API.postRelease = function (data) {
	return axios.post(url.PostRelease, data)
}
// 列表
API.postList = function (page, limit, company_name, post_name) {
	return axios.get(url.PostList, {
		page: page,
		limit: limit,
		company_name: company_name,
		post_name: post_name
	})
}
// 删除
API.delPost = function (id) {
	return axios.del(url.DelPost, {
		id: id
	})
}

// 发布出租屋信息
API.issueRenting = function (data) {
	return axios.post(url.IssueRenting, data)
}
// 列表
API.issuesList = function (page, limit, type, name, address) {
	return axios.get(url.IssuesList, {
		page: page,
		limit: limit,
		type: type,
		name: name,
		address: address
	})
}
// 删除
API.delIssue = function (id) {
	return axios.del(url.DelIssue, {
		id: id
	})
}

// 模板列表
API.templates = function (page, limit, title) {
	return axios.get(url.Templates, {
		page: page,
		limit: limit,
		title: title,
	})
}
// 删除
API.delTemplates = function (id) {
	return axios.del(url.DelTemplates, {
		id: id
	})
}

// 发布模板记录列表
API.templatesMsg = function (page, limit, target_type, template_id) {
	return axios.get(url.TemplatesMsg, {
		page: page,
		limit: limit,
		target_type: target_type,
		template_id: template_id
	})
}
// 删除模板记录
API.delTemplatesMsg = function (id) {
	return axios.del(url.DelTemplatesMsg, {
		id: id
	})
}
// 详情
API.msgDetails = function (page, limit, id) {
	return axios.get(url.MsgDetails, {
		page: page,
		limit: limit,
		id: id
	})
}


export default API