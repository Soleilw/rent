<template>
  <div>
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
    </div>

    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="角色名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogDel"
      title="删除角色"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该角色</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>

    <el-dialog title="添加角色" :visible.sync="dialogRole" width="50%" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="120px">
          <el-form-item label="角色名称">
            <el-input v-model="form.title" placeholder="请输入角色名" :disabled="disabledRole"></el-input>
          </el-form-item>
          <!-- 					<el-form-item label="角色名称(中文)">
						<el-input v-model="form.name" placeholder="请输入角色名" :disabled="disabledRole"></el-input>
          </el-form-item>-->
          <el-form-item label="选择权限">
            <el-checkbox v-model="checkAll" @change="AllChange">全选</el-checkbox>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="resident" @change="oneChange" border>
                  <span style="font-weight: bold;">住户管理页</span>
                </el-checkbox>
                <el-checkbox label="residentGet" @change="oneChange">获取住户</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="house" @change="oneChange" border>
                  <span style="font-weight: bold;">房屋管理页</span>
                </el-checkbox>
                <el-checkbox label="houses" @change="oneChange">房屋列表</el-checkbox>
                <el-checkbox label="housesAdd" @change="oneChange">新增房屋</el-checkbox>
                <el-checkbox label="housesGet" @change="oneChange">获取房屋</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="picture" @change="oneChange" border>
                  <span style="font-weight: bold;">图文管理</span>
                </el-checkbox>
                <el-checkbox label="banner" @change="oneChange">轮播图</el-checkbox>
                <el-checkbox label="bannerAdd" @change="oneChange">添加轮播图</el-checkbox>
                <el-checkbox label="bannerGet" @change="oneChange">获取轮播图</el-checkbox>
                <el-checkbox label="bannerDel" @change="oneChange">删除轮播图</el-checkbox>
                <el-checkbox label="document" @change="oneChange">文档管理</el-checkbox>
                <el-checkbox label="documentAdd" @change="oneChange">添加文档</el-checkbox>
                <el-checkbox label="documentGet" @change="oneChange">获取文档</el-checkbox>
                <el-checkbox label="documentDel" @change="oneChange">删除文档</el-checkbox>
                <el-checkbox label="documentEdit" @change="oneChange">编辑文档</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="message" @change="oneChange" border>
                  <span style="font-weight: bold;">资讯管理</span>
                </el-checkbox>
                <el-checkbox label="message" @change="oneChange">资讯管理</el-checkbox>
                <el-checkbox label="messageAdd" @change="oneChange">添加资讯</el-checkbox>
                <el-checkbox label="messageGet" @change="oneChange">获取资讯</el-checkbox>
                <el-checkbox label="messageDel" @change="oneChange">删除资讯</el-checkbox>
                <el-checkbox label="messageEdit" @change="oneChange">编辑</el-checkbox>
                <el-checkbox label="typeAdd" @change="oneChange">添加资讯类型</el-checkbox>
                <el-checkbox label="typeGet" @change="oneChange">获取资讯类型</el-checkbox>
                <el-checkbox label="typeDel" @change="oneChange">删除</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="permission" @change="oneChange" border>
                  <span style="font-weight: bold;">角色管理页</span>
                </el-checkbox>
                <el-checkbox label="roleAdd" @change="oneChange">新增角色</el-checkbox>
                <el-checkbox label="roleDel" @change="oneChange">删除角色</el-checkbox>
                <el-checkbox label="roleEdit" @change="oneChange">编辑权限</el-checkbox>
                <el-checkbox label="roleGet" @change="oneChange">获取角色列表</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission" style="margin-left: 140px;">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="manageAdd" @change="oneChange">新增管理员</el-checkbox>
                <el-checkbox label="manageDel" @change="oneChange">删除管理员</el-checkbox>
                <el-checkbox label="manageEdit" @change="oneChange">编辑管理员</el-checkbox>
                <el-checkbox label="manageGet" @change="oneChange">管理员列表</el-checkbox>
                <el-checkbox label="manageResetPwd" @change="oneChange">重置密码</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="buy" @change="oneChange" border>
                  <span style="font-weight: bold;">购买服务管理页</span>
                </el-checkbox>
                <el-checkbox label="buyAdd" @change="oneChange">添加购买服务</el-checkbox>
                <el-checkbox label="compileBuy" @change="oneChange">编辑服务</el-checkbox>
                <el-checkbox label="orderServe" @change="oneChange">服务订单</el-checkbox>
                <el-checkbox label="checkBuy" @change="oneChange">查询服务</el-checkbox>
                <el-checkbox label="delBuy" @change="oneChange">删除</el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- <div class="permission">
              <el-checkbox-group v-model="form.permissions" class="permission-item">
                <el-checkbox label="total" @change="oneChange" border>
                  <span style="font-weight: bold;">统计</span>
                </el-checkbox>
                <el-checkbox label="rentersTotal" @change="oneChange">出租屋人数统计</el-checkbox>
              </el-checkbox-group>
            </div>-->
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
import { log } from "util";

export default {
  data() {
    return {
      dialogRole: false,
      form: {
        title: "",
        name: "",
        permissions: [],
      },
      stateList: [
        {
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

        "total", // 统计
        "rentersTotal",
        "permission", // 角色管理
        "roleGet",
        "roleAdd",
        "roleEdit",
        "roleDel",
        "manageGet",
        "manageAdd",
        "manageEdit",
        "manageDel",
        "manageResetPwd", // 重置密码
      ],

      dialogDel: false,
      id: "", // 删除id
      disabledRole: false,
      // 分页
      currentPage: 1,
      totalPage: 0,
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
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
    getRoles() {
      var self = this;
      API.getRole(self.currentPage).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
      });
    },
    newRole() {
      var self = this;
      self.form.name = self.form.title;

      API.role(self.form).then((res) => {
        self.dialogRole = false;
        self.$message.success("提交成功");
        self.getRoles();
        self.currentPage = 1;
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
      self.form.permissions = val ? self.permissionList : [];
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
        self.getRoles();
        self.currentPage = 1;
      });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.getRoles();
    },
    // 每页多少条
    handleSizeChange(val) {
      var self = this;
      // API.roles(self.currentPage, val).then(res => {
      // 	self.tableData = res.data;
      // 	self.totalPage = res.total;
      // });
    },
  },
};
</script>

<style scoped>
.permission {
  display: flex;
  flex-wrap: wrap;
}

.permission-item {
  margin: 10px;
  padding: 0 10px;
}
</style>
