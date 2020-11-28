<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addSwitch">添加开关信息</el-button>
      </div>
    </div>

    <el-dialog title="添加开关信息" :visible.sync="dialogSwitch" width="50%">
      <div class="box">
        <el-form :model="form" label-width="80px">
          <el-form-item label="开关名称">
            <el-input v-model="form.key"></el-input>
          </el-form-item>
          <el-form-item label="版本">
            <el-input v-model="form.version"></el-input>
          </el-form-item>
          <el-form-item label="开关值">
            <el-input v-model="form.value"></el-input>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newSwitch">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="config_key" label="开关名称"></el-table-column>
      <el-table-column prop="version" label="版本"></el-table-column>
      <el-table-column prop="config_value" label="开关值"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="dialogDel" title="删除版本" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该版本</div>
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
    name: "gradems",
    data() {
      return {
        loading: true,
        dialogSwitch: false,
        dialogDel: false,
        form: {
          key: "",
          version: "",
          value: "",
          id: "",
        },
        tableData: [],
        id: "",
      };
    },
    mounted() {
      this.getSwitch();
    },
    methods: {
      getSwitch() {
        var self = this;
        API.getConfigs()
          .then((res) => {
            //   console.log(res);
            self.loading = false;
            self.tableData = res;
          })
          .catch((err) => {
            this.loading = false;
          });
      },

      // 添加新的AIP
      addSwitch() {
        var self = this;
        self.dialogSwitch = true;
        self.form = {
          key: "",
          version: "",
          value: "",
          id: "",
        };
      },

      newSwitch() {
        var self = this;
        API.faceSwitch(self.form)
          .then((res) => {
            self.dialogSwitch = false;
            self.$message.success("提交成功");
            self.getSwitch();
            self.current = 1;
            self.form = {};
          })
          .catch((err) => {
            self.dialogSwitch = false;
          });
      },
      // 操作
      handleDel(index, row) {
        var self = this;
        // console.log(row);
        self.id = row.id;
        self.dialogDel = true;
      },
      toDel() {
        var self = this;
        API.delFaceSwitch(self.id)
          .then((res) => {
            self.dialogDel = false;
            self.$message.success("删除成功");
            self.getSwitch();
          })
          .catch((err) => {
            self.loading = false;
          });
      },
      // 编辑
      handleEdit(index, row) {
        let self = this;
        // console.log(row);
        self.dialogSwitch = true;
        self.form = {
          key: row.config_key,
          version: row.version,
          value: row.config_value,
          id: row.id,
        };
      },
    },
  };
</script>

<style>
</style>