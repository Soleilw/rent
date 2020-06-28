<template>
	<div v-loading="loading">
		<div class="btn">
			<el-button type="primary" @click="addHouses">添加房屋</el-button>
		</div>
		<div class="btn">
			<el-input v-model="house_id" placeholder="输入房屋地址" class="search" @keyup.enter.native="search(house_id)"></el-input>
		</div>
		<div class="btn">
			<el-button type="primary" @click="search(house_id)">搜索</el-button>
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
							<el-radio :label='1'>是</el-radio>
							<el-radio :label='2'>否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="小区地址：" prop="zuobiao">
						<el-input v-model="form.zuobiao" placeholder="当前坐标" style="width:300px;" id="poi_cur" ref="poi_cur"></el-input>
						<el-input v-model="form.haddress" placeholder="当前地址" style="width:300px; margin-left: 10px;" id="addr_cur"></el-input>
						<el-input placeholder="请输入关键词搜索" v-model="title" @keyup.enter.native="btnSearch.click(title)" style="width:300px;margin-left: 10px;"></el-input>
						<el-button type="primary" id="btn_search" size="medium" style="margin-left: 10px;">搜索</el-button>
						<div style="position:relative;">
							<div id="tooles">
								<div id="cur_city">
									<strong>中山市</strong><span class="change_city">[<span style="text-decoration:underline;">更换城市</span>]</span><span
									 class="change_city"><span id="level">当前缩放等级：10</span></span>
									<div id="city" class="hide">
										<span class="close">X</span>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">直辖市</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">北京</el-tag>
												<el-tag class="city_name">上海</el-tag>
												<el-tag class="city_name">天津</el-tag>
												<el-tag class="city_name">重庆</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">广东</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">广州</el-tag>
												<el-tag class="city_name">深圳</el-tag>
												<el-tag class="city_name">珠海</el-tag>
												<el-tag class="city_name">中山</el-tag>
												<el-tag class="city_name">汕头</el-tag>
												<el-tag class="city_name">韶关</el-tag>
												<el-tag class="city_name">佛山</el-tag>
												<el-tag class="city_name">江门</el-tag>
												<el-tag class="city_name">湛江</el-tag>
												<el-tag class="city_name">茂名</el-tag>
												<el-tag class="city_name">东沙群岛</el-tag>
												<el-tag class="city_name">肇庆</el-tag>
												<el-tag class="city_name">惠州</el-tag>
												<el-tag class="city_name">梅州</el-tag>
												<el-tag class="city_name">汕尾</el-tag>
												<el-tag class="city_name">河源</el-tag>
												<el-tag class="city_name">阳江</el-tag>
												<el-tag class="city_name">清远</el-tag>
												<el-tag class="city_name">东莞</el-tag>
												<el-tag class="city_name">潮州</el-tag>
												<el-tag class="city_name">揭阳</el-tag>
												<el-tag class="city_name">云浮</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">内蒙古</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">呼和浩特</el-tag>
												<el-tag class="city_name">包头</el-tag>
												<el-tag class="city_name">乌海</el-tag>
												<el-tag class="city_name">赤峰</el-tag>
												<el-tag class="city_name">通辽</el-tag>
												<el-tag class="city_name">鄂尔多斯</el-tag>
												<el-tag class="city_name">呼伦贝尔</el-tag>
												<el-tag class="city_name">巴彦淖尔</el-tag>
												<el-tag class="city_name">乌兰察布</el-tag>
												<el-tag class="city_name">兴安盟</el-tag>
												<el-tag class="city_name">锡林郭勒盟</el-tag>
												<el-tag class="city_name">阿拉善盟</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">山西</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">太原</el-tag>
												<el-tag class="city_name">大同</el-tag>
												<el-tag class="city_name">阳泉</el-tag>
												<el-tag class="city_name">长治</el-tag>
												<el-tag class="city_name">晋城</el-tag>
												<el-tag class="city_name">朔州</el-tag>
												<el-tag class="city_name">晋中</el-tag>
												<el-tag class="city_name">运城</el-tag>
												<el-tag class="city_name">忻州</el-tag>
												<el-tag class="city_name">临汾</el-tag>
												<el-tag class="city_name">吕梁</el-tag>

											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">陕西</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">西安</el-tag>
												<el-tag class="city_name">铜川</el-tag>
												<el-tag class="city_name">宝鸡</el-tag>
												<el-tag class="city_name">咸阳</el-tag>
												<el-tag class="city_name">渭南</el-tag>
												<el-tag class="city_name">延安</el-tag>
												<el-tag class="city_name">汉中</el-tag>
												<el-tag class="city_name">榆林</el-tag>
												<el-tag class="city_name">安康</el-tag>
												<el-tag class="city_name">商洛</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">河北</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">石家庄</el-tag>
												<el-tag class="city_name">唐山</el-tag>
												<el-tag class="city_name">秦皇岛</el-tag>
												<el-tag class="city_name">邯郸</el-tag>
												<el-tag class="city_name">邢台</el-tag>
												<el-tag class="city_name">保定</el-tag>
												<el-tag class="city_name">张家口</el-tag>
												<el-tag class="city_name">承德</el-tag>
												<el-tag class="city_name">沧州</el-tag>
												<el-tag class="city_name">廊坊</el-tag>
												<el-tag class="city_name">衡水</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">辽宁</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">沈阳</el-tag>
												<el-tag class="city_name">大连</el-tag>
												<el-tag class="city_name">鞍山</el-tag>
												<el-tag class="city_name">抚顺</el-tag>
												<el-tag class="city_name">本溪</el-tag>
												<el-tag class="city_name">丹东</el-tag>
												<el-tag class="city_name">锦州</el-tag>
												<el-tag class="city_name">营口</el-tag>
												<el-tag class="city_name">阜新</el-tag>
												<el-tag class="city_name">辽阳</el-tag>
												<el-tag class="city_name">盘锦</el-tag>
												<el-tag class="city_name">铁岭</el-tag>
												<el-tag class="city_name">朝阳</el-tag>
												<el-tag class="city_name">葫芦岛</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">吉林</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">长春</el-tag>
												<el-tag class="city_name">吉林市</el-tag>
												<el-tag class="city_name">四平</el-tag>
												<el-tag class="city_name">辽源</el-tag>
												<el-tag class="city_name">通化</el-tag>
												<el-tag class="city_name">白山</el-tag>
												<el-tag class="city_name">松原</el-tag>
												<el-tag class="city_name">白城</el-tag>
												<el-tag class="city_name">延边</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">黑龙江</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">哈尔滨</el-tag>
												<el-tag class="city_name">齐齐哈尔</el-tag>
												<el-tag class="city_name">鸡西</el-tag>
												<el-tag class="city_name">鹤岗</el-tag>
												<el-tag class="city_name">双鸭山</el-tag>
												<el-tag class="city_name">大庆</el-tag>
												<el-tag class="city_name">伊春</el-tag>
												<el-tag class="city_name">牡丹江</el-tag>
												<el-tag class="city_name">佳木斯</el-tag>
												<el-tag class="city_name">七台河</el-tag>
												<el-tag class="city_name">黑河</el-tag>
												<el-tag class="city_name">绥化</el-tag>
												<el-tag class="city_name">大兴安岭</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">江苏</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">南京</el-tag>
												<el-tag class="city_name">无锡</el-tag>
												<el-tag class="city_name">徐州</el-tag>
												<el-tag class="city_name">常州</el-tag>
												<el-tag class="city_name">苏州</el-tag>
												<el-tag class="city_name">南通</el-tag>
												<el-tag class="city_name">连云港</el-tag>
												<el-tag class="city_name">淮安</el-tag>
												<el-tag class="city_name">盐城</el-tag>
												<el-tag class="city_name">扬州</el-tag>
												<el-tag class="city_name">镇江</el-tag>
												<el-tag class="city_name">泰州</el-tag>
												<el-tag class="city_name">宿迁</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">安徽</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">合肥</el-tag>
												<el-tag class="city_name">蚌埠</el-tag>
												<el-tag class="city_name">芜湖</el-tag>
												<el-tag class="city_name">淮南</el-tag>
												<el-tag class="city_name">马鞍山</el-tag>
												<el-tag class="city_name">淮北</el-tag>
												<el-tag class="city_name">铜陵</el-tag>
												<el-tag class="city_name">安庆</el-tag>
												<el-tag class="city_name">黄山</el-tag>
												<el-tag class="city_name">阜阳</el-tag>
												<el-tag class="city_name">宿州</el-tag>
												<el-tag class="city_name">滁州</el-tag>
												<el-tag class="city_name">六安</el-tag>
												<el-tag class="city_name">宣城</el-tag>
												<el-tag class="city_name">池州</el-tag>
												<el-tag class="city_name">亳州</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">山东</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">济南</el-tag>
												<el-tag class="city_name">青岛</el-tag>
												<el-tag class="city_name">淄博</el-tag>
												<el-tag class="city_name">枣庄</el-tag>
												<el-tag class="city_name">东营</el-tag>
												<el-tag class="city_name">潍坊</el-tag>
												<el-tag class="city_name">烟台</el-tag>
												<el-tag class="city_name">威海</el-tag>
												<el-tag class="city_name">济宁</el-tag>
												<el-tag class="city_name">泰安</el-tag>
												<el-tag class="city_name">日照</el-tag>
												<el-tag class="city_name">莱芜</el-tag>
												<el-tag class="city_name">临沂</el-tag>
												<el-tag class="city_name">德州</el-tag>
												<el-tag class="city_name">聊城</el-tag>
												<el-tag class="city_name">滨州</el-tag>
												<el-tag class="city_name">菏泽</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">浙江</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">杭州</el-tag>
												<el-tag class="city_name">宁波</el-tag>
												<el-tag class="city_name">温州</el-tag>
												<el-tag class="city_name">嘉兴</el-tag>
												<el-tag class="city_name">绍兴</el-tag>
												<el-tag class="city_name">金华</el-tag>
												<el-tag class="city_name">衢州</el-tag>
												<el-tag class="city_name">舟山</el-tag>
												<el-tag class="city_name">台州</el-tag>
												<el-tag class="city_name">丽水</el-tag>
												<el-tag class="city_name">湖州</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">江西</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">南昌</el-tag>
												<el-tag class="city_name">景德镇</el-tag>
												<el-tag class="city_name">萍乡</el-tag>
												<el-tag class="city_name">九江</el-tag>
												<el-tag class="city_name">新余</el-tag>
												<el-tag class="city_name">鹰潭</el-tag>
												<el-tag class="city_name">赣州</el-tag>
												<el-tag class="city_name">吉安</el-tag>
												<el-tag class="city_name">宜春</el-tag>
												<el-tag class="city_name">抚州</el-tag>
												<el-tag class="city_name">上饶</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">福建</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">福州</el-tag>
												<el-tag class="city_name">厦门</el-tag>
												<el-tag class="city_name">莆田</el-tag>
												<el-tag class="city_name">三明</el-tag>
												<el-tag class="city_name">泉州</el-tag>
												<el-tag class="city_name">漳州</el-tag>
												<el-tag class="city_name">南平</el-tag>
												<el-tag class="city_name">龙岩</el-tag>
												<el-tag class="city_name">宁德</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">湖南</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">长沙</el-tag>
												<el-tag class="city_name">株洲</el-tag>
												<el-tag class="city_name">湘潭</el-tag>
												<el-tag class="city_name">衡阳</el-tag>
												<el-tag class="city_name">邵阳</el-tag>
												<el-tag class="city_name">岳阳</el-tag>
												<el-tag class="city_name">常德</el-tag>
												<el-tag class="city_name">张家界</el-tag>
												<el-tag class="city_name">益阳</el-tag>
												<el-tag class="city_name">郴州</el-tag>
												<el-tag class="city_name">永州</el-tag>
												<el-tag class="city_name">怀化</el-tag>
												<el-tag class="city_name">娄底</el-tag>
												<el-tag class="city_name">湘西</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">湖北</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">武汉</el-tag>
												<el-tag class="city_name">黄石</el-tag>
												<el-tag class="city_name">襄樊</el-tag>
												<el-tag class="city_name">十堰</el-tag>
												<el-tag class="city_name">宜昌</el-tag>
												<el-tag class="city_name">荆门</el-tag>
												<el-tag class="city_name">鄂州</el-tag>
												<el-tag class="city_name">孝感</el-tag>
												<el-tag class="city_name">荆州</el-tag>
												<el-tag class="city_name">黄冈</el-tag>
												<el-tag class="city_name">咸宁</el-tag>
												<el-tag class="city_name">随州</el-tag>
												<el-tag class="city_name">恩施</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">河南</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">郑州</el-tag>
												<el-tag class="city_name">开封</el-tag>
												<el-tag class="city_name">洛阳</el-tag>
												<el-tag class="city_name">平顶山</el-tag>
												<el-tag class="city_name">焦作</el-tag>
												<el-tag class="city_name">鹤壁</el-tag>
												<el-tag class="city_name">新乡</el-tag>
												<el-tag class="city_name">安阳</el-tag>
												<el-tag class="city_name">濮阳</el-tag>
												<el-tag class="city_name">许昌</el-tag>
												<el-tag class="city_name">漯河</el-tag>
												<el-tag class="city_name">三门峡</el-tag>
												<el-tag class="city_name">南阳</el-tag>
												<el-tag class="city_name">商丘</el-tag>
												<el-tag class="city_name">信阳</el-tag>
												<el-tag class="city_name">周口</el-tag>
												<el-tag class="city_name">驻马店</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">海南</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">海口</el-tag>
												<el-tag class="city_name">三亚</el-tag>
												<el-tag class="city_name">三沙</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">广西</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">南宁</el-tag>
												<el-tag class="city_name">柳州</el-tag>
												<el-tag class="city_name">桂林</el-tag>
												<el-tag class="city_name">梧州</el-tag>
												<el-tag class="city_name">北海</el-tag>
												<el-tag class="city_name">防城港</el-tag>
												<el-tag class="city_name">钦州</el-tag>
												<el-tag class="city_name">贵港</el-tag>
												<el-tag class="city_name">玉林</el-tag>
												<el-tag class="city_name">百色</el-tag>
												<el-tag class="city_name">贺州</el-tag>
												<el-tag class="city_name">河池</el-tag>
												<el-tag class="city_name">来宾</el-tag>
												<el-tag class="city_name">崇左</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">贵州</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">贵阳</el-tag>
												<el-tag class="city_name">遵义</el-tag>
												<el-tag class="city_name">安顺</el-tag>
												<el-tag class="city_name">铜仁</el-tag>
												<el-tag class="city_name">毕节</el-tag>
												<el-tag class="city_name">六盘水</el-tag>
												<el-tag class="city_name">黔西南</el-tag>
												<el-tag class="city_name">黔东南</el-tag>
												<el-tag class="city_name">黔南</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">四川</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">成都</el-tag>
												<el-tag class="city_name">自贡</el-tag>
												<el-tag class="city_name">攀枝花</el-tag>
												<el-tag class="city_name">泸州</el-tag>
												<el-tag class="city_name">德阳</el-tag>
												<el-tag class="city_name">绵阳</el-tag>
												<el-tag class="city_name">广元</el-tag>
												<el-tag class="city_name">遂宁</el-tag>
												<el-tag class="city_name">内江</el-tag>
												<el-tag class="city_name">乐山</el-tag>
												<el-tag class="city_name">南充</el-tag>
												<el-tag class="city_name">宜宾</el-tag>
												<el-tag class="city_name">广安</el-tag>
												<el-tag class="city_name">达州</el-tag>
												<el-tag class="city_name">眉山</el-tag>
												<el-tag class="city_name">雅安</el-tag>
												<el-tag class="city_name">巴中</el-tag>
												<el-tag class="city_name">资阳</el-tag>
												<el-tag class="city_name">阿坝</el-tag>
												<el-tag class="city_name">甘孜</el-tag>
												<el-tag class="city_name">凉山</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">云南</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">昆明</el-tag>
												<el-tag class="city_name">保山</el-tag>
												<el-tag class="city_name">昭通</el-tag>
												<el-tag class="city_name">丽江</el-tag>
												<el-tag class="city_name">普洱</el-tag>
												<el-tag class="city_name">临沧</el-tag>
												<el-tag class="city_name">曲靖</el-tag>
												<el-tag class="city_name">玉溪</el-tag>
												<el-tag class="city_name">文山</el-tag>
												<el-tag class="city_name">西双版纳</el-tag>
												<el-tag class="city_name">楚雄</el-tag>
												<el-tag class="city_name">红河</el-tag>
												<el-tag class="city_name">德宏</el-tag>
												<el-tag class="city_name">大理</el-tag>
												<el-tag class="city_name">怒江</el-tag>
												<el-tag class="city_name">迪庆</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">甘肃</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">兰州</el-tag>
												<el-tag class="city_name">嘉峪关</el-tag>
												<el-tag class="city_name">金昌</el-tag>
												<el-tag class="city_name">白银</el-tag>
												<el-tag class="city_name">天水</el-tag>
												<el-tag class="city_name">酒泉</el-tag>
												<el-tag class="city_name">张掖</el-tag>
												<el-tag class="city_name">武威</el-tag>
												<el-tag class="city_name">定西</el-tag>
												<el-tag class="city_name">陇南</el-tag>
												<el-tag class="city_name">平凉</el-tag>
												<el-tag class="city_name">庆阳</el-tag>
												<el-tag class="city_name">临夏</el-tag>
												<el-tag class="city_name">甘南</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">宁夏</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">银川</el-tag>
												<el-tag class="city_name">石嘴山</el-tag>
												<el-tag class="city_name">吴忠</el-tag>
												<el-tag class="city_name">固原</el-tag>
												<el-tag class="city_name">中卫</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">青海</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">西宁</el-tag>
												<el-tag class="city_name">玉树</el-tag>
												<el-tag class="city_name">果洛</el-tag>
												<el-tag class="city_name">海东</el-tag>
												<el-tag class="city_name">海西</el-tag>
												<el-tag class="city_name">黄南</el-tag>
												<el-tag class="city_name">海北</el-tag>
												<el-tag class="city_name">海南</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">西藏</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">拉萨</el-tag>
												<el-tag class="city_name">那曲</el-tag>
												<el-tag class="city_name">昌都</el-tag>
												<el-tag class="city_name">山南</el-tag>
												<el-tag class="city_name">日喀则</el-tag>
												<el-tag class="city_name">阿里</el-tag>
												<el-tag class="city_name">林芝</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
										<div class="city_container">
											<div class="city_container_left"><span class="style_color">新疆</span></div>
											<div class="city_container_right">
												<el-tag class="city_name">乌鲁木齐</el-tag>
												<el-tag class="city_name">克拉玛依</el-tag>
												<el-tag class="city_name">吐鲁番</el-tag>
												<el-tag class="city_name">哈密</el-tag>
												<el-tag class="city_name">博尔塔拉</el-tag>
												<el-tag class="city_name">巴音郭楞</el-tag>
												<el-tag class="city_name">克孜勒苏</el-tag>
												<el-tag class="city_name">和田</el-tag>
												<el-tag class="city_name">阿克苏</el-tag>
												<el-tag class="city_name">喀什</el-tag>
												<el-tag class="city_name">塔城</el-tag>
												<el-tag class="city_name">伊犁</el-tag>
												<el-tag class="city_name">昌吉</el-tag>
												<el-tag class="city_name">阿勒泰</el-tag>
											</div>
										</div>
										<div style="clear:both"></div>
									</div>
								</div>
							</div>

							<div id="bside_left">
								<div id="txt_pannel">
									<!--  <h4>功能简介：</h4>
					<p>1、支持地址 精确/模糊 查询；</p>
					<p>2、支持POI点坐标显示；</p>
					<p>3、坐标鼠标跟随显示；</p>
					<div>使用说明：</div>
					<span>在搜索框搜索关键词后，地图上会显示相应poi点，同时左侧显示对应该点的信息，点击某点或某信息，右上角会显示相应该点的坐标和地址。</span> -->
								</div>

							</div>
							<div id="bside_rgiht">
								<div id="containers"></div>
							</div>
						</div>
					</el-form-item>
					<div class="submit">
						<el-form-item>
							<el-button type="primary" @click="newHouses">提交</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>

		<!-- 表格数据 -->
		<el-table :data="tableData">
			<el-table-column prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="address" label="房屋地址" align="center"></el-table-column>
			<el-table-column prop="id" label="访客功能状态" align="center"></el-table-column>
			<el-table-column prop="id" label="负责人姓名" align="center"></el-table-column>
			<el-table-column label="操作" align="center" width="400px">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleBuild(scope.$index, scope.row)">楼栋管理</el-button>
					<el-button type="primary" size="mini" @click="handleResident(scope.$index, scope.row)">查看住户</el-button>
					<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="查看住户" :visible.sync="dialogResident" width="80%">
			<div class="box">
				<el-table :data="residentData">
					<el-table-column prop="id" label="用户ID" align="center"></el-table-column>
					<el-table-column prop="room_id" label="房屋编号" align="center"></el-table-column>
					<el-table-column prop="snapshot.name" label="真实姓名" align="center"></el-table-column>
					<el-table-column prop="typeString" label="用户身份" align="center"></el-table-column>
					<el-table-column prop="snapshot.card_number" label="身份证号" align="center"></el-table-column>
					<el-table-column prop="snapshot.phone" label="手机号" align="center"></el-table-column>
					<el-table-column prop="snapshot.href" label="人脸照片" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.href" alt="" style="min-width: 80px; min-height: 80px;">
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block">
				<el-pagination @current-change="handleCurrentResident" :current-page.sync="currentResidentPage" :page-sizes="[10, 20, 30, 40, 50]"
				 :page-size="pageSizeResident" layout="sizes, prev, pager, next, jumper" :total="totalResidentPage" @size-change="handleSizeResident">
				</el-pagination>
			</div>
		</el-dialog>

		<el-dialog title="楼栋管理" :visible.sync="dialogBuild">
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

		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40, 50]"
			 :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="totalPage" @size-change="handleSizeChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import API from '@/api/index.js'
	import $ from 'jquery'

	export default {
		data() {
			return {
				loading: false,
				dialogHouses: false,
				form: {
					name: '',
					sex: '',
					postion: ''
				},
				action: '', // 坐标选择
				center: '',
				map: null,
				title: '', // 地址搜索字段

				tableData: [], // 表格数据

				currentPage: 1, // 分页
				pageSize: 10,
				totalPage: 0,

				dialogResident: false, // 查看住户
				residentData: [],
				currentResidentPage: 1,
				pageSizeResident: 10,
				totalResidentPage: 0,
				dialogBuild: false, // 房屋编号
				// rooms: '',
				// addrooms: [],
				buildForm: {
					address_id: '',
					rooms: []
				},
				id: '',
				house_id: '' // 搜索
			}
		},
		mounted() {
			this.getnewHouses();
			// this.initMap();
		},
		methods: {
			// 获取房屋列表
			getnewHouses() {
				var self = this;
				API.addresses(self.currentPage, self.pageSize).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 搜索
			search() {
				var self = this;
				// if (self.house_id) {
				API.addresses(self.currentPage, self.pageSize, 0, self.house_id).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
					self.house_id = '';
					self.$message.success('搜索成功！');
				})
				// } else {
				// 	self.$message.warning('请输入ID');
				// }
			},


			addHouses() {
				var self = this;
				self.dialogHouses = true;
				setTimeout(function() {
					self.setMap();
				}, 500)
			},

			newHouses() {
				var self = this;
			},



			// 楼栋管理
			handleBuild(index, row) {
				var self = this;
				self.dialogBuild = true;
				self.buildForm.address_id = row.id;
				// self.buildForm.rooms.push({});
			},

			// 房屋编号操作
			addRooms() {
				var self = this;
				self.buildForm.rooms.push('');
			},
			delRooms() {
				var self = this;
				self.buildForm.rooms.pop('');
			},

			newRooms() {
				var self = this;
				// self.buildForm.rooms.push(self.rooms);
				API.rooms(self.buildForm).then(res => {
					self.$message.success('提交成功');
					self.dialogBuild = false;
					self.buildForm.rooms = [];
					self.rooms = '';
				})
			},

			// 查看住户
			handleResident(index, row) {
				var self = this;
				self.dialogResident = true;
				API.households(1, 10, 0, row.id).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})
			},

			// 编辑
			handleEdit() {

			},

			// 删除
			handleDel() {

			},

			// 分页
			handleCurrentChange(val) {
				var self = this;
				self.currentPage = val;
				API.addresses(val, self.pageSize).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 每页几条
			handleSizeChange(val) {
				var self = this;
				self.pageSize = val;
				API.addresses(self.currentPage, val).then(res => {
					self.tableData = res.data;
					self.totalPage = res.total;
				})
			},

			// 进出记录
			handleCurrentResident(val) {
				var self = this;
				self.currentResidentPage = val;
				API.households(val, self.pageSizeResident).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})
			},

			handleSizeResident(val) {
				var self = this;
				self.pageSizeResident = val;
				API.households(self.currentResidentPage, val).then(res => {
					self.residentData = res.data;
					self.totalResidentPage = res.total;
				})

			},

			// 初始化地图
			setMap() {
				var that = this
				var container = document.getElementById("containers");
				var map = new qq.maps.Map(container, {
						zoom: 16
					}),
					label = new qq.maps.Label({
						map: map,
						offset: new qq.maps.Size(15, -12),
						draggable: false,
						clickable: false
					}),
					markerArray = [],
					curCity = document.getElementById("cur_city"),
					btnSearch = document.getElementById("btn_search"),
					bside = document.getElementById("bside_left"),
					url, query_city,
					cityservice = new qq.maps.CityService({
						complete: function(result) {
							curCity.children[0].innerHTML = result.detail.name;
							map.setCenter(result.detail.latLng);
						}
					});
				cityservice.searchLocalCity();
				map.setOptions({
					draggableCursor: "crosshair"
				});

				$(container).mouseenter(function() {
					label.setMap(map);
				});
				$(container).mouseleave(function() {
					label.setMap(null);
				});

				qq.maps.event.addListener(map, "mousemove", function(e) {
					var latlng = e.latLng;
					label.setPosition(latlng);
					label.setContent(latlng.getLat().toFixed(6) + "," + latlng.getLng().toFixed(6));
				});

				var url3;
				qq.maps.event.addListener(map, "click", function(e) {
					document.getElementById("poi_cur").value = e.latLng.getLat().toFixed(6) + "," + e.latLng.getLng().toFixed(6);
					that.form.zuobiao = e.latLng.getLat().toFixed(6) + "," + e.latLng.getLng().toFixed(6)
					console.log(that.form.zuobiao)

					url3 = encodeURI("https://apis.map.qq.com/ws/geocoder/v1/?location=" + e.latLng.getLat() + "," + e.latLng.getLng() +
						"&key=3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA&output=jsonp&&callback=?");
					$.getJSON(url3, function(result) {
						console.log(result)
						if (result.result != undefined) {
							that.form.haddress = result.result.address;
							document.getElementById("addr_cur").value = result.result.address;
						} else {
							that.form.haddress = '';
							document.getElementById("addr_cur").value = "";
						}
					})
				});

				qq.maps.event.addListener(map, "zoom_changed", function() {
					document.getElementById("level").innerHTML = "当前缩放等级：" + map.getZoom();
				});
				var listener_arr = [];
				var isNoValue = false;
				qq.maps.event.addDomListener(btnSearch, 'click', function() {
					var value = this.parentNode.getElementsByTagName("input")[2].value;
					var latlngBounds = new qq.maps.LatLngBounds();
					for (var i = 0, l = listener_arr.length; i < l; i++) {
						qq.maps.event.removeListener(listener_arr[i]);
					}
					listener_arr.length = 0;
					query_city = curCity.children[0].innerHTML;
					url = encodeURI("https://apis.map.qq.com/ws/place/v1/search?keyword=" + value + "&boundary=region(" + query_city +
						",0)&page_size=9&page_index=1&key=3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA&output=jsonp&&callback=?");
					$.getJSON(url, function(result) {
						console.log(result)
						if (result.count) {
							isNoValue = false;
							bside.innerHTML = "";
							each(markerArray, function(n, ele) {
								ele.setMap(null);
							});
							markerArray.length = 0;
							each(result.data, function(n, ele) {
								var latlng = new qq.maps.LatLng(ele.location.lat, ele.location.lng);
								latlngBounds.extend(latlng);
								var left = n * 27;
								var marker = new qq.maps.Marker({
									map: map,
									position: latlng,
									zIndex: 10
								});
								marker.index = n;
								marker.isClicked = false;
								setAnchor(marker, true);
								markerArray.push(marker);
								var listener1 = qq.maps.event.addDomListener(marker, "mouseover", function() {
									var n = this.index;
									setCurrent(markerArray, n, false);
									setCurrent(markerArray, n, true);
									label.setContent(this.position.getLat().toFixed(6) + "," + this.position.getLng().toFixed(6));
									label.setPosition(this.position);
									label.setOptions({
										offset: new qq.maps.Size(15, -20)
									})

								});
								listener_arr.push(listener1);
								var listener2 = qq.maps.event.addDomListener(marker, "mouseout", function() {
									var n = this.index;
									setCurrent(markerArray, n, false);
									setCurrent(markerArray, n, true);
									label.setOptions({
										offset: new qq.maps.Size(15, -12)
									})
								});
								listener_arr.push(listener2);
								var listener3 = qq.maps.event.addDomListener(marker, "click", function() {
									var n = this.index;
									setFlagClicked(markerArray, n);
									setCurrent(markerArray, n, false);
									setCurrent(markerArray, n, true);
									document.getElementById("addr_cur").value = bside.childNodes[n].childNodes[1].childNodes[1].innerHTML.substring(
										3);
									that.form.haddress = bside.childNodes[n].childNodes[1].childNodes[1].innerHTML.substring(3);
								});
								listener_arr.push(listener3);
								map.fitBounds(latlngBounds);
								var div = document.createElement("div");
								div.className = "info_list";
								var order = document.createElement("div");
								var leftn = -54 - 17 * n;
								order.style.cssText =
									"width:17px;height:17px;margin:3px 3px 0px 0px;float:left;background:url(../../../static/images/map/marker_n.png) " +
									leftn + "px 0px";
								div.appendChild(order);
								var pannel = document.createElement("div");
								pannel.style.cssText = "width:200px;float:left;";
								div.appendChild(pannel);
								var name = document.createElement("p");
								name.style.cssText = "margin:0px;color:#0000CC";
								name.innerHTML = ele.title;
								pannel.appendChild(name);
								var address = document.createElement("p");
								address.style.cssText = "margin:0px;";
								address.innerHTML = "地址：" + ele.address;
								pannel.appendChild(address);
								if (ele.tel != undefined) {
									var phone = document.createElement("p");
									phone.style.cssText = "margin:0px;";
									phone.innerHTML = "电话：" + ele.tel;
									pannel.appendChild(phone);
								}
								var position = document.createElement("p");
								position.style.cssText = "margin:0px;";
								position.innerHTML = "坐标：" + ele.location.lat.toFixed(6) + "，" + ele.location.lng.toFixed(6);
								pannel.appendChild(position);
								bside.appendChild(div);
								div.style.height = pannel.offsetHeight + "px";
								div.isClicked = false;
								div.index = n;
								marker.div = div;
								div.marker = marker;
							});
							$("#bside_left").delegate(".info_list", "mouseover", function(e) {
								var n = this.index;
								setCurrent(markerArray, n, false);
								setCurrent(markerArray, n, true);
							});
							$("#bside_left").delegate(".info_list", "mouseout", function() {
								each(markerArray, function(n, ele) {
									if (!ele.isClicked) {
										setAnchor(ele, true);
										ele.div.style.background = "#fff";
									}
								})
							});
							$("#bside_left").delegate(".info_list", "click", function(e) {
								console.log(e)
								var n = this.index;
								setFlagClicked(markerArray, n);
								setCurrent(markerArray, n, false);
								setCurrent(markerArray, n, true);
								map.setCenter(markerArray[n].position);
								document.getElementById("addr_cur").value = this.childNodes[1].childNodes[1].innerHTML.substring(3);
								that.form.haddress = this.childNodes[1].childNodes[1].innerHTML.substring(3);
							});
						} else {
							bside.innerHTML = "";
							each(markerArray, function(n, ele) {
								ele.setMap(null);
							});
							markerArray.length = 0;
							var novalue = document.createElement('div');
							novalue.id = "no_value";
							novalue.innerHTML = "对不起，没有搜索到您要找的结果!";
							bside.appendChild(novalue);
							isNoValue = true;
						}
					});
				});

				function setAnchor(marker, flag) {
					var left = marker.index * 27;
					var anchor;
					var origin;
					var size;
					var icon;
					if (flag == true) {
						anchor = new qq.maps.Point(10, 30),
							origin = new qq.maps.Point(left, 0),
							size = new qq.maps.Size(27, 33),
							icon = new qq.maps.MarkerImage("../../../static/images/map/marker10.png", size, origin, anchor);
						marker.setIcon(icon);
					} else {
						anchor = new qq.maps.Point(10, 30),
							origin = new qq.maps.Point(left, 35),
							size = new qq.maps.Size(27, 33),
							icon = new qq.maps.MarkerImage("../../../static/images/map/marker10.png", size, origin, anchor);
						marker.setIcon(icon);
					}
				}

				function setCurrent(arr, index, isMarker) {
					if (isMarker) {
						each(markerArray, function(n, ele) {
							if (n == index) {
								setAnchor(ele, false);
								ele.setZIndex(10);
							} else {
								if (!ele.isClicked) {
									setAnchor(ele, true);
									ele.setZIndex(9);
								}
							}
						});
					} else {
						each(markerArray, function(n, ele) {
							if (n == index) {
								ele.div.style.background = "#DBE4F2";
							} else {
								if (!ele.div.isClicked) {
									ele.div.style.background = "#fff";
								}
							}
						});
					}
				}

				function setFlagClicked(arr, index) {
					each(markerArray, function(n, ele) {
						if (n == index) {
							ele.isClicked = true;
							ele.div.isClicked = true;
							var str = '<div style="width:250px;">' + ele.div.children[1].innerHTML.toString() + '</div>';
							var latLng = ele.getPosition();
							document.getElementById("poi_cur").value = latLng.getLat().toFixed(6) + "," + latLng.getLng().toFixed(6);
							that.form.zuobiao = latLng.getLat().toFixed(6) + "," + latLng.getLng().toFixed(6);
							console.log(that.form.zuobiao)
						} else {
							ele.isClicked = false;
							ele.div.isClicked = false;
						}
					});
				}

				var city = document.getElementById("city");

				curCity.onclick = function(e1) {
					var e = e1 || window.event,
					    target = e1.target || e1.srcElement;
						debugger
					if (target.innerHTML == "更换城市") {
						city.style.display = "block";
						if (isNoValue) {
							bside.innerHTML = "";
							each(markerArray, function(n, ele) {
								ele.setMap(null);
							});
							markerArray.length = 0;
						}
					}
				};

				var url2;
				city.onclick = function(e1) {
					var e = e1 || window.event,
						target = e1.target || e1.srcElement;
					if (target.className.indexOf("close") == 0) {
						city.style.display = "none";
					}
					console.log(target.className.indexOf("city_name"))
					if (target.className.indexOf("city_name") == 7) {
						var str;
						if (target.innerHTML.indexOf('<!---->') > -1) {
							str = target.innerHTML.split("<")[0]
						} else {
							str = target.innerHTML
						}
						curCity.children[0].innerHTML = str;
						url2 = encodeURI("https://apis.map.qq.com/ws/geocoder/v1/?region=" + curCity.children[0].innerHTML + "&address=" +
							curCity.children[0].innerHTML + "&key=3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA&output=jsonp&&callback=?");
						$.getJSON(url2, function(result) {
							console.log(result)
							map.setCenter(new qq.maps.LatLng(result.result.location.lat, result.result.location.lng));
							map.setZoom(10);
						});
						city.style.display = "none";
					}
				};
				var url4;

				// console.log($(".search_t")[0].childNodes[1])

				$(".search_t").autocomplete({
					source: function(request, response) {
						// var value = this.parentNode.getElementsByTagName("input")[2].value;

						url4 = encodeURI("https://apis.map.qq.com/ws/place/v1/suggestion/?keyword=" + request.term + "&region=" +
							curCity.children[0].innerHTML + "&key=3WRBZ-BCNKF-55SJF-NABK3-SUJKZ-73BWA&output=jsonp&&callback=?");
						$.getJSON(url4, function(result) {

							response($.map(result.data, function(item) {
								return ({
									label: item.title
								})
							}));
						});
					}
				});

				function each(obj, fn) {
					for (var n = 0, l = obj.length; n < l; n++) {
						fn.call(obj[n], n, obj[n]);
					}
				}
			}
		}
	}
</script>

<style scoped>
	#tooles {
		height: 40px;
		background: #5688CB;
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
		border: 2px solid #D6D6D6;
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
		color: #2F82C4;
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
