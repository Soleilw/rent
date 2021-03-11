<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addPosition">发布模板消息</el-button>
            </div>
            <!-- <div class="btn">
                <el-input v-model="keyword" placeholder="请输入标题" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div> -->
        </div>

        <!-- 发布职位 -->
        <el-dialog :visible.sync="dialogPosition" title="发布模板消息" width="80%" @close="close" center>
            <!-- 表格数据 -->
            <!-- <div class="btn">
                <el-input v-model="keyword" placeholder="请输入标题" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                </el-input>
            </div> -->

            <el-form label-width="150px" :model="issueForm" ref="demoInfo">
                <el-form-item label="发布信息模板">
                    <el-select v-model="issueForm.template_id" placeholder="请选择模板" style="margin-right: 10px"
                        @change="demoChange">
                        <el-option v-for="item in tableData" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div v-if="have_select">
                    <el-form-item v-for="(item, index) in issueForm.data" label="模板数据" :key="index" class="demo">
                        <div class="ipt-box">
                            <div class="item">
                                <span>备注: </span>
                                <el-input v-model="issueForm.data[index].name" placeholder="备注" disabled>
                                </el-input>
                            </div>
                            <div class="item">
                                <span>参数名: </span>
                                <el-input v-model="issueForm.data[index].key_name" placeholder="参数名" disabled>
                                </el-input>
                            </div>
                            <div class="item">
                                <span>参数值: </span>
                                <el-input v-model="issueForm.data[index].key_value" placeholder="参数值">
                                </el-input>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="发送类型">
                        <el-select v-model="issueForm.target_type" placeholder="请选择类型" style="margin-right: 10px"
                            @change="typeChange">
                            <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="社区" v-if="issueForm.target_type == 2">
                        <el-select v-model="issueForm.target_id" placeholder="请选择社区" style="margin-right: 10px"
                            multiple>
                            <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出租屋地址" v-if="issueForm.target_type == 3">
                        <el-select v-model="area_id" placeholder="请选择社区" style="margin-right: 10px"
                            @change="changeAreaType">
                            <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="issueForm.target_id" filterable placeholder="选择地址" multiple
                            style="width: 500px;">
                            <el-option v-for="item in addressList" :label="item.address" :value="item.id"
                                :key="item.id + item.address">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户" v-if="issueForm.target_type == 4">
                        <div class="ipt-box">
                            <el-input v-model="renter_name" placeholder="请输入用户名" class="input-with-select"
                                @keyup.enter.native="searchRenter(renter_name)"
                                style="width: 300px; margin-right: 20px">
                                <el-button slot="append" icon="el-icon-search" @click="searchRenter(renter_name)">
                                </el-button>
                            </el-input>
                            <el-select v-model="issueForm.target_id" filterable placeholder="选择用户" multiple
                                style="width: 500px;">
                                <el-option v-for="item in renterData"
                                    :label="item.snapshot.name + ' -' + item.address.address + '-' + item.typeString"
                                    :value="item.user_id" :key="item.id + item.snapshot.name">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item v-if="issueForm.target_type == 4">
                        <template>
                            <el-transfer v-model="issueForm.target_id" :data="dataArr">
                            </el-transfer>
                        </template>
                    </el-form-item> -->
                </div>
                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="newPosition">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>



        <!-- 删除提示框 -->
        <!-- <el-dialog :visible.sync="dialogDel" title="删除住户" width="20%" align="center" :close-on-click-modal="false">
            <div style="font-size: 20px; margin-bottom: 30px">是否删除该住户</div>
            <span>
                <el-button type="primary" @click="toDel">删除</el-button>
                <el-button type="danger" @click="dialogDel = false">取消</el-button>
            </span>
        </el-dialog> -->

        <!-- 推送模板信息 -->
        <!-- <el-dialog :visible.sync="dialogIssue" title="发布模板消息" width="80%" :close-on-click-modal="false" center>
            <el-form label-width="150px" :model="issueForm">
                <el-form-item label="发送类型">
                    <el-select v-model="issueForm.target_type" placeholder="请选择类型" style="margin-right: 10px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="社区" v-if="issueForm.target_type == 2">
                    <el-select v-model="issueForm.target_id" placeholder="请选择社区" style="margin-right: 10px" multiple>
                        <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出租屋地址" v-if="issueForm.target_type == 3">
                    <el-select v-model="area_id" placeholder="请选择社区" style="margin-right: 10px"
                        @change="changeAreaType">
                        <el-option v-for="item in areaList" :key="item.index" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="issueForm.target_id" filterable placeholder="选择地址" multiple>
                        <el-option v-for="item in addressList" :label="item.address" :value="item.id" :key="item.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户" v-if="issueForm.target_type == 4">
                    <div class="ipt-box">
                        <el-input v-model="renter_name" placeholder="请输入标题" class="input-with-select"
                            @keyup.enter.native="searchRenter(renter_name)" style="width: 300px; margin-right: 20px">
                            <el-button slot="append" icon="el-icon-search" @click="searchRenter(renter_name)">
                            </el-button>
                        </el-input>
                        <el-select v-model="issueForm.target_id" filterable placeholder="选择用户" multiple
                            style="width: 500px;">
                            <el-option v-for="item in renterData"
                                :label="item.snapshot.name + ' -' + item.address.address + '-' + item.typeString"
                                :value="item.user_id" :key="item.index">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>


                <div class="submit">
                    <el-form-item>
                        <el-button type="primary" @click="toIssue">提交</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog> -->

        <!-- 表格数据 -->
        <el-table :data="recordData" empty-text="暂无数据" border :header-cell-style="{ background: '#f0f0f0' }"
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
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import axios from "axios";

    export default {
        inject: ["reload"],

        data() {
            return {
                loading: false,
                tableData: [],
                recordData: [], // 表格数据
                current: 1, // 分页
                size: 20,
                total: 0,

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
                // arrFirst: [{
                //     name: '你好',
                //     key_name: 'first',
                //     key_value: ''
                // }],
                // arrEnd: [{
                //     name: '备注',
                //     key_name: 'remark',
                //     key_value: ''
                // }],
                isDsabled: false,

                dialogIssue: false,
                issueForm: {
                    template_id: '',
                    target_type: '',
                    target_id: [],
                    data: [],
                },
                typeList: [{
                    label: '指定社区发送',
                    value: 2
                }, {
                    label: '指定出租屋发送',
                    value: 3
                }, {
                    label: '指定个人发送',
                    value: 4
                }],
                renterData: [],
                renter_name: '',
                have_select: false,
                dataArr: []
            }
        },

        mounted() {
            // this.getList(this.current, this.size);
        },

        methods: {
            // getList(cur, list, title) {
            //     var self = this;
            //     API.templates(cur, list, title).then(res => {
            //         self.tableData = res.data;
            //         self.total = res.total;
            //         self.loading = false;
            //     }).catch(err => {
            //         self.loading = false;
            //     })
            // },

            getDemoList() {
                var self = this;
                API.templates(1, 50).then(res => {
                    self.tableData = res.data;
                })
            },

            currentChange(val) {
                var self = this;
                self.current = val;
                self.loading = true;
                // if (self.keyword) {
                //     self.getList(val, self.size, self.keyword)
                // } else {
                //     self.getList(val, self.size);
                // }
            },
            sizeChange(val) {
                var self = this;
                self.size = val;
                self.loading = true;
                self.current = 1;
                // if (self.keyword) {
                //     self.getList(1, val, self.keyword);
                // } else {
                //     self.getList(1, val);
                // }
            },

            // search() {
            //     var self = this;
            //     self.loading = true;
            //     self.current = 1;
            //     self.getList(self.current, self.size, self.keyword);

            // },

            // 发布职位
            addPosition() {
                var self = this;
                self.dialogPosition = true;
                this.getDemoList();
                API.areas(1, 100, 3).then((res) => {
                    self.areaList = res.data;
                });
            },

            close() {
                var self = this;
                self.issueForm = {
                    template_id: '',
                    target_type: '',
                    target_id: [],
                    data: [],
                };
                self.renter_name = '';
                self.have_select = false;
                // self.files = [];
                // self.arrFirst = [{
                //     name: '你好',
                //     key_name: 'first',
                //     key_value: ''
                // }];
                // self.arrEnd = [{
                //     name: '备注',
                //     key_name: 'remark',
                //     key_value: ''
                // }];
            },

            // 发布
            newPosition() {
                var self = this;
                var data = {};
                // if (self.issueForm.target_type == 1) {
                //     data = {
                //         template_id: self.issueForm.template_id,
                //         target_type: self.issueForm.target_type,
                //         data: self.issueForm.data,
                //     }
                // } else {
                data = {
                    template_id: self.issueForm.template_id,
                    target_type: self.issueForm.target_type,
                    target_id: self.issueForm.target_id,
                    data: self.issueForm.data,
                }
                // }
                // console.log(data);
                if (self.issueForm.template_id && self.issueForm.target_type) {
                    const loading = this.$loading({
                        lock: true,
                        text: '正在发布...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    axios({
                        method: 'post',
                        url: 'https://chu.fengniaotuangou.cn/send/template/message',
                        data: data,
                        headers: { //头部参数
                            token: localStorage.getItem('token')
                        },
                        timeout: 50000,
                    }).then(res => {
                        console.log(res);
                        self.$message.success("发布成功");
                        self.dialogPosition = false;
                        loading.close();
                        // self.getList(self.current, self.size)
                    }).catch(err => {
                        loading.close();
                    });
                } else {
                    self.$message.warning("请填写完整信息");
                }
            },

            // handleEdit(index, row) {
            //     var self = this;
            //     self.dialogPosition = true;
            //     var length = row.data.length;
            //     self.arrFirst = [{
            //         name: row.data[0].name,
            //         key_name: row.data[0].key_name,
            //         key_value: row.data[0].key_value
            //     }];
            //     self.arrEnd = [{
            //         name: row.data[row.data.length - 1].name,
            //         key_name: row.data[row.data.length - 1].key_name,
            //         key_value: row.data[row.data.length - 1].key_value
            //     }];
            //     self.demoInfo = {
            //         title: row.title,
            //         template_id: row.template_id,
            //         app_id: row.app_id,
            //         page_path: row.page_path,
            //         href: row.href,
            //         data: row.data.slice(1, length - 1),
            //         id: row.id
            //     };

            //     let urlStr = self.demoInfo.href.split(",");
            //     urlStr.forEach(item => {
            //         let obj = new Object();
            //         obj.url = item;
            //         self.files.push(obj);
            //     });
            // },

            // 选择模板
            demoChange(val) {
                var self = this;
                self.have_select = true;
                let obj = {};
                obj = this.tableData.find((item) => {
                    return item;
                });
                self.issueForm.data = obj.data
            },

            typeChange(val) {
                console.log(111);
                this.issueForm.target_id = []
            },

            // 选择社区
            changeAreaType(value) {
                var self = this;
                console.log(111);
                const loading = this.$loading({
                    lock: true,
                    text: 'loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                API.addresses(1, 100, value).then((res) => {
                    self.addressList = res.data;
                    loading.close();
                }).catch(err => {
                    loading.close();
                });
            },

            searchRenter() {
                var self = this;
                const loading = this.$loading({
                    lock: true,
                    text: 'loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                API.searchHousehold(1, 20, self.renter_name)
                    .then((res) => {
                        self.renterData = res.data;
                        loading.close();

                    }).catch(err => {
                        loading.close();
                    })
            },
            // handleIssue(index, row) {
            //     var self = this;
            //     self.dialogIssue = true;
            //     self.issueForm.template_id = row.template_id;

            // },



            // toIssue() {
            //     var self = this;
            //     console.log(self.issueForm);
            // },




            // 删除
            // handleDel(index, row) {
            //     var self = this;
            //     self.id = row.id;
            //     self.dialogDel = true;
            // },

            // toDel() {
            //     var self = this;
            //     API.delTemplates(self.id).then(res => {
            //         self.$message.success("删除成功");
            //         self.dialogDel = false;
            //         self.getList(self.current, self.size);
            //     })
            // },


            // 刷新
            // refresh() {
            //     this.reload();
            // },

            // handleRemove(file, fileList) {
            //     //移除图片
            //     var self = this;
            //     self.files = fileList
            //     self.demoInfo.href = ''
            // },
            // beforeAvatarUpload(file) {
            //     //文件上传之前调用做一些拦截限制
            //     // const isLt2M = file.size / 1024 / 1024 < 2;
            //     // if (!isLt2M) {
            //     //     this.$message.error("上传图片大小不能超过 2MB!");
            //     // }
            //     const isLt2M = 300 * 1024;
            //     if (!isLt2M) {
            //         this.$message.error("上传图片大小不能超过300KB");
            //     }
            //     return isLt2M;
            // },
            // handleAvatarSuccess(res, file) {
            //     //图片上传成功
            //     var self = this;
            //     self.demoInfo.href = file.response.data;
            // },
            // handleExceed(files, fileList) {
            //     //图片上传超过数量限制
            //     var self = this;
            //     self.$message.error("上传图片不能超过1张!");
            // },

            // handleChange(file, fileList) {
            //     var self = this;
            //     self.files = fileList;
            // },
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