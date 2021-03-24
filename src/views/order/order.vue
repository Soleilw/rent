<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="box">
            <div class="handle-box">
                <div class="btn">
                    <el-input v-model="keyword" placeholder="输入房屋地址" class="input-with-select"
                        @keyup.enter.native="search(keyword)">
                        <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                    </el-input>
                </div>
                <div class="btn">
                    <div class="tip">总金额: {{totalMoney}}</div>
                </div>
            </div>
            <el-table :data="orderData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
                <el-table-column prop="no" label="订单ID"></el-table-column>
                <el-table-column prop="user_id" label="用户ID"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="商品价格"></el-table-column>
                <el-table-column prop="addresses_text" label="地址"></el-table-column>
                <el-table-column prop="status" label="订单状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">提交</span>
                        <span v-else-if="scope.row.status == 2">已付款</span>
                        <span v-else-if="scope.row.status == 3">未付款</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @current-change="orderCurrentChange" :current-page.sync="orderCurrent"
                    :page-sizes="[10, 20, 30, 40, 50]" :page-size="orderSize" layout="sizes, prev, pager, next, jumper"
                    :total="orderTotal" @size-change="orderSizeChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "@/api/index.js";

    export default {
        data() {
            return {
                loading: true,
                orderData: [],
                keyword: '',
                orderSize: 10,
                orderTotal: 0,
                orderCurrent: 1,
                totalMoney: 0
            }
        },

        mounted() {
            this.getServer()
        },

        methods: {
            getServer(cur, list, keyword) {
                var self = this;
                API.server(cur, list, '', keyword).then((res) => {
                    self.$message.success("获取数据成功");
                    self.orderData = res.data;
                    self.orderTotal = res.total;
                    self.totalMoney = res.money;
                    self.loading = false;
                }).catch(err => {
                    self.loading = false;
                });
            },
            search() {
                var self = this;
                self.orderCurrent = 1;
                self.loading = true;
                self.getServer(self.orderCurrent, self.orderSize, self.keyword);
            },
            handleOrder(index, row) {
                var self = this;
                self.showServiceOrder = true;
                self.keyword = "";
                self.orderCurrent = 1;
                self.getServer(self.orderCurrent, self.orderSize);
            },
            // 订单列表分页
            orderCurrentChange(val) {
                var self = this;
                self.orderCurrent = val;
                self.loading = true;
                if (self.keyword == "") {
                    self.getServer(val, self.orderSize);
                } else {
                    self.getServer(val, self.orderSize, self.keyword);
                }
            },
            // 当前分页
            orderSizeChange(val) {
                var self = this;
                self.loading = true;
                if (self.keyword == "") {
                    self.getServer(1, val);
                } else {
                    self.getServer(1, val, self.keyword);
                }
                self.orderCurrent = 1;
            },
        },
    }
</script>

<style lang="scss" scoped>
.tip {
    height: 40px;
    line-height: 40px;
    color: red;
    font-size: 28px;
}
</style>