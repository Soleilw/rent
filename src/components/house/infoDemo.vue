<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addPosition">新增信息模板</el-button>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="请输入标题" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div>
        </div>

        <!-- 发布职位 -->
        <el-dialog :visible.sync="dialogPosition" title="信息模板" width="80%" @close="close" center>
            <el-form label-width="150px" :model="demoInfo" ref="demoInfo">
                <el-form-item label="标题">
                    <el-input v-model="demoInfo.title" class="tex" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="模板id">
                    <el-input v-model="demoInfo.template_id" class="tex" :autosize="{ minRows: 2, maxRows: 100}"
                        placeholder="请输入房屋简介"></el-input>
                </el-form-item>
                <el-form-item label="小程序APPID">
                    <el-input v-model="demoInfo.app_id" class="tex" placeholder="请输入出租房屋地址"></el-input>
                </el-form-item>
                <el-form-item label="小程序跳转路径">
                    <el-input v-model="demoInfo.page_path" class="tex" placeholder="请输入出租房屋地址"></el-input>
                </el-form-item>
                <el-form-item label="模板数据">
                    <div class="ipt-box">
                        <div class="item">
                            <span>备注: </span>
                            <el-input v-model="arrFirst[0].name" placeholder="备注" disabled></el-input>
                        </div>
                        <div class="item">
                            <span>参数名: </span>
                            <el-input v-model="arrFirst[0].key_name" placeholder="参数名" disabled></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item v-for="(item, index) in demoInfo.data" label="模板数据" :key="index" class="demo">
                    <div class="ipt-box">
                        <div class="item">
                            <span>备注: </span>
                            <el-input v-model="demoInfo.data[index].name" placeholder="备注" :disabled="isDsabled">
                            </el-input>
                        </div>
                        <div class="item">
                            <span>参数名: </span>
                            <el-input v-model="demoInfo.data[index].key_name" placeholder="参数名" :disabled="isDsabled">
                            </el-input>
                        </div>
                        <el-button @click.prevent="removeDomain(item)" type="text" style="margin-left: 20px">删除
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addDomain" type="text">新增模板数据</el-button>
                </el-form-item>
                <el-form-item label="模板数据">
                    <div class="ipt-box">
                        <div class="item">
                            <span>备注: </span>
                            <el-input v-model="arrEnd[0].name" placeholder="备注" disabled></el-input>
                        </div>
                        <div class="item">
                            <span>参数名: </span>
                            <el-input v-model="arrEnd[0].key_name" placeholder="参数名" disabled></el-input>

                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="效果图">
                    <el-upload action="https://api.fengniaotuangou.cn/api/upload" ref="upload" :limit="1"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
                        :file-list='files' :on-exceed="handleExceed" list-type="picture-card" :on-change="handleChange"
                        :auto-upload="true">
                        <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newPosition">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>

        <!-- 表格数据 -->
        <el-table :data="tableData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
            max-height="620">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="href" label="效果图">
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 全部-->
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page.sync="current"
                :page-sizes="[10, 20, 30, 40, 50]" :page-size="size" layout="sizes, prev, pager, next, jumper"
                :total="total" @size-change="sizeChange">
            </el-pagination>
        </div>

        <!-- 删除提示框 -->
        <el-dialog :visible.sync="dialogDel" title="删除住户" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">是否删除该住户</div>
            <span>
                <el-button type="primary" @click="toDel">删除</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import API from "@/api/index.js";
    import axios from "axios";

    export default {
        inject: ["reload"],

        data() {
            return {
                loading: true,
                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                demoInfo: {
                    title: '',
                    template_id: '',
                    app_id: '',
                    page_path: '',
                    href: '',
                    data: [{
                        name: '',
                        key_name: '',
                        key_value: ''
                    }],
                },
                dialogPosition: false,
                files: [],

                dialogDel: false,
                id: '',
                keyword: '',
                area_id: '',
                areaList: [],
                addressList: [],
                lisyType: '',
                param_name: '',
                name: '',
                value: '',
                arrFirst: [{
                    name: '你好',
                    key_name: 'first',
                    key_value: ''
                }],
                arrEnd: [{
                    name: '备注',
                    key_name: 'remark',
                    key_value: ''
                }],
                isDsabled: false,
            }
        },

        mounted() {
            this.getList(this.current, this.size);
        },

        methods: {
            getList(cur, list, title) {
                var self = this;
                API.templates(cur, list, title).then(res => {
                    self.tableData = res.data;
                    self.total = res.total;
                    self.loading = false;
                }).catch(err => {
                    self.loading = false;
                })
            },

            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                if (self.keyword) {
                    self.getList(val, self.size, self.keyword)
                } else {
                    self.getList(val, self.size);
                }
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                if (self.keyword) {
                    self.getList(1, val, self.keyword);
                } else {
                    self.getList(1, val);
                }
            },

            search() {
                var self = this;
                self.loading = true;
                self.current = 1;
                self.getList(self.current, self.size, self.keyword);

            },

            // 发布职位
            addPosition() {
                var self = this;
                self.dialogPosition = true;
            },

            close() {
                var self = this;
                self.demoInfo = {
                    title: '',
                    template_id: '',
                    app_id: '',
                    page_path: '',
                    href: '',
                    data: [{
                        name: '',
                        key_name: '',
                        key_value: ''
                    }],
                };
                self.files = [];
                self.arrFirst = [{
                    name: '你好',
                    key_name: 'first',
                    key_value: ''
                }];
                self.arrEnd = [{
                    name: '备注',
                    key_name: 'remark',
                    key_value: ''
                }];
            },

            // 发布
            newPosition() {
                var self = this;
                var sumData = [];
                sumData = sumData.concat(self.arrFirst).concat(self.demoInfo.data).concat(self.arrEnd)
                if (self.demoInfo.title && self.demoInfo.template_id && self.demoInfo.app_id && self.demoInfo
                    .page_path && self.demoInfo.href && self.demoInfo.data[0].name != '' && self.demoInfo.data[0]
                    .key_name != '') {
                    axios({
                        method: 'post',
                        url: 'https://chu.fengniaotuangou.cn/creation/template',
                        data: {
                            title: self.demoInfo.title,
                            template_id: self.demoInfo.template_id,
                            app_id: self.demoInfo.app_id,
                            page_path: self.demoInfo.page_path,
                            href: self.demoInfo.href,
                            data: sumData,
                            id: self.demoInfo.id
                        },
                        headers: { //头部参数
                            token: localStorage.getItem('token')
                        },
                        timeout: 50000,
                    }).then(res => {
                        console.log(res);
                        self.$message.success("发布成功");
                        self.dialogPosition = false;
                        self.getList(self.current, self.size)
                    });
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            handleEdit(index, row) {
                var self = this;
                self.dialogPosition = true;
                var length = row.data.length;
                self.arrFirst = [{
                    name: row.data[0].name,
                    key_name: row.data[0].key_name,
                    key_value: row.data[0].key_value
                }];
                self.arrEnd = [{
                    name: row.data[row.data.length - 1].name,
                    key_name: row.data[row.data.length - 1].key_name,
                    key_value: row.data[row.data.length - 1].key_value
                }];
                self.demoInfo = {
                    title: row.title,
                    template_id: row.template_id,
                    app_id: row.app_id,
                    page_path: row.page_path,
                    href: row.href,
                    data: row.data.slice(1, length - 1),
                    id: row.id
                };

                let urlStr = self.demoInfo.href.split(",");
                urlStr.forEach(item => {
                    let obj = new Object();
                    obj.url = item;
                    self.files.push(obj);
                });
            },

            // 删除
            handleDel(index, row) {
                var self = this;
                self.id = row.id;
                self.dialogDel = true;
            },

            toDel() {
                var self = this;
                API.delTemplates(self.id).then(res => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getList(self.current, self.size);
                })
            },

            removeDomain(item) {
                console.log(item);
                // console.log('removeDomain', item);
                var index = this.demoInfo.data.indexOf(item)
                if (index !== -1) {
                    this.demoInfo.data.splice(index, 1)
                }
                // self.demoInfo.data.pop('');

            },
            addDomain() {
                this.demoInfo.data.push({
                    name: '',
                    key_name: '',
                    key_value: ''
                });
            },

            // 刷新
            refresh() {
                this.reload();
            },

            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.demoInfo.href = ''
            },
            beforeAvatarUpload(file) {
                //文件上传之前调用做一些拦截限制
                // const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isLt2M) {
                //     this.$message.error("上传图片大小不能超过 2MB!");
                // }
                const isLt2M = 300 * 1024;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过300KB");
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                var self = this;
                self.demoInfo.href = file.response.data;
            },
            handleExceed(files, fileList) {
                //图片上传超过数量限制
                var self = this;
                self.$message.error("上传图片不能超过1张!");
            },

            handleChange(file, fileList) {
                var self = this;
                self.files = fileList;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .ipt-box {
        display: flex;

    }

    .ipt-box .item {
        display: flex;
        width: 500px;
        margin-right: 20px;
    }

    .ipt-box .item span {
        width: 80px;
        display: block;
    }


    .tex {
        width: 500px;
    }

    .demo {
        width: 80%;
    }
</style>