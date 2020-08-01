<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- 表格数据 -->
    <div class="btn">
      <el-button type="primary" @click="addDangerFace">添加可疑人物</el-button>
    </div>
    <el-dialog title="添加可疑人物" :visible.sync="dialogDangerFace" :close-on-click-modal="false">
      <div class="box">
        <el-form :model="form" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.number" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="通知相似度">
            <el-input v-model="form.notify_score" placeholder="请输入通知相似度(保留一位小数, 例如78.9)"></el-input>
          </el-form-item>
          <el-form-item label="通知手机号">
            <el-input
              type="textarea"
              v-model="notify_user"
              placeholder="请输入手机号, 多个手机号用逗号分隔(例如: 13212312312,13212312312)"
            ></el-input>
          </el-form-item>

          <el-form-item label="地址">
            <div style="font-size: 20px; margin-bottom: 30px;">
              <el-select v-model="form.address" placeholder="请选择地址" @change="addressChange">
                <el-option
                  v-for="item in addressList"
                  :key="item.id"
                  :label="item.address"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>

            <!-- <el-input v-model="form.address_id" style="width: 220px"></el-input> -->
          </el-form-item>
          <el-form-item label="人脸图片">
            <el-upload
              action="https://api.fengniaotuangou.cn/api/upload"
              ref="upload"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-change="handleChange"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
            <div v-if="hasNewImage" style="color: red; font-size: 12px;">* 点击文件名可删除所选图片</div>

            <div class="up-img">
              <img class="pic-box" :src="form.href" />
            </div>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="upload">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop label="设备ID" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="created_at" label="时间" align="center"></el-table-column>
      <el-table-column prop="number" label="人脸证件号" align="center"></el-table-column>
      <el-table-column prop="href" label="人脸图片" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.href">
            <el-popover placement="top-start" title trigger="click">
              <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
              <img slot="reference" :src="scope.row.href" style="max-width:180px;max-height:80px;" />
            </el-popover>
          </div>
          <div v-else>
            <span>--暂无图片--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除提示框 -->
    <!-- <el-dialog
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
    </el-dialog>-->

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs">
      <div class="box">
        <el-table :data="logsData">
          <el-table-column prop="danger.name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="address" label="地址" align="center"></el-table-column>
          <el-table-column prop="danger.number" label="证件号" align="center"></el-table-column>
          <!-- <el-table-column prop="score" label="相似度" align="center"></el-table-column> -->
          <el-table-column prop="log.timestamp" label="时间" align="center"></el-table-column>
          <el-table-column prop="danger.href" label="人脸照片" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.danger.href">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.danger.href" style="max-width:800px;max-height:800px;" />
                  <img
                    slot="reference"
                    :src="scope.row.danger.href"
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
import API from "@/api//index.js";
import { log } from "util";
import date from "../../utils/date";

export default {
  data() {
    return {
      loading: false,
      tableData: [], // 表格数据
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,
      dialogDangerFace: false,
      // dialogPicture: false,
      // form: {
      //   href: "",
      // },
      qiniuaddr: "https://tu.fengniaotuangou.cn", // 七牛云图片外链地址

      hasNewImage: false,
      form: {
        name: "",
        number: "",
        href: "",
        notify_score: "", // 相似度
        notify_user: "", // 通知的手机号
        address_id: "",
      },
      addressList: [],
      // dialogDel: false,
      dialogLogs: false,
      logsData: [],
      danger_id: "",
      currentLogsPage: 1,
      pageSizeLogs: 10,
      totalLogsPage: 0,
      notify_user: "",
    };
  },

  mounted() {
    this.getDangerFace();
  },
  methods: {
    // 获取可疑人物
    getDangerFace() {
      var self = this;
      API.dangerFace(self.currentPage, self.pageSize).then((res) => {
        console.log("getDangerFace", res.data.data);
        self.tableData = res.data.data;
        self.totalPage = res.data.total;
      });
    },
    // 获取地址列表
    getAddress() {
      var self = this;
      API.address(self.currentPage, self.pageSize).then((res) => {
        console.log("getAddress", res);
        self.addressList = res.data;
      });
    },
    // 选择地址
    addressChange(val) {
      var self = this;
      self.form.address_id = val;
      console.log(self.form.address_id);
    },
    // 添加可以人物
    addDangerFace() {
      var self = this;
      self.dialogDangerFace = true;
      self.getAddress();
    },
    // 进出记录
    handleLogs(index, row) {
      var self = this;
      self.dialogLogs = true;
      self.danger_id = row.danger_id;
      console.log(row);
      self.getFaceLogs();
    },
    getFaceLogs() {
      var self = this;
      API.dangerLog(
        self.currentLogsPage,
        self.pageSizeLogs,
        self.danger_id
      ).then((res) => {
        console.log("getFaceLogs", res.data.data);
        self.logsData = res.data.data;
        self.totalLogsPage = res.data.total;
        self.logsData.forEach((item) => {
          item.log.timestamp = date.formatTime(
            item.log.timestamp,
            "Y-M-D h:m:s"
          );
        });
      });
    },

    handleRemove(file, fileList) {
      //移除图片
      var self = this;
      self.form.href = "";
      self.hasNewImage = false;
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleChange(file) {
      var self = this;
      self.form.href = URL.createObjectURL(file.raw);
      self.hasNewImage = true;
    },
    handleAvatarSuccess(res, file) {
      //图片上传成功
      var self = this;
      file.url = res.data;
      // self.href = file.url;
      self.form.href = file.url;
      // 手机加 '+86'
      var phones = self.notify_user.split(",");
      var arr = [];
      phones.forEach((item) => {
        item = "+86" + item;
        arr.push(item);
      });
      self.form.notify_user = arr.toString();
      API.addDangerFace(self.form).then((res) => {
        self.$message.success("上传成功");
        self.currentPage = 1;
        self.getDangerFace();
        self.$refs.upload.clearFiles();
        self.form = {
          name: "",
          number: "",
          href: "",
          notify_score: "",
          notify_user: "",
          address_id: "",
        };
        self.notify_user = "";
        // self.form.href = "";
        self.dialogDangerFace = false;
      });
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      var self = this;
      self.$message.error("上传图片不能超过1张!");
      self.$refs.upload.clearFiles();
      self.form.href = "";
      self.form.id = "";
    },
    // 上传图片
    upload() {
      var self = this;
      self.$refs.upload.submit();
    },
    getQiniuToken() {
      var self = this;
      axios
        .get("https://api.fengniaotuangou.cn/api/upload/token")
        .then((res) => {
          self.imgData.token = res.data.uptoken;
        });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      console.log(val);
      self.currentPage = val;
      API.dangerFace(val, self.pageSize).then((res) => {
        self.tableData = res.data.data;
      });
    },
    // 每页条数
    handleSizeChange(val) {
      var self = this;
      console.log(val);
      self.pageSize = val;
      API.dangerFace(self.currentPage, val).then((res) => {
        self.tableData = res.data.data;
        self.totalPage = res.data.total;
        self.currentPage = 1;
      });
    },

    // 进出记录分页
    handleCurrentLogs(val) {
      var self = this;
      self.currentLogsPage = val;
      API.dangerLog(val, self.pageSizeLogs, self.danger_id).then((res) => {
        self.logsData = res.data.data;
        self.logsData.forEach((item) => {
          item.log.timestamp = date.formatTime(
            item.log.timestamp,
            "Y-M-D h:m:s"
          );
        });
      });
    },
    handleSizeLogs(val) {
      var self = this;
      self.pageSizeLogs = val;
      API.dangerLog(self.currentLogsPage, val, self.danger_id).then((res) => {
        self.logsData = res.data.data;
        self.logsData.forEach((item) => {
          item.log.timestamp = date.formatTime(
            item.log.timestamp,
            "Y-M-D h:m:s"
          );
        });
      });
    },
  },
};
</script>

<style scoped>
.upload-btn {
  margin-top: 10px;
}
.pic-box {
  max-width: 100%;
  height: 200px;
}
</style>