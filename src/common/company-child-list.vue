<template>
<div class="child-list">
    <div class="big-cont-title clearfix">
        <span class="left-border"></span>共筛选出
        <span class="red">{{totalNum}}</span> 条数据
        <!--<div class="right">
        <el-button type="primary" size="small">
          <i class="el-icon-star-on"></i>批量收藏
        </el-button>
      </div>-->
    </div>
    <div>
        <el-table ref="multipleTable" :data="tableData1" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column label="企业名称" width="300" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div @click.stop="getClick">
                        <router-link target="_blank" :to="{path:'/companyDetail',query:{Code:scope.row.uId,Type:2}}">{{scope.row.name}}</router-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="人员规模" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.companyscale | scaleLevel}}</template>
            </el-table-column>
            <el-table-column label="企业资质">
                <template slot-scope="scope">{{scope.row.qualification?scope.row.qualification:'-'}}</template>
            </el-table-column>
            <el-table-column prop="field" label="所属行业"></el-table-column>
            <el-table-column label="关注" width="100">
                <template slot-scope="scope">
                    <el-button style="width:80px" type="primary" size="mini" @click.stop="collect(scope.row,collectionList.indexOf(scope.row.uId)>-1)" plain>{{collectionList.indexOf(scope.row.uId)>-1?'取消关注':'关注'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="关注企业" :visible.sync="dialogFormVisible2" center width="500px" :close-on-click-modal="false" append-to-body>
            所属需求：
            <el-checkbox-group v-model="selectDemand" style="display:inline-block;">
                <el-checkbox v-for="item in demandList" :label="item.id+''" :key="item.id">{{item.parkName}}</el-checkbox>
            </el-checkbox-group>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="collectSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            tableData1: [],
            storeParams: "",
            totalNum: "",
            dialogFormVisible2: false,
            selectRow: {},
            selectResult: false,
            selectDemand: [],
            demandList: [],
            collectionList: []
        };
    },
    props: {
        drawerData: Array,
        params: String,
        total: Number
    },
    created() {
        this.getDemand();
        this.tableData1 = this.drawerData;
        this.getCollection();
    },
    watch: {
        drawerData: {
            handler(newName, oldName) {
                this.tableData1 = newName;
            },
            immediate: true,
            deep: true
        },
        params: {
            handler(newName, oldName) {
                this.storeParams = newName;
            },
            immediate: true,
            deep: true
        },
        total: {
            handler(newName, oldName) {
                this.totalNum = newName;
            },
            immediate: true,
            deep: true
        }
    },
    components: {},
    methods: {
        getDemand: function () {
            let _this = this;
            _this.loading = true;
            let params = qs.stringify({});
            _this.$http
                .post("/Api/ParkList_NoPage_2", params)
                .then(function (response) {
                    let res = response.data;
                    let jsonData = [];
                    if (res.code == 1) {
                        _this.demandList = res.data;
                        _this.loading = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getClick() {},
        getCollection: function () {
            let _this = this;
            // _this.loading = true;
            let params = qs.stringify({});
            _this.$http
                .post("/Api/Customer_List_All", params)
                .then(function (response) {
                    let res = response.data;
                    let jsonData = [];
                    if (res.code == 1) {
                        let list = [];
                        for (let i = 0; i < res.data.length; i++) {
                            list.push(res.data[i].uid);
                        }
                        _this.collectionList = list;
                        // _this.loading = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        collect(row, isHas) {
            var list = [];
            for (let i = 0; i < this.demandList.length; i++) {
                list.push(this.demandList[i].id + "");
            }
            if (isHas === false) {
                this.selectRow = row;
                this.selectResult = isHas;
                this.selectDemand = list;
                if (this.selectDemand.length <= 1) {
                    this.collectSubmit();
                } else {
                    this.dialogFormVisible2 = true;
                }
            } else {
                this.selectRow = row;
                this.selectResult = isHas;
                this.selectDemand = list;
                this.dialogFormVisible2 = false;
                this.noCollectSubmit();
            }
        },

        collectSubmit() {
            let row = this.selectRow;
            let isHas = this.selectResult;
            let ids = "";
            let List = this.selectDemand;
            if (List.length > 0 && isHas === false) {
                for (let i = 0; i < List.length; i++) {
                    ids += List[i] + ",";
                }
                ids = ids.substring(0, ids.length - 1);
            }

            let companyscaleStr = "";
            let companyscale = row.companyscale;
            if (companyscale == 1) {
                companyscaleStr = "微型";
            } else if (companyscale == 2) {
                companyscaleStr = "小型";
            } else if (companyscale == 3) {
                companyscaleStr = "中型";
            } else if (companyscale == 4) {
                companyscaleStr = "大型";
            } else {}
            let _this = this;
            let params = {};
            let uri = "";
            if (isHas === false) {
                let model = {
                    Name: row.name ? row.name : "",
                    Uid: row.uId ? row.uId : "",
                    Industry: row.field1 ? row.field1 : "",
                    BeginDate: row.beginDate ? row.beginDate : "0001-01-01",
                    RegMoney: row.regMoneyNum ? row.regMoneyNum : "0",
                    CompanyType: row.companyType ? row.companyType : "",
                    IndustryChain: row.industryChain ? row.industryChain : "",
                    NumRange: companyscaleStr, //公司规模
                    Dids: ids
                };
                params = qs.stringify({
                    StrJson: JSON.stringify(model)
                });
                uri = "/Api/Customer_Insert";
            } else {
                params = qs.stringify({
                    Id: row.uId
                });
                uri = "/Api/Customer_Delete";
            }

            _this.$http
                .post(uri, params)
                .then(function (response) {
                    let res = response.data;
                    if (res.code == 1) {
                        // _this.loadData();
                        _this.getCollection();
                        _this.commonTipsSuccess("关注成功，请到我的关注页面进行管理");
                        _this.dialogFormVisible2 = false;
                        _this.$store.commit("addCollect");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        noCollectSubmit() {
            let _this = this;
            let row = _this.selectRow;
            let params = qs.stringify({
                Id: row.uId
            });
            _this
                .$confirm("取消关注该企业？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    _this.$http
                        .post("/Api/Customer_Delete", params)
                        .then(function (response) {
                            let res = response.data;
                            if (res.code == 1) {
                                // _this.loadData();
                                _this.getCollection();
                                _this.commonTipsSuccess("取消关注成功");
                                _this.dialogFormVisible2 = false;
                                _this.$store.commit("reduceCollect");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: '已取消删除'
                    // });
                });

        },
        useParentReload: function () {
            this.$emit("collectReload");
        }
    },
    filters: {
        scaleLevel(val) {
            if (val) {
                let num = parseInt(val);
                if (num == 1) {
                    return "20人以下";
                } else if (num == 2) {
                    return "20-100人";
                } else if (num == 3) {
                    return "100-500人";
                } else if (num == 4) {
                    return "500人以上";
                }
            } else {
                return "-";
            }
        }
    }
};
</script>

<style lang="scss">
.child-list {

    .big-cont-title,
    .big-cont-title1 {
        background-color: #fff;
    }
}
</style>
