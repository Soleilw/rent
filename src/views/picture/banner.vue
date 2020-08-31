<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addBanner">添加轮播图</el-button>
      </div>
    </div>

    <el-dialog
      title="上传图片"
      :visible.sync="dialogBanner"
      :close-on-click-modal="false"
      width="500px"
    >
      <div class="box">
        <el-form :model="form">
          <el-form-item>
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

    <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="轮播图ID"></el-table-column>
      <el-table-column prop="href" label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.href" style="max-width:180px;max-height:80px;" />
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="dialogDel"
      title="删除轮播图"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/index.js";
import axios from "axios";

export default {
  name: "banner",
  data() {
    return {
      loading: true,
      dialogBanner: false,
      disabled: false, // 上传图片
      dialogDel: false,

      tableDate: [],

      current: 1,
      size: 10,
      total: 0,
      qiniuaddr: "https://tu.fengniaotuangou.cn", // 七牛云图片外链地址

      hasNewImage: false,
      form: {
        href: "",
        id: "",
      },
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    // 获取轮播图
    getBanner() {
      var self = this;
      API.banners(self.current)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
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
      self.loading = true
      API.banners(val, self.size)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
        });
    },
    // 每页多少条
    sizeChange(val) {
      var self = this;
      self.size = val;
      self.loading = true;
      API.banners(self.current, val)
        .then((res) => {
          self.loading = false;
          self.tableDate = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
        });
    },

    // 操作
    handleDelete(index, row) {
      var self = this;
      self.dialogDel = true;
      self.id = row.id;
    },
    toDel() {
      var self = this;
      self.dialogDel = false;
      API.delBanner(self.id).then((res) => {
        self.$message.success("删除成功");
        self.dialogDel = false;
        self.getBanner();
        self.current = 1;
      });
    },
    // 上传图片
    upload() {
      this.$refs.upload.submit();
    },
    addBanner() {
      var self = this;
      self.dialogBanner = true;
      self.hasNewImage = false;
      self.form.href = "";
      if (self.$refs.upload) {
        self.$refs.upload.clearFiles();
      }
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
      console.log(file);
      self.form.href = URL.createObjectURL(file.raw);
      self.hasNewImage = true;
    },
    handleAvatarSuccess(res, file) {
      //图片上传成功
      var self = this;
      file.url = res.data;
      // self.href = file.url;
      self.form.href = file.url;
      API.banner(self.form).then((res) => {
        self.$message.success("上传成功");
        self.current = 1;
        self.getBanner();
        self.$refs.upload.clearFiles();
        self.form.href = "";
        self.form.id = "";
        self.dialogBanner = false;
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
