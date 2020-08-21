<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
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
            style="width: 150px;"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search(renter_name)"></el-button>
        </el-input>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      empty-text="暂无数据"
      border
      :header-cell-style="{background:'#f0f0f0'}"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="snapshot.name" label="用户名"></el-table-column>
      <el-table-column prop="typeString" label="用户身份"></el-table-column>
      <el-table-column prop="snapshot" label="人脸照片">
        <template slot-scope="scope">
          <div v-if="scope.row.snapshot">
            <el-popover placement="top-start" title trigger="click">
              <img :src="scope.row.snapshot.href" style="max-width:800px;max-height:800px;" />
              <img
                slot="reference"
                :src="scope.row.snapshot.href"
                style="max-width:180px;max-height:80px;"
              />
            </el-popover>
          </div>
          <div v-else>
            <span>--暂无图片--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="snapshot.phone" label="手机号" width="150px"></el-table-column>
      <el-table-column prop="snapshot.card_number" label="身份证" width="180px"></el-table-column>
      <el-table-column prop="address.address" label="房屋地址" width="250px"></el-table-column>
      <el-table-column prop="expireTime" label="进出服务到期时间" width="180px"></el-table-column>
      <el-table-column prop="room" width="120px" label="房屋编号"></el-table-column>
      <el-table-column prop="state" width="120px" label="审核状态">
        <template slot-scope="scope">
          <div v-if="scope.row.state == 1">
            <span>待审核</span>
          </div>
          <div v-if="scope.row.state == 2">
            <span style="color: green;">已通过</span>
          </div>
          <div v-if="scope.row.state == 3">
            <span style="color: red;">未通过</span>
          </div>
        </template>
      </el-table-column>
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
                  @click="handleLogs(scope.$index, scope.row)"
                >进出记录</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="scope.row.state == 1"
                  @click="handleAudit(scope.$index, scope.row)"
                >审核</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="primary"
                  v-if="isShow"
                  @click="openServe(scope.$index, scope.row)"
                >开通服务</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="success"
                  @click="openedServe(scope.$index, scope.row)"
                >已开通的服务</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="success"
                  size="mini"
                  @click="handleFace(scope.$index, scope.row)"
                >开通人脸</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleForbidden(scope.$index, scope.row)"
                >禁用人脸</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs">
      <div class="box">
        <el-table :data="logsData" border :header-cell-style="{background:'#f0f0f0'}">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="number" label="证件号"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="direction" label="进出状态">
            <template slot-scope="scope">
              <span v-if="scope.row.direction == 1">进入</span>
              <span v-else-if="scope.row.direction == 2">外出</span>
            </template>
          </el-table-column>
          <el-table-column prop="image" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.image">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.image" style="max-width:800px;max-height:800px;" />
                  <img
                    slot="reference"
                    :src="scope.row.image"
                    style="max-width:180px;max-height:80px;"
                  />
                </el-popover>
              </div>
              <div v-else>
                <span>--暂无图片--</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentLogs"
          :current-page.sync="currentLogsPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSizeLogs"
          layout="sizes, prev, pager, next, jumper"
          :total="totalLogsPage"
          @size-change="handleSizeLogs"
        ></el-pagination>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogAudit" title="审核" width="20%" align="center">
      <div style="font-size: 20px; margin-bottom: 30px;">是否通过审核</div>
      <span>
        <el-button type="primary" @click="toAudit">通过</el-button>
        <el-button type="danger" @click="unAudit">不通过</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="dialogDel"
      title="删除住户"
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

    <!-- 禁用人脸 -->
    <el-dialog
      :visible.sync="dialogForbidden"
      title="禁用人脸"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否禁用人脸</div>
      <span>
        <el-button type="primary" @click="forbiddenFace">禁用</el-button>
        <el-button type="danger" @click="dialogForbidden = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 开通人脸 -->
    <el-dialog
      :visible.sync="dialogFace"
      title="开通人脸"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否开通人脸</div>
      <span>
        <el-button type="primary" @click="pushFace">开通</el-button>
        <el-button type="danger" @click="dialogFace = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 开通服务 -->
    <el-dialog
      title="开通服务"
      :visible.sync="dialogOpenServe"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">
        <el-select v-model="title" placeholder="请选择需要开通的服务" @change="serveChange">
          <el-option
            v-for="item in serviceLists"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <div>
        <el-button type="primary" @click="toConfirm">确定</el-button>
        <el-button type="danger" @click="dialogOpenServe = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 已开通服务 -->
    <el-dialog title="进出记录" :visible.sync="dialogOpenedServe">
      <div class="box">
        <el-table :data="serviceList" border :header-cell-style="{background:'#f0f0f0'}">
          <el-table-column prop="id" label="订单ID"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="time" label="商品有效期(天)"></el-table-column>
          <el-table-column prop="expireTime" label="到期时间"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/index.js";
import { log } from "util";

export default {
  data() {
    return {
      loading: true,
      form: {
        identity: "",
      },

      tableData: [], // 表格数据
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,

      dialogLogs: false, // 进出记录
      logsData: [],
      currentLogsPage: 1, // 分页--进出记录
      pageSizeLogs: 10,
      totalLogsPage: 0,
      dialogAudit: false, // 审核
      renter_id: "", // 住户id
      renter_name: "", // 搜索
      id: "", // 删除id
      dialogDel: false,
      dialogOpenServe: false,
      dialogOpenedServe: false,
      serviceLists: [],
      serviceList: [],
      title: "",
      product_id: "",
      serveForm: {
        user_id: "",
        area_id: "",
        product_id: "",
        address_id: "",
      },
      user_id: "",
      addresses_id: "",
      face_id: "",
      username: localStorage.getItem("username"),
      isShow: false,
      type: 2, // 选中的搜索方式
      typeList: [
        {
          // 搜索方式
          value: 1,
          label: "按地址搜索",
        },
        {
          value: 2,
          label: "按用户名搜索",
        },
      ],
      typeDisabled: false,
      dialogForbidden: false,
      forbidden_id: "",
      dialogFace: false,
      openFace_id: "",
      member_type: "",
      card_number: ''
    };
  },
  mounted() {
    this.getAllRent();
    if (this.username == "admin") {
      this.isShow = true;
    }
  },
  methods: {
    getAllRent() {
      var self = this;
      API.households(self.currentPage, self.pageSize)
        .then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
          self.loading = false;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    changeType(val) {
      var self = this;
      self.typeDisabled = true;
      self.renter_name = "";
      self.currentPage = 1;
      self.getAllRent();
    },

    // 搜索
    search() {
      var self = this;
      self.currentPage = 1;
      self.pageSize = 10;
      if (self.type == 1) {
        var keyword = self.renter_name;
        API.searchAddress(self.currentPage, self.pageSize, keyword).then(
          (res) => {
            self.tableData = res.data;
            self.totalPage = res.total;
            self.$message.success("搜索成功！");
          }
        );
      }
      if (self.type == 2) {
        var name = self.renter_name;
        API.searchHousehold(self.currentPage, self.pageSize, name).then(
          (res) => {
            self.tableData = res.data;
            self.totalPage = res.total;
            self.$message.success("搜索成功！");
          }
        );
      }
    },
    handleFace(index, row) {
      var self = this;
      self.openFace_id = row.id;
      self.dialogFace = true;
    },
    pushFace() {
      var self = this;
      API.pushFace(self.openFace_id).then((res) => {
        self.dialogFace = false;
        self.$message.success("开通成功");
      });
    },
    handleForbidden(index, row) {
      var self = this;
      console.log(row);
      self.forbidden_id = row.id;
      self.dialogForbidden = true;
    },
    forbiddenFace() {
      var self = this;
      API.failFace(self.forbidden_id).then((res) => {
        self.dialogForbidden = false;
        self.$message.success("禁用成功");
      });
    },

    // 审核
    handleAudit(index, row) {
      var self = this;
      console.log(row);
      self.renter_id = row.id;
      self.member_type = row.type;
      self.card_number = row.snapshot.card_number
      self.dialogAudit = true;
    },
    toAudit() {
      var self = this;
      if (self.member_type == 3) {
        API.auditFamily(self.renter_id, 2, self.card_number).then((res) => {
          self.$message.success("提交成功");
          self.dialogAudit = false;
          self.getAllRent();
        });
      } else {
        API.audit(self.renter_id, 2, 1).then((res) => {
          self.$message.success("提交成功");
          self.dialogAudit = false;
          self.getAllRent();
        });
      }
    },
    unAudit() {
      var self = this;
      API.audit(self.renter_id, 3, 1).then((res) => {
        self.$message.success("提交成功");
        self.dialogAudit = false;
        self.getAllRent();
      });
    },
    serveChange(val) {
      var self = this;
      self.serveForm.product_id = val;
      console.log(self.serveForm.product_id);
    },
    // 开通服务
    openServe(index, row) {
      var self = this;
      console.log("openServe", index);
      console.log("openServe", row);
      self.dialogOpenServe = true;
      self.serveForm = {
        user_id: row.user_id,
        areas_id: row.address.area_id,
        product_id: self.product_id,
        addresses_id: row.address_id,
      };
      API.buys().then((res) => {
        console.log(res);
        self.serviceLists = res.data;
      });
    },
    // 已开通服务
    openedServe(index, row) {
      var self = this;
      self.dialogOpenedServe = true;
      console.log("openedServe", row);
      self.user_id = row.user_id;
      self.addresses_id = row.address_id;
      API.userServes(self.user_id, self.addresses_id).then((res) => {
        console.log(res);
        self.serviceList = res;
      });
    },

    toConfirm() {
      var self = this;
      console.log(self.serveForm);
      API.setProduct(self.serveForm).then((res) => {
        console.log("toConfirm", res);
        self.$message.success("开通成功！");
        self.dialogOpenServe = false;
        self.title = "";
      });
    },
    handleLogs(index, row) {
      var self = this;
      self.dialogLogs = true;
      self.face_id = row.face_id;
      console.log(row);
      self.getFaceLogs();
    },

    // 进出记录
    getFaceLogs() {
      var self = this;
      API.faceLogs(self.currentLogsPage, self.pageSizeLogs, self.face_id).then(
        (res) => {
          console.log("getFaceLogs", res);
          self.logsData = res.data;
          self.totalLogsPage = res.total;
        }
      );
    },

    handleDel(index, row) {
      var self = this;
      self.id = row.id;
      self.dialogDel = true;
    },
    toDel() {
      var self = this;
      API.delHousehold(self.id).then((res) => {
        self.$message.success("删除成功");
        self.dialogDel = false;
        self.getAllRent();
      });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      if (self.renter_name) {
        switch (self.type) {
          case 1:
            var keyword = self.renter_name;
            API.searchAddress(val, self.pageSize, keyword).then((res) => {
              self.tableData = res.data;
              self.totalPage = res.total;
            });
            break;
          case 2:
            var name = self.renter_name;
            API.searchHousehold(val, self.pageSize, name).then((res) => {
              self.tableData = res.data;
              self.totalPage = res.total;
            });
        }
      } else {
        API.households(val, self.pageSize).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        });
      }
    },

    // 每页几条
    handleSizeChange(val) {
      var self = this;
      self.pageSize = val;
      if (self.renter_name) {
        switch (self.type) {
          case 1:
            var keyword = self.renter_name;
            API.searchAddress(1, val, keyword).then((res) => {
              self.tableData = res.data;
              self.totalPage = res.total;
            });
            break;
          case 2:
            var name = self.renter_name;
            API.searchHousehold(1, val, name).then((res) => {
              self.tableData = res.data;
              self.totalPage = res.total;
            });
        }
      } else {
        API.households(self.currentPage, val).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
          self.currentPage = 1;
        });
      }
    },

    // 进出记录
    handleCurrentLogs(val) {
      var self = this;
      self.currentLogsPage = val;
      API.faceLogs(val, self.pageSizeLogs, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },

    handleSizeLogs(val) {
      var self = this;
      self.pageSizeLogs = val;
      API.faceLogs(self.currentLogsPage, val, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },
  },
};
</script>

<style>
</style>

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