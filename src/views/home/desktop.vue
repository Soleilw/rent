<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
      </div>

      <div class="btn" v-if="isAdmin">
        <span>社区：</span>
        <el-select v-model="area" placeholder="请选择社区" @change="changeAreaType">
          <el-option
            v-for="item in areaList"
            :key="item.index"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="btn">
        <span>出租屋：</span>
        <el-select v-model="lets" placeholder="请选择/输入出租屋" filterable @change="letType">
          <el-option
            v-for="item in letList"
            :key="item.index"
            :label="item.address"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 表格数据 -->
    <div class="table_box">
      <el-table
        :data="tableData"
        empty-text="暂无数据"
        border
        :header-cell-style="{background:'#f0f0f0'}"
        max-height="620"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column v-if="lets == ''" prop="name" label="房屋地址"></el-table-column>
        <el-table-column v-else prop="name" label="单元编号"></el-table-column>
        <el-table-column prop="count" label="人口总数"></el-table-column>
        <el-table-column prop="man" label="男性人数"></el-table-column>
        <el-table-column prop="woman" label="女性人数"></el-table-column>
        <el-table-column v-if="lets == ''" prop="wait_state" label="待审核人数"></el-table-column>
        <el-table-column v-if="lets == ''" prop="already_state" label="审核通过人数"></el-table-column>
        <el-table-column v-if="lets == ''" prop="no_state" label="审核未通过人数"></el-table-column>
        <el-table-column label="操作" width="250px" v-if="lets == ''">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="openedPie(scope.$index, scope.row)">查看男女比例</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 全部-->
    <div class="block" v-if="area == '' && lets == ''">
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
    <!-- 分页 社区-->
    <div class="block" v-if="area != '' && lets == ''">
      <el-pagination
        @current-change="areaCurrentChange"
        :current-page.sync="areaCurrent"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="areaSize"
        layout="sizes, prev, pager, next, jumper"
        :total="areaTotal"
        @size-change="areaSizeChange"
      ></el-pagination>
    </div>
    <!-- 分页 房屋-->
    <div class="block" v-if="area != '' && lets != ''">
      <el-pagination
        @current-change="letsCurrentchange"
        :current-page.sync="letsCurrent"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="letsSize"
        layout="sizes, prev, pager, next, jumper"
        :total="letsTotal"
        @size-change="letsSizeChange"
      ></el-pagination>
    </div>

    <!-- 分页 房屋 社区-->
    <div class="block" v-if="username != 'admin' && lets != ''">
      <el-pagination
        @current-change="letsCurrentchange"
        :current-page.sync="letsCurrent"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="letsSize"
        layout="sizes, prev, pager, next, jumper"
        :total="letsTotal"
        @size-change="letsSizeChange"
      ></el-pagination>
    </div>
    <!-- 条形统计图 -->
    <div class="box" v-if="username == 'admin'">
      <div id="bar-chart"></div>
    </div>
    <!-- 男女比例图 -->
    <el-dialog title="男女比例图" :visible.sync="dialogLogs" width="50%">
      <div id="pie-chart-user" ref="chart"></div>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/index.js";
import { log } from "util";
require("echarts");

export default {
  inject: ["reload"],

  data() {
    return {
      loading: true,
      tableData: [],
      current: 1, // 全部 分页
      size: 10,
      total: 0,
      areaCurrent: 1, // 社区 分页
      areaSize: 10,
      areaTotal: 0,
      letsCurrent: 1, // 房屋 分页
      letsSize: 10,
      letsTotal: 0,
      username: localStorage.getItem("username"),
      isAdmin: true, // 社区选择--总后台
      area: "",
      areaList: [],
      lets: "",
      letList: [],
      area_id: "",
      address_id: "",
      dialogLogs: false,
      bar: {
        title: {
          text: "社区人数统计",
          left: "center",
        },
        tooltip: {},
        xAxis: {
          data: [],
        },
        yAxis: {},
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [],
      },
      pie: {
        title: {
          text: "租客男女比例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["男生人数", "女生人数"],
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            label: {
              normal: {
                formatter: "{d}%",
                position: "inside",
              },
            },
            data: [
              { value: 0, name: "男生人数" },
              { value: 0, name: "女生人数" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      nameList: [],
      countList: [],
      existCount: [],
      num: null,
    };
  },
  mounted() {
    this.getSstatistics();
    this.getArea();
    if (this.username !== "admin") {
      this.isAdmin = false;
      this.getLet();
    } else {
      this.getTotal();
    }
  },
  methods: {
    // 刷新
    refresh() {
      this.reload();
    },
    // 获取统计列表
    getSstatistics() {
      var self = this;
      self.lets = "";
      self.area = "";
      if (self.username == "admin") {
        self.letList = [];
      }
      API.statistics(self.current, self.size)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
          self.current = 1;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    // 全部 分页
    currentChange(val) {
      var self = this;
      self.current = val;
      self.loading = true;
      API.statistics(val, self.size)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    // 每页几条
    sizeChange(val) {
      var self = this;
      self.size = val;
      self.loading = true;
      API.statistics(self.current, val)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
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
      self.current = 1;
      self.areaCurrent = 1;
      self.loading = true;
      API.statistics(self.areaCurrent, self.areaSize, self.area_id)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.areaTotal = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
      self.getLet();
    },
    // 选择社区后 分页
    areaCurrentChange(val) {
      var self = this;
      self.areaCurrent = val;
      self.loading = true;
      API.statistics(val, self.areaSize, self.area_id)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.areaTotal = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    areaSizeChange(val) {
      var self = this;
      self.areaSize = val;
      self.loading = true;
      API.statistics(self.areaCurrent, val, self.area_id)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.areaTotal = res.total;
          self.areaCurrent = 1;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },

    // 选择出租屋
    letType(value) {
      var self = this;
      console.log(value);
      self.address_id = value;
      self.loading = true;
      self.letsCurrent = 1;
      API.statistics(
        self.letsCurrent,
        self.letsSize,
        self.area_id,
        self.address_id
      )
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.letsTotal = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    // 选择出租屋后 分页
    letsCurrentchange(val) {
      var self = this;
      self.letsCurrent = val;
      self.loading = true;
      API.statistics(val, self.letsSize, self.area_id, self.address_id)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.letsTotal = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },
    letsSizeChange(val) {
      var self = this;
      self.letsSize = val;
      self.loading = true;
      API.statistics(self.letsCurrent, val, self.area_id, self.address_id)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.letsTotal = res.total;
        })
        .catch((err) => {
          self.loading = false;
          console.log(err);
        });
    },

    // 总后台 条形图
    getTotal() {
      var self = this;
      var barChartDom = document.getElementById("bar-chart");
      var barChart = require("echarts").init(barChartDom);
      barChart.setOption(self.bar);
      self.nameList = [];
      self.countList = [];
      API.statistics(1, 10000).then((res) => {
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
        });
        var zoomSize = 6;
        barChart.on("click", function (params) {
          console.log(
            self.nameList[Math.max(params.dataIndex - zoomSize / 2, 0)]
          );
          barChart.dispatchAction({
            type: "dataZoom",
            startValue:
              self.nameList[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              self.nameList[
                Math.min(
                  params.dataIndex + zoomSize / 2,
                  self.nameList.length - 1
                )
              ],
          });
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            dataZoom: [
              {
                type: "inside",
              },
            ],
            series: [
              {
                name: "社区总人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
            ],
          })
        );
      });
    },
    openedPie(index, row) {
      var self = this;
      self.dialogLogs = true;
      self.num = index;
      self.getPie();
    },
    // 男女比例图
    getPie() {
      var self = this;
      self.$nextTick(function () {
        var pieCharUsertDom = this.$refs.chart;
        var pieUserChart = require("echarts").init(pieCharUsertDom);
        pieUserChart.setOption(self.pie);
        if (self.area == "" && self.lets == "" && self.username == "admin") {
          API.statistics(self.current, self.size).then((res) => {
            pieUserChart.setOption(
              (self.pie = {
                title: {
                  text: res.data[self.num].name,
                  left: "center",
                },
                series: [
                  {
                    name: res.data[self.num].name,
                    data: [
                      {
                        value: res.data[self.num].man,
                        name: "男生人数",
                      },
                      {
                        value: res.data[self.num].woman,
                        name: "女生人数",
                      },
                    ],
                  },
                ],
              })
            );
          });
        } else if (
          self.area != "" &&
          self.lets == "" &&
          self.username == "admin"
        ) {
          API.statistics(self.areaCurrent, self.areaSize, self.area_id).then(
            (res) => {
              pieUserChart.setOption(
                (self.pie = {
                  title: {
                    text: res.data[self.num].name,
                    left: "center",
                  },
                  series: [
                    {
                      name: res.data[self.num].name,
                      data: [
                        {
                          value: res.data[self.num].man,
                          name: "男生人数",
                        },
                        {
                          value: res.data[self.num].woman,
                          name: "女生人数",
                        },
                      ],
                    },
                  ],
                })
              );
            }
          );
        } else if (self.username != "admin") {
          API.statistics(self.current, self.size).then((res) => {
            pieUserChart.setOption(
              (self.pie = {
                title: {
                  text: res.data[self.num].name,
                  left: "center",
                },
                series: [
                  {
                    name: res.data[self.num].name,
                    data: [
                      {
                        value: res.data[self.num].man,
                        name: "男生人数",
                      },
                      {
                        value: res.data[self.num].woman,
                        name: "女生人数",
                      },
                    ],
                  },
                ],
              })
            );
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 50px;
}
#bar-chart {
  width: 100%;
  height: 500px;
}
#pie-chart-user {
  width: 800px;
  height: 500px;
}
.table_box {
  width: 100%;
  height: 620px;
  box-shadow: 1px 1px 5px #ccc;
}
</style>