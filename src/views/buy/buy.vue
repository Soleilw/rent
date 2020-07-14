<template>
  <!-- v-loading="loading" element-loading-text="拼命加载中" -->
  <div>
    <div class="btn">
      <el-button type="primary" @click="addBuy">添加购买服务</el-button>
    </div>
    <!-- <div class="btn">
      <span>学校：</span>
      <el-select v-model="form.school" placeholder="请选择学校">
        <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>-->

    <el-dialog title="添加购买服务" :visible.sync="dialogBuy">
      <div class="box">
        <el-form :model="form" label-width="100px">
          <!-- <el-form-item label="选择学校">
            <el-select v-model="form.school" placeholder="请选择学校">
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="选择服务">
            <el-checkbox v-model="checkAll" @change="handleCheckAllService">全选</el-checkbox>
            <div class="service">
              <div v-for="(item,index) in serviceList" :key="index">
                <el-checkbox-group v-model="form.service" class="service-item">
                  <el-checkbox :label="item" @change="oneChange">{{item.name}}</el-checkbox>
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
              <el-button type="primary" @click="newBuy">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="订单列表" :visible.sync="showServiceOrder" width="80%">
      <div class="box">
        <div>
          <el-table :data="orderData">
            <el-table-column prop="no" label="订单ID" align="center"></el-table-column>
            <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
            <el-table-column prop="time" label="商品时长" align="center"></el-table-column>
            <el-table-column prop="status" label="订单状态" align="center"></el-table-column>
            <el-table-column prop="create_id" label="创建时间" align="center"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleOrderChange"
              :current-page.sync="currentOrderPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="orderPageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="orderTotalPage"
              @size-change="handleOrderSizeChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-table :data="tableDate">
      <el-table-column label="名称" type="selection" align="center"></el-table-column>
      <el-table-column prop="id" label="商品ID" align="center" width="100px"></el-table-column>
      <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="time" label="商品时长(天)" align="center"></el-table-column>
      <el-table-column prop="detail" label="商品描述" align="center"></el-table-column>
      <el-table-column prop="service[0].name" label="服务权限" align="center"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index,scope.row)">编辑服务</el-button>
          <el-button size="mini" type="success" @click="handleOrder(scope.$index,scope.row)">服务订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api//index.js";

export default {
  name: "buy",
  data() {
    return {
      //   loading: true,
      schoolList: [],
      school: "",
      dialogBuy: false,
      showServiceOrder: false,
      checkAll: false, // 全选
      serviceIdList: [],
      serviceList: [
        {
          title: "InAndOut",
          name: "进出"
        },
        {
          title: "classesNotice",
          name: "班级公告"
        },
        {
          title: "studentLocal",
          name: "学生定位"
        },
        {
          title: "out-inRecord",
          name: "学生进出记录"
        },
        {
          title: "markInquire",
          name: "成绩查询"
        },
        {
          title: "buyLocator",
          name: "购买定位器"
        }
      ],
      form: {
        title: "",
        price: "",
        detail: "",
        service: [],
        school: "",
        time: ""
      },
      financial: "订单列表",
      financialList: [
        {
          value: 1,
          label: "订单列表"
        },
        {
          value: 2,
          label: "财务统计"
        }
      ],
      orderData: [],
      orderPageSize: 10, // 订单列表
      orderTotalPage: 0,
      currentOrderPage: 1,
      tableDate: [],
      currentPage: 1,
      totalPage: 0,
      pageSize: 10
    };
  },
  mounted() {
    this.getBuys();
    // this.getSchool();
  },
  methods: {
    getBuys() {
      var self = this;
      API.buys(self.currentPage, self.pageSize)
        .then(res => {
          self.tableDate = res.data;
          self.totalPage = res.total;
          //   self.loading = false;
        })
        .catch(err => {
          //   self.loading = false;
          console.log(err);
        });
    },
    newBuy() {
      var self = this;
      // if (self.form.price) {
      //   self.form.price = self.form.price * 100;
      // }
      API.buy(self.form).then(res => {
        self.dialogBuy = false;
        self.$message.success("提交成功");
        self.getBuys();
        self.currentPage = 1;
        self.form = {};
        self.form.service = [];
      });
      console.log("new", self.form);
    },
    addBuy() {
      var self = this;
      self.dialogBuy = true;
      self.checkAll = false;

      self.form = {
        title: "",
        price: "",
        detail: "",
        service: [],
        school: "",
        time: ""
      };
    },
    // 获取学校列表
    // getSchool() {
    //   var self = this;
    //   API.schools(self.currentPage, 100, 2).then(res => {
    //     self.schoolList = res.data;
    //   });
    // },

    // 全选服务
    handleCheckAllService(val) {
      var self = this;
      console.log("handleCheckAllService", val);

      self.form.service = val ? self.serviceList : [];
    },
    oneChange() {
      var self = this;
      self.form.service.length === 6
        ? (self.checkAll = true)
        : (self.checkAll = false);
    },
    // 操作
    handleEdit(index, row) {
      var self = this;
      self.dialogBuy = true;
      self.form = row;
      console.log(row);
      row.service.length === 6
        ? (self.checkAll = true)
        : (self.checkAll = false);
    },
    handleOrder(index, row) {
      var self = this;
      self.showServiceOrder = true;
      self.product_id = row.id;
      API.server(1, self.pageSize, self.product_id).then(res => {
        self.orderData = res.data;
        self.orderTotalPage = res.total;
        self.currentOrderPage = 1;
        self.orderData.forEach(item => {
          switch (item.status) {
            case 1:
              item.status = "提交";
              break;
            case 2:
              item.status = "已付款";
              break;
            case 3:
              item.status = "无效";
          }
        });
        self.$message.success("获取数据成功");
      });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.getBuys();
    },
    // 每页多少条
    handleSizeChange(val) {
      var self = this;
      API.buys(self.currentPage, val).then(res => {
        self.tableDate = res.data;
        self.totalPage = res.total;
      });
    },
    // 订单列表分页
    handleOrderChange(val) {
      var self = this;
      self.currentOrderPage = val;
      API.server(val, self.orderPageSize, self.product_id).then(res => {
        self.orderData = res.data;
        self.orderTotalPage = res.total;
        self.orderData.forEach(item => {
          switch (item.status) {
            case 1:
              item.status = "提交";
              break;
            case 2:
              item.status = "已付款";
              break;
            case 3:
              item.status = "无效";
          }
        });
      });
    },
    // 当前分页
    handleOrderSizeChange(val) {
      var self = this;
      API.server(self.currentOrderPage, val, self.product_id).then(res => {
        self.orderData = res.data;
        self.orderTotalPage = res.total;
        self.orderData.forEach(item => {
          switch (item.status) {
            case 1:
              item.status = "提交";
              break;
            case 2:
              item.status = "已付款";
              break;
            case 3:
              item.status = "无效";
          }
        });
      });
    }
  }
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
