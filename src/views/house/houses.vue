<template>
  <div v-loading="loading" element-loading-text="拼命加载中">
    <div class="handle-box">
      <div class="btn">
        <el-button type="primary" @click="addHouses" v-if="isShow">添加房屋</el-button>
      </div>

      <div class="btn">
        <el-input v-model="house_id" placeholder="输入房屋地址" class="input-with-select"
          @keyup.enter.native="search(house_id)">
          <el-button slot="append" icon="el-icon-search" @click="search(house_id)"></el-button>
          <el-button slot="append" icon="el-icon-refresh" @click="refresh"></el-button>
        </el-input>
      </div>
    </div>

    <el-dialog title="添加房屋" :visible.sync="dialogHouses" width="80%" @close="close">
      <div class="box">
        <el-form :model="listForm">
          <div class="handle-box">
            <el-alert title="添加地址: 选择所在社区 --> 点击地址所在行 --> 提交" type="info" show-icon :closable="false" effect="dark"
              center>
            </el-alert>
          </div>
          <div class="handle-box">
            <div class="btn">
              <span>选择社区: </span>
              <el-select v-model="pro_id" placeholder="请选择省份" @change="proChange" style="margin-right: 10px">
                <el-option v-for="item in proList" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="city_id" placeholder="请选择市级" @change="cityChange" style="margin-right: 10px">
                <el-option v-for="item in cityList" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="areas_id" placeholder="请选择区级" @change="areasChange" style="margin-right: 10px">
                <el-option v-for="item in communityList" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="community_id" placeholder="请选择社区" @change="communityChange"
                style="margin-right: 10px">
                <el-option v-for="item in areaList" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>

          <el-table :data="addressList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620"
            highlight-current-row @current-change="handleCurrentChange" ref="singleTable">
            <el-table-column prop="groups[0].address_id" label="地址ID"></el-table-column>
            <el-table-column prop="address" label="房屋地址"></el-table-column>
            <el-table-column prop="groups[0].group_name" label="人脸组"></el-table-column>
            <el-table-column prop="stations" label="派出所"></el-table-column>
          </el-table>
          <div class="submit">
            <el-form-item>
              <el-button type="primary" @click="newHouses">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 表格数据 -->
    <el-table :data="tableData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="address" label="房屋地址"></el-table-column>
      <el-table-column prop="room_count" label="单元总数"></el-table-column>
      <el-table-column prop="room_resident" label="租客总数"></el-table-column>
      <el-table-column prop="state" label="是否收费">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-color="#2a9f93"
            @change="notifyChange(scope.row.state, scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="is_visitor_code" label="是否开启访客码">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_visitor_code" active-color="#2a9f93"
            @change="visitorCodeChange(scope.row.is_visitor_code, scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleBuild(scope.$index, scope.row)">楼栋管理</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleResident(scope.$index, scope.row)">查看住户信息
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleFace(scope.$index, scope.row)">全库推送人脸</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleRental(scope.$index, scope.row)">修改出租屋</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleLoseFace(scope.$index, scope.row)">失效过期人脸
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看所有住户信息 -->
    <el-dialog title="查看所有住户信息" :visible.sync="dialogResident" width="80%" :close-on-click-modal="false">
      <div class="box">
        <div class="handle-box">
          <div class="btn">
            <el-select v-model="user" @change="handleUser" placeholder="请选择">
              <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="btn">
            <el-input v-model="name" placeholder="请输入姓名" class="input-with-select"
              @keyup.enter.native="searchRes(name)">
              <el-button slot="append" icon="el-icon-search" @click="searchRes(name)"></el-button>
            </el-input>
          </div>
        </div>
        <template v-if="user == '全部'">
          <el-table :data="residentData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>
                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="room.door_number" label="门牌号"></el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="mini" type="primary" @click="handleLogs(scope.$index, scope.row)">进出记录
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button size="mini" type="danger" v-if="isShow" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="residentCurrentChange" :current-page.sync="rensidentCurrent"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="residentSize" layout="sizes, prev, pager, next, jumper"
              :total="residentTotal" @size-change="residentSizeChange"></el-pagination>
          </div>
        </template>
        <template v-if="user == '户主'">
          <el-table :data="houseOwnerList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="用户身份">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">户主</span>
                <span v-else-if="scope.row.type == 2">租客</span>
                <span v-else-if="scope.row.type == 3">家庭成员</span>

                <span v-else-if="scope.row.type == 4">物业</span>
              </template>
            </el-table-column>
            <el-table-column prop="room.door_number" label="门牌号"></el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="mini" type="primary" @click="handleLogs(scope.$index, scope.row)">进出记录
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button size="mini" type="danger" v-if="isShow" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="houseOwnerCurrentChange" :current-page.sync="houseOwnerCurrent"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="houseOwnerSize" layout="sizes, prev, pager, next, jumper"
              :total="houseOwnerTotal" @size-change="houseOwnerSizeChange"></el-pagination>
          </div>
        </template>
        <template v-if="user == '租客'">
          <el-table :data="renterList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
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
            <el-table-column prop="room.door_number" label="门牌号"></el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸照片">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="mini" type="primary" @click="handleLogs(scope.$index, scope.row)">进出记录
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button size="mini" type="danger" v-if="isShow" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="renterCurrentChange" :current-page.sync="renterCurrent"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="renterSize" layout="sizes, prev, pager, next, jumper"
              :total="renterTotal" @size-change="renterSizeChange"></el-pagination>
          </div>
        </template>
        <template v-if="user == '物业'">
          <el-table :data="managementList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
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
            <el-table-column prop="room.door_number" label="门牌号"></el-table-column>
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸图片">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="mini" type="primary" @click="handleLogs(scope.$index, scope.row)">进出记录
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button size="mini" type="danger" v-if="isShow" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="managementCurrntChange" :current-page.sync="managementCurrent"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="managementSize" layout="sizes, prev, pager, next, jumper"
              :total="managementTotal" @size-change="managementSizeChange"></el-pagination>
          </div>
        </template>
        <template v-if="user == '家庭成员'">
          <el-table :data="familyList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
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
            <el-table-column prop="room.door_number" label="门牌号"></el-table-column>\
            <el-table-column prop="card_number" label="身份证号"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="href" label="人脸图片">
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-dropdown>
                  <el-button type="primary">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="mini" type="primary" @click="handleLogs(scope.$index, scope.row)">进出记录
                      </el-button>
                    </el-dropdown-item>

                    <el-dropdown-item>
                      <el-button size="mini" type="danger" v-if="isShow" @click="handleDel(scope.$index, scope.row)">删除
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="familyCurrentChange" :current-page.sync="familyCurrent"
              :page-sizes="[10, 20, 30, 40, 50]" :page-size="familySize" layout="sizes, prev, pager, next, jumper"
              :total="familyTotal" @size-change="familySizeChange"></el-pagination>
          </div>
        </template>
      </div>
    </el-dialog>
    <!-- 访客 -->
    <el-dialog title="访客记录" :visible.sync="dialogVisitor" width="80%">
      <div class="box">
        <el-table :data="visitorList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
          <el-table-column prop="name" label="真实姓名"></el-table-column>
          <el-table-column prop="interviewee_name" label="拜访人"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="visitor_date" label="到访时间"></el-table-column>
          <el-table-column prop="href" label="人脸照片">
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleLogs(scope.$index, scope.row)">进出记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @current-change="visitorCurrentChange" :current-page.sync="visitorCurrent"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="visitorSize" layout="sizes, prev, pager, next, jumper"
          :total="visitorTotal" @size-change="visitorSizeChange"></el-pagination>
      </div>
    </el-dialog>

    <!-- 楼栋管理 -->
    <el-dialog title="楼栋管理" :visible.sync="dialogBuild" width="60%">
      <div class="box">
        <div class="handle-box">
          <div class="btn">
            <el-button type="primary" @click="handleAddBuild">添加房屋编号</el-button>
          </div>
        </div>
        <el-table :data="buildingList" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
          <el-table-column prop="door_number" label="房屋编号"></el-table-column>
          <!-- <el-table-column prop="door_number" label="人数"></el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleBuildEdit(scope.$index, scope.row)">编辑uuid</el-button>
              <el-button type="primary" size="mini" @click="handleVistor(scope.$index, scope.row)">访客</el-button>
              <el-button type="primary" size="mini" @click="handleMember(scope.$index, scope.row)">房间成员</el-button>
              <el-button type="danger" size="mini" @click="HandledelBuilding(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @current-change="buildingCurrentChange" :current-page.sync="buildingCurrent"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="buildingSize" layout="sizes, prev, pager, next, jumper"
          :total="buildingTotal" @size-change="buildingSizeChange"></el-pagination>
      </div>
    </el-dialog>
    <!-- 楼栋管理删除提示框 -->
    <el-dialog :visible.sync="dialogDelBuild" title="删除房屋编号" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该房屋编号</div>
      <span>
        <el-button type="primary" @click="toDelBuild">删除</el-button>
        <el-button type="danger" @click="dialogDelBuild = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 添加房屋编号 -->
    <el-dialog title="添加房屋编号" :visible.sync="dialogAddBuild" width="50%">
      <div class="box">
        <el-form :model="buildForm" label-width="150px">
          <div v-for="(item,index) in buildForm.rooms" :key="index">
            <div>
              <el-form-item label="房屋编号(必填)">
                <el-input v-model="buildForm.rooms[index].room" placeholder="请输入房屋编号"></el-input>
              </el-form-item>
              <el-form-item label="uuid">
                <el-input v-model="buildForm.rooms[index].uuid" placeholder="请输入uuid"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="操作" v-if="isAdd">
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

    <!-- 房间成员信息 -->
    <el-dialog title="成员信息" :visible.sync="dialogMember" width="80%">
      <div class="box">
        <el-table :data="memberData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
          <el-table-column prop="user_id" label="用户ID"></el-table-column>
          <el-table-column prop="typeString" label="用户身份"></el-table-column>
          <el-table-column prop="snapshot.name" label="用户姓名"></el-table-column>
          <el-table-column prop="snapshot.card_number" label="用户证件号"></el-table-column>
          <el-table-column prop="snapshot.href" label="人脸照片">
            <template slot-scope="scope">
              <div v-if="scope.row.snapshot.href">
                <el-popover placement="top-start" title trigger="click">
                  <img :src="scope.row.snapshot.href" style="max-width:800px;max-height:800px;" />
                  <img slot="reference" :src="scope.row.snapshot.href" style="max-width:180px;max-height:80px;" />
                </el-popover>
              </div>
              <div v-else>
                <span>--暂无图片--</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-dialog>


    <!-- 进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogLogs" width="80%">
      <div class="box">
        <el-table :data="logsData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
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
                  <img slot="reference" :src="scope.row.image" style="max-width:180px;max-height:80px;" />
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
        <el-pagination @current-change="logsCurrentChange" :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="logsSize" layout="sizes, prev, pager, next, jumper"
          :total="logsTotal" @size-change="logsSizeChange"></el-pagination>
      </div>
    </el-dialog>

    <!-- 访客进出记录 -->
    <el-dialog title="进出记录" :visible.sync="dialogVisitorLogs" width="80%">
      <div class="box">
        <el-table :data="visitorLogsData" border :header-cell-style="{background:'#f0f0f0'}" max-height="620">
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
                  <img slot="reference" :src="scope.row.image" style="max-width:180px;max-height:80px;" />
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
        <el-pagination @current-change="logsCurrentChange" :current-page.sync="logsCurrent"
          :page-sizes="[10, 20, 30, 40, 50]" :page-size="logsSize" layout="sizes, prev, pager, next, jumper"
          :total="logsTotal" @size-change="logsSizeChange"></el-pagination>
      </div>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="dialogDel" title="删除住户" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否删除该住户</div>
      <span>
        <el-button type="primary" @click="toDel">删除</el-button>
        <el-button type="danger" @click="dialogDel = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 全库推送人脸 -->
    <el-dialog :visible.sync="dialogFace" title="全库推送人脸" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否全库推送人脸</div>
      <span>
        <el-button type="primary" @click="pushFace">推送</el-button>
        <el-button type="danger" @click="dialogFace = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 失效过期人脸 -->
    <el-dialog :visible.sync="dialogLose" title="失效过期人脸" width="20%" align="center" :close-on-click-modal="false">
      <div style="font-size: 20px; margin-bottom: 30px;">是否失效该地址过期人脸</div>
      <span>
        <el-button type="primary" @click="toLose">确定</el-button>
        <el-button type="danger" @click="dialogLose = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 修改出租屋 -->
    <el-dialog :visible.sync="dialogRental" title="修改出租屋" width="50%" :close-on-click-modal="false">
      <el-form label-width="80px" :model="listForm">
        <el-form-item label="社区ID">
          <el-input v-model="listForm.area_id" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="地址ID">
          <el-input v-model="listForm.address_id" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="listForm.address"></el-input>
        </el-form-item>
        <el-form-item label="派出所">
          <el-input v-model="listForm.police" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="人脸组">
          <el-input v-model="listForm.group" :disabled="isDisabled"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地址">
          <el-radio-group v-model="changeFrom.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="身份证">
          <el-input v-model="changeFrom.card_number"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="手机号">
          <el-input v-model="changeFrom.phone"></el-input>
        </el-form-item> -->
        <div class="submit">
          <el-form-item>
            <el-button type="primary" @click="verifyID">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <div class="block">
      <el-pagination @current-change="currentChange" :current-page.sync="current" :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="size" layout="sizes, prev, pager, next, jumper" :total="total" @size-change="sizeChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import API from "@/api/index.js";
  import vMap from "./map.vue";
  // import axios from '@/plugins/axios'
  import axios from 'axios'


  import {
    log
  } from "util";

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
        dialogRental: false,

        buildForm: {
          address_id: "",
          rooms: [{
            room: '',
            uuid: ''
          }],
        },
        id: "",
        house_id: "", // 搜索
        face_id: "",

        user: "全部", // 身份切换
        userList: [{
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
        listForm: {
          area_id: "",
          address: '',
          address_id: '',
          group: '',
          police: '',
          id: ''
        },
        addressList: '',
        proList: [], // 省级列表
        pro_id: "",
        cityList: [], // 市级列表
        city_id: "",
        communityList: [], // 区级列表
        community_id: "",
        areaList: [], //  社区列表
        areas_id: "",
        isAdd: false,
        state: false,
        isDisabled: false,
        is_visitor_code: false,
        dialogLose: false,
        isAdd: false,
        dialogMember: false,
        memberData: [],
        name: ''
      };
    },
    mounted() {
      this.getnewHouses(this.current, this.size);
      this.getAddress();
      this.getPro();
      var permissionList = this.permission.split(",");
      if (permissionList.includes("housesAdd")) {
        this.isShow = true;
      }
    },
    methods: {
      // 获取房屋列表
      getnewHouses(cur, list) {
        var self = this;
        API.addresses(cur, list)
          .then((res) => {
            // console.log(res.data);
            self.loading = false;
            self.tableData = res.data;
            self.total = res.total;
            res.data.forEach(item => {
              // console.log(item);
              item.state == 1 ? item.state = true : item.state = false;
              item.is_visitor_code == 1 ? item.is_visitor_code = true : item.is_visitor_code = false;
            })
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
          self.getnewHouses(val, self.size);
        } else {
          self.funSearch(val, self.size);
        }
      },
      // 每页几条
      sizeChange(val) {
        var self = this;
        self.size = val;
        self.loading = true;
        if (self.house_id == "") {
          self.getnewHouses(1, val);
        } else {
          self.funSearch(1, val);
        }
        self.current = 1;
      },

      // 搜索
      funSearch(cur, list) {
        var self = this;
        API.addresses(cur, list, 0, self.house_id).then((res) => {
          self.loading = false;
          self.tableData = res.data;
          self.total = res.total;
          res.data.forEach(item => {
            item.state == 1 ? item.state = true : item.state = false;
            item.is_visitor_code == 1 ? item.is_visitor_code = true : item.is_visitor_code = false;
          })
          self.$message.success("搜索成功！");
        });
      },
      search() {
        var self = this;
        self.current = 1;
        self.funSearch(self.current, self.size);
      },
      searchRes() {
        var self = this;
        self.user = '全部';
        self.rensidentCurrent = 1;
        API.addResSearch(self.rensidentCurrent, self.residentSize, self.address_id, self.name).then(res => {
          self.$message.success("搜索成功！");
          self.residentData = res.data;
          self.residentTotal = res.total;
        })
      },
      // 刷新
      refresh() {
        this.reload();
      },

      notifyChange(val, index, row) {
        var self = this;
        let notifyData = {}
        if (val == true) {
          notifyData = {
            id: row.id,
            state: 1
          }
          API.addressState(notifyData).then(res => {
            self.$message.success("提交成功");
            self.getnewHouses(self.current, self.size);
          })
        } else {
          notifyData = {
            id: row.id,
            state: 2
          }
          API.addressState(notifyData).then(res => {
            self.$message.success("提交成功");
            self.getnewHouses(self.current, self.size);
          })
        }
      },
      visitorCodeChange(val, index, row) {
        var self = this;
        let notifyData = {}
        console.log(val);
        if (val == true) {
          notifyData = {
            id: row.id,
            is_visitor_code: 1
          }
          API.visitorCode(notifyData).then(res => {
            self.$message.success("提交成功");
            self.getnewHouses(self.current, self.size);
          })
        } else {
          notifyData = {
            id: row.id,
            is_visitor_code: 2
          }
          API.visitorCode(notifyData).then(res => {
            self.$message.success("提交成功");
            self.getnewHouses(self.current, self.size);
          })
        }
      },

      addHouses() {
        var self = this;
        self.dialogHouses = true;
      },
      close() {
        var self = this;
        self.pro_id = '';
        self.city_id = '';
        self.community_id = '';
        self.areas_id = '';
        self.cityList = [];
        self.communityList = [];
        self.areaList = [];
      },
      // 获取房屋地址
      getAddress() {
        var self = this;
        API.gainAddress(1, 100).then(res => {
          self.addressList = res.data;
        })
      },
      getPro() {
        var self = this;
        API.areas(1, 4000, 0).then((res) => {
          self.proList = res.data;
        });
      },
      getCity(val) {
        var self = this;
        API.areas(1, 4000, val).then((res) => {
          self.cityList = res.data;
        });
      },
      getCommunity(val) {
        var self = this;
        API.areas(1, 100, val).then((res) => {
          self.communityList = res.data;
        });
      },
      proChange(val) {
        var self = this;
        self.getCity(val);
      },
      getAreas(val) {
        var self = this;
        API.areas(1, 4000, val).then((res) => {
          self.areaList = res.data;
        });
      },
      cityChange(val) {
        var self = this;
        self.getCommunity(val);
      },
      areasChange(val) {
        var self = this;
        self.getAreas(val);
      },
      communityChange(val) {
        var self = this;
        self.listForm.area_id = val;
      },
      handleCurrentChange(val) {
        var self = this;
        if (self.listForm.area_id) {
          if (val.address && val.area_id && val.groups.length != 0 && val.stations) {
            self.$message.success("选择成功! ");
            self.listForm.address = val.address;
            self.listForm.address_id = val.groups[0].address_id;
            self.listForm.group = val.groups[0].group_name;
            self.listForm.police = val.stations;
            self.isAdd = true;
          } else {
            self.$message.warning("该地址存在空数据, 无法添加");
            self.isAdd = false;
          }
        } else {
          self.$message.warning("请先选择社区");
        }
      },
      // 新增房屋地址
      newHouses() {
        var self = this;
        if (self.isAdd) {
          API.createAddress(self.listForm).then(res => {
            self.$message.success("添加成功! ");
            self.dialogHouses = false;
            self.reload();
          })
        } else {
          self.$message.warning("该地址存在空数据, 无法添加");
        }
      },

      // 修改出租屋
      handleRental(index, row) {
        var self = this;
        self.dialogRental = true;
        console.log(row);
        self.listForm = {
            area_id: row.area_id,
            address: row.address,
            address_id: row.address_id,
            group: row.group,
            police: row.police,
            id: row.id
          },
          self.isDisabled = true;
      },

      verifyID() {
        var self = this;
        API.createAddress(self.listForm).then(res => {
          self.$message.success("修改成功! ");
          self.dialogRental = false;
          self.getnewHouses(self.current, self.size);
        })
      },

      // 楼栋管理
      handleBuild(index, row) {
        var self = this;
        self.dialogBuild = true;
        self.buildForm.address_id = row.id;
        self.address_id = row.id;
        self.buildingCurrent = 1;
        self.getBuilding(self.buildingCurrent, self.buildingSize);
      },

      // 获取楼栋信息
      getBuilding(cur, list) {
        var self = this;
        API.gainRooms(cur, list, self.address_id).then((res) => {
          self.$message.success("获取数据成功");
          self.buildingList = res.data;
          self.buildingTotal = res.total;
        });
      },
      // 楼栋管理分页
      buildingCurrentChange(val) {
        var self = this;
        self.buildingCurrent = val;
        self.getBuilding(val, self.buildingSize);
      },
      buildingSizeChange(val) {
        var self = this;
        self.buildingSize = val;
        self.getBuilding(1, val);
        self.buildingCurrent = 1;
      },

      // 访客
      funVisitor(cur, list) {
        var self = this;
        API.visitors(cur, list, self.address_id, self.room_id).then((res) => {
          self.$message.success("获取数据成功");
          self.visitorList = res.data;
          self.visitorTotal = res.total;
        });
      },
      handleVistor(index, row) {
        var self = this;
        self.dialogVisitor = true;
        self.address_id = row.address_id;
        self.room_id = row.id;
        self.visitorCurrent = 1;
        self.funVisitor(self.visitorCurrent, self.visitorSize);
      },
      // 访客分页
      visitorCurrentChange(val) {
        var self = this;
        self.visitorCurrent = val;
        self.funVisitor(val, self.visitorSize);
      },
      visitorSizeChange(val) {
        var self = this;
        self.visitorSize = val;
        self.funVisitor(1, val);
        self.visitorCurrent = 1;
      },

      // 查看房间成员
      handleMember(index, row) {
        var self = this;
        API.roomMenber(self.address_id, row.id).then(res => {
          self.dialogMember = true;
          self.memberData = res;
        })
      },

      // 房屋编号操作
      handleAddBuild(index, row) {
        var self = this;
        self.isAdd = true;
        self.dialogAddBuild = true;
        self.buildForm = {
          address_id: self.address_id,
          rooms: [{
            room: '',
            uuid: ''
          }],
        };
      },
      addRooms() {
        var self = this;
        self.buildForm.rooms.push({
          room: '',
          uuid: ''
        });
      },
      delRooms() {
        var self = this;
        self.buildForm.rooms.pop('');
      },
      newRooms() {
        var self = this;
        console.log(self.buildForm.rooms);
        API.rooms(self.buildForm).then(res => {
          console.log('添加成功');
          self.dialogAddBuild = false;
          self.buildForm.rooms = [];
          self.rooms = "";
          self.getBuilding(self.buildingCurrent, self.buildingSize);
        })
      },

      handleBuildEdit(index, row) {
        var self = this;
        console.log(row);
        self.isAdd = false;
        self.dialogAddBuild = true;
        self.buildForm.address_id = self.address_id;
        self.buildForm.rooms = [{
          room: row.door_number,
          uuid: row.uuid
        }]
        console.log(self.buildForm.rooms);
      },

      // 查看住户
      fucAllUser(cur, list) {
        var self = this;
        API.addressResidents(cur, list, self.address_id).then((res) => {
          self.residentData = res.data;
          self.residentTotal = res.total;
        });
      },
      fucOwner(cur, list, type) {
        var self = this;
        API.addressResidents(cur, list, self.address_id, type).then((res) => {
          self.houseOwnerList = res.data;
          self.houseOwnerTotal = res.total;
        });
      },
      fucRenter(cur, list, type) {
        var self = this;
        API.addressResidents(cur, list, self.address_id, type).then((res) => {
          self.renterList = res.data;
          self.renterTotal = res.total;
        });
      },
      fucManage(cur, list, type) {
        var self = this;
        API.addressResidents(cur, list, self.address_id, type).then((res) => {
          self.managementList = res.data;
          self.managementTotal = res.total;
        });

      },
      fucFamily(cur, list, type) {
        var self = this;
        API.addressResidents(cur, list, self.address_id, type).then((res) => {
          self.familyList = res.data;
          self.familyTotal = res.total;
        });
      },
      handleResident(index, row) {
        var self = this;
        self.dialogResident = true;
        self.address_id = row.id;
        self.user = "全部";
        self.rensidentCurrent = 1;
        self.name = '';
        self.fucAllUser(self.rensidentCurrent, self.residentSize);
      },
      handleUser(value) {
        var self = this;
        self.name = '';
        switch (value) {
          case 0:
            self.$nextTick(() => {
              self.rensidentCurrent = 1;
              self.residentSize = 10;
              self.user = "全部";
              self.fucAllUser(self.rensidentCurrent, self.residentSize);
            });
            break;
          case 1:
            self.$nextTick(() => {
              self.houseOwnerCurrent = 1;
              self.houseOwnerSize = 10;
              self.user = "户主";
              self.fucOwner(self.houseOwnerCurrent, self.houseOwnerSize, 1);
            });
            break;
          case 2:
            self.$nextTick(() => {
              self.renterCurrent = 1;
              self.renterSize = 10;
              self.user = "租客";
              self.fucRenter(self.renterCurrent, self.renterSize, 2);
            });
            break;
          case 3:
            self.$nextTick(() => {
              self.managementCurrent = 1;
              self.managementSize = 10;
              self.user = "物业";
              self.fucManage(self.managementCurrent, self.managementSize, 4);
            });
            break;
          case 4:
            self.$nextTick(() => {
              self.familyCurrent = 1;
              self.familySize = 10;
              self.user = "家庭成员";
              self.fucFamily(self.familyCurrent, self.familySize, 3);
            });
            break;
        }
      },
      // 全部住户分页
      residentCurrentChange(val) {
        var self = this;
        self.rensidentCurrent = val;
        self.fucAllUser(val, self.residentSize);
      },
      residentSizeChange(val) {
        var self = this;
        self.residentSize = val;
        self.fucAllUser(1, val);
        self.rensidentCurrent = 1;
      },
      // 户主分页
      houseOwnerCurrentChange(val) {
        var self = this;
        self.houseOwnerCurrent = val;
        self.fucOwner(val, self.houseOwnerSize, 1);
      },
      houseOwnerSizeChange(val) {
        var self = this;
        self.houseOwnerSize = val;
        self.fucOwner(1, val, 1);
        self.houseOwnerCurrent = 1;
      },
      // 租客分页
      renterCurrentChange(val) {
        var self = this;
        self.renterCurrent = val;
        self.fucRenter(val, self.renterSize, 2);
      },
      renterSizeChange(val) {
        var self = this;
        self.renterSize = val;
        self.fucRenter(1, val, 2);
        self.renterCurrent = 1;
      },
      // 物业分页
      managementCurrntChange(val) {
        var self = this;
        self.managementCurrent = val;
        self.fucManage(val, self.managementSize, 4);
      },
      managementSizeChange(val) {
        var self = this;
        self.managementSize = val;
        self.fucManage(1, val, 4);
        self.managementCurrent = 1;
      },
      // 家庭成员分头
      familyCurrentChange(val) {
        var self = this;
        self.familyCurrent = val;
        self.fucFamily(val, self.familySize, 3);
      },
      familySizeChange(val) {
        var self = this;
        self.familySize = val;
        self.fucFamily(1, val, 3);
        self.familyCurrent = 1;
      },

      // 进出记录
      handleLogs(index, row) {
        var self = this;
        self.dialogLogs = true;
        self.face_id = row.face_id;
        self.logsCurrent = 1;
        self.getFaceLogs(self.logsCurrent, self.logsSize);
      },
      getFaceLogs(cur, list) {
        var self = this;
        API.faceLogs(cur, list, self.face_id).then(
          (res) => {
            self.logsData = res.data;
            self.logsTotal = res.total;
          }
        );
      },
      // 进出记录分页
      logsCurrentChange(val) {
        var self = this;
        self.logsCurrent = val;
        self.getFaceLogs(val, self.logsSize);
      },
      logsSizeChange(val) {
        var self = this;
        self.logsSize = val;
        self.getFaceLogs(1, val);
        self.logsCurrent = 1;
      },

      // 全库推送人脸
      handleFace(index, row) {
        var self = this;
        self.dialogFace = true;
        self.address_id = row.id;
      },
      pushFace() {
        var self = this;
        const loading = this.$loading({
          lock: true,
          text: "推送中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        API.pushAddressFace(self.address_id)
          .then((res) => {
            loading.close();
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
        self.dialogDel = true;
      },
      fucDel(value) {
        var self = this;
        API.delHousehold(self.id, value).then((res) => {
          switch (self.user) {
            case "全部":
              self.$message.success("删除成功");
              self.dialogDel = false;
              self.fucAllUser(self.rensidentCurrent, self.residentSize);
              break;
            case "户主":
              self.$message.success("删除成功");
              self.dialogDel = false;
              self.fucOwner(self.houseOwnerCurrent, self.houseOwnerSize, 1);
              break;
            case "租客":
              self.$message.success("删除成功");
              self.dialogDel = false;
              self.fucRenter(self.renterCurrent, self.renterSize, 2);
              break;
            case "物业":
              self.$message.success("删除成功");
              self.dialogDel = false;
              self.fucManage(self.managementCurrent, self.managementSize, 4);
              break;
            case "家庭成员":
              self.$message.success("删除成功");
              self.dialogDel = false;
              self.fucFamily(self.familyCurrent, self.familySize, 3);
              break;
          }
        });
      },
      toDel() {
        var self = this;
        if (self.familyType == 3) {
          self.fucDel(self.card_number);
        } else {
          self.fucDel(1);
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
          self.getBuilding(self.buildingCurrent, self.buildingSize);
        });
      },

      handleLoseFace(index, row) {
        var self = this;
        self.address_id = row.id;
        if (row.state) {
          self.dialogLose = true;
        } else {
          self.$message.warning("无法操作");
        }
      },

      toLose() {
        var self = this;
        API.passLose(self.address_id).then(res => {
          self.$message.success("成功");
          self.dialogLose = false;
          self.getnewHouses(self.current, self.size);
        })
      },
    },
  };
</script>

<style scoped>
  .ipt {
    width: 220px;
  }

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
    /* float: right; */
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