import axios from '@/plugins/axios'
import url from './url.js'

var API = {};

// 获取出租屋管理员列表
API.houser = function(page,limit,address_id) {
	return axios.get(url.HouseManagers, {page: page,limit:limit,address_id:address_id})
}

API.audit = function(id,state) {
	return axios.post(url.CheckManagers, {id: id,state:state})
}

API.addresses = function(page,limit,area_id, address) {
	return axios.get(url.Addresses, {page: page,limit:limit,area_id:area_id,address:address})
}

API.rooms = function(data) {
	return axios.post(url.Rooms, data)
}

API.households = function(page, limit, user_id, address_id, type,state, room_id) {
	return axios.get(url.Households, {page: page,limit:limit,user_id:user_id,address_id:address_id,type:type,state:state,room_id:room_id})
}



export default API

