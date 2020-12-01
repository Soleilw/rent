<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addMessageType">添加资讯类型</el-button>
      </div>
    </div>

    <el-dialog title="新增资讯类型" :visible.sync="dialogMessageType" width="40%">
      <div class="btn">
        <el-form :model="form" label-width="100px">
          <el-form-item label="资讯分类名">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="资讯分类图标">
            <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
              :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
              :on-exceed="handleExceed">
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
            <div v-if="hasNewImage" style="color: red; font-size: 12px;">* 点击文件名可删除所选图片</div>

            <div class="up-img">
              <img class="pic-box" :src="form.href" />
            </div>
          </el-form-item>
        </el-form>
        <div class="submit">
          <el-button type="primary" @click="newMessageType">提交</el-button>
        </div>
      </div>
    </el-dialog>

    <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}">
      <el-table-column prop="id" label="分类ID"></el-table-column>
      <el-table-column prop="title" label="分类标题"></el-table-column>
      <el-table-column prop="href" label="分类图标">
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
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>
    <!-- 删除提示框 -->
    <el-dialog :visible.sync="dialogDel" title="删除资讯" width="20%" align="center" :close-on-click-modal="false">
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

  export default {
    name: "messagetype",
    data() {
      return {
        loading: true,
        hasNewImage: false,
        dialogMessageType: false,
        dialogDel: false,
        form: {
          title: "",
          href: "",
        },
        disabled: false,

        tableDate: [],

        current: 1,
        size: 10,
        total: 0,
      };
    },
    mounted() {
      this.getMessageType(this.current, this.size);
    },
    methods: {
      getMessageType(cur, list) {
        var self = this;
        API.messageTypes(cur, list)
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
        self.loading = true;
        self.getMessageType(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getMessageType(1, val);
        self.current = 1;
      },

      addMessageType() {
        var self = this;
        self.dialogMessageType = true;
        self.hasNewImage = false;
        self.form.href = "";
        if (self.$refs.upload) {
          self.$refs.upload.clearFiles();
        }
      },
      newMessageType() {
        var self = this;
        API.messageType(self.form).then((res) => {
          self.$message.success("提交成功");
          self.dialogMessageType = false;
          self.getMessageType(self.current, self.size);
          self.form = {};
        });
      },

      handleDelete(index, row) {
        var self = this;
        self.dialogDel = true;
        self.id = row.id;
      },
      toDel() {
        var self = this;
        self.dialogDel = false;
        API.delDocumentType(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getMessageType(self.current, self.size);
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
      handleAvatarSuccess(res, file) {
        var self = this;
        //图片上传成功
        self.$message.success("上传成功");
        self.form.href = file.response.data;
        self.hasNewImage = true;
      },
      handleExceed(files, fileList) {
        //图片上传超过数量限制
        var self = this;
        self.$message.error("上传图片不能超过1张!");
        self.$refs.upload.clearFiles();
        self.form.href = "";
        self.form.title = "";
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