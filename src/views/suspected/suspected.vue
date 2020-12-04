<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- 表格数据 -->
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addDangerFace">添加可疑人物</el-button>
      </div>
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
            <el-input type="textarea" v-model="notify_user"
              placeholder="请输入手机号, 多个手机号用逗号分隔(例如: 13212312312,13212312312)"></el-input>
          </el-form-item>

          <el-form-item label="人脸图片">
            <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
              :before-upload="beforeAvatarUpload" :on-change="handleChange" :on-success="handleAvatarSuccess"
              :on-remove="handleRemove" :on-exceed="handleExceed" :auto-upload="false">
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

    <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="created_at" label="时间"></el-table-column>
      <el-table-column prop="number" label="人脸证件号"></el-table-column>
      <el-table-column prop="href" label="人脸图片">
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
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs" width="80%">
      <div class="box">
        <el-table :data="logsData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
          <el-table-column prop="danger.name" label="姓名"></el-table-column>
          <el-table-column prop="danger.number" label="证件号"></el-table-column>
          <el-table-column prop="danger.href" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.danger">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.danger.href" style="max-width:800px;max-height:800px;" />
                  <img slot="reference" :src="scope.row.danger.href" style="max-width:180px;max-height:80px;" />
                </el-popover>
              </div>
              <div v-else>
                <span>--暂无图片--</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="相似度"></el-table-column>
          <el-table-column prop="log.image" label="抓拍照片">
            <template slot-scope="scope">
              <div v-if="scope.row.log">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.log.image" style="max-width:800px;max-height:800px;" />
                  <img slot="reference" :src="scope.row.log.image" style="max-width:180px;max-height:80px;" />
                </el-popover>
              </div>
              <div v-else>
                <span>--暂无图片--</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="log.timestamp" label="抓拍时间"></el-table-column>
          <el-table-column prop="address" label="抓拍地址"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination @current-change="logsCurrentChange" :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="logsSize" layout="sizes, prev, pager, next, jumper"
          :total="logsTotal" @size-change="logsSizeChange"></el-pagination>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import API from "@/api//index.js";
  import {
    log
  } from "util";
  import date from "../../utils/date";
  import {
    setInterval
  } from 'timers';

  export default {
    data() {
      return {
        loading: true,
        tableData: [], // 表格数据
        current: 1, // 分页
        size: 10,
        total: 0,
        dialogDangerFace: false,
        qiniuaddr: "https://tu.fengniaotuangou.cn", // 七牛云图片外链地址

        hasNewImage: false,
        form: {
          name: "",
          number: "",
          href: "",
          notify_score: "", // 相似度
          notify_user: "", // 通知的手机号
        },
        dialogLogs: false,
        logsData: [],
        danger_id: "",
        logsCurrent: 1,
        logsSize: 10,
        logsTotal: 0,
        notify_user: "",
      };
    },

    mounted() {
      this.getDangerFace(this.current, this.size);
    },
    methods: {
      // 获取可疑人物
      getDangerFace(cur, list) {
        var self = this;
        API.dangerFace(cur, list)
          .then((res) => {
            self.loading = false;
            self.tableData = res.data.data;
            self.total = res.data.total;
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
        self.getDangerFace(val, self.size);
      },
      // 每页条数
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getDangerFace(1, val);
        self.current = 1;
      },

      // 添加可以人物
      addDangerFace() {
        var self = this;
        self.dialogDangerFace = true;
      },

      // 进出记录
      handleLogs(index, row) {
        var self = this;
        self.dialogLogs = true;
        self.danger_id = row.danger_id;
        self.logsCurrent = 1;
        self.getFaceLogs(self.logsCurrent, self.logsSize);
      },
      getFaceLogs(cur, list) {
        var self = this;
        API.dangerLog(cur, list, self.danger_id).then(
          (res) => {
            this.$message.success('获取数据成功');
            self.logsData = res.data.data;
            self.logsTotal = res.data.total;
            self.logsData.forEach((item) => {
              item.log.timestamp = date.formatTime(
                item.log.timestamp,
                "Y-M-D h:m:s"
              );
            });
          }
        );
      },
      // 进出记录分页
      logsCurrentChange(val) {
        var self = this;
        self.logsCurrent = val;
        self.getFaceLogs(val, self.logsSize);
      },
      logsSizeChange(val) {
        var self = this;
        self.logsSize = val;
        self.getFaceLogs(1, val);
        self.logsCurrent = 1;
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
        self.form.href = res.data;
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
          self.getDangerFace(self.current, self.size);
          self.$refs.upload.clearFiles();
          self.form = {
            name: "",
            number: "",
            href: "",
            notify_score: "",
            notify_user: "",
          };
          self.notify_user = "";
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