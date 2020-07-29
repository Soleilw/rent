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

API.audit = function (id, state) {
	return axios.post(url.CheckManagers, {
		id: id,
		state: state
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
// 获取进出记录
API.faceLogs = function (page, limit, face_id) {
	return axios.get(url.FaceLogs, {
		page: page,
		limit: limit,
		face_id: face_id
	})
}


// 搜索住户
API.searchHousehold = function (page, limit, name) {
	return axios.get(url.Households, {
		page: page,
		limit: limit,
		name: name
	})
}

// 删除住户
API.delHousehold = function (id) {
	return axios.del(url.Household, {
		id: id
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
API.server = function (page, limit, product_id) {
	return axios.get(url.Server, {
		page: page,
		limit: limit,
		product_id: product_id
	})
}

// 后台设置用户商品 
API.setProduct = function (data) {
	return axios.post(url.SetProduct, data)
}

// 获取开通的服务 
API.userServes = function (user_id, addresses_id) {
	return axios.get(url.UserServes, {
		user_id: user_id,
		addresses_id: addresses_id
	})
}

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
API.dangerLog = function (page, limit, area) {
	return axios.get(url.DangerLog, {
		page: page,
		limit: limit,
		area: area
	})
}

export default API