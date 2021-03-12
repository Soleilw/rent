<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addPosition">发布租赁信息</el-button>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="输入姓名/地址" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-select v-model="type" placeholder="请选择搜索方式" @change="changeType" slot="prepend"
                        style="width: 150px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
        </div>

        <!-- 发布职位 -->
        <el-dialog :visible.sync="dialogPosition" title="发布租赁信息" width="80%" @close="close" center="">
            <el-form label-width="150px" :model="rentingInfo">
                <el-form-item label="是否上架">
                    <el-radio-group v-model="rentingInfo.on_shelf">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="rentingInfo.title" class="tex" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="rentingInfo.intro" class="tex" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入房屋简介"></el-input>
                </el-form-item>
                <!-- <el-form-item label="地址ID">
                    <el-select v-model="area_id" placeholder="请选择社区" @change="changeAreaType">
                        <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="rentingInfo.address_id" filterable placeholder="选择地址">
                        <el-option v-for="item in addressList" :label="item.address" :value="item.id" :key="item.index">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="请选择详细地址id">
                    <el-select v-model="pro_id" placeholder="请选择省份" @change="proChange" style="margin-right: 10px">
                        <el-option v-for="item in proList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="city_id" placeholder="请选择市级" @change="cityChange" style="margin-right: 10px">
                        <el-option v-for="item in cityList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="areas_id" placeholder="请选择区级" @change="areasChange" style="margin-right: 10px">
                        <el-option v-for="item in communityList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="rentingInfo.areas_id" placeholder="请选择社区" @change="communityChange"
                        style="margin-right: 10px">
                        <el-option v-for="item in areaList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="rentingInfo.address_id" placeholder="请选择详细地址" style="margin-right: 10px"
                        filterable>
                        <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址经纬度">
                    <div class="ipt-box">
                        <el-input v-model="rentingInfo.longitude" placeholder="经度显示" style="margin-right: 10px;">
                        </el-input>
                        <el-input v-model="rentingInfo.latitude" placeholder="纬度显示" style="margin-right: 10px;">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item label="地图显示">
                    <el-switch v-model="showMap" active-color="#2a9f93">
                    </el-switch>
                    <div v-if="showMap">
                        <v-map @callback="getLoc"></v-map>
                    </div>
                </el-form-item>
                <el-form-item label="出租房屋地址">
                    <el-input v-model="rentingInfo.address" class="tex" placeholder="请输入出租房屋地址"></el-input>
                </el-form-item>
                <div class="ipt-box">
                    <el-form-item label="价格">
                        <el-input v-model="rentingInfo.price" placeholder="请输价格(如: 450)"></el-input>
                    </el-form-item>
                    <el-form-item label="支付类型">
                        <el-input v-model="rentingInfo.pay_type" placeholder="请输入支付类型(如: 押一付一)" style="width: 250px">
                        </el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="面积(㎡)">
                        <el-input v-model="rentingInfo.proportion" placeholder="请输入面积"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-input v-model="rentingInfo.floor" placeholder="请输入楼层"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层类型">
                        <el-select v-model="rentingInfo.floor_type" filterable placeholder="选择楼层类型">
                            <el-option v-for="item in floorList" :label="item.label" :value="item.value"
                                :key="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="户型">
                        <el-input v-model="rentingInfo.house_type_text" placeholder="请输入户型(如: 两室一厅)"></el-input>
                    </el-form-item>
                    <el-form-item label="户型类型">
                        <el-select v-model="rentingInfo.house_type" filterable placeholder="选择户型类型">
                            <el-option v-for="item in houseTypeList" :label="item.label" :value="item.value"
                                :key="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="朝向">
                        <el-select v-model="rentingInfo.orientation" filterable placeholder="选择户型类型">
                            <el-option v-for="item in orientationList" :label="item.label" :value="item.value"
                                :key="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="ipt-box">
                    <el-form-item label="联系人">
                        <el-input v-model="rentingInfo.name" placeholder="请输入联系人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="rentingInfo.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="浏览量">
                        <el-input v-model="rentingInfo.browse" placeholder="请输入浏览量"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="rentingInfo.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="批量上传图片">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="9"
                        :before-upload="beforeAvatarUpload" :on-remove="handleRemove" :on-exceed="handleExceed"
                        :auto-upload="true" :on-change="handleChange" multiple list-type="picture-card"
                        :file-list='fileLists' :on-success="handleAvatarSuccess">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newPosition">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 表格数据 -->
        <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
            max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="手机"></el-table-column>
            <el-table-column prop="price" label="价格范围"></el-table-column>
            <el-table-column prop="address" label="出租屋地址"></el-table-column>
            <el-table-column prop="on_shelf" label="是否上架" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.on_shelf" active-color="#2a9f93"
                        @change="notifyChange(scope.row.on_shelf, scope.$index, scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 全部-->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除住户" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">是否删除该住户</div>
            <span>
                <el-button type="primary" @click="toDel">删除</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import vMap from '@/components/map/map-iframe.vue'
    export default {
        inject: ["reload"],
        components: {
            vMap
        },
        data() {
            return {
                loading: true,
                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                rentingInfo: {
                    images: [],
                    name: '',
                    phone: '',
                    on_shelf: 1,
                    browse: '',
                    sort: '',
                    areas_id: '',
                    address_id: '',
                    address: '',
                    title: '',
                    intro: '',
                    price: '',
                    proportion: '',
                    floor: '',
                    floor_type: '',
                    house_type: '',
                    house_type_text: '',
                    pay_type: '',
                    orientation: '',
                    latitude: '',
                    longitude: ''
                },
                dialogPosition: false,
                fileLists: [],

                // options: [{
                //     label: '本科',
                //     value: 1
                // }, {
                //     label: '研究生',
                //     value: 2
                // }, {
                //     label: '博士',
                //     value: 3
                // }],
                on_shelf: false,
                dialogDel: false,
                id: '',
                keyword: '',
                type: 2, // 选中的搜索方式
                typeList: [{
                        value: 1,
                        label: "按地址搜索",
                    },
                    {
                        value: 2,
                        label: "按姓名搜索",
                    },
                ],
                typeDisabled: false,
                // area_id: '',
                // areaList: [],
                addressList: [],
                lisyType: '',
                floorList: [{
                    label: '低',
                    value: 1
                }, {
                    label: '中',
                    value: 2
                }, {
                    label: '高',
                    value: 3
                }],
                houseTypeList: [{
                    label: '一室',
                    value: 1
                }, {
                    label: '两室',
                    value: 2
                }, {
                    label: '三室',
                    value: 3
                }, {
                    label: '四室及以上',
                    value: 4
                }],
                orientationList: [{
                    label: '东',
                    value: 1
                }, {
                    label: '南',
                    value: 2
                }, {
                    label: '西',
                    value: 3
                }, {
                    label: '北',
                    value: 4
                }],
                proList: [], // 省级列表
                pro_id: "",
                cityList: [], // 市级列表
                city_id: "",
                communityList: [], // 区级列表
                community_id: "",
                areaList: [], //  社区列表
                areas_id: "",
                // detailAddressList: [], // 详细地址,
                showMap: false
            }
        },

        mounted() {
            this.getList(this.current, this.size);
        },

        methods: {
            getList(cur, list, type, name, address) {
                var self = this;
                API.issuesList(cur, list, type, name, address).then(res => {
                    res.data.forEach(item => {
                        item.on_shelf == 1 ? item.on_shelf = true : item.on_shelf = false;
                    })
                    self.tableData = res.data;
                    self.total = res.total;
                    self.loading = false;
                }).catch(err => {
                    self.loading = false;
                })
            },

            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                if (self.keyword) {
                    switch (self.type) {
                        case 1:
                            var address = self.keyword;
                            self.getList(val, self.size, self.lisyType, name, address)
                            break;
                        case 2:
                            var name = self.keyword;
                            self.getList(val, self.size, self.lisyType, name, address)
                    }
                } else {
                    self.getList(val, self.size);
                }
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                if (self.keyword) {
                    switch (self.type) {
                        case 1:
                            var address = self.keyword;
                            self.getList(1, val, self.lisyType, name, address);
                            break;
                        case 2:
                            var name = self.keyword;
                            self.getList(1, val, self.lisyType, name, address);
                    }
                } else {
                    self.getList(1, val);
                }
            },

            // 搜索方式
            changeType(val) {
                var self = this;
                self.typeDisabled = true;
                self.keyword = "";
                self.current = 1;
                self.getList(self.current, self.size);
            },

            search() {
                var self = this;
                self.loading = true;
                self.current = 1;
                if (self.type == 1) {
                    var address = self.keyword;
                    self.getList(self.current, self.size, self.lisyType, name, address)
                }
                if (self.type == 2) {
                    var name = self.keyword;
                    self.getList(self.current, self.size, self.lisyType, name, address)
                }
            },

            // 发布职位
            addPosition() {
                var self = this;
                self.dialogPosition = true;
                self.getPro()

                // API.areas(1, 100, 3).then((res) => {
                //     self.areaList = res.data;
                // });
            },

            close() {
                var self = this;
                self.rentingInfo = {
                    images: [],
                    name: '',
                    phone: '',
                    on_shelf: 1,
                    browse: '',
                    sort: '',
                    areas_id: '',
                    address_id: '',
                    address: '',
                    title: '',
                    intro: '',
                    price: '',
                    proportion: '',
                    floor: '',
                    floor_type: '',
                    house_type: '',
                    house_type_text: '',
                    pay_type: '',
                    orientation: '',
                    latitude: '',
                    longitude: ''
                };
                self.fileLists = [];
                // self.area_id = '';
                // self.areaList = [];
                self.addressList = [];
                self.proList = []; // 省级列表
                self.pro_id = "";
                self.cityList = []; // 市级列表
                self.city_id = "";
                self.communityList = []; // 区级列表
                self.community_id = "";
                self.areaList = []; //  社区列表
                self.areas_id = "";
                // self.detailAddressList = []; // 详细地址
            },

            getPro() {
                var self = this;
                API.areas(1, 4000, 0).then((res) => {
                    self.proList = res.data;
                });
            },
            getCity(val) {
                var self = this;
                API.areas(1, 4000, val).then((res) => {
                    self.cityList = res.data;
                });
            },
            getAreas(val) {
                var self = this;
                API.areas(1, 4000, val).then((res) => {
                    self.areaList = res.data;
                });
            },
            getCommunity(val) {
                var self = this;
                API.areas(1, 100, val).then((res) => {
                    self.communityList = res.data;
                });
            },
            getDetailAddress(val) {
                var self = this;
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                API.addresses(1, 4000, val).then((res) => {
                    self.addressList = res.data;
                    loading.close()
                }).catch(err => {
                    loading.close()
                });
            },

            proChange(val) {
                var self = this;
                self.getCity(val);
            },
            cityChange(val) {
                var self = this;
                self.getCommunity(val);
            },
            areasChange(val) {
                var self = this;
                self.getAreas(val);
            },
            communityChange(val) {
                var self = this;
                self.getDetailAddress(val);
            },

            getLoc(mapData) {
                console.log(mapData);
                this.rentingInfo.longitude = mapData.latlng.lng;
                this.rentingInfo.latitude = mapData.latlng.lat;
                this.rentingInfo.address = mapData.poiaddress + mapData.poiname;
                this.showMap = false;
            },

            // 选择社区
            // changeAreaType(value) {
            //     var self = this;
            //     self.area_id = value;
            //     API.addresses(1, 100, self.area_id).then((res) => {
            //         self.addressList = res.data;
            //     });
            // },

            // 发布
            newPosition() {
                var self = this;
                console.log(self.rentingInfo);
                if (self.rentingInfo.name && self.rentingInfo.phone && self.rentingInfo.title && self.rentingInfo
                    .intro && self.rentingInfo.address && self.rentingInfo.price) {
                    API.issueRenting(self.rentingInfo).then(res => {
                        self.$message.success("发布成功");
                        self.dialogPosition = false;
                        self.getList(self.current, self.size)
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            handleEdit(index, row) {
                var self = this;
                self.dialogPosition = true;
                self.rentingInfo = {
                    images: row.images,
                    name: row.name,
                    phone: row.phone,
                    on_shelf: row.on_shelf == true ? 1 : 2,
                    browse: row.browse,
                    sort: row.sort,
                    areas_id: row.areas_id,
                    address_id: row.address_id,
                    address: row.address,
                    title: row.title,
                    intro: row.intro,
                    price: row.price,
                    proportion: row.proportion,
                    floor: row.floor,
                    floor_type: row.floor_type,
                    house_type: row.house_type,
                    house_type_text: row.house_type_text,
                    pay_type: row.pay_type,
                    orientation: row.orientation,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    id: row.id
                };

                self.fileLists = self.rentingInfo.images.map(t => {
                    var obj = {};
                    obj.url = t;
                    return obj;
                })
                // self.pro_id = row.province.id
                // self.getPro()
                API.addresses(1, 4000, row.areas_id).then((res) => {
                    self.addressList = res.data;
                }).catch(err => {});
            },

            // 删除
            handleDel(index, row) {
                var self = this;
                self.id = row.id;
                self.dialogDel = true;
            },

            toDel() {
                var self = this;
                API.delIssue(self.id).then(res => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getList(self.current, self.size);
                })
            },



            notifyChange(val, index, row) {
                var self = this;
                // console.log(row);
                self.loading = true;
                if (val == true) {
                    self.rentingInfo = {
                        images: row.images,
                        name: row.name,
                        phone: row.phone,
                        on_shelf: 1,
                        browse: row.browse,
                        sort: row.sort,
                        areas_id: row.areas_id,
                        address_id: row.address_id,
                        address: row.address,
                        title: row.title,
                        intro: row.intro,
                        price: row.price,
                        proportion: row.proportion,
                        floor: row.floor,
                        floor_type: row.floor_type,
                        house_type: row.house_type,
                        house_type_text: row.house_type_text,
                        pay_type: row.pay_type,
                        orientation: row.orientation,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        id: row.id
                    };
                } else {
                    self.rentingInfo = {
                        images: row.images,
                        name: row.name,
                        phone: row.phone,
                        on_shelf: 2,
                        browse: row.browse,
                        sort: row.sort,
                        areas_id: row.areas_id,
                        address_id: row.address_id,
                        address: row.address,
                        title: row.title,
                        intro: row.intro,
                        price: row.price,
                        proportion: row.proportion,
                        floor: row.floor,
                        floor_type: row.floor_type,
                        house_type: row.house_type,
                        house_type_text: row.house_type_text,
                        pay_type: row.pay_type,
                        orientation: row.orientation,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        id: row.id
                    };
                }
                API.issueRenting(self.rentingInfo).then(res => {
                    self.$message.success("提交成功");
                    self.getList(self.current, self.size);
                })
            },
            // 刷新
            refresh() {
                this.reload();
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                console.log(file);
                self.fileLists = fileList
                self.rentingInfo.images.splice(self.rentingInfo.images.indexOf(file.url), 1)
                // console.log(self.rentingInfo.images);
                self.hasNewImage1 = false;
            },
            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制

                if (this.fileLists.length > 9) {
                    this.$message.error('最多只能上传9张图片')
                }
                const isLt500K = file.size / 1024 < 500
                if (!isLt500K) {
                    this.$message.error('上传产品图片大小不能超过 500K!')
                }
                return isLt500K && this.fileLists.length <= 9
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                console.log(res);
                var self = this;
                self.rentingInfo.images.push(file.response.data);
            },
            handleExceed(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过9张!");
            },

            handleChange(file, fileList) {
                var self = this;
                self.fileLists = fileList;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ipt-box {
        display: flex;
    }

    .tex {
        width: 500px;
    }
</style>