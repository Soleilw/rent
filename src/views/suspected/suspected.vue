<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <!-- 表格数据 -->
    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="snapshot.name" label="设备ID" align="center"></el-table-column>
      <el-table-column prop="typeString" label="名称" align="center"></el-table-column>
      <el-table-column prop="typeString" label="时间" align="center"></el-table-column>
      <el-table-column prop="typeString" label="温度" align="center"></el-table-column>
      <el-table-column prop="typeString" label="人脸ID" align="center"></el-table-column>
      <el-table-column prop="snapshot" label="人脸图片" align="center">
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

export default {
  data() {
    return {
      loading: false,
      tableData: [], // 表格数据
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,
    };
  },

  mounted() {},

  methods: {
    // 分页
    handleCurrentChange() {},
    // 每页条数
    handleSizeChange() {},
  },
};
</script>

<style scoped>
</style>