<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addHouses" v-if="isShow">添加房屋</el-button>
      </div>

      <div class="btn">
        <el-input
          v-model="house_id"
          placeholder="输入房屋地址"
          class="input-with-select"
          @keyup.enter.native="search(house_id)"
        >
          <el-button slot="append" icon="el-icon-search" @click="search(house_id)"></el-button>
          <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
        </el-input>
      </div>
    </div>

    <el-dialog title="添加房屋" :visible.sync="dialogHouses" width="80%">
      <div class="box">
        <el-form :model="form" label-width="130px">
          <el-form-item label="房屋名">
            <el-input v-model="form.name" placeholder="请输入用户身份"></el-input>
          </el-form-item>
          <el-form-item label="人脸库">
            <el-input v-model="form.name" placeholder="请输入人脸库"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="form.name" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话">
            <el-input v-model="form.name" placeholder="请输入负责人电话"></el-input>
          </el-form-item>
          <el-form-item label="是否开启访客功能">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否开启访客功能">
            <v-map></v-map>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 表格数据 -->
    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="address" label="房屋地址"></el-table-column>
      <el-table-column prop="room_count" label="单元总数"></el-table-column>
      <el-table-column prop="room_resident" label="租客总数"></el-table-column>
      <el-table-column label="操作" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleBuild(scope.$index, scope.row)">楼栋管理</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleResident(scope.$index, scope.row)"
          >查看住户信息</el-button>
          <el-button type="primary" size="mini" @click="handleFace(scope.$index, scope.row)">全库推送人脸</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看所有住户信息 -->
    <el-dialog
      title="查看所有住户信息"
      :visible.sync="dialogResident"
      width="80%"
      :close-on-click-modal="false"
    >
      <div class="box">
        <div class="handle-box">
          <div class="btn">
            <el-select v-model="user" @change="handleUser" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <template v-if="user == '全部'">
          <el-table
            :data="residentData"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <!-- <el-table-column prop="room_id" label="房屋编号"></el-table-column> -->
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>
                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleLogs(scope.$index, scope.row)"
                      >进出记录</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="isShow"
                        @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="residentCurrentChange"
              :current-page.sync="rensidentCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="residentSize"
              layout="sizes, prev, pager, next, jumper"
              :total="residentTotal"
              @size-change="residentSizeChange"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '户主'">
          <el-table
            :data="houseOwnerList"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <!-- <el-table-column prop="room_id" label="房屋编号"></el-table-column> -->
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>

                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleLogs(scope.$index, scope.row)"
                      >进出记录</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="isShow"
                        @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="HouseOwnerCurrentChange"
              :current-page.sync="houseOwnerCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="houseOwnerSize"
              layout="sizes, prev, pager, next, jumper"
              :total="houseOwnerTotal"
              @size-change="HouseOwnerSizeChange"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '租客'">
          <el-table
            :data="renterList"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <!-- <el-table-column prop="room_id" label="房屋编号"></el-table-column> -->
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>

                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleLogs(scope.$index, scope.row)"
                      >进出记录</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="isShow"
                        @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="RenterCurrentChange"
              :current-page.sync="renterCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="renterSize"
              layout="sizes, prev, pager, next, jumper"
              :total="renterTotal"
              @size-change="renterSizeChange"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '物业'">
          <el-table
            :data="managementList"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <!-- <el-table-column prop="room_id" label="房屋编号"></el-table-column> -->
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>

                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸图片">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleLogs(scope.$index, scope.row)"
                      >进出记录</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="isShow"
                        @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="managementCurrntChange"
              :current-page.sync="managementCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="managementSize"
              layout="sizes, prev, pager, next, jumper"
              :total="managementTotal"
              @size-change="managementSizeChange"
            ></el-pagination>
          </div>
        </template>
        <template v-if="user == '家庭成员'">
          <el-table
            :data="familyList"
            border
            :header-cell-style="{background:'#f0f0f0'}"
            max-height="620"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <!-- <el-table-column prop="room_id" label="房屋编号"></el-table-column> -->
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>
                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸图片">
              <template slot-scope="scope">
                <div v-if="scope.row.href">
                  <el-popover placement="top-start" title trigger="click">
                    <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                    <img
                      slot="reference"
                      :src="scope.row.href"
                      style="max-width:180px;max-height:80px;"
                    />
                  </el-popover>
                </div>
                <div v-else>
                  <span>--暂无图片--</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="primary"
                        @click="handleLogs(scope.$index, scope.row)"
                      >进出记录</el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button
                        size="mini"
                        type="danger"
                        v-if="isShow"
                        @click="handleDel(scope.$index, scope.row)"
                      >删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="familyCurrentChange"
              :current-page.sync="familyCurrent"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="familySize"
              layout="sizes, prev, pager, next, jumper"
              :total="familyTotal"
              @size-change="familySizeChange"
            ></el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
    <!-- 访客 -->
    <el-dialog title="访客记录" :visible.sync="dialogVisitor">
      <div class="box">
        <el-table
          :data="visitorList"
          border
          :header-cell-style="{background:'#f0f0f0'}"
          max-height="620"
        >
          <el-table-column prop="name" label="真实姓名"></el-table-column>
          <el-table-column prop="interviewee_name" label="拜访人"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="visitor_date" label="到访时间"></el-table-column>
          <el-table-column prop="href" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.href">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.href" style="max-width:800px;max-height:800px;" />
                  <img
                    slot="reference"
                    :src="scope.row.href"
                    style="max-width:180px;max-height:80px;"
                  />
                </el-popover>
              </div>
              <div v-else>
                <span>--暂无图片--</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleLogs(scope.$index, scope.row)"
              >进出记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="visitorCurrentChange"
          :current-page.sync="visitorCurrent"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="visitorSize"
          layout="sizes, prev, pager, next, jumper"
          :total="visitorTotal"
          @size-change="visitorSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 楼栋管理 -->
    <el-dialog title="楼栋管理" :visible.sync="dialogBuild">
      <div class="box">
        <div class="handle-box">
          <div class="btn">
            <el-button type="primary" @click="HandleAddBuild">添加房屋编号</el-button>
          </div>
        </div>
        <el-table
          :data="buildingList"
          border
          :header-cell-style="{background:'#f0f0f0'}"
          max-height="620"
        >
          <el-table-column prop="door_number" label="房屋编号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleVistor(scope.$index, scope.row)"
              >访客</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="HandledelBuilding(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="buildingCurrentChange"
          :current-page.sync="buildingCurrent"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="buildingSize"
          layout="sizes, prev, pager, next, jumper"
          :total="buildingTotal"
          @size-change="buildingSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 楼栋管理删除提示框 -->
    <el-dialog
      :visible.sync="dialogDelBuild"
      title="删除房屋编号"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该房屋编号</div>
      <span>
        <el-button type="primary" @click="toDelBuild">删除</el-button>
        <el-button type="danger" @click="dialogDelBuild = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 添加房屋编号 -->
    <el-dialog title="添加房屋编号" :visible.sync="dialogAddBuild">
      <div class="box">
        <el-form :model="buildForm" label-width="100px">
          <div v-for="(item,index) in buildForm.rooms" :key="index">
            <el-form-item label="房屋编号">
              <el-input v-model="buildForm.rooms[index]" placeholder="请输入房屋编号"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="操作">
            <el-button type="primary" @click="addRooms">添加房屋编号</el-button>
            <el-button type="primary" @click="delRooms">删除房屋编号</el-button>
          </el-form-item>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newRooms">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs">
      <div class="box">
        <el-table
          :data="logsData"
          border
          :header-cell-style="{background:'#f0f0f0'}"
          max-height="620"
        >
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="number" label="证件号"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="direction" label="进出状态">
            <template slot-scope="scope">
              <span v-if="scope.row.direction == 1">进入</span>
              <span v-else-if="scope.row.direction == 2">外出</span>
            </template>
          </el-table-column>
          <el-table-column prop="image" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.image">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.image" style="max-width:800px;max-height:800px;" />
                  <img
                    slot="reference"
                    :src="scope.row.image"
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
      </div>
      <div class="block">
        <el-pagination
          @current-change="logsCurrentChange"
          :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="logsSize"
          layout="sizes, prev, pager, next, jumper"
          :total="logsTotal"
          @size-change="logsSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 访客进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogVisitorLogs">
      <div class="box">
        <el-table
          :data="visitorLogsData"
          border
          :header-cell-style="{background:'#f0f0f0'}"
          max-height="620"
        >
          <el-table-column prop="id" label="用户ID"></el-table-column>
          <el-table-column prop="number" label="证件号"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="direction" label="进出状态">
            <template slot-scope="scope">
              <span v-if="scope.row.direction == 1">进入</span>
              <span v-else-if="scope.row.direction == 2">外出</span>
            </template>
          </el-table-column>
          <el-table-column prop="image" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.image">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.image" style="max-width:800px;max-height:800px;" />
                  <img
                    slot="reference"
                    :src="scope.row.image"
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
      </div>
      <div class="block">
        <el-pagination
          @current-change="logsCurrentChange"
          :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="logsSize"
          layout="sizes, prev, pager, next, jumper"
          :total="logsTotal"
          @size-change="logsSizeChange"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="dialogDel"
      title="删除住户"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该住户</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 全库推送人脸 -->
    <el-dialog
      :visible.sync="dialogFace"
      title="开通人脸"
      width="20%"
      align="center"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px; margin-bottom: 30px;">是否全库推送人脸</div>
      <span>
        <el-button type="primary" @click="pushFace">推送</el-button>
        <el-button type="danger" @click="dialogFace = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <div class="block">
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
  </div>
</template>

<script>
import API from "@/api/index.js";
import vMap from "./map.vue";
import { log } from "util";

export default {
  components: {
    vMap,
  },
  inject: ["reload"],

  data() {
    return {
      loading: true,
      dialogHouses: false,
      dialogFace: false,
      form: {
        name: "",
        sex: "",
        postion: "",
      },

      tableData: [], // 表格数据

      current: 1, // 分页
      size: 10,
      total: 0,

      dialogResident: false, // 查看住户
      residentData: [],
      rensidentCurrent: 1,
      residentSize: 10,
      residentTotal: 0,
      dialogBuild: false, // 房屋编号
      dialogVisitor: false,

      buildForm: {
        address_id: "",
        rooms: [],
      },
      id: "",
      house_id: "", // 搜索
      face_id: "",

      user: "全部", // 身份切换
      userList: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "户主",
        },
        {
          value: 2,
          label: "租客",
        },
        {
          value: 3,
          label: "物业",
        },
        {
          value: 4,
          label: "家庭成员",
        },
      ],
      houseOwnerList: [], // 户主列表
      renterList: [], // 租客列表
      managementList: [], // 物业列表
      familyList: [],

      houseOwnerCurrent: 1, // 户主列表分页
      houseOwnerSize: 10,
      houseOwnerTotal: 0,

      renterCurrent: 1, // 租客列表分页
      renterSize: 10,
      renterTotal: 0,

      managementCurrent: 1, //物业列表分页
      managementSize: 10,
      managementTotal: 0,

      familyCurrent: 1, //物业列表分页
      familySize: 10,
      familyTotal: 0,

      dialogLogs: false, // 进出记录
      logsData: [],
      logsCurrent: 1,
      logsSize: 10,
      logsTotal: 0,
      dialogDel: false,

      dialogAddBuild: false,
      dialogDelBuild: false,
      buildingList: [], // 楼栋列表
      address_id: "",

      buildingCurrent: 1, // 分页
      buildingSize: 10,
      buildingTotal: 0,
      building_id: "",
      isShow: false,

      dialogVisitorLogs: false,
      visitorList: [],
      visitorCurrent: 1, // 分页
      visitorSize: 10,
      visitorTotal: 0,
      
      visitorLogsData: [],
      interviewee_name: "",
      room_id: "",
      familyType: "",
      card_number: "",
      permission: localStorage.getItem("permissions"),
    };
  },
  mounted() {
    this.getnewHouses();
    var permissionList = this.permission.split(",");
    if (permissionList.includes("housesAdd")) {
      this.isShow = true;
    }
  },
  methods: {
    // 获取房屋列表
    getnewHouses() {
      var self = this;
      API.addresses(self.current, self.size)
        .then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
        })
        .catch((err) => {
          self.loading = false;
        });
    },
    // 分页
    currentChange(val) {
      var self = this;
      self.current = val;
      self.loading = true;
      if (self.house_id == "") {
        API.addresses(val, self.size)
          .then((res) => {
            self.loading = false;
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
          });
      } else {
        API.addresses(val, self.size, 0, self.house_id)
          .then((res) => {
            self.loading = false;
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
          });
      }
    },
    // 每页几条
    sizeChange(val) {
      var self = this;
      self.size = val;
      self.loading = true;
      if (self.house_id == "") {
        API.addresses(self.current, val)
          .then((res) => {
            self.loading = false;
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
          });
      } else {
        API.addresses(self.current, val, 0, self.house_id)
          .then((res) => {
            self.loading = false;
            self.tableData = res.data;
            self.total = res.total;
          })
          .catch((err) => {
            self.loading = false;
          });
      }
    },

    // 搜索
    search() {
      var self = this;
      API.addresses(self.current, self.size, 0, self.house_id).then((res) => {
        self.tableData = res.data;
        self.total = res.total;
        // self.house_id = "";
        self.$message.success("搜索成功！");
      });
    },
    // 刷新
    refresh() {
      this.reload();
    },

    addHouses() {
      var self = this;
      self.dialogHouses = true;
    },
    newHouses() {
      var self = this;
    },

    // 楼栋管理
    handleBuild(index, row) {
      var self = this;
      self.dialogBuild = true;
      self.buildForm.address_id = row.id;
      self.address_id = row.id;
      self.buildingCurrent = 1;
      self.getBuilding();
    },
    HandleAddBuild(index, row) {
      var self = this;
      self.dialogAddBuild = true;
    },
    // 获取楼栋信息
    getBuilding() {
      var self = this;
      API.gainRooms(
        self.buildingCurrent,
        self.buildingSize,
        self.address_id
      ).then((res) => {
        self.buildingList = res.data;
        self.buildingTotal = res.total;
      });
    },
    // 楼栋管理分页
    buildingCurrentChange(val) {
      var self = this;
      self.buildingCurrent = val;
      API.gainRooms(val, self.buildingSize, self.address_id).then((res) => {
        self.buildingList = res.data;
        self.buildingTotal = res.total;
      });
    },
    buildingSizeChange(val) {
      var self = this;
      self.buildingSize = val;
      API.gainRooms(self.buildingCurrent, val, self.address_id).then((res) => {
        self.buildingList = res.data;
        self.buildingTotal = res.total;
      });
    },

    // 访客
    handleVistor(index, row) {
      var self = this;
      self.dialogVisitor = true;
      self.address_id = row.address_id;
      self.room_id = row.id;
      self.visitorCurrent = 1;
      API.visitors(
        self.visitorCurrent,
        self.visitorSize,
        self.address_id,
        self.room_id
      ).then((res) => {
        self.visitorList = res.data;
        self.visitorTotal = res.total;
      });
    },
    // 访客分页
    visitorCurrentChange(val) {
      var self = this;
      self.visitorCurrent = val;
      API.visitors(val, self.visitorSize, self.address_id, self.room_id).then(
        (res) => {
          self.visitorList = res.data;
          self.visitorTotal = res.total;
        }
      );
    },
    visitorSizeChange(val) {
      var self = this;
      self.visitorSize = val;
      API.visitors(
        self.visitorCurrent,
        val,
        self.address_id,
        self.room_id
      ).then((res) => {
        self.visitorList = res.data;
        self.visitorTotal = res.total;
      });
    },

    // 房屋编号操作
    addRooms() {
      var self = this;
      self.buildForm.rooms.push("");
    },
    delRooms() {
      var self = this;
      self.buildForm.rooms.pop("");
    },
    newRooms() {
      var self = this;
      API.rooms(self.buildForm).then((res) => {
        self.$message.success("提交成功");
        self.dialogAddBuild = false;
        self.buildForm.rooms = [];
        self.rooms = "";
        self.getBuilding();
      });
    },

    // 查看住户
    handleResident(index, row) {
      var self = this;
      self.dialogResident = true;
      self.address_id = row.id;
      self.user = "全部";
      self.rensidentCurrent = 1;
      API.addressResidents(
        self.rensidentCurrent,
        self.residentSize,
        self.address_id
      ).then((res) => {
        self.residentData = res.data;
        self.residentTotal = res.total;
      });
    },
    handleUser(value) {
      var self = this;
      switch (value) {
        case 0:
          self.$nextTick(() => {
            self.rensidentCurrent = 1;
            self.residentSize = 10;
            self.user = "全部";
            API.addressResidents(
              self.rensidentCurrent,
              self.residentSize,
              self.address_id
            ).then((res) => {
              self.residentData = res.data;
              self.residentTotal = res.total;
            });
          });
          break;
        case 1:
          self.$nextTick(() => {
            self.houseOwnerCurrent = 1;
            self.houseOwnerSize = 10;
            self.user = "户主";
            API.addressResidents(
              self.houseOwnerCurrent,
              self.houseOwnerSize,
              self.address_id,
              1
            ).then((res) => {
              console.log("户主", res);
              self.houseOwnerList = res.data;
              self.houseOwnerTotal = res.total;
            });
          });
          break;
        case 2:
          self.$nextTick(() => {
            self.renterCurrent = 1;
            self.renterSize = 10;
            self.user = "租客";
            API.addressResidents(
              self.renterCurrent,
              self.renterSize,
              self.address_id,
              2
            ).then((res) => {
              self.renterList = res.data;
              self.renterTotal = res.total;
            });
          });
          break;
        case 3:
          self.$nextTick(() => {
            self.managementCurrent = 1;
            self.managementSize = 10;
            self.user = "物业";
            API.addressResidents(
              self.managementCurrent,
              self.managementSize,
              self.address_id,
              4
            ).then((res) => {
              self.managementList = res.data;
              self.managementTotal = res.total;
            });
          });
          break;
        case 4:
          self.$nextTick(() => {
            self.familyCurrent = 1;
            self.familySize = 10;
            self.user = "家庭成员";
            API.addressResidents(
              self.familyCurrent,
              self.familySize,
              self.address_id,
              3
            ).then((res) => {
              self.familyList = res.data;
              self.familyTotal = res.total;
            });
          });
          break;
      }
    },
    // 全部住户分页
    residentCurrentChange(val) {
      var self = this;
      self.rensidentCurrent = val;
      API.addressResidents(val, self.residentSize, self.address_id).then(
        (res) => {
          self.residentData = res.data;
        }
      );
    },
    residentSizeChange(val) {
      var self = this;
      self.residentSize = val;
      API.addressResidents(self.rensidentCurrent, val, self.address_id).then(
        (res) => {
          self.residentData = res.data;
        }
      );
    },
    // 户主分页
    HouseOwnerCurrentChange(val) {
      var self = this;
      self.houseOwnerCurrent = val;
      API.addressResidents(val, self.houseOwnerSize, self.address_id, 1).then(
        (res) => {
          self.houseOwnerList = res.data;
        }
      );
    },
    HouseOwnerSizeChange(val) {
      var self = this;
      self.houseOwnerSize = val;
      API.addressResidents(
        self.houseOwnerCurrent,
        val,
        self.address_id,
        1
      ).then((res) => {
        self.houseOwnerList = res.data;
      });
    },
    // 租客分页
    RenterCurrentChange(val) {
      var self = this;
      self.renterCurrent = val;
      API.addressResidents(val, self.renterSize, self.address_id, 2).then(
        (res) => {
          self.renterList = res.data;
        }
      );
    },
    renterSizeChange(val) {
      var self = this;
      self.renterSize = val;
      API.addressResidents(self.renterCurrent, val, self.address_id, 2).then(
        (res) => {
          self.renterList = res.data;
        }
      );
    },
    // 物业分页
    managementCurrntChange(val) {
      var self = this;
      self.managementCurrent = val;
      API.addressResidents(val, self.managementSize, self.address_id, 4).then(
        (res) => {
          self.managementList = res.data;
        }
      );
    },
    managementSizeChange(val) {
      var self = this;
      self.managementSize = val;
      API.addressResidents(
        self.managementCurrent,
        val,
        self.address_id,
        4
      ).then((res) => {
        self.managementList = res.data;
      });
    },
    // 家庭成员分头
    familyCurrentChange(val) {
      var self = this;
      self.familyCurrent = val;
      API.addressResidents(val, self.familySize, self.address_id, 3).then(
        (res) => {
          self.familyList = res.data;
        }
      );
    },
    familySizeChange(val) {
      var self = this;
      self.familySize = val;
      API.addressResidents(self.familyCurrent, val, self.address_id, 3).then(
        (res) => {
          self.familyList = res.data;
          self.familyTotal = res.total;
        }
      );
    },

    // 进出记录
    handleLogs(index, row) {
      var self = this;
      self.dialogLogs = true;
      self.face_id = row.face_id;
      self.logsCurrent = 1;
      self.getFaceLogs();
    },
    getFaceLogs() {
      var self = this;
      API.faceLogs(self.logsCurrent, self.logsSize, self.face_id).then(
        (res) => {
          console.log("getFaceLogs", res);
          self.logsData = res.data;
          self.logsTotal = res.total;
        }
      );
    },
    // 进出记录分页
    logsCurrentChange(val) {
      var self = this;
      self.logsCurrent = val;
      API.faceLogs(val, self.logsSize, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },
    logsSizeChange(val) {
      var self = this;
      self.logsSize = val;
      API.faceLogs(self.logsCurrent, val, self.face_id).then((res) => {
        self.logsData = res.data;
      });
    },

    // 全库推送人脸
    handleFace(index, row) {
      var self = this;
      self.dialogFace = true;
      console.log(row);
      self.address_id = row.id;
    },
    pushFace() {
      var self = this;
      API.pushAddressFace(self.address_id)
        .then((res) => {
          self.$message.success("推送成功");
          self.dialogFace = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 删除--查看住户信息
    handleDel(index, row) {
      var self = this;
      self.id = row.id;
      self.familyType = row.type;
      self.card_number = row.card_number;
      console.log(row);
      self.dialogDel = true;
    },
    toDel() {
      var self = this;
      if (self.familyType == 3) {
        API.delHousehold(self.id, self.card_number).then((res) => {
          switch (self.user) {
            case "全部":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.rensidentCurrent,
                self.residentSize,
                self.address_id
              ).then((res) => {
                console.log("所有", res);
                self.residentData = res.data;
                self.residentTotal = res.total;
              });
              break;
            case "户主":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.houseOwnerCurrent,
                self.houseOwnerSize,
                self.address_id,
                1
              ).then((res) => {
                console.log("户主", res);
                self.houseOwnerList = res.data;
                self.houseOwnerTotal = res.total;
              });
              break;
            case "租客":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.renterCurrent,
                self.renterSize,
                self.address_id,
                2
              ).then((res) => {
                self.renterList = res.data;
                self.renterTotal = res.total;
              });
              break;
            case "物业":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.managementCurrent,
                self.managementSize,
                self.address_id,
                4
              ).then((res) => {
                self.managementList = res.data;
                self.managementTotal = res.total;
              });
              break;
            case "家庭成员":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.familyCurrent,
                self.familySize,
                self.address_id,
                3
              ).then((res) => {
                self.familyList = res.data;
                self.familyTotal = res.total;
              });
              break;
          }
        });
      } else {
        API.delHousehold(self.id, 1).then((res) => {
          switch (self.user) {
            case "全部":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.rensidentCurrent,
                self.residentSize,
                self.address_id
              ).then((res) => {
                console.log("所有", res);
                self.residentData = res.data;
                self.residentTotal = res.total;
              });
              break;
            case "户主":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.houseOwnerCurrent,
                self.houseOwnerSize,
                self.address_id,
                1
              ).then((res) => {
                console.log("户主", res);
                self.houseOwnerList = res.data;
                self.houseOwnerTotal = res.total;
              });
              break;
            case "租客":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.renterCurrent,
                self.renterSize,
                self.address_id,
                2
              ).then((res) => {
                self.renterList = res.data;
                self.renterTotal = res.total;
              });
              break;
            case "物业":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.managementCurrent,
                self.managementSize,
                self.address_id,
                4
              ).then((res) => {
                self.managementList = res.data;
                self.managementTotal = res.total;
              });
              break;
            case "家庭成员":
              self.$message.success("删除成功");
              self.dialogDel = false;
              API.addressResidents(
                self.familyCurrent,
                self.familySize,
                self.address_id,
                3
              ).then((res) => {
                self.familyList = res.data;
                self.familyTotal = res.total;
              });
              break;
          }
        });
      }
    },

    // 删除--楼栋管理
    HandledelBuilding(index, row) {
      var self = this;
      self.dialogDelBuild = true;
      self.building_id = row.id;
    },
    toDelBuild() {
      var self = this;
      API.delBuilding(self.building_id).then((res) => {
        self.dialogDelBuild = false;
        self.$message.success("删除成功");
        self.getBuilding();
      });
    },
  },
};
</script>

<style scoped>
#tooles {
  height: 40px;
  background: #5688cb;
  position: relative;
  z-index: 100;
  color: white;
  width: 900px;
  margin-top: 10px;
}

#bside_left {
  width: 260px;
  height: 530px;
  border: 1px solid #ccc;
  float: left;
  overflow: auto;
  padding-left: 5px;
}

#cur_city,
#no_value {
  height: 20px;
  position: absolute;
  top: 3px;
  left: 10px;
}

#cur_city .change_city {
  margin-left: 5px;
  cursor: pointer;
}

#level {
  margin-left: 20px;
}

.logo_img {
  width: 172px;
  height: 23px;
}

.poi {
  width: 570px;
  height: 41;
  padding-top: 12px;
  float: left;
  position: relative;
}

.poi_note {
  width: 63px;
  line-height: 26px;
  float: left;
}

.already {
  width: 52px;
  line-height: 26px;
  padding-left: 5px;
  float: left;
  color: red;
  display: none;
}

.info_list {
  margin-bottom: 5px;
  clear: both;
  cursor: pointer;
}

#txt_pannel {
  height: 500px;
}

#city {
  width: 356px;
  height: 433px;
  padding: 10px;
  border: 2px solid #d6d6d6;
  position: absolute;
  left: 44px;
  top: 20px;
  z-index: 999;
  background: #fff;
  overflow: auto;
  color: black;
}

#city .city_class {
  font-size: 12px;
  background: #fff;
  margin: 1px 0;
}

#city .city_container {
  margin-top: 10px;
  /*margin-bottom: 50px;*/
  background: #fff;
}

#city .city_container_left {
  width: 48px;
  float: left;
}

#city .style_color {
  color: #000;
  font-weight: 600;
}

#city .city_container_right {
  width: 289px;
  float: left;
}

#city .close {
  width: 20px;
  height: 20px;
  display: inline-block;
  float: right;
  font-size: 20px;
  font-weight: normal;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

#city .city_name {
  line-height: 20px;
  height: 20px;
  margin-left: 5px;
  color: #2f82c4;
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
}

#curCity {
  margin-right: 5px;
}

.hide {
  display: none;
}

#bside_rgiht {
  width: 631px;
  height: 530px;
  border: 1px solid #ccc;
  float: left;
  font-size: 12px;
}

#containers {
  width: 621px;
  height: 520px;
  border: 5px solid #fff;
}

#no_value {
  color: red;
  position: relative;
  width: 200px;
}
</style>
