<template>
  <div v-loading="loading">
    <div class="btn">
      <el-button type="primary" @click="addHouses">添加房屋</el-button>
    </div>
    <div class="btn">
      <el-input
        v-model="house_id"
        placeholder="输入房屋地址"
        class="search"
        @keyup.enter.native="search(house_id)"
      ></el-input>
    </div>
    <div class="btn">
      <el-button type="primary" @click="search(house_id)">搜索</el-button>
    </div>

    <el-dialog title="添加房屋" :visible.sync="dialogHouses" width="80%">
      <div class="box">
        <el-form :model="form" label-width="130px">
          <el-form-item label="房屋名">
            <el-input v-model="form.name" placeholder="请输入用户身份"></el-input>
          </el-form-item>
          <el-form-item label="人脸库">
            <el-input v-model="form.name" placeholder="请输入人脸库"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="form.name" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话">
            <el-input v-model="form.name" placeholder="请输入负责人电话"></el-input>
          </el-form-item>
          <el-form-item label="是否开启访客功能">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开启访客功能">
            <v-map></v-map>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 表格数据 -->
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="address" label="房屋地址" align="center"></el-table-column>
      <el-table-column prop="room_count" label="单元总数" align="center"></el-table-column>
      <el-table-column prop="room_resident" label="租客总数" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleBuild(scope.$index, scope.row)">楼栋管理</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleResident(scope.$index, scope.row)"
          >查看住户信息</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看所有住户信息 -->
    <el-dialog title="查看所有住户信息" :visible.sync="dialogResident" width="80%" @close="closeShowUser">
      <div class="box">
        <div class="btn">
          <el-select v-model="user" @change="handleUser" placeholder="请选择">
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <template v-if="user == '全部'">
          <el-table :data="residentData">
            <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="type" label="用户身份" align="center"></el-table-column>
            <el-table-column prop="card_number" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="href" label="人脸照片" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleLogs(scope.$index, scope.row)"
                >进出记录</el-button>
                <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentResident"
              :current-page.sync="currentResidentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSizeResident"
              layout="sizes, prev, pager, next, jumper"
              :total="totalResidentPage"
              @size-change="handleSizeResident"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '户主'">
          <el-table :data="houseOwnerList">
            <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="type" label="用户身份" align="center"></el-table-column>
            <el-table-column prop="card_number" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="href" label="人脸照片" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleLogs(scope.$index, scope.row)"
                >进出记录</el-button>
                <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentHouseOwner"
              :current-page.sync="houseOwnerCurrentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="houseOwnerPageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="houseOwnerTotalPage"
              @size-change="handleSizeHouseOwner"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '租客'">
          <el-table :data="renterList">
            <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="type" label="用户身份" align="center"></el-table-column>
            <el-table-column prop="card_number" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="href" label="人脸照片" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleLogs(scope.$index, scope.row)"
                >进出记录</el-button>
                <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentRenter"
              :current-page.sync="renterCurrentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="renterPageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="renterTotalPage"
              @size-change="handleRenterSize"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '物业'">
          <el-table :data="managementList">
            <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
            <el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="type" label="用户身份" align="center"></el-table-column>
            <el-table-column prop="card_number" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="href" label="人脸图片" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleLogs(scope.$index, scope.row)"
                >进出记录</el-button>
                <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleManagement"
              :current-page.sync="managementCurrentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="managementPageSize"
              layout="sizes, prev, pager, next, jumper"
              :total="managementTotalPage"
              @size-change="handlemanagementSize"
            ></el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>

    <!-- 楼栋管理 -->
    <el-dialog title="楼栋管理" :visible.sync="dialogBuild">
      <div class="box">
        <div class="btn">
          <el-button type="primary" @click="HandleAddBuild">添加房屋编号</el-button>
        </div>
        <el-table :data="buildingList">
          <el-table-column prop="door_number" label="房屋编号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="HandledelBuilding(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrenBuildingt"
          :current-page.sync="currentBuildingPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSizeBuilding"
          layout="sizes, prev, pager, next, jumper"
          :total="totalBuildingPage"
          @size-change="handleSizeBuilding"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 楼栋管理删除提示框 -->
    <el-dialog
      :visible.sync="dialogDelBuild"
      title="删除房屋编号"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该房屋编号</div>
      <span>
        <el-button type="primary" @click="toDelBuild">删除</el-button>
        <el-button type="danger" @click="dialogDelBuild = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 添加房屋编号 -->
    <el-dialog title="添加房屋编号" :visible.sync="dialogAddBuild">
      <div class="box">
        <el-form :model="buildForm" label-width="100px">
          <div v-for="(item,index) in buildForm.rooms" :key="index">
            <el-form-item label="房屋编号">
              <el-input v-model="buildForm.rooms[index]" placeholder="请输入房屋编号"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="操作">
            <el-button type="primary" @click="addRooms">添加房屋编号</el-button>
            <el-button type="primary" @click="delRooms">删除房屋编号</el-button>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newRooms">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs">
      <div class="box">
        <el-table :data="logsData">
          <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
          <el-table-column prop="number" label="证件号" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" align="center"></el-table-column>
          <el-table-column prop="direction" label="进出状态" align="center"></el-table-column>
          <el-table-column prop="image" label="人脸照片" align="center">
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
  </div>
</template>

<script>
import API from "@/api/index.js";
import vMap from "./map.vue";
import { log } from "util";

export default {
  components: {
    vMap,
  },
  data() {
    return {
      loading: false,
      dialogHouses: false,
      form: {
        name: "",
        sex: "",
        postion: "",
      },

      tableData: [], // 表格数据

      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,

      dialogResident: false, // 查看住户
      residentData: [],
      currentResidentPage: 1,
      pageSizeResident: 10,
      totalResidentPage: 0,
      dialogBuild: false, // 房屋编号
      // rooms: '',
      // addrooms: [],
      buildForm: {
        address_id: "",
        rooms: [],
      },
      id: "",
      house_id: "", // 搜索
      face_id: "",

      user: "全部", // 身份切换
      userList: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "户主",
        },
        {
          value: 2,
          label: "租客",
        },
        {
          value: 3,
          label: "物业",
        },
      ],
      houseOwnerList: [], // 户主列表
      renterList: [], // 租客列表
      managementList: [], // 物业列表

      houseOwnerCurrentPage: 1, // 户主列表分页
      houseOwnerPageSize: 10,
      houseOwnerTotalPage: 0,

      renterCurrentPage: 1, // 租客列表分页
      renterPageSize: 10,
      renterTotalPage: 0,

      managementCurrentPage: 1, //物业列表分页
      managementPageSize: 10,
      managementTotalPage: 0,

      dialogLogs: false, // 进出记录
      logsData: [],
      currentLogsPage: 1,
      pageSizeLogs: 10,
      totalLogsPage: 0,
      dialogDel: false,
      buildingList: [], // 楼栋列表
      address_id: "",
      dialogAddBuild: false,
      currentBuildingPage: 1, // 分页
      pageSizeBuilding: 10,
      totalBuildingPage: 0,
      dialogDelBuild: false,
      building_id: "",
    };
  },
  mounted() {
    this.getnewHouses();
  },
  methods: {
    // 获取房屋列表
    getnewHouses() {
      var self = this;
      API.addresses(self.currentPage, self.pageSize).then((res) => {
        // console.log("获取房屋列表", res.data);
        self.tableData = res.data;
        self.totalPage = res.total;
      });
    },

    // 搜索
    search() {
      var self = this;
      // if (self.house_id) {
      API.addresses(self.currentPage, self.pageSize, 0, self.house_id).then(
        (res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
          // self.house_id = "";
          self.$message.success("搜索成功！");
        }
      );
      // } else {
      // 	self.$message.warning('请输入ID');
      // }
    },

    addHouses() {
      var self = this;
      self.dialogHouses = true;
    },

    newHouses() {
      var self = this;
    },

    // 楼栋管理
    handleBuild(index, row) {
      var self = this;
      self.dialogBuild = true;
      self.buildForm.address_id = row.id;
      self.address_id = row.id;
      self.getBuilding();
    },
    HandleAddBuild(index, row) {
      var self = this;
      self.dialogAddBuild = true;
    },
    // 获取楼栋信息
    getBuilding() {
      var self = this;
      API.gainRooms(
        self.currentBuildingPage,
        self.pageSizeBuilding,
        self.address_id
      ).then((res) => {
        // console.log("获取楼栋信息", res);
        self.buildingList = res.data;
        self.totalBuildingPage = res.total;
      });
    },

    // 房屋编号操作
    addRooms() {
      var self = this;
      self.buildForm.rooms.push("");
    },
    delRooms() {
      var self = this;
      self.buildForm.rooms.pop("");
    },

    newRooms() {
      var self = this;
      API.rooms(self.buildForm).then((res) => {
        self.$message.success("提交成功");
        self.dialogAddBuild = false;
        self.buildForm.rooms = [];
        self.rooms = "";
        self.getBuilding();
      });
    },

    // 查看住户
    handleResident(index, row) {
      var self = this;
      self.dialogResident = true;
      self.house_id = row.id;
      console.log(self.house_id);
      console.log(self.user);
      API.addressResidents(
        self.currentResidentPage,
        self.pageSizeResident,
        self.house_id
      ).then((res) => {
        console.log("所有", res);
        self.residentData = res.data;
        self.totalResidentPage = res.total;
        res.data.forEach((item) => {
          switch (item.type) {
            case 1:
              item.type = "户主";
              break;
            case 2:
              item.type = "租客";
              break;
            case 4:
              item.type = "物业";
              break;
          }
        });
      });
    },
    handleUser(value) {
      var self = this;
      switch (value) {
        case 0:
          self.$nextTick(() => {
            self.user = "全部";
            API.addressResidents(
              self.currentResidentPage,
              self.pageSizeResident,
              self.house_id
            ).then((res) => {
              self.residentData = res.data;
              self.totalResidentPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
          });
          break;
        case 1:
          self.$nextTick(() => {
            self.user = "户主";
            API.addressResidents(
              self.houseOwnerCurrentPage,
              self.houseOwnerPageSize,
              self.house_id,
              1
            ).then((res) => {
              console.log("户主", res);
              self.houseOwnerList = res.data;
              self.houseOwnerTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
          });
          break;
        case 2:
          self.$nextTick(() => {
            self.user = "租客";
            API.addressResidents(
              self.renterCurrentPage,
              self.renterPageSize,
              self.house_id,
              2
            ).then((res) => {
              self.renterList = res.data;
              self.renterTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
          });
          break;
        case 3:
          self.$nextTick(() => {
            self.user = "物业";
            API.addressResidents(
              self.managementCurrentPage,
              self.managementPageSize,
              self.house_id,
              4
            ).then((res) => {
              self.managementList = res.data;
              self.managementTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
          });
          break;
      }
    },
    closeShowUser() {
      var self = this;
      self.user = "全部";
      self.residentData = [];
      self.houseOwnerList = [];
      self.renterList = [];
      self.managementList = [];
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
      API.faceLogs(self.currentLogsPage, self.pageSizeLogs, self.face_id).then(
        (res) => {
          console.log("getFaceLogs", res);
          self.logsData = res.data;
          self.totalLogsPage = res.total;
          res.data.forEach((item) => {
            switch (item.direction) {
              case 1:
                item.direction = "进入";
                break;
              case 2:
                item.direction = "外出";
                break;
            }
          });
        }
      );
    },

    // 编辑
    handleEdit() {},
    // 删除--查看住户信息
    handleDel(index, row) {
      var self = this;
      self.id = row.id;
      self.dialogDel = true;
    },
    toDel() {
      var self = this;
      API.delHousehold(self.id).then((res) => {
        switch (self.user) {
          case "全部":
            self.$message.success("删除成功");
            self.dialogDel = false;
            API.addressResidents(
              self.currentResidentPage,
              self.pageSizeResident,
              self.house_id
            ).then((res) => {
              console.log("所有", res);
              self.residentData = res.data;
              self.totalResidentPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
            break;
          case "户主":
            self.$message.success("删除成功");
            self.dialogDel = false;
            API.addressResidents(
              self.houseOwnerCurrentPage,
              self.houseOwnerPageSize,
              self.house_id,
              1
            ).then((res) => {
              console.log("户主", res);
              self.houseOwnerList = res.data;
              self.houseOwnerTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
            break;
          case "租客":
            self.$message.success("删除成功");
            self.dialogDel = false;
            API.addressResidents(
              self.renterCurrentPage,
              self.renterPageSize,
              self.house_id,
              2
            ).then((res) => {
              self.renterList = res.data;
              self.renterTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
            break;
          case "物业":
            self.$message.success("删除成功");
            self.dialogDel = false;
            API.addressResidents(
              self.managementCurrentPage,
              self.managementPageSize,
              self.house_id,
              4
            ).then((res) => {
              self.managementList = res.data;
              self.managementTotalPage = res.total;
              res.data.forEach((item) => {
                switch (item.type) {
                  case 1:
                    item.type = "户主";
                    break;
                  case 2:
                    item.type = "租客";
                    break;
                  case 4:
                    item.type = "物业";
                    break;
                }
              });
            });
            break;
        }
      });
    },

    // 删除--楼栋管理
    HandledelBuilding(index, row) {
      var self = this;
      self.dialogDelBuild = true;
      self.building_id = row.id;
    },
    toDelBuild() {
      var self = this;
      API.delBuilding(self.building_id).then((res) => {
        self.dialogDelBuild = false;
        self.$message.success("删除成功");
        self.getBuilding();
      });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      if (self.house_id == "") {
        API.addresses(val, self.pageSize).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        });
      } else {
        API.addresses(val, self.pageSize, 0, self.house_id).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        });
      }
    },
    // 每页几条
    handleSizeChange(val) {
      var self = this;
      self.pageSize = val;
      if (self.house_id == "") {
        API.addresses(self.currentPage, val).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        });
      } else {
        API.addresses(self.currentPage, val, 0, self.house_id).then((res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        });
      }
    },

    // 全部住户分页
    handleCurrentResident(val) {
      var self = this;
      self.currentResidentPage = val;
      API.addressResidents(val, self.pageSizeResident, self.house_id).then(
        (res) => {
          self.residentData = res.data;
          //   self.totalResidentPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },
    handleSizeResident(val) {
      var self = this;
      self.pageSizeResident = val;
      API.addressResidents(self.currentResidentPage, val, self.house_id).then(
        (res) => {
          self.residentData = res.data;
          //   self.totalResidentPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },

    // 户主分页
    handleCurrentHouseOwner(val) {
      var self = this;
      self.houseOwnerCurrentPage = val;
      API.addressResidents(val, self.houseOwnerPageSize, self.house_id, 1).then(
        (res) => {
          self.houseOwnerList = res.data;
          //   self.houseOwnerTotalPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },
    //
    handleSizeHouseOwner(val) {
      var self = this;
      self.houseOwnerPageSize = val;
      API.addressResidents(
        self.houseOwnerCurrentPage,
        val,
        self.house_id,
        1
      ).then((res) => {
        self.houseOwnerList = res.data;
        // self.houseOwnerTotalPage = res.total;
        res.data.forEach((item) => {
          switch (item.type) {
            case 1:
              item.type = "户主";
              break;
            case 2:
              item.type = "租客";
              break;
            case 4:
              item.type = "物业";
              break;
          }
        });
      });
    },

    // 租客分页
    handleCurrentRenter(val) {
      var self = this;
      self.renterCurrentPage = val;
      API.addressResidents(val, self.renterPageSize, self.house_id, 2).then(
        (res) => {
          self.renterList = res.data;
          //   self.renterTotalPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },
    handleRenterSize(val) {
      var self = this;
      self.renterPageSize = val;
      API.addressResidents(self.renterCurrentPage, val, self.house_id, 2).then(
        (res) => {
          self.renterList = res.data;
          //   self.renterTotalPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },

    // 物业分页
    handleManagement(val) {
      var self = this;
      self.managementCurrentPage = val;
      API.addressResidents(val, self.managementPageSize, self.house_id, 4).then(
        (res) => {
          self.managementList = res.data;
          //   self.managementTotalPage = res.total;
          res.data.forEach((item) => {
            switch (item.type) {
              case 1:
                item.type = "户主";
                break;
              case 2:
                item.type = "租客";
                break;
              case 4:
                item.type = "物业";
                break;
            }
          });
        }
      );
    },
    handlemanagementSize(val) {
      var self = this;
      self.managementPageSize = val;
      API.addressResidents(
        self.managementCurrentPage,
        val,
        self.house_id,
        4
      ).then((res) => {
        self.managementList = res.data;
        // self.managementTotalPage = res.total;
        res.data.forEach((item) => {
          switch (item.type) {
            case 1:
              item.type = "户主";
              break;
            case 2:
              item.type = "租客";
              break;
            case 4:
              item.type = "物业";
              break;
          }
        });
      });
    },

    // 进出记录分页
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

    // 楼栋管理分页
    handleCurrenBuildingt(val) {
      var self = this;
      self.currentBuildingPage = val;
      API.gainRooms(val, self.pageSizeBuilding, self.address_id).then((res) => {
        // console.log("获取楼栋信息", res);
        self.buildingList = res.data;
      });
    },
    handleSizeBuilding(val) {
      var self = this;
      self.pageSizeBuilding = val;
      API.gainRooms(self.currentBuildingPage, val, self.address_id).then(
        (res) => {
          // console.log("获取楼栋信息", res);
          self.buildingList = res.data;
        }
      );
    },
  },
};
</script>

<style scoped>
#tooles {
  height: 40px;
  background: #5688cb;
  position: relative;
  z-index: 100;
  color: white;
  width: 900px;
  margin-top: 10px;
}

#bside_left {
  width: 260px;
  height: 530px;
  border: 1px solid #ccc;
  float: left;
  overflow: auto;
  padding-left: 5px;
}

#cur_city,
#no_value {
  height: 20px;
  position: absolute;
  top: 3px;
  left: 10px;
}

#cur_city .change_city {
  margin-left: 5px;
  cursor: pointer;
}

#level {
  margin-left: 20px;
}

.logo_img {
  width: 172px;
  height: 23px;
}

.poi {
  width: 570px;
  height: 41;
  padding-top: 12px;
  float: left;
  position: relative;
}

.poi_note {
  width: 63px;
  line-height: 26px;
  float: left;
}

.already {
  width: 52px;
  line-height: 26px;
  padding-left: 5px;
  float: left;
  color: red;
  display: none;
}

.info_list {
  margin-bottom: 5px;
  clear: both;
  cursor: pointer;
}

#txt_pannel {
  height: 500px;
}

#city {
  width: 356px;
  height: 433px;
  padding: 10px;
  border: 2px solid #d6d6d6;
  position: absolute;
  left: 44px;
  top: 20px;
  z-index: 999;
  background: #fff;
  overflow: auto;
  color: black;
}

#city .city_class {
  font-size: 12px;
  background: #fff;
  margin: 1px 0;
}

#city .city_container {
  margin-top: 10px;
  /*margin-bottom: 50px;*/
  background: #fff;
}

#city .city_container_left {
  width: 48px;
  float: left;
}

#city .style_color {
  color: #000;
  font-weight: 600;
}

#city .city_container_right {
  width: 289px;
  float: left;
}

#city .close {
  width: 20px;
  height: 20px;
  display: inline-block;
  float: right;
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

#city .city_name {
  line-height: 20px;
  height: 20px;
  margin-left: 5px;
  color: #2f82c4;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
}

#curCity {
  margin-right: 5px;
}

.hide {
  display: none;
}

#bside_rgiht {
  width: 631px;
  height: 530px;
  border: 1px solid #ccc;
  float: left;
  font-size: 12px;
}

#containers {
  width: 621px;
  height: 520px;
  border: 5px solid #fff;
}

#no_value {
  color: red;
  position: relative;
  width: 200px;
}
</style>
