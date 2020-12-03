<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </div>
    </div>
    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="账号"></el-table-column>
      <el-table-column prop="role" label="角色名"></el-table-column>
      <el-table-column prop="community" label="社区"></el-table-column>
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <span v-text="scope.row.enable == '1' ? '启用' : '禁用'"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogDel" title="删除角色" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该角色</div>
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

    <el-dialog title="添加用户" :visible.sync="dialogUser" width="60%" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="输入密码">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="form.role" placeholder="请选择角色">
              <el-option v-for="item in rolesList" :key="item.title" :label="item.name" :value="item.title"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择社区">
            <el-select v-model="pro_id" placeholder="请选择省份" @change="proChange" style="margin-right: 10px;">
              <el-option v-for="item in proList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="city_id" placeholder="请选择市级" @change="cityChange" style="margin-right: 10px;">
              <el-option v-for="item in cityList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="areas_id" placeholder="请选择区级" @change="areasChange" style="margin-right: 10px;">
              <el-option v-for="item in communityList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="community_id" placeholder="请选择社区" @change="communityChange" style="margin-right: 10px;">
              <el-option v-for="item in areaList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择状态">
            <el-select v-model="form.enable" placeholder="请选择状态">
              <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newUser">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogResetPassWord" width="500px" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="pwdForm" label-width="120px">
          <el-form-item label="旧密码">
            <el-input v-model="pwdForm.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="pwdForm.new_password"></el-input>
          </el-form-item>
          <el-form-item label="再次确认新密码">
            <el-input v-model="pwdForm.confirm_password"></el-input>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="changePassword">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from "@/api//index.js";

  export default {
    data() {
      return {
        loading: true,
        dialogUser: false,
        form: {
          id: "",
          username: "",
          password: "",
          enable: "",
          role: "",
          areas_id: "",
        },
        stateList: [{
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 2,
          },
        ],
        proList: [], // 省级列表
        pro_id: "",
        cityList: [], // 市级列表
        city_id: "",
        communityList: [], // 区级列表
        community_id: "",
        areaList: [], //  社区列表
        areas_id: "",
        rolesList: [],

        tableData: [],

        dialogResetPassWord: false, // 修改密码
        pwdForm: {
          new_password: "",
          old_password: "",
          confirm_password: "",
          id: "",
        },

        dialogDel: false,
        id: "", // 删除id

        // 分页
        current: 1,
        size: 10,
        total: 0,
      };
    },
    mounted() {
      this.getPro();
      this.getRoles();
      this.getUsers(this.current, this.size);
    },
    methods: {
      // 获取社区列表（省市区选中）
      getPro() {
        var self = this;
        API.areas(self.current, 100, 0).then((res) => {
          self.proList = res.data;
        });
      },
      proChange(val) {
        this.getCity(val);
      },
      getCity(val) {
        var self = this;
        API.areas(self.current, 100, val).then((res) => {
          self.cityList = res.data;
        });
      },
      cityChange(val) {
        this.getCommunity(val);
      },
      getCommunity(val) {
        var self = this;
        API.areas(self.current, 100, val).then((res) => {
          self.communityList = res.data;
        });
      },
      areasChange(val) {
        this.getAreas(val);
      },
      communityChange(val) {
        this.form.areas_id = val;
      },
      getAreas(val) {
        var self = this;
        API.areas(self.current, 100, val).then((res) => {
          self.areaList = res.data;
        });
      },

      getRoles() {
        var self = this;
        API.getRole(1, 100)
          .then((res) => {
            self.loading = false;
            self.rolesList = res.data;
          })
          .catch((err) => {
            self.loading = false;
          });
      },
      getUsers(cur, list) {
        var self = this;
        API.users(cur, list).then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
        }).catch((err) => {
          self.loading = false;
        });
      },
      // 分页
      currentChange(val) {
        var self = this;
        self.current = val;
        self.loading = true;
        self.getUsers(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getUsers(1, val);
        self.current = 1;
      },


      addUser() {
        var self = this;
        self.dialogUser = true;
        self.form = {
          id: "",
          username: "",
          password: "",
          enable: "",
          role: "",
          areas_id: "",
        };
        self.pro_id = "";
        self.city_id = "";
        self.areas_id = "";
        self.community_id = "";
      },
      newUser() {
        var self = this;
        if (self.form.username && self.form.password && self.form.enable && self.form.role && self.form.areas_id) {
          API.user(self.form).then((res) => {
            self.dialogUser = false;
            self.$message.success("提交成功");
            self.getUsers(self.current, self.size);
            // self.current = 1;
            self.form = {};
          });
        } else {
          self.$message.warning("请补充完整信息");
        }
      },

      // 操作
      handleEdit(index, row) {
        var self = this;
        self.dialogUser = true;
        self.form = {
          id: row.id,
          username: row.name,
          password: "",
          enable: row.enable,
          role: row.role,
          areas_id: row.areas_id,
        };
        self.pro_id = row.province;
        self.city_id = row.city;
        self.areas_id = row.area;
        self.community_id = row.community;
      },
      // 重置密码
      handleReset(index, row) {
        var self = this;
        self.dialogResetPassWord = true;
        self.pwdForm.id = row.id;
      },
      changePassword() {
        var self = this;
        if (self.pwdForm.new_password === self.pwdForm.confirm_password) {
          API.resetPassword(self.pwdForm).then((res) => {
            self.dialogResetPassWord = false;
            self.$message.success("修改成功");
            self.getUsers(self.current, self.size);
            self.pwdForm = {};
          });
        } else {
          self.$message.error("新密码与确认密码不一致");
        }
      },

      handleDel(index, row) {
        var self = this;
        self.dialogDel = true;
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.delUser(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getUsers(self.current, self.size);
        });
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