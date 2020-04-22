<template>
  <div style="height:100%;">
    <el-container style="height: 100%;">
      <el-aside width="250px">
        <div class="logo-cont">
          <a>
            <img src="../../src/assets/images/logo.png" width="45px" />系统
          </a>
        </div>
        <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-openeds="openedArr" router>
          <template v-for="navMenu in menuData">
            <el-menu-item v-if="!navMenu.childs&&navMenu.entity" :key="navMenu.entity.key" :data="navMenu" :index="navMenu.entity.name">
              <i :class="navMenu.entity.icon"></i>
              <span slot="title">{{navMenu.entity.alias}}</span>
            </el-menu-item>
            <!-- 此菜单下还有子菜单 -->
            <el-submenu v-if="navMenu.childs&&navMenu.entity" :key="navMenu.entity.key" :data="navMenu" :index="navMenu.entity.name">
              <template slot="title">
                <i :class="navMenu.entity.icon"></i>
                <span>{{navMenu.entity.alias}}</span>
              </template>
              <el-menu-item v-for="navChild in navMenu.childs" :index="navChild.entity.name" :key="navChild.entity.key">{{navChild.entity.alias}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- <el-container style="min-width: 1400px;"> -->
      <el-container>
        <el-header>
          <div style="float:right;">
            <div class="myCollect">
              <el-badge :value="this.$store.state.collectNum" :max="999" class="item">
                <el-button @click="loadMyCollect" size="small">我的关注</el-button>
              </el-badge>
            </div>
            <el-avatar :size="40" :src="userInfo.userIcon"></el-avatar>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{userInfo.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item> -->
                <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" center width="30%" class="self-layer" v-if="dialogFormVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "App",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      myCollectNum: 0,
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      openedArr: [],
      activeNav: ["/main"],
      menuData: [
        {
          entity: {
            key: "1",
            name: "/main",
            icon: "el-icon-s-home",
            alias: "首页"
          }
        },
        {
          entity: {
            key: "2",
            name: "/enterpriseRecommend",
            icon: "el-icon-magic-stick",
            alias: "企业推荐"
          }
        },
        {
          entity: {
            key: 3,
            name: "enterpriseSearch",
            icon: "el-icon-search",
            alias: "企业搜索"
          },
          //二级
          childs: [
            {
              entity: {
                key: "3-1",
                name: "/directorySearch",
                //icon: "el-icon-phone-outline\r\n",
                alias: "名录搜索"
              }
            },
            {
              entity: {
                key: "3-2",
                name: "/mapSearch",
                //icon: "el-icon-picture",
                alias: "地图搜索"
              }
            }
          ]
        },
        {
          entity: {
            key: 5,
            name: "/customerManagement",
            icon: "el-icon-s-custom",
            alias: "企业管理"
          }
        },
        {
          entity: {
            key: 4,
            name: "industrialIntelligence",
            icon: "el-icon-collection",
            alias: "招商情报"
          },
          //二级
          childs: [
            {
              entity: {
                key: "4-1",
                name: "/competitiveIntelligence",
                //icon: "el-icon-phone-outline\r\n",
                alias: "宏观产业"
              }
            },
            {
              entity: {
                key: "4-2",
                name: "/policyAnalysis",
                //icon: "el-icon-picture",
                alias: "政策分析"
              }
            },
            {
              entity: {
                key: "4-3",
                name: "/macroIndustry",
                //icon: "el-icon-picture",
                alias: "竞品情报"
              }
            }
          ]
        },
        {
          entity: {
            key: 6,
            name: "systemSetup",
            icon: "el-icon-setting",
            alias: "系统管理"
          },
          //二级
          childs: [
            {
              entity: {
                key: "6-1",
                name: "/parkManagement",
                icon: "el-icon-arrow-right",
                alias: "园区管理"
              }
            },
            {
              entity: {
                key: "6-2",
                name: "/investmentDemandManagement",
                icon: "el-icon-arrow-right",
                alias: "招商管理"
              }
            },
            {
              entity: {
                key: "6-3",
                name: "/algorithmManagement",
                icon: "el-icon-arrow-right",
                alias: "算法管理"
              }
            },
            {
              entity: {
                key: "6-4",
                name: "/accountManagement",
                //icon: "el-icon-picture",
                alias: "账号管理"
              }
            }
          ]
        },
        {
          entity: {
            key: "7",
            name: "/estateMap",
            icon: "el-icon-map-location",
            alias: "产业地图"
          }
        },
      ],
      userInfo: {
        name: "",
        userIcon:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "100px",
      name: ""
    };
  },
  computed: {
    return (){
      this.myCollectNum = this.$store.state.collectNum;
      console.log(this.myCollectNum)
    }
  },
  mounted() {
    //获取登录信息
    //this.userInfo.name = localStorage.getItem("username");
    //获取菜单权限
    //let menuid = localStorage.getItem("menuid");
    //let arr1 = [];
    //for (var i = 0; i < menuid.split("|").length; i++) {
      //let a = eval("(" + menuid.split("|")[i] + ")");
      //arr1.push(a);
    //}
    //this.menuData = arr1;
    //this.getCollectNum();
  },
  methods: {
    exit: function() {
      this.$confirm("确定退出该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          localStorage.removeItem("Token");
          localStorage.removeItem("username");
          localStorage.removeItem("TokenTime");
          this.$router.push({
            name: "login"
          });
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetPass();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetPass: function() {
      let _this = this;
      let params = qs.stringify({
        OldPassWord: _this.ruleForm.pass,
        NewPassWord: _this.ruleForm.checkPass
      });
      _this.loading = true;
      console.log(params);
      _this.$http
        .post("/Api/UpdateUserPassWord", params)
        .then(function(response) {
          let res = response.data;
          if (res.code == 1) {
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            // 将用户token保存到vuex中
            _this.loading = false;
            _this.$router.push({
              name: "login"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCollectNum() {
      // let _this =this;
      //  let params = qs.stringify({});
      //  _this.$http
      //   .post("/Api/MyCollect", params)
      //   .then(function(response) {
      //     let res = response.data;
      //     if (res.code == 1) {
      //       _this.$store.state.collectNum = res.data;
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    loadMyCollect() {
      this.$router.push({
        name: "customerManagement"
      });
    },
    add() {
      this.$store.commit("addCollect")
    },
    reduce() {
      this.$store.commit("reduceCollect")
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/reset.css";
@import "../assets/css/common.css";
@import '../assets/scss/element-variables.scss';
$aside-bgcolor: #001529;
$aside-textcolor: #b2b2b2;
a {
  color: $--color-primary;
}
.el-aside {
  background-color: $aside-bgcolor;
  color: #fff;
  .logo-cont {
    padding: 23px 0;
    a {
      display: block;
      text-indent: 40px;
      color: $--color-primary;
      font-size: 22px;
      line-height: 43px;
      img {
        vertical-align: bottom;
        margin-right: 10px;
      }
    }
  }
  .el-menu {
    background-color: $aside-bgcolor;
    border-right: none;
    .el-menu-item {
      color: $aside-textcolor;
    }
    .el-menu-item:hover {
      background-color: #0d2339;
    }
    .el-submenu__title {
      color: $aside-textcolor;
    }
    .el-submenu__title:hover {
      background-color: #0d2339;
    }
    .is-active {
      background-color: #006dfa !important;
      color: #fff;
    }
    .is-opened {
      background-color: $aside-bgcolor !important;
      color: $aside-textcolor;
    }
  }
}
.el-header {
  background-color: $--color-white;
  box-shadow: 0px 0px 4px 1px #ccc;
  .el-avatar {
    margin-top: 10px;
  }
  .el-dropdown {
    cursor: pointer;
    vertical-align: top;
    color: $--color-primary;
    .el-dropdown-link {
      display: flex;
      line-height: 60px;
      i {
        line-height: 60px;
      }
    }
  }
  .myCollect {
    display: inline-block;
    line-height: 60px;
    vertical-align: top;
    margin-right: 30px;
    .el-badge__content.is-fixed {
      top: 14px;
    }
  }
}
.el-main {
  background-color: #f0f2f5;
  margin-top: 2px;
  height: 100%;
  padding: 0 !important;
}
.big-cont-title,
.big-cont-title1 {
  line-height: 50px;
  background-color: #f0f2f5;
  .left-border {
    display: inline-block;
    width: 5px;
    height: 16px;
    margin-right: 6px;
    background-color: #006dfa;
    vertical-align: text-top;
  }
  .red {
    color: #f56c6c;
  }
}
.drawer-cont {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .company-name {
    line-height: 35px;
    font-size: 22px;
    font-weight: bold;
    color: #0a0f30;
    border-bottom: 2px solid #f3f3f3;
    p {
      flex: 1;
    }
    .collect {
      width: 50px;
      font-size: 14px;
    }
  }
  .company-detail {
    flex: 1;
    margin-top: 10px;
    overflow-y: auto;
  }
}
.el-drawer__body {
  height: 100%;
}
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.self-layer .el-input {
  width: 100%;
}
.pd-20 {
  padding: 20px;
}
.mb-0 {
  margin-bottom: 0;
}
.BMapLib_marker,
.BMapLib_polyline,
.BMapLib_rectangle {
  display: none;
}
.hadheight {
  height: 50px;
  transition: all 0.5s;
  overflow: hidden;
}
.noheight {
  height: 248px;
  transition: all 0.5s;
  overflow: hidden;
}
.toggleBtn {
  background-image: url(../assets/images/shouqi.png);
  position: absolute;
  bottom: -20px;
  left: 50%;
  width: 73px;
  height: 20px;
  transform: translate(-50%, 0);
  text-align: center;
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
}
</style>
