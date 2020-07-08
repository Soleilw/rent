<template>
  <div>
    <div class="btn">
      <el-button type="primary" @click="addDocument">添加文档</el-button>
    </div>

    <el-dialog :visible.sync="dialogDocument" title="文档编辑">
      <div class="box">
        <div style="margin: 0 10px">
          <h3 style="height: 40px; line-height: 40px;">文档标题</h3>
          <input
            type="text"
            v-model="form.title"
            style="width: 100%; height: 30px; line-height: 30px;font-size: 15px;"
          />
          <h3 style="height: 40px; line-height: 40px;">文档内容</h3>
          <quill-editor
            ref="myQuillEditor"
            v-model="form.detail"
            :options="editorOption"
            style="height:430px;margin:0 0 60px 0;"
          ></quill-editor>
          <el-upload
            class="avatar-uploader quill-img"
            action="https://api.fengniaotuangou.cn/api/upload"
            :before-upload="beforeUpload"
            :on-success="quillImgSuccess"
            style="display: none"
          >
            <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传</el-button>
          </el-upload>
          <div class="submit">
            <el-button type="primary" @click="newDocument">提交</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-table :data="tableDate">
      <el-table-column label="名称" type="selection" align="center"></el-table-column>
      <el-table-column prop="id" label="文档ID" align="center"></el-table-column>
      <el-table-column prop="title" label="文档标题" align="center"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogDel"
      title="删除年级"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该文档</div>
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
  </div>
</template>

<script>
import API from "@/api/index.js";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

let loading;
export default {
  name: "document",
  components: {
    quillEditor
  },
  data() {
    return {
      dialogDocument: false,
      form: {
        title: "",
        detail: ""
      },
      editorOption: {
        placeholder: "请输入文档内容",
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [
                {
                  direction: "rtl"
                }
              ],
              [
                {
                  size: ["small", false, "large", "huge"]
                }
              ],
              [
                {
                  header: [1, 2, 3, 4, 5, 6, false]
                }
              ],
              [
                {
                  color: []
                },
                {
                  background: []
                }
              ],
              [
                {
                  font: []
                }
              ],
              [
                {
                  align: []
                }
              ],
              ["clean"],
              ["link", "image"]
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".quill-img input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },

      tableDate: [],
      dialogDel: false,
      id: "",
      currentPage: 1,
      totalPage: 0
    };
  },
  mounted() {
    this.getDocument();
  },
  methods: {
    // 获取资讯类型
    getDocument() {
      var self = this;
      API.documents(self.currentPage).then(res => {
        self.tableDate = res.data;
        self.totalPage = res.total;
      });
    },
    // 添加文档
    newDocument() {
      var self = this;
      API.document(self.form).then(res => {
        self.$message.success("提交成功");
        self.dialogDocument = false;
        self.getDocument();
        self.form = {};
        self.currentPage = 1;
      });
    },
    addDocument() {
      var self = this;
      self.dialogDocument = true;
      self.form = {
        title: "",
        detail: ""
      };
    },

    // 富文本选择图片时的事件
    beforeUpload() {
      // 显示加载动画
      loading = this.$loading({
        lock: true,
        text: "图片上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
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

    handleEdit(index, row) {
      var self = this;
      self.dialogDocument = true;
      self.form = row;
    },
    // 操作
    handleDelete(index, row) {
      var self = this;
      self.dialogDel = true;
      self.id = row.id;
    },

    toDel() {
      var self = this;
      API.delDocument(self.id).then(res => {
        self.$message.success("删除成功");
        self.dialogDel = false;
        self.getDocument();
        self.currentPage = 1;
      });
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      self.getDocument();
    },
    // 每页多少条
    handleSizeChange(val) {
      var self = this;
      API.documents(self.currentPage, val).then(res => {
        self.tableDate = res.data;
        self.totalPage = res.total;
      });
    }
  }
};
</script>

<style>
</style>
