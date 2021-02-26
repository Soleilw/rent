<template>
    <div v-loading="loading" element-loading-text="拼命加载中">
        <div class="handle-box">
            <div class="btn">
                <el-button type="primary" @click="addPosition">发布职位</el-button>
            </div>
        </div>

        <!-- 发布职位 -->
        <el-dialog :visible.sync="dialogPosition" title="发布职位" width="85%">
            <el-form label-width="150px" :model="positionInfo">
                <el-form-item label="公司名称">
                    <el-input v-model="positionInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="公司简介">
                    <el-input v-model="positionInfo.intro"></el-input>
                </el-form-item>
                <el-form-item label="职位名称">
                    <el-input v-model="positionInfo.share_title"></el-input>
                </el-form-item>
                <div class="ipt-box">
                    <el-form-item label="联系方式">
                        <el-input v-model="positionInfo.price"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="positionInfo.vip_price"></el-input>
                    </el-form-item>
                    <el-form-item label="简历投递E-mail">
                        <el-input v-model="positionInfo.freight"></el-input>
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
                <el-form-item label="职位描述">
                    <quill-editor ref="myQuillEditor" v-model="positionInfo.detail" :options="editorOption"
                        style="height:430px;margin:0 0 60px 0;"></quill-editor>
                    <el-upload class="avatar-uploader quill-img" action="https://api.fengniaotuangou.cn/api/upload"
                        :before-upload="beforeUpload" :on-success="quillImgSuccess" style="display: none">
                        <el-button size="small" type="primary" id="imgInput" element-loading-text="插入中,请稍候">点击上传
                        </el-button>
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
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="img" label="图片" width="150">
                <template slot-scope="scope">
                    <div v-if="scope.row.img">
                        <el-popover placement="top-start" title trigger="click">
                            <img :src="scope.row.img" style="max-width: 800px; max-height: 800px" />
                            <img slot="reference" :src="scope.row.img" style="max-width: 180px; max-height: 80px" />
                        </el-popover>
                    </div>
                    <div v-else>
                        <span>--暂无图片--</span>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="is_fetch" label="是否到店自取" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_fetch" active-color="#2a9f93"
                        @change="notifyChange(scope.row.is_fetch, scope.$index, scope.row)">
                    </el-switch>
                </template>
            </el-table-column> -->
            <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
            <el-table-column label="操作" width="200px">
                <!-- <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="handleClassify(scope.$index, scope.row)">编辑分类
                    </el-button>
                </template> -->
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import API from "@/api/index.js";
    import md5 from "blueimp-md5";
    import {
        quillEditor
    } from "vue-quill-editor";
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    export default {
        components: {
            quillEditor,
        },
        data() {
            return {
                loading: false,
                tableData: [], // 表格数据
                current: 1, // 分页
                size: 10,
                total: 0,

                positionInfo: {},
                dialogPosition: false,
                files: [],
                editorOption: {
                    placeholder: "请输入文档内容",
                    theme: "snow",
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{
                                    direction: "rtl",
                                }, ],
                                [{
                                    size: ["small", false, "large", "huge"],
                                }, ],
                                [{
                                    header: [1, 2, 3, 4, 5, 6, false],
                                }, ],
                                [{
                                        color: [],
                                    },
                                    {
                                        background: [],
                                    },
                                ],
                                [{
                                    font: [],
                                }, ],
                                [{
                                    align: [],
                                }, ],
                                ["clean"],
                                ["link", "image"],
                            ],
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        document.querySelector(".quill-img input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                },
                            },
                        },
                    },
                },
            }
        },

        methods: {
            // 发布职位
            addPosition() {
                var self = this;
                self.dialogPosition = true;
            },

            // 发布
            newPosition() {},


            // 富文本选择图片时的事件
            beforeUpload() {
                // 显示加载动画
                loading = this.$loading({
                    lock: true,
                    text: "图片上传中",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
            },
            // 富文本插入图片时上传图片
            quillImgSuccess(res, file) {
                let quill = this.$refs.myQuillEditor.quill;
                // 关闭动画
                loading.close();
                if (res.data) {
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, "image", res.data);
                    quill.setSelection(length + 1);
                } else {
                    this.$message.error("图片插入失败");
                }
            },
            // 上传图片
            handleRemove(file, fileList) {
                //移除图片
                var self = this;
                self.files = fileList
                self.goodsInfo.img = ''
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
                self.positionInfo.img = file.response.data;
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
</style>