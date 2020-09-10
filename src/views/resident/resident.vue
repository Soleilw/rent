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
          <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="addUser">添加身份</el-button>
      </div>
    </div>

    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      empty-text="暂无数据"
      border
      :header-cell-style="{background:'#f0f0f0'}"
      max-height="620"
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
                  type="primary"
                  @click="openedServe(scope.$index, scope.row)"
                >已开通的服务</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="primary"
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
                <el-button
                  type="primary"
                  size="mini"
                  @click="handlePassFace(scope.$index, scope.row)"
                >通过人脸</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleVerifyID(scope.$index, scope.row)"
                >验证身份证</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleChangeFace(scope.$index, scope.row)"
                >更换人脸</el-button>
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
        @current-change="currentChange"
        :current-page.sync="current"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
      ></el-pagination>
    </div>

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs">
      <div class="box">
        <el-table
          :data="logsData"
          border
          :header-cell-style="{background:'#f0f0f0'}"
          max-height="620"
        >
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
          @current-change="logsCurrentChange"
          :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="logsSize"
          layout="sizes, prev, pager, next, jumper"
          :total="logsTotal"
          @size-change="logsSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 审核 -->
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
    <el-dialog title="已开通服务" :visible.sync="dialogOpenedServe">
      <div class="box">
        <el-table :data="serviceList" border :header-cell-style="{background:'#f0f0f0'}">
          <el-table-column prop="id" label="订单ID"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="time" label="商品有效期(天)"></el-table-column>
          <el-table-column prop="expireTime" label="到期时间"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 添加身份 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogUser"
      width="60%"
      :close-on-click-modal="false"
      @close="closeUser"
    >
      <div class="box">
        <el-form :model="userForm" label-width="80px">
          <el-form-item label="姓名">
            <!-- <el-input v-model="form.username" placeholder="请输入姓名"></el-input> -->
            <el-select
              v-model="name"
              placeholder="请输入用户名"
              filterable
              @change="userListChange"
              remote
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label=" item.label + '' +item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择身份">
            <el-select v-model="userForm.type" placeholder="请选择身份" @change="roleChange">
              <el-option
                v-for="item in rolesList"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择社区">
            <el-select
              v-model="pro_id"
              placeholder="请选择省份"
              @change="proChange"
              style="margin-right: 10px;"
            >
              <el-option
                v-for="item in proList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="city_id"
              placeholder="请选择市级"
              @change="cityChange"
              style="margin-right: 10px;"
            >
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="areas_id"
              placeholder="请选择区级"
              @change="areasChange"
              style="margin-right: 10px;"
            >
              <el-option
                v-for="item in communityList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="community_id"
              placeholder="请选择社区"
              @change="communityChange"
              style="margin-right: 10px;"
            >
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="address"
              placeholder="请选择详细地址"
              @change="detailAddressChnage"
              style="margin-right: 10px;"
              filterable
            >
              <el-option
                v-for="item in detailAddressList"
                :key="item.id"
                :label="item.address"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="room_id"
              placeholder="请选择门牌号"
              @change="roomIdChange"
              style="margin-right: 10px;"
            >
              <el-option
                v-for="item in roomList"
                :key="item.id"
                :label="item.door_number"
                :value="item.id"
              ></el-option>
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
    <!-- 通过人脸 -->
    <el-dialog
      :visible.sync="dialogPassFace"
      title="通过人脸"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否通过人脸</div>
      <span>
        <el-button type="primary" @click="passFace">通过</el-button>
        <el-button type="danger" @click="dialogPassFace = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 验证身份证 -->
    <el-dialog
      :visible.sync="dialogVerify"
      title="验证身份证"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否进行身份验证</div>
      <span>
        <el-button type="primary" @click="verifyID">验证</el-button>
        <el-button type="danger" @click="dialogVerify = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 更换人脸 -->
    <el-dialog
      title="更换人脸"
      :visible.sync="dialogChangeFace"
      :close-on-click-modal="false"
      width="500px"
    >
      <div class="box">
        <el-form :model="familyForm">
          <div class="tips">
            <p>
              <span>提示：</span>更换后的人脸照片会覆盖掉原有的人脸照片！
            </p>
          </div>
          <el-form-item label="更换人脸图片">
            <el-upload
              action="https://api.fengniaotuangou.cn/api/upload"
              ref="upload"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-change="handleChange"
            >
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
            <div v-if="hasNewImage" style="color: red; font-size: 12px;">* 点击文件名可删除所选图片</div>

            <div class="up-img" v-if="old_href">
              <span style="display: flex;justify-items: center;color: #409eff;">原人脸图片</span>
              <img class="pic-box" :src="old_href" />
            </div>
            <div class="up-img" v-if="familyForm.href">
              <span style="display: flex;justify-items: center;color: #67C23A;">新人脸图片</span>
              <img class="pic-box" :src="familyForm.href" />
            </div>
            <div class="up-img" v-else>
              <img class="pic-box" :src="change_href" />
            </div>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="changeFace">提交</el-button>
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
import md5 from "blueimp-md5";

export default {
  inject: ["reload"],

  data() {
    return {
      loading: true,

      tableData: [], // 表格数据
      current: 1, // 分页
      size: 10,
      total: 0,

      dialogLogs: false, // 进出记录
      logsData: [],
      logsCurrent: 1, // 分页--进出记录
      logsSize: 10,
      logsTotal: 0,

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
        type: "",
        face_id: ''
      },
      user_id: "",
      addresses_id: "",
      face_id: "",
      username: localStorage.getItem("username"),
      isShow: false,
      type: 2, // 选中的搜索方式
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
      typeDisabled: false,
      dialogForbidden: false,
      forbidden_id: "",
      dialogFace: false,
      openFace_id: "",
      member_type: "",
      card_number: "",
      check: "",
      // family: "",
      dialogUser: false,
      userForm: {
        user_id: "",
        areas_id: "",
        type: "",
        address_id: "",
        address: "",
        room_id: "",
        self: 1,
      },
      userForms: {
        user_id: "",
        areas_id: "",
        type: "",
        address_id: "",
        address: "",
        self: 1,
      },
      rolesList: [
        {
          name: "户主",
          type: 1,
        },
        {
          name: "租客",
          type: 2,
        },
        {
          name: "物业",
          type: 4,
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
      detailAddressList: [], // 详细地址
      address_id: "",
      address: "",
      roomList: [], // 门牌号
      room_id: "",
      user: "",
      userList: [],
      userData: [],
      list: [],
      dialogPassFace: false,
      dialogVerify: false,
      dialogChangeFace: false,
      imgData: {
        key: "",
        token: "",
      },
      qiniuaddr: "https://tu.fengniaotuangou.cn", // 七牛云图片外链地址
      familyForm: {
        href: "",
        only_in: "",
        id: "",
      },
      old_href: "", // 原人脸图片
      change_href: "",
      hasNewImage: false,
      new_file: "",
      name: "",
      detailAddress: "",
    };
  },
  mounted() {
    this.getAllRent();
    this.getPro();
    this.getUser();
    if (this.username == "admin") {
      this.isShow = true;
    }
  },
  methods: {
    // 表格数据
    getAllRent() {
      var self = this;
      API.households(self.current, self.size)
        .then((res) => {
          self.loading = false;
          // console.log('表格数据',res.data[9].expireTime.slice(0, 10));
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
            API.searchHousehold(val, self.size, name, keyword)
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
            API.searchHousehold(val, self.size, name, keyword)
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
        API.households(val, self.size)
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
            API.searchHousehold(self.current, val, name, keyword)
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
            API.searchHousehold(self.current, val, name, keyword)
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
        API.households(self.current, val)
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

    // 搜索方式
    changeType(val) {
      var self = this;
      self.typeDisabled = true;
      self.renter_name = "";
      self.current = 1;
      self.getAllRent();
    },
    // 搜索
    search() {
      var self = this;
      self.current = 1;
      self.size = 10;
      if (self.type == 1) {
        var keyword = self.renter_name;
        API.searchHousehold(self.current, self.size, name, keyword).then(
          (res) => {
            res.data.forEach((item) => {
              if (item.expireTime) {
                item.expireTime = item.expireTime.slice(0, 10);
              }
            });
            self.tableData = res.data;
            self.total = res.total;
            self.$message.success("搜索成功！");
          }
        );
      }
      if (self.type == 2) {
        var name = self.renter_name;
        API.searchHousehold(self.current, self.size, name, keyword).then(
          (res) => {
            res.data.forEach((item) => {
              if (item.expireTime) {
                item.expireTime = item.expireTime.slice(0, 10);
              }
            });
            self.tableData = res.data;
            self.total = res.total;
            self.$message.success("搜索成功！");
          }
        );
      }
    },
    // 刷新
    refresh() {
      this.reload();
    },

    // 获取用户
    getUser() {
      var self = this;
      API.userInfo(self.name).then((res) => {
        self.userData = res;
        self.list = self.userData.map((item) => {
          return {
            label: ` ${item.card_number + " " + item.name}`,
            value: `${" " + item.user_id}`,
          };
        });
      });
    },
    userListChange(val) {
      console.log(val);
      var self = this;
      self.userForm.user_id = val;
      self.userForms.user_id = val;
      let obj = {};
      obj = this.userList.find((item) => {
        return item;
      });
      self.card_number = obj.label.slice(0, 17);
    },
    remoteMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.userList = this.list.filter((item) => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      }
    },
    roleChange(value) {
      var self = this;
      self.userForm.type = value;
      self.userForms.type = value;
      console.log(value);
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
        console.log("getAreas", res);
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
      API.addresses(1, 4000, val).then((res) => {
        self.detailAddressList = res.data;
      });
    },
    getRoomId(val) {
      var self = this;
      API.gainRooms(1, 4000, val).then((res) => {
        self.roomList = res.data;
      });
    },
    proChange(val) {
      var self = this;
      console.log(self.pro_id);
      let obj = {};
      obj = this.proList.find((item) => {
        return item.id === val;
      });
      self.detailAddress = obj.title;
      self.getCity(val);
    },
    cityChange(val) {
      var self = this;
      let obj = {};
      obj = this.cityList.find((item) => {
        return item.id === val;
      });
      self.detailAddress += obj.title;
      self.getCommunity(val);
    },
    areasChange(val) {
      var self = this;
      let obj = {};
      obj = this.communityList.find((item) => {
        return item.id === val;
      });
      self.detailAddress += obj.title;
      self.getAreas(val);
    },
    communityChange(val) {
      var self = this;
      self.userForm.areas_id = val;
      self.userForms.areas_id = val;
      let obj = {};
      obj = this.areaList.find((item) => {
        return item.id === val;
      });
      self.detailAddress += obj.title;
      self.getDetailAddress(val);
      self.address = "";
    },
    detailAddressChnage(val) {
      var self = this;
      console.log(val);
      self.userForm.address_id = val;
      self.userForms.address_id = val;
      let obj = {};
      obj = this.detailAddressList.find((item) => {
        return item.id === val;
      });
      self.detailAddress += obj.address;
      self.getRoomId(val);
      self.room_id = "";
    },
    roomIdChange(val) {
      console.log(val);
      var self = this;
      let obj = {};
      obj = this.roomList.find((item) => {
        return item.id === val;
      });
      console.log(obj);
      self.detailAddress += obj.door_number;
      self.userForm.room_id = val;
    },
    // 添加身份
    addUser(index, row) {
      var self = this;
      self.dialogUser = true;
    },
    closeUser() {
      var self = this;
      self.pro_id = "";
      self.city_id = "";
      self.community_id = "";
      self.areas_id = "";
      self.address_id = "";
      self.address = "";
      self.room_id = "";
      self.name = "";
      self.userForm = {};
    },
    newUser() {
      var self = this;
      self.userForm.address = self.detailAddress;
      self.userForms.address = self.detailAddress;
      if (self.userForm.room_id) {
        API.creation(self.userForm).then((res) => {
          self.dialogUser = false;
          self.$message.success("添加成功");
          self.getAllRent();
          self.userForm = {
            user_id: "",
            areas_id: "",
            type: "",
            address_id: "",
            address: "",
            room_id: "",
            self: 1,
          };
        });
      } else {
        API.creation(self.userForms).then((res) => {
          self.dialogUser = false;
          self.$message.success("添加成功");
          self.getAllRent();
          self.userForms = {
            user_id: "",
            areas_id: "",
            type: "",
            address_id: "",
            address: "",
            self: 1,
          };
        });
      }
    },

    // 操作
    // 通过人脸
    handlePassFace(index, row) {
      var self = this;
      self.dialogPassFace = true;
      self.user_id = row.user_id;
      self.member_type = row.type;
      self.card_number = row.snapshot.card_number;
      console.log(row);
    },
    passFace() {
      var self = this;
      const loading = self.$loading({
        lock: true,
        text: "通过中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (self.member_type == 3) {
        API.matchFace(self.user_id, self.card_number).then((res) => {
          loading.close();
          self.dialogPassFace = false;
          self.$message.success("通过成功");
        });
      } else {
        API.matchFace(self.user_id, 1).then((res) => {
          loading.close();
          self.dialogPassFace = false;
          self.$message.success("通过成功");
        });
      }
    },
    // 验证身份证
    handleVerifyID(index, row) {
      var self = this;
      self.dialogVerify = true;
      self.user_id = row.user_id;
      self.member_type = row.type;
      self.card_number = row.snapshot.card_number;
    },
    verifyID() {
      var self = this;
      const loading = self.$loading({
        lock: true,
        text: "验证中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (self.member_type == 3) {
        API.verifyPerson(self.user_id, self.card_number).then((res) => {
          loading.close();
          self.dialogVerify = false;
          self.$message.success("验证成功");
        });
      } else {
        API.verifyPerson(self.user_id, 1).then((res) => {
          loading.close();
          self.dialogVerify = false;
          self.$message.success("验证成功");
        });
      }
    },

    // 开通人脸
    handleFace(index, row) {
      var self = this;
      self.openFace_id = row.id;
      self.dialogFace = true;
    },
    pushFace() {
      var self = this;
      const loading = self.$loading({
        lock: true,
        text: "开通中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      API.pushFace(self.openFace_id).then((res) => {
        self.dialogFace = false;
        loading.close();
        self.$message.success("开通成功");
      });
    },
    // 禁用人脸
    handleForbidden(index, row) {
      var self = this;
      console.log(row);
      self.forbidden_id = row.id;
      self.dialogForbidden = true;
    },
    forbiddenFace() {
      var self = this;
      const loading = self.$loading({
        lock: true,
        text: "禁用中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      API.failFace(self.forbidden_id).then((res) => {
        self.dialogForbidden = false;
        loading.close();
        self.$message.success("禁用成功");
      });
    },

    // 审核
    handleAudit(index, row) {
      var self = this;
      console.log(row);
      self.renter_id = row.id;
      self.member_type = row.type;
      self.card_number = row.snapshot.card_number;
      self.check = row.check;
      self.dialogAudit = true;
      if (self.check == 0) {
        self.$message.warning("该用户身份未核验!");
        self.dialogAudit = false;
      } else if (self.check == 2) {
        self.$message.warning("该用户身份信息错误!");
        self.dialogAudit = false;
      }
    },
    toAudit() {
      var self = this;
      if (self.check == 1) {
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
      }
    },
    unAudit() {
      var self = this;
      if (self.check == 1) {
        if (self.member_type == 3) {
          API.audit(self.renter_id, 3, self.card_number).then((res) => {
            self.$message.success("提交成功");
            self.dialogAudit = false;
            self.getAllRent();
          });
        } else {
          API.audit(self.renter_id, 3, 1).then((res) => {
            self.$message.success("提交成功");
            self.dialogAudit = false;
            self.getAllRent();
          });
        }
      }
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
        type: row.type,
        face_id: row.face_id
      };
      API.buys().then((res) => {
        console.log(res);
        self.serviceLists = res.data;
      });
    },
    serveChange(val) {
      var self = this;
      self.serveForm.product_id = val;
      console.log(self.serveForm.product_id);
    },
    // 已开通服务
    openedServe(index, row) {
      var self = this;
      self.dialogOpenedServe = true;
      console.log("openedServe", row);
      self.user_id = row.user_id;
      self.member_type = row.type;
      self.addresses_id = row.address_id;
      self.face_id = row.face_id;
      API.userServes(
        self.user_id,
        self.face_id
      ).then((res) => {
        console.log(res);
        self.serviceList = res;
      });
    },
    toConfirm() {
      var self = this;
      console.log(self.serveForm);
        const loading = self.$loading({
        lock: true,
        text: "正在开通...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      API.setProduct(self.serveForm).then((res) => {
        console.log("toConfirm", res);
        loading.close();
        self.$message.success("开通成功！");
        self.dialogOpenServe = false;
        self.title = "";
      });
    },

    // 进出记录
    handleLogs(index, row) {
      var self = this;
      self.dialogLogs = true;
      self.face_id = row.face_id;
      console.log(row);
      self.getFaceLogs();
    },
    getFaceLogs() {
      var self = this;
      self.logsCurrent = 1;
      API.faceLogs(self.logsCurrent, self.logsSize, self.face_id).then(
        (res) => {
          console.log("getFaceLogs", res);
          self.logsData = res.data;
          self.logsTotal = res.total;
        }
      );
    },
    // 进出记录
    logsCurrentChange(val) {
      var self = this;
      self.logsCurrent = val;
      API.faceLogs(val, self.logsSize, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },
    logsSizeChange(val) {
      var self = this;
      self.logsSize = val;
      API.faceLogs(self.logsCurrent, val, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },

    // 删除
    handleDel(index, row) {
      var self = this;
      self.id = row.id;
      self.card_number = row.snapshot.card_number;
      self.member_type = row.type;
      self.dialogDel = true;
      console.log(row);
    },
    toDel() {
      var self = this;
      if (self.member_type == 3) {
        API.delHousehold(self.id, self.card_number).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getAllRent();
        });
      } else {
        API.delHousehold(self.id, 1).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getAllRent();
        });
      }
    },

    // 更换人脸
    handleChangeFace(index, row) {
      var self = this;
      self.dialogChangeFace = true;
      self.user_id = row.user_id;
      self.member_type = row.type;
      self.card_number = row.snapshot.card_number;
      self.old_href = row.snapshot.href;
      console.log(row);
    },
    changeFace() {
      var self = this;
      if (self.change_href === "") {
        self.familyForm.href = self.old_href;
        if (self.member_type == 3) {
          API.editFace(
            self.user_id,
            self.card_number,
            self.familyForm.href
          ).then((res) => {
            self.$message.success("上传成功");
            self.current = 1;
            self.getAllRent();
            self.familyForm.href = "";
            self.dialogChangeFace = false;
          });
        } else {
          API.editFace(self.user_id, 1, self.href).then((res) => {
            self.$message.success("上传成功");
            self.current = 1;
            self.getAllRent();
            self.familyForm.href = "";
            self.dialogChangeFace = false;
          });
        }
      } else {
        this.$refs.upload.submit();
      }
    },

    // 人脸信息
    handleChange(file) {
      var self = this;
      console.log(1, file);
      self.change_href = URL.createObjectURL(file.raw);
      self.hasNewImage = true;
    },
    handleRemove(file) {
      var self = this;
      self.change_href = "";
      self.hasNewImage = false;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleAvatarSuccess(res, file) {
      var self = this;
      console.log(111, res);
      file.url = `${res.data}`;
      self.familyForm.href = file.url;
      if (self.member_type == 3) {
        API.editFace(self.user_id, self.card_number, self.familyForm.href).then(
          (res) => {
            self.$message.success("上传成功");
            self.current = 1;
            self.getAllRent();
            self.$refs.upload.clearFiles();
            self.familyForm.href = "";
            self.change_href = "";
            self.old_href = "";
            self.imgData.key = "";
            self.familyForm.user_id = "";
            self.dialogChangeFace = false;
          }
        );
      } else {
        API.editFace(self.user_id, 1, self.familyForm.href).then((res) => {
          self.$message.success("上传成功");
          self.current = 1;
          self.getAllRent();
          self.$refs.upload.clearFiles();
          self.familyForm.href = "";
          self.change_href = "";
          self.old_href = "";
          self.imgData.key = "";
          self.familyForm.user_id = "";
          self.dialogChangeFace = false;
        });
      }
    },
    handleExceed(file, fileList) {
      //图片上传超过数量限制
      var self = this;
      self.$message.error("上传图片不能超过1张!重新上传");
      self.$refs.upload.clearFiles();
      self.familyForm.href = "";
      self.imgData.key = "";
      self.familyForm.user_id = "";
    },
    getQiniuToken() {
      var self = this;
      axios
        .get("https://api.fengniaotuangou.cn/api/upload/token")
        .then((res) => {
          self.imgData.token = res.data.uptoken;
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
.upload-btn {
  margin-top: 10px;
}

.up-img {
  display: inline-block;
  margin: 0 50px;
}

.pic-box {
  max-width: 100%;
  height: 200px;
}

.tips {
  margin-bottom: 20px;
  color: red;
}
</style>