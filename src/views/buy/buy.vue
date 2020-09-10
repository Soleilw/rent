<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addBuy">添加购买服务</el-button>
      </div>
    </div>
    <el-dialog title="添加购买服务" :visible.sync="dialogBuy">
      <div class="box">
        <el-form :model="form" label-width="100px">
          <el-form-item label="选择服务">
            <el-checkbox v-model="checkAll" @change="handleCheckAllService">全选</el-checkbox>
            <div class="service">
              <div v-for="(item,index) in serviceList" :key="index">
                <el-checkbox-group v-model="form.service" class="service-item">
                  <el-checkbox :label="item" :true-labe="item.title" @change="oneChange(item.title)">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="商品时长">
            <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="form.detail"></el-input>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newBuy" v-if="isAdd">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="订单列表" :visible.sync="showServiceOrder" width="80%">
      <div class="box">
        <div class="handle-box">
          <div class="btn">
            <el-input
              v-model="keyword"
              placeholder="输入房屋地址"
              class="input-with-select"
              @keyup.enter.native="search(keyword)"
            >
              <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
            </el-input>
          </div>
        </div>
        <div>
          <el-table
            :data="orderData"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
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
            <el-pagination
              @current-change="orderCurrentChange"
              :current-page.sync="orderCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="orderSize"
              layout="sizes, prev, pager, next, jumper"
              :total="orderTotal"
              @size-change="orderSizeChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <!-- <el-table-column label="名称" type="selection"></el-table-column> -->
      <el-table-column prop="id" label="商品ID" width="100px"></el-table-column>
      <el-table-column prop="title" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="time" label="商品时长(天)"></el-table-column>
      <el-table-column prop="detail" label="商品描述"></el-table-column>
      <el-table-column prop="service[0].name" label="服务权限"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">查看服务</el-button>
          <el-button size="mini" type="primary" @click="handleOrder(scope.$index,scope.row)">服务订单</el-button>
          <el-button size="mini" type="danger" @click="delService(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="dialogDel"
      title="删除年级"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该住户</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="current"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api//index.js";
import { log } from "util";

export default {
  name: "buy",
  data() {
    return {
      loading: true,
      dialogBuy: false,
      showServiceOrder: false,
      checkAll: false, // 全选
      dialogDel: false,
      serviceIdList: [],
      serviceList: [
        {
          name: "进出服务",
          title: "InAndOut",
        },
      ],
      form: {
        identifier: '',
        title: "",
        price: "",
        detail: "",
        service: [],
        time: "",
      },
      financial: "订单列表",
      financialList: [
        {
          value: 1,
          label: "订单列表",
        },
        {
          value: 2,
          label: "财务统计",
        },
      ],
      orderData: [], // 订单列表
      orderSize: 10,
      orderTotal: 0,
      orderCurrent: 1,

      tableDate: [],
      current: 1,
      total: 0,
      size: 10,

      product_id: "",
      id: "",
      keyword: "",
      isAdd: true,
    };
  },
  mounted() {
    this.getBuys();
  },
  methods: {
    // 获取服务列表
    getBuys() {
      var self = this;
      API.buys(self.current, self.size)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    // 分页
    currentChange(val) {
      var self = this;
      self.current = val;
      self.loading = true;
      API.buys(val, self.size)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    // 每页多少条
    sizeChange(val) {
      var self = this;
      self.size = val;
      self.loading = true;
      API.buys(self.current, val)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },

    // 搜索
    search() {
      var self = this;
      API.server(self.current, self.size, self.product_id, self.keyword).then(
        (res) => {
          self.orderData = res.data;
          self.orderTotal = res.total;
          self.$message.success("搜索成功！");
        }
      );
    },
    // 编辑服务
    newBuy() {
      var self = this;
      console.log("newBuy", self.form);
      API.buy(self.form).then((res) => {
        self.dialogBuy = false;
        self.$message.success("提交成功");
        self.getBuys();
        self.current = 1;
        self.form = {};
        self.form.service = [];
      });
    },

    // 添加购买服务
    addBuy() {
      var self = this;
      self.dialogBuy = true;
      self.checkAll = false;
      self.isAdd = true;
      self.form = {
        identifier: '',
        title: "",
        price: "",
        detail: "",
        service: [],
        time: "",
      };
    },

    // 全选服务
    handleCheckAllService(val) {
      var self = this;
      self.form.service = val ? self.serviceList : [];
      self.form.identifier = 'InAndOut'
      console.log(self.form.identifier);
    },
    oneChange(title) {
      var self = this;
      self.form.identifier = title;
      console.log(title);
      self.form.service.length === 1
        ? (self.checkAll = true)
        : (self.checkAll = false);
    },

    // 操作
    handleEdit(index, row) {
      var self = this;
      self.dialogBuy = true;
      self.isAdd = false
      self.form = row;
      var row_service = [];
      row.service.forEach((item) => {
        row_service.push({
          title: item.title,
          name: item.name,
        });
      });
      self.form.service = row_service;
      self.serviceList = row_service
      row.service.length === 1
        ? (self.checkAll = true)
        : (self.checkAll = false);
    },

    handleOrder(index, row) {
      var self = this;
      self.showServiceOrder = true;
      self.product_id = row.id;
      self.keyword = "";
      API.server(self.current, self.size, self.product_id).then((res) => {
        self.orderData = res.data;
        self.orderTotal = res.total;
        self.orderCurrent = 1;
        self.$message.success("获取数据成功");
      });
    },
    // 订单列表分页
    orderCurrentChange(val) {
      var self = this;
      self.orderCurrent = val;
      if (self.keyword == "") {
        API.server(val, self.orderSize, self.product_id).then((res) => {
          self.orderData = res.data;
          self.orderTotal = res.total;
        });
      } else {
        API.server(val, self.orderSize, self.product_id, self.keyword).then(
          (res) => {
            self.orderData = res.data;
            self.orderTotal = res.total;
          }
        );
      }
    },
    // 当前分页
    orderSizeChange(val) {
      var self = this;
      if (self.keyword == "") {
        API.server(self.orderCurrent, val, self.product_id).then((res) => {
          self.orderData = res.data;
          self.orderTotal = res.total;
        });
      } else {
        API.server(self.orderCurrent, val, self.product_id, self.keyword).then(
          (res) => {
            self.orderData = res.data;
            self.orderTotal = res.total;
          }
        );
      }
    },

    delService(index, row) {
      var self = this;
      self.id = row.id;
      self.dialogDel = true;
    },
    // 删除服务
    toDel() {
      var self = this;
      API.delServer(self.id).then((res) => {
        self.$message.success("删除成功");
        self.dialogDel = false;
        self.getBuys();
      });
    },
  },
};
</script>

<style scoped>
.service {
  display: flex;
  flex-wrap: wrap;
}
.service-item {
  margin: 10px;
  padding: 0 10px;
}
</style>
