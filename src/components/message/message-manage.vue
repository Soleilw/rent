<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addMessageMs">添加资讯</el-button>
      </div>
    </div>

    <el-table :data="tableDate" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="资讯ID"></el-table-column>
      <el-table-column prop="type.title" label="资讯类型"></el-table-column>
      <el-table-column prop="cover" label="资讯缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="max-width:180px;max-height:80px;" />
        </template>
      </el-table-column>
      <el-table-column prop="page_view" label="资讯浏览量"></el-table-column>
      <el-table-column prop="is_show" label="推送状态">
        <template slot-scope="scope">
          <div v-if="scope.row.is_show == 1">
            <span>已推送</span>
          </div>
          <div v-if="scope.row.is_show == 2">
            <span>未推送</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogMessageMs" title="文档编辑" width="60%">
      <el-form label-width="80px" :model="form">
        <el-form-item label="资讯标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="资讯分类">
          <el-select v-model="form.type_id" placeholder="请选择资讯分类" @change="typeChange">
            <el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否推送">
          <el-select v-model="form.is_show" placeholder="请选择是否推送" @change="pushChange">
            <el-option v-for="item in pushList" :key="item.is_show" :label="item.name" :value="item.is_show">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯封面">
          <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
            :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">选择图片</el-button>
          </el-upload>
          <div v-if="hasNewImage" style="color: red; font-size: 12px;">* 点击文件名可删除所选图片</div>
          <div class="up-img">
            <img class="pic-box" :src="imageUrl" />
          </div>
        </el-form-item>
        <el-form-item label="资讯内容">
          <quill-editor ref="myQuillEditor" v-model="form.detail" :options="editorOption"
            style="height:430px;margin:0 0 60px 0;"></quill-editor>
          <el-upload class="avatar-uploader quill-img" action="https://api.fengniaotuangou.cn/api/upload"
            :before-upload="beforeUpload" :on-success="quillImgSuccess" style="display: none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
          <el-upload class="avatar-uploader quill-video" action="https://api.fengniaotuangou.cn/api/upload"
            :before-upload="beforeUploadVideo" :on-success="handleVideoSuccess" style="display: none">
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="submit">
          <el-form-item>
            <el-button type="primary" @click="newMessageMs">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

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
  import {
    quillEditor
  } from "vue-quill-editor";
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import {
    log
  } from "util";
  let loading;

  export default {
    name: "messagems",
    components: {
      quillEditor,
    },
    data() {
      return {
        loading: true,
        hasNewImage: false,
        disabled: false,
        dialogMessageMs: false,
        dialogDel: false,
        form: {
          id: "",
          type_id: "",
          title: "",
          detail: "",
          cover: "",
          is_show: "",
        },
        title: "",
        typeList: [],
        pushList: [{
            is_show: 1,
            name: "推送",
          },
          {
            is_show: 2,
            name: "取消推送",
          },
        ],
        editorOption: {
          placeholder: "请输入文档内容",
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{
                  direction: "rtl",
                }, ],
                [{
                  size: ["small", false, "large", "huge"],
                }, ],
                [{
                  header: [1, 2, 3, 4, 5, 6, false],
                }, ],
                [{
                    color: [],
                  },
                  {
                    background: [],
                  },
                ],
                [{
                  font: [],
                }, ],
                [{
                  align: [],
                }, ],
                ["clean"],
                ["link", "image", "video"],
              ],
              handlers: {
                image: function (value) {
                  if (value) {
                    document.querySelector(".quill-img input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
                video: function (value) {
                  console.log(value);
                  if (value) {
                    document.querySelector(".quill-video input").click();
                  } else {
                    this.quill.format("video", false);
                  }
                }
              },
            },
          },
        },

        tableDate: [],

        current: 1,
        total: 0,
        size: 10,
        imageUrl: "",
        is_show: 2,
        name: "",
      };
    },
    mounted() {
      this.getMessageType();
      this.getMessages(this.current, this.size);
    },
    methods: {
      // 获取资讯类型
      getMessageType() {
        var self = this;
        API.messageTypes(1).then((res) => {
          self.typeList = res.data;
        });
      },
      // 获取资讯内容
      getMessages(cur, list) {
        var self = this;
        API.messages(cur, list)
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
        self.getMessages(val, self.size);
      },
      // 每页多少条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        self.getMessages(1, val);
        self.current = 1;
      },

      // 添加资讯文档
      addMessageMs() {
        var self = this;
        self.dialogMessageMs = true;
        self.hasNewImage = false;
        self.form = {};
        self.imageUrl = "";
        if (self.$refs.upload) {
          self.$refs.upload.clearFiles();
        }
      },
      typeChange(val) {
        this.form.type_id = val;
      },
      pushChange(val) {
        this.form.is_show = val;
      },
      // 提交文档
      newMessageMs() {
        var self = this;
        API.message(self.form).then((res) => {
          self.$message.success("提交成功");
          self.dialogMessageMs = false;
          self.getMessages(self.current, self.size);
          self.form = {};
        });
      },
      handleEdit(index, row) {
        var self = this;
        self.dialogMessageMs = true;
        self.form = row;
        self.form = {
          id: row.id,
          type_id: row.type_id,
          title: row.title,
          detail: row.detail,
          cover: row.cover,
          is_show: row.is_show,
        };
      },

      handleDelete(index, row) {
        var self = this;
        self.dialogDel = true;
        self.id = row.id;
      },
      toDel() {
        var self = this;
        API.documentDel(self.id).then((res) => {
          self.$message.success("删除成功");
          self.dialogDel = false;
          self.getMessages(self.current, self.size);
        });
      },

      // 富文本选择图片时的事件
      beforeUpload() {
        // 显示加载动画
        loading = this.$loading({
          lock: true,
          text: "图片上传中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      },
      // 富文本插入图片时上传图片
      quillImgSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill;
        // 关闭动画
        loading.close();
        if (res.data) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, "image", res.data);
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
      },
      handleRemove(file, fileList) {
        //移除图片
        var self = this;
        self.imageUrl = "";
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
        //图片上传成功
        var self = this;
        self.imageUrl = URL.createObjectURL(file.raw);
        self.$message.success("上传成功");
        self.form.cover = file.response.data;
        self.hasNewImage = true;
      },
      handleExceed(files, fileList) {
        //图片上传超过数量限制
        var self = this;
        self.$message.error("上传图片不能超过1张!");
        self.$refs.upload.clearFiles();
        self.imageUrl = "";
      },


      //上传前回调
      beforeUploadVideo(file) {
        var self = this;
        loading = this.$loading({
          lock: true,
          text: "视频上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        var fileSize = file.size / 1024 / 1024 < 50;
        if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file
            .type) == -1) {
          self.$message.error("请上传正确的视频格式");
          return false;
        }
        if (!fileSize) {
          self.$message.error("视频大小不能超过50MB");
          return false;
        }
        self.isShowUploadVideo = false;
      },

      //上传成功回调
      handleVideoSuccess(res, file) {
        loading.close();
        let quill = this.$refs.myQuillEditor.quill;
        if (res.data) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, "video", res.data);
          quill.setSelection(length + 1);
        } else {
          this.$message.error("视频插入失败");
        }
      }
    },
  };
</script>

<style scoped>
  .pic-box {
    max-width: 100%;
    height: 200px;
  }
</style>