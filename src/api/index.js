import axios from '@/plugins/axios'
import url from './url.js'

var API = {};

// 获取出租屋管理员列表
API.houser = function(page, limit, address_id) {
	return axios.get(url.HouseManagers, {
		page: page,
		limit: limit,
		address_id: address_id
	})
}

API.audit = function(id, state) {
	return axios.post(url.CheckManagers, {
		id: id,
		state: state
	})
}

API.addresses = function(page, limit, area_id, address) {
	return axios.get(url.Addresses, {
		page: page,
		limit: limit,
		area_id: area_id,
		address: address
	})
}

API.rooms = function(data) {
	return axios.post(url.Rooms, data)
}

API.households = function(page, limit, user_id, address_id, type, state, room_id, name) {
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

// 搜索住户
API.searchHousehold = function(page, limit, name) {
	return axios.get(url.Households, {
		page: page,
		limit: limit,
		name: name
	})
}

// 删除住户
API.delHousehold = function(id) {
	return axios.del(url.Household, {
		id: id
	})
}

// 权限管理
// 创建角色
API.role = function(data) {
	return axios.post(url.Role, data)
}

// 创建角色
API.getRole = function(page, limit) {
	return axios.get(url.Role, {
		page: page,
		limit: limit
	})
}

export default API
