<template>
  <div class="box">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="getTotal" v-if="isAdmin">全部</el-button>
      </div>
      <div class="btn">
        <el-button type="primary" @click="getSclTotal" v-if="!isAdmin">全部</el-button>
      </div>
      <div class="btn" v-if="isAdmin">
        <span>学校：</span>
        <el-select v-model="school" placeholder="请选择学校" @change="changeSchoolType">
          <el-option
            v-for="item in schoolList"
            :key="item.index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="btn" v-if="isAdmin">
        <span>年级：</span>
        <el-select v-model="grade" placeholder="请选择年级" @change="changeGradeType">
          <el-option
            v-for="item in gradeList"
            :key="item.index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="btn" v-if="!isAdmin">
        <span>年级：</span>
        <el-select v-model="grade" placeholder="请选择年级" @change="changeSclGradeType">
          <el-option
            v-for="item in gradeList"
            :key="item.index"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div id="bar-chart"></div>
    <div class="pie-box">
      <div id="pie-chart-user"></div>
      <div id="pie-chart-student"></div>
    </div>
  </div>
</template>

<script>
import API from "@/api/index.js";

require("echarts");

export default {
  name: "studentsTatal",

  data() {
    return {
      isAdmin: true,
      school: "",
      grade: "",

      schoolList: [],
      gradeList: [],
      nameList: [],
      countList: [],
      existCount: [],

      school_id: "",
      grade_id: "",
      bar: {
        title: {
          text: "学生统计",
          left: "center",
        },
        tooltip: {},
        legend: {
          orient: "vertical",
          data: ["总学生数", "已注册人数"],
          left: "right",
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [],
      },
      pie: {
        title: {},
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
      title: {
        user: "用户男女比例",
        student: "学生男女比例",
      },
      username: localStorage.getItem("username"),
    };
  },

  methods: {
    changeSchoolType(value) {
      var self = this;
      var barChartDom = document.getElementById("bar-chart");
      var pieCharUsertDom = document.getElementById("pie-chart-user");
      var pieCharStudenttDom = document.getElementById("pie-chart-student");
      var barChart = require("echarts").init(barChartDom);
      var pieUserChart = require("echarts").init(pieCharUsertDom);
      var pieStudentChart = require("echarts").init(pieCharStudenttDom);
      barChart.setOption(self.bar);
      pieUserChart.setOption(self.pie);
      pieStudentChart.setOption(self.pie);
      self.nameList = [];
      self.countList = [];
      self.existCount = [];
      self.grade = "";
      self.school_id = value;
      API.statistics(self.school_id).then((res) => {
        self.gradeList = res.data;
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
          self.existCount.push(item.exist_count);
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            series: [
              {
                name: "总学生数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
              {
                name: "已注册人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.existCount,
              },
            ],
          })
        );
        API.studentGender(0, 1, self.school_id).then((res) => {
          pieUserChart.setOption(
            (self.pie = {
              title: {
                text: self.title.user,
                left: "center",
              },
              series: [
                {
                  name: self.title.user,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
        API.studentGender(0, 2, self.school_id).then((res) => {
          pieStudentChart.setOption(
            (self.pie = {
              title: {
                text: self.title.student,
                left: "center",
              },
              series: [
                {
                  name: self.title.student,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
      });
    },
    changeGradeType(value) {
      var self = this;
      var barChartDom = document.getElementById("bar-chart");
      var pieCharUsertDom = document.getElementById("pie-chart-user");
      var pieCharStudenttDom = document.getElementById("pie-chart-student");
      var barChart = require("echarts").init(barChartDom);
      var pieUserChart = require("echarts").init(pieCharUsertDom);
      var pieStudentChart = require("echarts").init(pieCharStudenttDom);
      barChart.setOption(self.bar);
      pieUserChart.setOption(self.pie);
      pieStudentChart.setOption(self.pie);
      self.grade_id = value;
      self.nameList = [];
      self.countList = [];
      self.existCount = [];
      API.statistics(self.school_id, self.grade_id).then((res) => {
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
          self.existCount.push(item.exist_count);
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            series: [
              {
                name: "总学生数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
              {
                name: "已注册人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.existCount,
              },
            ],
          })
        );
        API.studentGender(0, 1, self.school_id, self.grade_id).then((res) => {
          pieUserChart.setOption(
            (self.pie = {
              title: {
                text: self.title.user,
                left: "center",
              },
              series: [
                {
                  name: self.title.user,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
        API.studentGender(0, 2, self.school_id, self.grade_id).then((res) => {
          pieStudentChart.setOption(
            (self.pie = {
              title: {
                text: self.title.student,
                left: "center",
              },
              series: [
                {
                  name: self.title.student,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
      });
    },
    changeSclGradeType(value) {
      var self = this;
      var barChartDom = document.getElementById("bar-chart");
      var pieCharUsertDom = document.getElementById("pie-chart-user");
      var pieCharStudenttDom = document.getElementById("pie-chart-student");
      var barChart = require("echarts").init(barChartDom);
      var pieUserChart = require("echarts").init(pieCharUsertDom);
      var pieStudentChart = require("echarts").init(pieCharStudenttDom);
      barChart.setOption(self.bar);
      pieUserChart.setOption(self.pie);
      pieStudentChart.setOption(self.pie);
      self.grade_id = value;
      self.nameList = [];
      self.countList = [];
      self.existCount = [];
      API.statistics(0, self.grade_id).then((res) => {
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
          self.existCount.push(item.exist_count);
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            series: [
              {
                name: "总学生数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
              {
                name: "已注册人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.existCount,
              },
            ],
          })
        );
        API.studentGender(0, 1, 0, self.grade_id).then((res) => {
          pieUserChart.setOption(
            (self.pie = {
              title: {
                text: self.title.user,
                left: "center",
              },
              series: [
                {
                  name: self.title.user,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
        API.studentGender(0, 2, 0, self.grade_id).then((res) => {
          pieStudentChart.setOption(
            (self.pie = {
              title: {
                text: self.title.student,
                left: "center",
              },
              series: [
                {
                  name: self.title.student,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
      });
    },

    // 总后台
    getTotal() {
      var self = this;
      var barChartDom = document.getElementById("bar-chart");
      var pieCharUsertDom = document.getElementById("pie-chart-user");
      var pieCharStudenttDom = document.getElementById("pie-chart-student");
      var barChart = require("echarts").init(barChartDom);
      var pieUserChart = require("echarts").init(pieCharUsertDom);
      var pieStudentChart = require("echarts").init(pieCharStudenttDom);
      barChart.setOption(self.bar);
      pieUserChart.setOption(self.pie);
      pieStudentChart.setOption(self.pie);
      self.nameList = [];
      self.countList = [];
      self.existCount = [];
      self.gradeList = [];
      self.school = "";
      self.grade = "";
      self.isAdmin = true;
      API.statistics().then((res) => {
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
          self.existCount.push(item.exist_count);
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            series: [
              {
                name: "总学生数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
              {
                name: "已注册人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.existCount,
              },
            ],
          })
        );
      });

      API.studentGender(0, 1).then((res) => {
        pieUserChart.setOption(
          (self.pie = {
            title: {
              text: self.title.user,
              left: "center",
            },
            series: [
              {
                name: self.title.user,

                data: [
                  { value: res.man_total, name: "男生人数" },
                  { value: res.woman_total, name: "女生人数" },
                ],
              },
            ],
          })
        );
      });
      API.studentGender(0, 2).then((res) => {
        pieStudentChart.setOption(
          (self.pie = {
            title: {
              text: self.title.student,
              left: "center",
            },
            series: [
              {
                name: self.title.student,

                data: [
                  { value: res.man_total, name: "男生人数" },
                  { value: res.woman_total, name: "女生人数" },
                ],
              },
            ],
          })
        );
      });
      API.schools().then((res) => {
        self.schoolList = res.data;
      });
    },

    // 学校
    getSclTotal() {
      var self = this;
      self.isAdmin = false;
      var barChartDom = document.getElementById("bar-chart");
      var pieCharUsertDom = document.getElementById("pie-chart-user");
      var pieCharStudenttDom = document.getElementById("pie-chart-student");
      var barChart = require("echarts").init(barChartDom);
      var pieUserChart = require("echarts").init(pieCharUsertDom);
      var pieStudentChart = require("echarts").init(pieCharStudenttDom);
      barChart.setOption(self.bar);
      pieUserChart.setOption(self.pie);
      pieStudentChart.setOption(self.pie);
      self.nameList = [];
      self.countList = [];
      self.existCount = [];
      self.school = "";
      self.grade = "";
      API.grades().then((res) => {
        self.gradeList = res.data;
      });
      API.statistics().then((res) => {
        res.data.forEach((item) => {
          self.nameList.push(item.name);
          self.countList.push(item.count);
          self.existCount.push(item.exist_count);
        });
        barChart.setOption(
          (self.bar = {
            xAxis: {
              data: self.nameList,
            },
            series: [
              {
                name: "总学生数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.countList,
              },
              {
                name: "已注册人数",
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
                data: self.existCount,
              },
            ],
          })
        );
        API.studentGender(0, 1).then((res) => {
          pieUserChart.setOption(
            (self.pie = {
              title: {
                text: self.title.user,
                left: "center",
              },
              series: [
                {
                  name: self.title.user,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
        API.studentGender(0, 2).then((res) => {
          pieStudentChart.setOption(
            (self.pie = {
              title: {
                text: self.title.student,
                left: "center",
              },
              series: [
                {
                  name: self.title.student,

                  data: [
                    { value: res.man_total, name: "男生人数" },
                    { value: res.woman_total, name: "女生人数" },
                  ],
                },
              ],
            })
          );
        });
      });
    },
  },

  mounted() {
    if (this.username == "admin") {
      this.getTotal();
    } else {
      this.getSclTotal();
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
}
#bar-chart {
  width: 100%;
  height: 500px;
}
.pie-box #pie-chart-user {
  width: 50%;
  height: 500px;
  float: left;
}
.pie-box #pie-chart-student {
  width: 50%;
  height: 500px;
  float: left;
}
</style>