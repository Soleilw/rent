<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addPosition">发布职位</el-button>
            </div>
            <div class="btn">
                <el-input v-model="keyword" placeholder="输入职位名称/公司名称" class="input-with-select"
                    @keyup.enter.native="search(keyword)">
                    <el-select v-model="type" placeholder="请选择搜索方式" @change="changeType" slot="prepend"
                        style="width: 150px">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search(keyword)"></el-button>
                    <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
                </el-input>
            </div>
        </div>

        <!-- 发布职位 -->
        <el-dialog :visible.sync="dialogPosition" title="发布职位" width="85%" @close="close">
            <el-form label-width="150px" :model="positionInfo">
                <el-form-item label="是否上架">
                    <el-radio-group v-model="positionInfo.on_shelf">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="ipt-box">
                    <el-form-item label="公司名称">
                        <el-input v-model="positionInfo.company_name" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介">
                        <el-input v-model="positionInfo.company_intro" class="tex" type="textarea"
                            :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入公司简介"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="职位名称">
                        <el-input v-model="positionInfo.post_name" placeholder="请输入职位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="职位描述">
                        <el-input v-model="positionInfo.work_intro" class="tex" type="textarea"
                            :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入职位描述"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="工作城市">
                        <el-input v-model="positionInfo.work_city" placeholder="请输入工作城市"></el-input>
                    </el-form-item>
                    <el-form-item label="工作地点">
                        <el-input v-model="positionInfo.work_place" class="tex" type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入工作地点"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="工作经验">
                    <el-input v-model="positionInfo.work_experience" class="tex" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 100}" placeholder="请输入工作经验"></el-input>
                </el-form-item>
                <div class="ipt-box">
                    <el-form-item label="学历">
                        <el-select v-model="positionInfo.education" placeholder="请选择学历">
                            <el-option v-for="item in options" :key="item.label" :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="薪资范围">
                        <el-input v-model="positionInfo.salary" placeholder="格式(6-8k或者面议)"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="联系人">
                        <el-input v-model="positionInfo.name" placeholder="请输入联系人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="positionInfo.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="简历投递E-mail">
                        <el-input v-model="positionInfo.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                </div>
                <div class="ipt-box">
                    <el-form-item label="浏览量">
                        <el-input v-model="positionInfo.browse" placeholder="请输入浏览量"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="positionInfo.sort" placeholder="请输入排序"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="公司logo">
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
            <el-table-column prop="company_name" label="公司名称"></el-table-column>
            <el-table-column prop="href" label="公司logo" width="150">
                <template slot-scope="scope">
                    <div v-if="scope.row.href">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.href" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.href" style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="on_shelf" label="是否上架" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.on_shelf" active-color="#2a9f93"
                        @change="notifyChange(scope.row.on_shelf, scope.$index, scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="on_shelf" label="是否上架">
                <template slot-scope="scope">
                    <div v-if="scope.row.on_shelf == 1">
                        <span>是</span>
                    </div>
                    <div v-if="scope.row.on_shelf == 2">
                        <span>否</span>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column prop="post_name" label="职位名称"></el-table-column>
            <el-table-column prop="salary" label="薪资范围"></el-table-column>
            <el-table-column label="操作" width="200px">
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
    export default {
        inject: ["reload"],

        data() {
            return {
                loading: true,
                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                positionInfo: {
                    href: '',
                    company_name: '',
                    company_intro: '',
                    post_name: '',
                    work_city: '',
                    work_place: '',
                    work_experience: '',
                    education: '',
                    salary: '',
                    work_intro: '',
                    name: '',
                    phone: '',
                    email: '',
                    on_shelf: 1,
                    browse: '',
                    sort: ''
                },
                dialogPosition: false,
                files: [],

                options: [{
                    label: '本科',
                    value: 1
                }, {
                    label: '研究生',
                    value: 2
                }, {
                    label: '博士',
                    value: 3
                }],
                on_shelf: false,
                dialogDel: false,
                id: '',
                keyword: '',
                type: 2, // 选中的搜索方式
                typeList: [{
                        value: 1,
                        label: "按公司名称搜索",
                    },
                    {
                        value: 2,
                        label: "按职位名称搜索",
                    },
                ],
                typeDisabled: false,
            }
        },

        mounted() {
            this.getList(this.current, this.size)
        },

        methods: {
            getList(cur, list, company_name, post_name) {
                var self = this;
                API.postList(cur, list, company_name, post_name).then(res => {
                    res.data.forEach(item => {
                        item.on_shelf == 1 ? item.on_shelf = true : item.on_shelf = false;
                    })
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
                    switch (self.type) {
                        case 1:
                            var company_name = self.keyword;
                            self.getList(val, self.size, company_name, post_name)
                            break;
                        case 2:
                            var post_name = self.keyword;
                            self.getList(val, self.size, company_name, post_name)
                    }
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
                    switch (self.type) {
                        case 1:
                            var company_name = self.keyword;
                            self.getList(1, val, company_name, post_name);
                            break;
                        case 2:
                            var post_name = self.keyword;
                            self.getList(1, val, company_name, post_name);
                    }
                } else {
                    self.getList(1, val);
                }
            },

            // 搜索方式
            changeType(val) {
                var self = this;
                self.typeDisabled = true;
                self.keyword = "";
                self.current = 1;
                self.getList(self.current, self.size);
            },

            search() {
                var self = this;
                self.loading = true;
                self.current = 1;
                if (self.type == 1) {
                    var company_name = self.keyword;
                    self.getList(self.current, self.size, company_name, post_name)
                }
                if (self.type == 2) {
                    var post_name = self.keyword;
                    self.getList(self.current, self.size, company_name, post_name)
                }
            },

            // 发布职位
            addPosition() {
                var self = this;
                self.dialogPosition = true;
            },

            close() {
                var self = this;
                self.positionInfo = {
                    href: '',
                    company_name: '',
                    company_intro: '',
                    post_name: '',
                    work_city: '',
                    work_place: '',
                    work_experience: '',
                    education: '',
                    salary: '',
                    work_intro: '',
                    name: '',
                    phone: '',
                    email: '',
                    on_shelf: 1,
                    browse: '',
                    sort: ''
                };
                self.files = []
            },

            // 发布
            newPosition() {
                var self = this;
                // console.log(self.positionInfo);
                if (self.positionInfo.name && self.positionInfo.phone && self.positionInfo.email) {
                    API.postRelease(self.positionInfo).then(res => {
                        self.$message.success("发布成功");
                        self.dialogPosition = false;
                        self.getList(self.current, self.size)
                    })
                } else {
                    self.$message.warning("请填写完整信息");
                }
            }, 

            handleEdit(index, row) {
                var self = this;
                self.dialogPosition = true;
                self.positionInfo = {
                    href: row.href,
                    company_name: row.company_name,
                    company_intro: row.company_intro,
                    post_name: row.post_name,
                    work_city: row.work_city,
                    work_place: row.work_place,
                    work_experience: row.work_experience,
                    education: row.education,
                    salary: row.salary,
                    work_intro: row.work_intro,
                    name: row.name,
                    phone: row.phone,
                    email: row.email,
                    on_shelf: row.on_shelf == true ? 1 : 2,
                    browse: row.browse,
                    sort: row.sort,
                    id: row.id
                };
                let urlStr = self.positionInfo.href.split(",");
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
                API.delPost(self.id).then(res => {
                    self.$message.success("删除成功");
                    self.dialogDel = false;
                    self.getList(self.current, self.size);
                })
            },



            notifyChange(val, index, row) {
                var self = this;
                // console.log(row);
                self.loading = true;
                if (val == true) {
                    self.positionInfo = {
                        href: row.href,
                        company_name: row.company_name,
                        company_intro: row.company_intro,
                        post_name: row.post_name,
                        work_city: row.work_city,
                        work_place: row.work_place,
                        work_experience: row.work_experience,
                        education: row.education,
                        salary: row.salary,
                        work_intro: row.work_intro,
                        name: row.name,
                        phone: row.phone,
                        email: row.email,
                        on_shelf: 1,
                        browse: row.browse,
                        sort: row.sort,
                        id: row.id
                    };
                } else {
                    self.positionInfo = {
                        href: row.href,
                        company_name: row.company_name,
                        company_intro: row.company_intro,
                        post_name: row.post_name,
                        work_city: row.work_city,
                        work_place: row.work_place,
                        work_experience: row.work_experience,
                        education: row.education,
                        salary: row.salary,
                        work_intro: row.work_intro,
                        name: row.name,
                        phone: row.phone,
                        email: row.email,
                        on_shelf: 2,
                        browse: row.browse,
                        sort: row.sort,
                        id: row.id
                    };
                }
                API.postRelease(self.positionInfo).then(res => {
                    self.$message.success("提交成功");
                    self.getList(self.current, self.size);
                })
            },
            // 刷新
            refresh() {
                this.reload();
            },

            // 上传图片
            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.goodsInfo.href = ''
            },
            beforeAvatarUpload(file) {
                const isLt2M = 300 * 1024;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过300KB");
                }
                return isLt2M;
            },
            handleAvatarSuccess(res, file) {
                //图片上传成功
                var self = this;
                self.positionInfo.href = file.response.data;
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

    .tex {
        width: 500px;
    }
</style>