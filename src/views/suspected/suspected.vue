<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- 表格数据 -->
    <div class="btn">
      <el-button type="primary" @click="addDangerFace">添加可疑人物</el-button>
    </div>
      <el-dialog title="添加可疑人物" :visible.sync="dialogDangerFace">
      <div class="box">
       
      </div>
    </el-dialog>
    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="" label="设备ID" align="center"></el-table-column>
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
    </el-table>
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

export default {
  data() {
    return {
      loading: false,
      tableData: [], // 表格数据
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,
      dialogDangerFace: false
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
    // 添加可以人物
    addDangerFace() {
      var self = this;
      self.dialogDangerFace = true
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
  },
};
</script>

<style scoped>
</style>