<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- 搜索框 -->
    <div class="handle-box">
      <div class="btn">
        <el-input
          v-model="renter_name"
          placeholder="输入用户名/地址"
          class="input-with-select"
          @keyup.enter.native="search(renter_name)"
        >
          <el-select
            v-model="type"
            placeholder="请选择搜索方式"
            @change="changeType"
            slot="prepend"
            style="width: 150px"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search(renter_name)"
          ></el-button>
          <el-button
            slot="append"
            icon="el-icon-refresh"
            @click="refresh"
          ></el-button>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addUser">添加白名单</el-button>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      empty-text="暂无数据"
      border
      :header-cell-style="{ background: '#f0f0f0' }"
      max-height="620"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="address_id" label="地址ID"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="250px"
      ></el-table-column>
      <el-table-column prop="name" label="绑定用户"></el-table-column>
      <el-table-column prop="type" label="身份类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">户主</span>
          <span v-else-if="scope.row.type == 2">租客</span>
          <span v-else-if="scope.row.type == 3">家庭成员</span>
          <span v-else-if="scope.row.type == 4">物业</span>
        </template>
      </el-table-column>
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
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleRec(scope.$index, scope.row)"
                  >返现记录</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleRefund(scope.$index, scope.row)"
                  >手动返现</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleBan(scope.$index, scope.row)"
                  >禁用</el-button
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleBan(scope.$index, scope.row)"
                  >删除</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加白名单 -->
    <el-dialog
      title="添加白名单"
      :visible.sync="dialogList"
      :close-on-click-modal="false"
      width="800px"
      @close="closeList"
    >
      <div class="box">
        <el-form :model="listForm">
          <div v-for="(item, index) in listForm.service" :key="index">
            <el-form-item>
              <span>选择社区：</span>
              <el-select
                v-model="item.area_id"
                placeholder="请选择社区"
                @change="changeAreaType"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.index"
                  :label="item.title"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择地址">
              <el-select
                v-model="item.address_id"
                @change="selectSize"
                filterable
                placeholder="选择地址"
              >
                <el-option
                  v-for="item in addressList"
                  :label="item.address"
                  :value="item.id"
                  :key="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择用户">
              <el-select
                v-model="item.user_id"
                @change="selectUser"
                placeholder="请选择用户"
              >
                <el-option
                  v-for="item in userList"
                  :label="`${item.snapshot.name + '/' + item.typeString}`"
                  :value="`${item.user_id + '/' + item.id}`"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择身份">
              <el-select v-model="item.type" placeholder="请选择身份类型">
                <el-option
                  v-for="item in tyList"
                  :label="item.name"
                  :value="item.type"
                  :key="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="输入金额">
              <div class="btn">
                <el-input
                  v-model="item.money"
                  placeholder="请输入金额"
                  class="input-with-select ipt"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="返现状态">
              <el-select v-model="item.state" placeholder="请选择状态">
                <el-option
                  v-for="item in stateList"
                  :label="item.name"
                  :value="item.value"
                  :key="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="操作">
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

    <!-- 返现记录 -->
    <el-dialog title="返现记录" :visible.sync="dialogRec">
      <el-table
        :data="recordDate"
        empty-text="暂无数据"
        border
        :header-cell-style="{ background: '#f0f0f0' }"
        max-height="620"
      >
        <el-table-column prop="id" label="记录ID"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="name" label="绑定用户"></el-table-column>
        <el-table-column prop="money" label="返现金额"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
        <el-pagination
          @current-change="recordCurrentChange"
          :current-page.sync="recordCurrent"
          :page-size="recordSize"
          layout="sizes, prev, pager, next, jumper"
          :total="recordTotal"
          @size-change="recordSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 手动返现 -->
    <el-dialog
      :visible.sync="dialogRefund"
      title="返现"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
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
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="current"
        :page-size="size"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
      ></el-pagination>
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
      renter_name: "",
      type: 2,
      typeList: [
        {
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
      dialogRefund: false,
      listForm: {
        service: [],
      },
      addressList: [],
      userList: [],
      tyList: [
        {
          // 身份类型列表
          name: "户主",
          type: 1,
        },
        {
          name: "租客",
          type: 2,
        },
        {
          name: "家庭成员",
          type: 3,
        },
        {
          name: "物业",
          type: 4,
        },
      ],
      monList: [],
      stateList: [
        {
          name: "启用返现",
          value: 1,
        },
        {
          name: "禁用返现",
          value: 2,
        },
      ],
      price: "",
      addressName: "",
      name: "",
      list: [],
      area: "",
      areaList: [],
      lets: "",
      letList: [],
      // address_id: "",
      typeDisabled: true,
      id: "",
      user_id: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var self = this;
      API.withdraws(self.current, self.size)
        .then((res) => {
          console.log(res);
          self.loading = false;
          self.tableData = res.data;
        })
        .catch((err) => {
          self.loading = false;
        });
    },
    currentChange(val) {
      var self = this;
      self.current = val;
      self.loading = true;
      if (self.renter_name) {
        switch (self.type) {
          case 1:
            var keyword = self.renter_name;
            API.withdraws(val, self.size, name, keyword)
              .then((res) => {
                self.loading = false;
                res.data.forEach((item) => {
                  if (item.expireTime) {
                    item.expireTime = item.expireTime.slice(0, 10);
                  }
                });
                self.tableData = res.data;
                self.total = res.total;
              })
              .catch((err) => {
                self.loading = false;
                console.log(err);
              });
            break;
          case 2:
            var name = self.renter_name;
            API.withdraws(val, self.size, name, keyword)
              .then((res) => {
                self.loading = false;
                res.data.forEach((item) => {
                  if (item.expireTime) {
                    item.expireTime = item.expireTime.slice(0, 10);
                  }
                });
                self.tableData = res.data;
                self.total = res.total;
              })
              .catch((err) => {
                self.loading = false;
                console.log(err);
              });
        }
      } else {
        API.withdraws(val, self.size)
          .then((res) => {
            self.loading = false;
            res.data.forEach((item) => {
              if (item.expireTime) {
                item.expireTime = item.expireTime.slice(0, 10);
              }
            });
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
            console.log(err);
          });
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
            API.withdraws(self.current, val, name, keyword)
              .then((res) => {
                self.loading = false;
                res.data.forEach((item) => {
                  if (item.expireTime) {
                    item.expireTime = item.expireTime.slice(0, 10);
                  }
                });
                self.tableData = res.data;
                self.total = res.total;
              })
              .catch((err) => {
                self.loading = false;
                console.log(err);
              });
            break;
          case 2:
            var name = self.renter_name;
            API.withdraws(self.current, val, name, keyword)
              .then((res) => {
                self.loading = false;
                res.data.forEach((item) => {
                  if (item.expireTime) {
                    item.expireTime = item.expireTime.slice(0, 10);
                  }
                });
                self.tableData = res.data;
                self.total = res.total;
              })
              .catch((err) => {
                self.loading = false;
                console.log(err);
              });
        }
      } else {
        API.withdraws(self.current, val)
          .then((res) => {
            self.loading = false;
            res.data.forEach((item) => {
              if (item.expireTime) {
                item.expireTime = item.expireTime.slice(0, 10);
              }
            });
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
            console.log(err);
          });
      }
    },

    // 选择社区
    changeAreaType(value) {
      var self = this;
      self.area_id = value;
      API.addresses(1, 100, self.area_id).then((res) => {
        self.addressList = res.data;
        self.list = self.addressList.map((item) => {
          return {
            label: ` ${item.address}`,
          };
        });
      });
    },
    // 选择地址
    selectSize(value) {
      var self = this;
      console.log(value);
      // self.address_id = value;
      let obj = {};
      obj = this.list.find((item) => {
        return item;
      });
      console.log(obj);
      self.addressName = obj.label;
      API.rent(1, 100, self.addressName).then((res) => {
        self.userList = res.data;
      });
    },

    // 搜索
    changeType(val) {
      var self = this;
      self.typeDisabled = true;
      self.renter_name = "";
      self.current = 1;
      self.getList();
    },
    search() {
      var self = this;
      self.current = 1;
      self.size = 10;
      if (self.type == 1) {
        var keyword = self.renter_name;
        API.withdraws(self.current, self.size, name, keyword).then((res) => {
          self.tableData = res.data;
          self.total = res.total;
          self.$message.success("搜索成功！");
        });
      }
      if (self.type == 2) {
        var name = self.renter_name;
        API.withdraws(self.current, self.size, name, keyword).then((res) => {
          self.tableData = res.data;
          self.total = res.total;
          self.$message.success("搜索成功！");
        });
      }
    },

    selectUser(value) {
      console.log(value);
      var self = this;
      var arr = {};

      self.arr = self.userList.map((item) => {
        return {
          label: ` ${item.type}`,
        };
      });
      console.log(self.type);
      // let obj = {};
      // debugger;
      // obj = this.userList.find((item) => {
      //   return item;
      // });
      // debugger;
      // console.log(this.obj);
    },

    // 添加白名单
    addUser() {
      var self = this;
      self.dialogList = true;
      self.addopenList();
      API.areas(1, 100, 3).then((res) => {
        self.areaList = res.data;
      });
    },
    addopenList() {
      var self = this;
      self.listForm.service.push({});
    },
    delopenList() {
      var self = this;
      self.listForm.service.pop({});
    },
    closeList() {
      var self = this;
      self.delopenList();
      self.listForm.service = [];
    },
    // 提交
    newList() {
      var self = this;
      self.dialogList = false;
      console.log(self.listForm);
      API.createRaw(self.listForm).then((res) => {
        console.log(111);
        self.$message.success("添加成功！");
        self.getList();
      });
    },

    // 返现记录
    handleRec(index, row) {
      var self = this;
      self.dialogRec = true;
      self.user_id = row.user_id;
      self.recordCurrent = 1;
      API.withdrawsRec(self.recordCurrent, self.recordSize, self.user_id).then(
        (res) => {
          self.$message.success("获取数据成功！");
          self.recordDate = res.data;
          self.recordTotal = res.total;
        }
      );
    },
    recordCurrentChange(val) {
      var self = this;
      self.recordCurrent = val;
      API.withdrawsRec(val, self.recordSize, self.user_id).then((res) => {
        console.log(res);
        self.recordDate = res.data;
        self.recordTotal = res.total;
      });
    },
    recordSizeChange(val) {
      var self = this;
      self.recordSize = val;
      API.withdrawsRec(self.recordCurrent, val, self.user_id).then((res) => {
        console.log(res);
        self.recordDate = res.data;
        self.recordTotal = res.total;
      });
    },
    // 手动返现
    handleRefund(index, row) {
      var self = this;
      self.dialogRefund = true;
      console.log(row);
      self.id = row.id;
    },
    // 返现
    toRefund() {
      var self = this;
      API.withdraw(self.id).then((res) => {
        self.$message.success("返现成功！");
        self.dialogRefund = false;
      });
    },
    // 编辑
    handleEdit(index, row) {
      var self = this;
      self.dialogList = true;
      // self.listForm.service.push(row)

      console.log(self.listForm);
    },

    // 禁用
    handleBan() {},

    refresh() {
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  margin-bottom: 20px;
}
.ipt {
  width: 220px;
}
</style>