<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <!-- 搜索框 -->
        <div class="handle-box">
            <div class="btn">
                <el-input v-model="renter_name" placeholder="输入用户名/地址" class="input-with-select"
                    @keyup.enter.native="search(renter_name)">
                    <el-select v-model="type" placeholder="请选择搜索方式" @change="changeType" slot="prepend"
                        style="width: 150px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(renter_name)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
            <div class="btn">
                <el-button type="primary" @click="addUser">添加白名单</el-button>
            </div>
        </div>

        <!-- 表格数据 -->
        <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
            max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="address_id" label="地址ID"></el-table-column>
            <el-table-column prop="address" label="地址" width="250px"></el-table-column>
            <el-table-column prop="name" label="绑定用户"></el-table-column>
            <el-table-column prop="state" label="返现状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 1">启用返现功能</span>
                    <span v-else-if="scope.row.state == 2">禁用返现功能</span>
                </template>
            </el-table-column>
            <el-table-column prop="money" label="返现金额"></el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-dropdown>
                        <el-button type="primary">
                            操作
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleRec(scope.$index, scope.row)">返佣记录
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleSource(scope.$index, scope.row)">
                                    佣金来源</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" @click="handleRefund(scope.$index, scope.row)">
                                    手动返现</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="primary" v-if="scope.row.state == 2"
                                    @click="handleUsing(scope.$index, scope.row)">启用返现功能</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="danger" v-if="scope.row.state == 1"
                                    @click="handleBan(scope.$index, scope.row)">禁用返现功能</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加白名单 -->
        <el-dialog title="添加白名单" :visible.sync="dialogList" :close-on-click-modal="false" width="800px"
            @close="closeList">
            <div class="box">
                <el-form :model="listForm">
                    <div v-for="(item, index) in listForm.service" :key="index">
                        <el-form-item v-if="isAdd">
                            <span>选择社区：</span>
                            <el-select v-model="area_id" placeholder="请选择社区" @change="changeAreaType">
                                <el-option v-for="item in areaList" :key="item.index" :label="item.title"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择地址">
                            <el-select v-model="item.address_id" @change="selectSize" filterable placeholder="选择地址"
                                :disabled="isDisabled">
                                <el-option v-for="item in addressList" :label="item.address" :value="item.id"
                                    :key="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择用户">
                            <el-select v-model="item.user_id" filterable placeholder="请选择用户" :disabled="isDisabled">
                                <el-option v-for="item in userList" :label="item.snapshot.name" :value="item.user_id"
                                    :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="输入金额">
                            <div class="btn">
                                <el-input v-model="item.money" placeholder="请输入金额" class="input-with-select ipt">
                                </el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="返现状态">
                            <el-select v-model="item.state" :disabled="isDisabled" placeholder="请选择状态">
                                <el-option v-for="item in stateList" :label="item.name" :value="item.value"
                                    :key="item.index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="操作" v-if="isAdd">
                        <el-button type="primary" @click="addopenList">添加</el-button>
                        <el-button type="primary" @click="delopenList">删除</el-button>
                    </el-form-item>
                    <div class="submit">
                        <el-form-item>
                            <el-button type="primary" @click="newList">提交</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </el-dialog>

        <!-- 返佣记录 -->
        <el-dialog title="返佣记录" :visible.sync="dialogRecord" width="80%">
            <el-table :data="recordDate" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
                max-height="620">
                <el-table-column prop="id" label="记录ID"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="name" label="绑定用户"></el-table-column>
                <el-table-column prop="money" label="返现金额"></el-table-column>
                <el-table-column prop="state" label="返现状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state == 1">待返现</span>
                        <span v-else-if="scope.row.state == 2">返现成功</span>
                        <span v-else-if="scope.row.state == 3">返现失败</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination @current-change="recordCurrentChange" :current-page.sync="recordCurrent"
                    :page-size="recordSize" layout="sizes, prev, pager, next, jumper" :total="recordTotal"
                    @size-change="recordSizeChange"></el-pagination>
            </div>
        </el-dialog>

        <!-- 佣金来源 -->
        <el-dialog title="佣金来源" :visible.sync="dialogRec" width="80%">
            <el-table :data="recDate" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
                max-height="620">
                <el-table-column prop="id" label="记录ID"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="name" label="绑定用户"></el-table-column>
                <el-table-column prop="money" label="返现金额"></el-table-column>
                <el-table-column prop="title" label="服务名称"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination @current-change="recCurrentChange" :current-page.sync="recCurrent" :page-size="recSize"
                    layout="sizes, prev, pager, next, jumper" :total="recTotal" @size-change="recSizeChange">
                </el-pagination>
            </div>
        </el-dialog>

        <!-- 删除 -->
        <el-dialog :visible.sync="dialogDel" title="删除记录" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">是否删除该记录</div>
            <span>
                <el-button type="primary" @click="toDel">确定</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 禁用 -->
        <el-dialog :visible.sync="dialogBan" title="禁用返现" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">
                是否对该用户禁用返现功能
            </div>
            <span>
                <el-button type="primary" @click="toBan">确定</el-button>
                <el-button type="danger" @click="dialogBan = false">取消</el-button>
            </span>
        </el-dialog>
        <!-- 启用 -->
        <el-dialog :visible.sync="dialogUsing" title="启用返现" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">
                是否对该用户启用返现功能
            </div>
            <span>
                <el-button type="primary" @click="toUsing">确定</el-button>
                <el-button type="danger" @click="dialogUsing = false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="dialogRefund" title="返现" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">
                是否对该用户进行返现
            </div>
            <span>
                <el-button type="primary" @click="toRefund">确定</el-button>
                <el-button type="danger" @click="dialogRefund = false">取消</el-button>
            </span>
        </el-dialog>

        <!-- 分页 -->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current" :page-size="size"
                layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange"></el-pagination>
        </div>
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import rolesVue from "../../components/permission/roles.vue";

    export default {
        inject: ["reload"],
        data() {
            return {
                loading: true,
                tableData: [], // 表格数据
                recordDate: [],
                current: 1, // 分页
                size: 10,
                total: 0,
                recordCurrent: 1,
                recordSize: 10,
                recordTotal: 0,
                recCurrent: 1,
                recSize: 10,
                recTotal: 0,
                renter_name: "",
                type: 2,
                typeList: [{
                        value: 1,
                        label: "按地址搜索",
                    },
                    {
                        value: 2,
                        label: "按用户名搜索",
                    },
                ],
                dialogList: false,
                dialogRec: false,
                dialogRecord: false,
                dialogRefund: false,
                dialogDel: false,
                dialogBan: false,
                dialogUsing: false,
                listForm: {
                    id: "",
                    service: [],
                },
                addressList: [],
                userList: [],
                monList: [],
                stateList: [{
                        name: "启用返现",
                        value: 1,
                    },
                    {
                        name: "禁用返现",
                        value: 2,
                    },
                ],
                name: "",
                areaList: [],
                address_id: "",
                typeDisabled: true,
                id: "",
                user_id: "",
                isAdd: true,
                isDisabled: false,
                isBan: false,
                area_id: "",
                typeUser: "",
                recDate: [],
            };
        },
        mounted() {
            this.getList(this.current, this.size);
        },
        methods: {
            // 获取白名单
            getList(cur, list) {
                var self = this;
                API.commission(cur, list)
                    .then((res) => {
                        self.loading = false;
                        self.tableData = res.data;
                        self.total = res.total;
                    })
                    .catch((err) => {
                        self.loading = false;
                    });
            },
            // 分页
            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                if (self.renter_name) {
                    switch (self.type) {
                        case 1:
                            var keyword = self.renter_name;
                            self.fucSearch(val, self.size, name, keyword);
                            break;
                        case 2:
                            var name = self.renter_name;
                            self.fucSearch(val, self.size, name, keyword);
                            break;
                    }
                } else {
                    self.getList(val, self.size);
                }
            },
            // 每页几条
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                if (self.renter_name) {
                    switch (self.type) {
                        case 1:
                            var keyword = self.renter_name;
                            self.fucSearch(1, val, name, keyword);
                            break;
                        case 2:
                            var name = self.renter_name;
                            self.fucSearch(1, val, name, keyword);
                    }
                } else {
                    self.getList(1, val);
                }
                self.current = 1;
            },

            // 搜索
            changeType(val) {
                var self = this;
                self.typeDisabled = true;
                self.renter_name = "";
                self.current = 1;
                self.getList(self.current, self.size);
            },
            fucSearch(cur, list, name, keyword) {
                var self = this;
                API.commission(cur, list, name, keyword).then(
                    (res) => {
                        self.loading = false;
                        self.tableData = res.data;
                        self.total = res.total;
                        self.$message.success("搜索成功！");
                    }
                );
            },
            search() {
                var self = this;
                self.current = 1;
                self.size = 10;
                self.loading = true;
                if (self.type == 1) {
                    var keyword = self.renter_name;
                    self.fucSearch(self.current, self.size, name, keyword);
                }
                if (self.type == 2) {
                    var name = self.renter_name;
                    self.fucSearch(self.current, self.size, name, keyword);
                }
            },

            // 添加白名单
            addUser() {
                var self = this;
                self.dialogList = true;
                self.listForm = {
                    id: "",
                    service: [],
                };
                self.addopenList();
                self.isAdd = true;
                self.isDisabled = false;
                API.areas(1, 100, 3).then((res) => {
                    self.areaList = res.data;
                });
            },
            // 选择社区
            changeAreaType(value) {
                var self = this;
                self.area_id = value;
                API.notCommission(self.area_id).then((res) => {
                    self.addressList = res;
                });
            },
            // 选择地址
            selectSize(value) {
                var self = this;
                self.address_id = value;
                API.rent(1, 100, self.address_id, 1).then((res) => {
                    self.userList = res.data;
                });
            },
            // 添加
            addopenList() {
                var self = this;
                self.listForm.service.push({});
            },
            // 删除
            delopenList() {
                var self = this;
                self.listForm.service.pop({});
            },
            // 提交
            newList() {
                var self = this;
                self.dialogList = false;
                console.log(self.listForm);
                if (self.isAdd) {
                    API.createCommission(self.listForm).then((res) => {
                        self.$message.success("添加成功！");
                        self.getList(self.current, self.size);
                        self.listForm = {
                            id: "",
                            service: [],
                        };
                    });
                } else {
                    API.createCommission(self.listForm).then((res) => {
                        self.$message.success("提交成功！");
                        self.getList(self.current, self.size);
                    });
                }
            },
            // 关闭添加白名单
            closeList() {
                var self = this;
                self.isAdd = true;
                self.delopenList();
                self.listForm.service = [];
            },

            // 返佣记录
            getCommissionRec(cur, list) {
                var self = this;
                API.commissionRec(cur, list, self.address_id).then((res) => {
                    self.$message.success("获取数据成功！");
                    self.recordDate = res.data;
                    self.recordTotal = res.total;
                });
            },
            handleRec(index, row) {
                var self = this;
                self.dialogRecord = true;
                //   self.user_id = row.user_id;
                self.address_id = row.address_id;
                self.recordCurrent = 1;
                self.getCommissionRec(self.recordCurrent, self.recordSize);
            },
            // 分页
            recordCurrentChange(val) {
                var self = this;
                self.recordCurrent = val;
                self.getCommissionRec(val, self.recordSize);
            },
            recordSizeChange(val) {
                var self = this;
                self.recordSize = val;
                self.getCommissionRec(1, val);
                self.recordCurrent = 1;
            },

            // 佣金来源
            getCommissionRecord(cur, list) {
                var self = this;
                API.commissionRecord(cur, list, self.address_id).then(
                    (res) => {
                        self.$message.success("获取数据成功！");
                        self.recDate = res.data;
                        self.recTotal = res.total;
                    }
                );

            },
            handleSource(index, row) {
                var self = this;
                self.dialogRec = true;
                self.address_id = row.address_id;
                self.recCurrent = 1;
                self.getCommissionRecord(self.recCurrent, self.recSize);
            },
            recCurrentChange(val) {
                var self = this;
                self.recCurrent = val;
                self.getCommissionRecord(val, self.recSize);
            },
            recSizeChange(val) {
                var self = this;
                self.recSize = val;
                self.getCommissionRecord(1, val);
                self.recCurrent = 1;
            },

            // 编辑
            handleEdit(index, row) {
                let self = this;
                self.dialogList = true;
                self.listForm = {
                    id: row.id,
                    service: [{
                        address_id: row.address_id,
                        money: row.money,
                        state: row.state,
                        user_id: row.user_id,
                    }],
                };
                self.isAdd = false;
                self.isDisabled = true;
            },

            // 删除
            handleDel(index, row) {
                var self = this;
                self.dialogDel = true;
                self.id = row.id;
            },
            toDel() {
                var self = this;
                API.delCommission(self.id).then((res) => {
                    self.$message.success("删除成功！");
                    self.dialogDel = false;
                    self.getList(self.current, self.size);
                });
            },

            // 启用返现功能
            handleUsing(index, row) {
                var self = this;
                console.log(row);
                self.listForm = {
                    id: row.id,
                    service: [{
                        state: 1,
                    }],
                };
                self.dialogUsing = true;
            },
            toUsing() {
                var self = this;
                API.createCommission(self.listForm).then((res) => {
                    self.$message.success("启用成功！");
                    self.dialogUsing = false;
                    self.getList(self.current, self.size);
                    self.listForm.service = [];
                });
            },

            // 禁用返现功能
            handleBan(index, row) {
                var self = this;
                console.log(row);
                self.listForm = {
                    id: row.id,
                    service: [{
                        state: 2,
                    }],
                };
                self.dialogBan = true;
            },
            toBan() {
                var self = this;
                API.createCommission(self.listForm).then((res) => {
                    self.$message.success("禁用成功！");
                    self.dialogBan = false;
                    self.getList(self.current, self.size);
                    self.listForm.service = [];
                });
            },

            // 手动返现
            handleRefund(index, row) {
                var self = this;
                self.address_id = row.address_id;
                row.state == 1 ? self.dialogRefund = true : self.$message.warning("该用户已经被禁用返现功能, 请先开启功能! ");
            },
            // 返现
            toRefund() {
                var self = this;
                const loading = self.$loading({
                    lock: true,
                    text: "返现中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                API.payCommission(self.address_id)
                    .then((res) => {
                        if (res.code == 10004) {
                            loading.close();
                        } else {
                            self.$message.success("返现成功！");
                            loading.close();
                            self.dialogRefund = false;
                        }
                    })
                    .catch((err) => {
                        loading.close();
                    });
            },
            refresh() {
                this.reload();
            },
        },
    };
</script>

<style lang="scss" scoped>
    .ipt {
        width: 220px;
    }
</style>