<template>
  <div v-loading="loading">
    <div class="btn">
      <el-button type="primary" @click="getSstatistics">全部</el-button>
    </div>
    <div class="btn" v-if="isAdmin">
      <span>社区：</span>
      <el-select v-model="area" placeholder="请选择社区" @change="changeAreaType">
        <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="btn">
      <span>出租屋：</span>
      <el-select v-model="lets" placeholder="请选择/输入出租屋" filterable @change="letType">
        <el-option v-for="item in letList" :key="item.index" :label="item.address" :value="item.id"></el-option>
      </el-select>
    </div>
    <!-- <div class="btn" v-if="!isAdmin">
      <span>出租屋：</span>
      <el-select v-model="lets" placeholder="请选择/输入出租屋" filterable @change="letType">
        <el-option v-for="item in letList" :key="item.index" :label="item.address" :value="item.id"></el-option>
      </el-select>
    </div>-->
    <!-- 表格数据 -->
    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="name" label="房屋地址" align="center"></el-table-column>
      <el-table-column prop="count" label="人口总数" align="center"></el-table-column>
      <el-table-column prop="man_percent" label="男性比例(%)" align="center"></el-table-column>
      <el-table-column prop="woman_percent" label="女性比例(%)" align="center"></el-table-column>
      <el-table-column prop="wait_state" label="待审核人数" align="center"></el-table-column>
      <el-table-column prop="already_state" label="审核通过人数" align="center"></el-table-column>
      <el-table-column prop="no_state" label="审核未通过人数" align="center"></el-table-column>
    </el-table>
    <!-- 分页 全部-->
    <div class="block" v-if="area == '' && lets == ''">
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
    <!-- 分页 社区-->
    <div class="block" v-if="area != '' && lets == ''">
      <el-pagination
        @current-change="handleArea"
        :current-page.sync="areaCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="areaPageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleAreaSize"
      ></el-pagination>
    </div>
    <!-- 分页 房屋-->
    <div class="block" v-if="area != '' && lets != ''">
      <el-pagination
        @current-change="handleLets"
        :current-page.sync="letsCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="letsPageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleLetsSize"
      ></el-pagination>
    </div>

    <!-- 分页 房屋-->
    <div class="block" v-if="username != 'admin' && lets != ''">
      <el-pagination
        @current-change="handleLets"
        :current-page.sync="letsCurrentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="letsPageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleLetsSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/api/index.js";
import { log } from "util";

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1, // 全部 分页
      pageSize: 10,
      totalPage: 0,
      areaCurrentPage: 1, // 社区 分页
      areaPageSize: 10,
      areaTotalPage: 0,
      letsCurrentPage: 1, // 房屋 分页
      letsPageSize: 10,
      letsTotalPage: 0,
      username: localStorage.getItem("username"),
      isAdmin: true,
      area: "",
      areaList: [],
      lets: "",
      letList: [],
      area_id: "",
      address_id: "",
    };
  },
  mounted() {
    this.getSstatistics();
    this.getArea();
    if (this.username !== "admin") {
      this.isAdmin = false;
      this.getLet();
    }
  },
  methods: {
    // 获取统计列表
    getSstatistics() {
      var self = this;
      self.lets = "";
      self.area = "";
      if (self.username == "admin") {
        self.letList = [];
      }
      API.statistics(1, self.pageSize).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
      });
    },
    // 获取社区
    getArea() {
      var self = this;
      API.areas(1, 100, 3).then((res) => {
        self.areaList = res.data;
      });
    },
    // 获取出租屋
    getLet() {
      var self = this;
      API.addresses(1, 100, self.area_id).then((res) => {
        self.letList = res.data;
      });
    },
    // 选择社区
    changeAreaType(value) {
      var self = this;
      self.area_id = value;
      self.lets = "";
      API.statistics(1, self.areaPageSize, self.area_id).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
      });
      self.getLet();
    },
    // 选择出租屋
    letType(value) {
      var self = this;
      console.log(value);
      self.address_id = value;
      self.pageSize = 10;
      API.statistics(1, self.pageSize, self.area_id, self.address_id).then(
        (res) => {
          self.tableData = res.data;
          self.totalPage = res.total;
        }
      );
    },

    // 分页
    handleCurrentChange(val) {
      var self = this;
      API.statistics(val, self.pageSize).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
      });
    },
    // 每页几条
    handleSizeChange(val) {
      var self = this;
      self.pageSize = val;
      API.statistics(1, val).then((res) => {
        self.tableData = res.data;
        self.totalPage = res.total;
        self.currentPage = 1;
      });
    },
    handleArea(val) {
      var self = this;
      API.statistics(val, self.areaPageSize, self.area_id).then((res) => {
        self.tableData = res.data;
        self.areaTotalPage = res.total;
      });
    },
    handleAreaSize(val) {
      var self = this;
      self.areaPageSize = val;
      API.statistics(1, val, self.area_id).then((res) => {
        self.tableData = res.data;
        self.areaTotalPage = res.total;
        self.areaCurrentPage = 1;
      });
    },
    handleLets(val) {
      var self = this;
      API.statistics(
        val,
        self.letsPageSize,
        self.area_id,
        self.address_id
      ).then((res) => {
        self.tableData = res.data;
        self.letsTotalPage = res.total;
      });
    },
    handleLetsSize(val) {
      var self = this;
      self.letsPageSize = val;
      API.statistics(1, val, self.area_id, self.address_id).then((res) => {
        self.tableData = res.data;
        self.letsTotalPage = res.total;
        self.letsCurrentPage = 1;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>