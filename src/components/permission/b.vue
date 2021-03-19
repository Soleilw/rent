<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
    </div>

    <el-table :data="tableData" border :header-cell-style="{ background: '#f0f0f0' }">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="角色名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogDel" title="删除角色" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px">是否删除该角色</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>

    <el-dialog title="添加角色" :visible.sync="dialogRole" width="80%" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="120px">
          <el-form-item label="角色名称">
            <el-input v-model="form.title" placeholder="请输入角色名" :disabled="disabledRole"></el-input>
          </el-form-item>
          <el-form-item label="选择权限">
            <el-checkbox v-model="checkAll" @change="AllChange">全选</el-checkbox>
            <div class="permission" style="width: 1200px;">
              <div class="table">
                <div class="th" style="width: 20%;">一级菜单(必选)</div>
                <div class="th" style="width: 20%;">二级菜单</div>
                <div class="th" style="width: 60%;">操作</div>
              </div>
              <el-checkbox-group v-model="form.permissions">
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="permission" @change="oneChange">
                        <span style="font-weight: bold;">权限管理</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;"></div>
                  <div class="tb set" style="width: 60%;">
                    <div class="level2">
                      <el-checkbox label="roleAdd" @change="oneChange" class="permission-span">新增角色</el-checkbox>
                      <el-checkbox label="roleDel" @change="oneChange" class="permission-span">删除角色</el-checkbox>
                      <el-checkbox label="roleEdit" @change="oneChange" class="permission-span">编辑权限</el-checkbox>
                      <!-- <el-checkbox label="roleGet" @change="oneChange" class="permission-span">获取角色列表</el-checkbox> -->
                    </div>
                    <div class="level2">
                      <el-checkbox label="manageAdd" @change="oneChange" class="permission-span">新增管理员</el-checkbox>
                      <el-checkbox label="manageDel" @change="oneChange" class="permission-span">删除管理员</el-checkbox>
                      <el-checkbox label="manageEdit" @change="oneChange" class="permission-span">编辑管理员</el-checkbox>
                      <el-checkbox label="manageGet" @change="oneChange" class="permission-span">管理员列表</el-checkbox>
                      <el-checkbox label="manageResetPwd" @change="oneChange" class="permission-span">重置密码</el-checkbox>
                    </div>
                  </div>
                </div>
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="resident" @change="oneChange">
                        <span style="font-weight: bold;">住户管理</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;"></div>
                  <div class="tb set" style="width: 60%;">
                    <div class="level2">
                      <el-checkbox label="residentGet" @change="oneChange" class="permission-span">获取住户</el-checkbox>
                    </div>
                  </div>
                </div>
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="house" @change="oneChange">
                        <span style="font-weight: bold;">房屋管理</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;">
                    <div class="level2">
                      <el-checkbox label="houses" @change="oneChange">房屋列表</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="renting" @change="oneChange">租赁列表</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="demoIndex" @change="oneChange">信息模板发布</el-checkbox>
                    </div>
                  </div>
                  <div class="tb set" style="width: 60%;">
                    <div class="level2">
                      <el-checkbox label="housesAdd" @change="oneChange" class="permission-span">新增房屋</el-checkbox>
                      <el-checkbox label="housesGet" @change="oneChange" class="permission-span">获取房屋</el-checkbox>
                    </div>
                    <div class="level2">
                      <!-- <el-checkbox label="manageAdd" @change="oneChange" class="permission-span">新增账号</el-checkbox> -->
                    </div>
                    <div class="level2">
                      <!-- <el-checkbox label="healthUserEdit" @change="oneChange" class="permission-span">编辑</el-checkbox> -->
                    </div>
                  </div>
                </div>
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="picture" @change="oneChange">
                        <span style="font-weight: bold;">图文管理</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;">
                    <div class="level2">
                      <el-checkbox label="banner" @change="oneChange">轮播图</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="document" @change="oneChange">资讯管理</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="document" @change="oneChange">文档管理</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="recruit" @change="oneChange">人才招聘</el-checkbox>
                    </div>
                  </div>
                  <div class="tb set" style="width: 60%;">
                    <div class="level2">
                      <el-checkbox label="bannerAdd" @change="oneChange" class="permission-span">添加轮播图</el-checkbox>
                      <el-checkbox label="bannerGet" @change="oneChange" class="permission-span">获取轮播图</el-checkbox>
                      <el-checkbox label="bannerDel" @change="oneChange" class="permission-span">删除轮播图</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="messageAdd" @change="oneChange" class="permission-span">添加资讯</el-checkbox>
                      <el-checkbox label="messageGet" @change="oneChange" class="permission-span">获取资讯</el-checkbox>
                      <el-checkbox label="messageDel" @change="oneChange" class="permission-span">删除资讯</el-checkbox>
                      <el-checkbox label="messageEdit" @change="oneChange" class="permission-span">编辑资讯</el-checkbox>
                      <el-checkbox label="typeAdd" @change="oneChange" class="permission-span">添加资讯类型</el-checkbox>
                      <el-checkbox label="typeGet" @change="oneChange" class="permission-span">获取资讯类型</el-checkbox>
                      <el-checkbox label="typeDel" @change="oneChange" class="permission-span">删除资讯类型</el-checkbox>
                    </div>
                    <div class="level2">
                      <el-checkbox label="documentAdd" @change="oneChange" class="permission-span">添加文档</el-checkbox>
                      <el-checkbox label="documentGet" @change="oneChange" class="permission-span">获取文档</el-checkbox>
                      <el-checkbox label="documentGet" @change="oneChange" class="permission-span">删除文档</el-checkbox>
                      <el-checkbox label="documentEdit" @change="oneChange" class="permission-span">编辑文档</el-checkbox>
                    </div>
                    <div class="level2">
                      <!-- <el-checkbox label="healthUserEdit" @change="oneChange" class="permission-span">编辑</el-checkbox> -->
                    </div>
                  </div>
                </div>
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="buy" @change="oneChange">
                        <span style="font-weight: bold;">购买服务管理</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;"></div>
                  <div class="tb set" style="width: 60%;">
                    <div class="level2">
                      <el-checkbox label="buyAdd" @change="oneChange" class="permission-span">添加购买服务</el-checkbox>
                      <el-checkbox label="compileBuy" @change="oneChange" class="permission-span">编辑服务</el-checkbox>
                      <el-checkbox label="orderServe" @change="oneChange" class="permission-span">服务订单</el-checkbox>
                      <el-checkbox label="checkBuy" @change="oneChange" class="permission-span">查询服务</el-checkbox>
                      <el-checkbox label="delBuy" @change="oneChange" class="permission-span">删除</el-checkbox>
                    </div>
                  </div>
                </div>
                <div class="table">
                  <div class="tb" style="width: 20%;">
                    <div class="level1">
                      <el-checkbox label="order" @change="oneChange">
                        <span style="font-weight: bold;">服务订单列表</span>
                      </el-checkbox>
                    </div>
                  </div>
                  <div class="tb tr" style="width: 20%;"></div>
                  <div class="tb set" style="width: 60%;"></div>
                </div>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newRole">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from "@/api/index.js";
  import {
    log
  } from "util";

  export default {
    data() {
      return {
        loading: true,
        dialogRole: false,
        form: {
          title: "",
          name: "",
          permissions: [],
        },
        stateList: [{
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ],
        tableData: [],

        checkAll: false,
        permissionList: [
          "resident", // 住户管理
          "residentGet", // 获取住户列表

          "house", // 房屋管理
          "houses",
          "housesAdd", // 新增房屋
          "housesGet", // 房屋列表获取
          "renting",

          "picture", // 图文管理
          "banner", // 轮播图
          "bannerAdd",
          "bannerGet",
          "bannerDel",
          "message", // 资讯管理
          "messageAdd",
          "messageGet",
          "messageDel",
          "messageEdit",
          "typeAdd",
          "typeGet",
          "typeDel",
          "document", // 文档管理
          "documentAdd",
          "documentGet",
          "documentDel",
          "documentEdit",

          "buy", // 购买服务管理
          "buyAdd", // 添加购买服务
          "compileBuy", // 编辑服务
          "orderServe", // 服务订单
          "delBuy", // 删除
          "checkBuy", // 查询服务
          "suspected", // 可疑人物

          "permission", // 角色管理
          // "roleGet",
          "roleAdd",
          "roleEdit",
          "roleDel",
          "manageGet",
          "manageAdd",
          "manageEdit",
          "manageDel",
          "manageResetPwd", // 重置密码
          "switch",
          "refund",
          "recruit",
          "demoIndex",
          "order"
        ],
        areaPerson: [
          "resident", // 住户管理
          "residentGet", // 获取住户列表

          "house", // 房屋管理
          "houses",
          "housesAdd", // 新增房屋
          "housesGet", // 房屋列表获取
          "renting",

          "picture", // 图文管理
          "banner", // 轮播图
          "bannerAdd",
          "bannerGet",
          "bannerDel",

          "message", // 资讯管理
          "messageAdd",
          "messageGet",
          "messageDel",
          "messageEdit",
          "typeAdd",
          "typeGet",
          "typeDel",

          "document", // 文档管理
          "documentAdd",
          "documentGet",
          "documentDel",
          "documentEdit",

          "suspected", // 可疑人物

          "permission", // 角色管理
          // "roleGet",
          "roleAdd",
          "roleEdit",
          "roleDel",
          "manageGet",
          "manageAdd",
          "manageEdit",
          "manageDel",
          "manageResetPwd", // 重置密码
          "order"
        ],

        dialogDel: false,
        id: "", // 删除id
        disabledRole: false,
        // 分页
        current: 1,
        size: 10,
        total: 0,
        role: localStorage.getItem("role"),
      };
    },
    mounted() {
      this.getRoles(this.current, this.size);
    },
    methods: {
      getRoles(cur, list) {
        var self = this;
        API.getRole(cur, list)
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
        self.getRoles(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getRoles(1, val);
        self.current = 1;
      },

      addRole() {
        var self = this;
        self.dialogRole = true;
        self.form = {
          title: "",
          name: "",
          permissions: [],
        };
        self.disabledRole = false;
        self.checkAll = true;
        if (self.checkAll === true) {
          self.form.permissions = self.checkAll ? self.permissionList : [];
        }
      },
      newRole() {
        var self = this;
        self.form.name = self.form.title;
        API.role(self.form).then((res) => {
          self.dialogRole = false;
          self.$message.success("提交成功");
          self.getRoles(self.current, self.size);
          self.current = 1;
          self.form = {};
          self.form.permissions = [];
        });
      },
      // 操作
      handleEdit(index, row) {
        var self = this;
        self.dialogRole = true;
        self.disabledRole = true;
        self.form = row;
        self.form.permissions = row.permissions;
        self.checkAll = row.permissions.length >= self.permissionList.length;
      },
      AllChange(val) {
        var self = this;
        if (localStorage.getItem("username") == "admin" && self.form.name == "admin") {
          self.form.permissions = val ? self.permissionList : [];
        } else {
          self.form.permissions = val ? self.areaPerson : [];
        }
      },
      oneChange(val) {
        var self = this;
        console.log(self.form.permissions);
        self.checkAll =
          self.form.permissions.length >= self.permissionList.length;
      },

      handleDel(index, row) {
        var self = this;
        self.dialogDel = true;
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.delRole(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getRoles(self.current, self.size);
        });
      },
    },
  };
</script>

<style scoped>
  /* .permission {
    display: flex;
    flex-wrap: wrap;
  }

  .permission-item {
    margin: 10px;
    padding: 0 10px;
  } */
  .permission {

    border: 1px #ccc solid;
  }

  .table {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px #ccc solid;

    padding-left: 20px;

  }

  .th {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-weight: bold;
    /* border-right: 1px #ccc solid; */
  }

  .tb {
    padding-left: 20px;
    /* border-right: 1px #ccc solid; */
  }

  .tr {
    display: flex;
    flex-wrap: wrap;
  }

  .set {
    display: flex;
    flex-direction: column;
  }

  .level1 {

    height: 50px;
    line-height: 50px;

  }

  .level2 {
    padding-left: 20px;
    /* border-right: 1px #ccc solid; */
    /* border-bottom: 1px #ccc solid; */
    width: 100%;
  }

  .permission-item {
    margin: 10px;
    padding: 0 10px;
  }

  .permission-span {
    width: 120px;
  }

  .step {
    width: 800px;
  }
</style>