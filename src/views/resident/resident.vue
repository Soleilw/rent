<template>
  <div v-loading="loading">
    <div class="btn">
      <el-input
        v-model="renter_name"
        placeholder="输入用户名"
        class="search"
        @keyup.enter.native="search(renter_name)"
      ></el-input>
    </div>
    <div class="btn">
      <el-button type="primary" @click="search(renter_name)">搜索</el-button>
    </div>

    <!-- 表格数据 -->
    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="snapshot.name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="typeString" label="用户身份" align="center"></el-table-column>
      <el-table-column prop="snapshot" label="人脸照片" align="center">
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
      <el-table-column prop="snapshot.phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="snapshot.card_number" label="身份证" align="center" width="200px"></el-table-column>

      <el-table-column prop="address.address" label="房屋地址" align="center" width="300px"></el-table-column>
      <el-table-column prop="expireTime" label="进出服务到期时间" align="center" width="300px"></el-table-column>
      <!-- <el-table-column prop label="是否开通服务" align="center" width="300px"></el-table-column> -->
      <el-table-column prop="room" label="房屋编号" align="center"></el-table-column>
      <el-table-column prop="state" label="审核状态" align="center">
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
      <el-table-column label="操作" align="center" width="500px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.state == 1"
            @click="handleAudit(scope.$index, scope.row)"
          >审核</el-button>
          <el-button type="primary" size="mini" @click="openServe(scope.$index, scope.row)">开通服务</el-button>
          <el-button type="primary" size="mini" @click="openedServe(scope.$index, scope.row)">已开通的服务</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
        <el-table :data="serviceList">
          <el-table-column prop="id" label="订单ID" align="center"></el-table-column>
          <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="time" label="商品有效期(天)" align="center"></el-table-column>
          <el-table-column prop="expireTime" label="到期时间" align="center"></el-table-column>
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

export default {
  data() {
    return {
      loading: false,
      form: {
        identity: "",
      },

      tableData: [], // 表格数据
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,

      dialogLogs: false, // 进出记录
      logsData: [],
      currentLogsPage: 1,
      pageSizeLogs: 10,
      totalLogsPage: 0,
      dialogAudit: false, // 审核
      renter_id: "", // 住户id
      renter_name: "", // 住户名字
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
      face_id: ''
    };
  },
  mounted() {
    this.getAllRent();
  },
  methods: {
    // 获取身份列表
    getAllRent() {
      var self = this;
      API.households(self.currentPage, self.pageSize).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
      });
    },

    // 搜索
    search() {
      var self = this;
      API.searchHousehold(
        self.currentPage,
        self.pageSize,
        self.renter_name
      ).then((res) => {
        self.tableData = res.data;
        self.totalPage = 1;
        self.renter_name = "";
        self.$message.success("搜索成功！");
      });
    },

    // 审核
    handleAudit(index, row) {
      var self = this;
      self.renter_id = row.id;
      self.dialogAudit = true;
    },
    toAudit() {
      var self = this;
      API.audit(self.renter_id, 2).then((res) => {
        self.$message.success("提交成功");
        self.dialogAudit = false;
        self.getAllRent();
      });
    },
    unAudit() {
      var self = this;
      API.audit(self.renter_id, 3).then((res) => {
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
      API.buys(self.currentPage, self.pageSize).then((res) => {
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
      API.households(val, self.pageSize).then((res) => {
        self.tableData = res.data;
      });
    },

    // 每页几条
    handleSizeChange(val) {
      var self = this;
      self.pageSize = val;
      API.households(self.currentPage, val).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
        self.currentPage = 1;
      });
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


<!-- <template>
	<div>
		<el-tabs v-model="activeName" @tab-click="changeActive">
			<el-tab-pane label="用户身份管理" name="identity">
				<resident-identity></resident-identity>
			</el-tab-pane>
			<el-tab-pane label="住户列表" name="list">
				<resident-list></resident-list>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import residentIdentity from '@/components/resident/resident-identity.vue'
	import residentList from '@/components/resident/resident-list.vue'
	import API from '@/api/index.js'

	export default {
		name: 'student',
		components: {
			residentIdentity,
			residentList
		},
		data() {
			return {
				activeName: 'identity'
			}
		},
		methods: {
			changeActive() {
				if(this.activeName === 'identity') {
				}
				
				if(this.activeName === 'list') {
					API.houser(1).then(res => {
					})
				}
			}
		}
	}
</script>

<style>
</style> -->
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