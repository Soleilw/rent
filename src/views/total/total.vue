<template>
  <div  v-loading="loading">
    <!-- 表格数据 -->
    <el-table :data="tableData" empty-text="暂无数据">
      <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="snapshot.name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="typeString" label="用户身份" align="center"></el-table-column>
      <el-table-column prop="snapshot" label="人脸照片" align="center">
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
      <el-table-column prop="snapshot.phone" label="手机号" align="center" width="110px"></el-table-column>
      <el-table-column prop="snapshot.card_number" label="身份证" align="center" width="180px"></el-table-column>

      <el-table-column prop="address.address" label="房屋地址" align="center" width="200px"></el-table-column>
      <el-table-column prop="expireTime" label="进出服务到期时间" align="center" width="150px"></el-table-column>
      <!-- <el-table-column prop label="是否开通服务" align="center" width="300px"></el-table-column> -->
      <el-table-column prop="room" label="房屋编号" align="center"></el-table-column>
      <el-table-column prop="state" label="审核状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state == 1">
            <span>待审核</span>
          </div>
          <div v-if="scope.row.state == 2">
            <span style="color: green;">已通过</span>
          </div>
          <div v-if="scope.row.state == 3">
            <span style="color: red;">未通过</span>
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
import API from "@/api/index.js";

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1, // 分页
      pageSize: 10,
      totalPage: 0,
    };
  },
  methods: {
        // 分页
    handleCurrentChange(val) {
      var self = this;
      self.currentPage = val;
      
    },

    // 每页几条
    handleSizeChange(val) {
      var self = this;
      self.pageSize = val;
      
    },
  }
};
</script>

<style lang="scss" scoped>
</style>