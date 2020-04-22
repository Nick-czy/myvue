<template>
<div class="">
    <el-row>
        <el-form ref="searchform" :model="searchform" label-width="120px" class="company-search">
            <el-row :class="isToggle?'noheight':'hadheight'">
                <el-col :span="12">
                    <el-form-item label="企业名称：" prop="Name">
                        <el-input v-model="searchform.Name" size="small" placeholder="请输入关键词，例如“华为”"></el-input>
                    </el-form-item>
                    <el-form-item label="企业地址：" prop="RegAddress">
                        <el-input v-model="searchform.RegAddress" size="small" placeholder="请输入关键词，例如“深圳”"></el-input>
                    </el-form-item>
                    <el-form-item label="成立时间：" prop="BeginDateStart">
                        <el-date-picker v-model="searchform.BeginDateStart" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="企业类型：" prop="CompanyType">
              <el-select v-model="searchform.CompanyType" placeholder="请选择" size="small">
                <el-option label="有限责任公司" value="有限责任公司"></el-option>
                <el-option label="股份有限公司" value="股份有限公司"></el-option>
                <el-option label="国企" value="国企"></el-option>
                <el-option label="外商投资企业" value="外商投资企业"></el-option>
                <el-option label="独资企业" value="独资企业"></el-option>
                <el-option label="个体工商户" value="个体工商户"></el-option>
                <el-option label="联营企业" value="联营企业"></el-option>
                <el-option label="集体所有制" value="集体所有制"></el-option>
                <el-option label="有限合伙" value="有限合伙"></el-option>
                <el-option label="普通合伙" value="普通合伙"></el-option>
              </el-select>
            </el-form-item> -->
                    <el-form-item label="所属行业：" prop="Field">
                        <el-cascader placeholder="请选择或输入" filterable v-model="optionsValue" :options="options" :props="props" collapse-tags clearable size="small" style="width:100%;"></el-cascader>
                        <!-- <el-select v-model="searchform.Field" placeholder="请选择" size="small">
                <el-option label="批发和零售" value="批发和零售"></el-option>
                <el-option label="制造业" value="制造业"></el-option>
                <el-option label="建筑业" value="建筑业"></el-option>
              </el-select> -->
                    </el-form-item>
                    <el-form-item label="合纵信用指数：" prop="CreditScoreStart">
                        <el-select v-model="searchform.CreditScoreStart" placeholder="请选择信用等级" size="small" clearable>
                            <el-option label="优质" value="[90 TO 100]"></el-option>
                            <el-option label="正常" value="[80 TO 90]"></el-option>
                            <el-option label="一般风险" value="[60 TO 80]"></el-option>
                            <el-option label="极高风险" value="[0 TO 60]"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="租金承受力：" prop="RentLevel">
              <el-select v-model="searchform.RentLevel" placeholder="请选择" size="small">
                <el-option label="20元/㎡·月以下" value="1"></el-option>
                <el-option label="20-40元/㎡·月" value="2"></el-option>
                <el-option label="40-70元/㎡·月" value="3"></el-option>
                <el-option label="70-100元/㎡·月" value="4"></el-option>
                <el-option label="100-140元/㎡·月" value="5"></el-option>
                <el-option label="140-180元/㎡·月" value="6"></el-option>
                <el-option label="180-230元/㎡·月" value="7"></el-option>
                <el-option label="230-300元/㎡·月" value="8"></el-option>
                <el-option label="300-400元/㎡·月" value="9"></el-option>
                <el-option label="400元/㎡·月以上" value="10"></el-option>
              </el-select>
            </el-form-item> -->
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司业务：" prop="BScope">
                        <el-input v-model="searchform.BScope" size="small" placeholder="请输入关键词，例如“网络科技”"></el-input>
                    </el-form-item>
                    <el-form-item label="注册资本：" prop="RegMoneyNumStart">
                        <el-input v-model="searchform.RegMoneyNumStart" size="small" style="width:36%;"></el-input> ——
                        <el-input v-model="searchform.RegMoneyNumEnd" size="small" style="width:36%;"></el-input> 万元
                    </el-form-item>
                    <el-form-item label="人员规模：" prop="Companyscale">
                        <el-select v-model="searchform.Companyscale" placeholder="请选择" size="small" clearable>
                            <el-option label="20人以下" value="1"></el-option>
                            <el-option label="20-100人" value="2"></el-option>
                            <el-option label="100-500人" value="3"></el-option>
                            <el-option label="500人以上" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业资质：" prop="QyZZ">
                        <el-select v-model="searchform.QyZZ" placeholder="请选择" size="small" clearable>
                            <el-option label="上市企业" value="上市企业"></el-option>
                            <el-option label="国高企业" value="国高企业"></el-option>
                            <el-option label="瞪羚企业" value="瞪羚企业"></el-option>
                            <el-option label="独角兽" value="独角兽"></el-option>
                            <el-option label="行业百强" value="行业百强"></el-option>
                            <el-option label="融资企业" value="融资企业"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="所属产业链：" prop="IndustryChain">
              <el-select v-model="searchform.IndustryChain" placeholder="请选择" size="small">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
                </el-col>
            </el-row>
            <el-col>
                <el-form-item>
                    <el-button type="primary" size="small" @click="getFormInfo()">搜索</el-button>
                    <el-button @click="resetForm('searchform')" size="small">重置</el-button>
                    <el-button size="small" @click="isToggle = !isToggle">{{isToggle?'收起':'更多'}}</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</div>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            isToggle: false,
            //接收参数
            getCircleParams: {},
            getPolygonParams: {},
            getAddressParams: {},
            searchform: {
                Name: "",
                BScope: "",
                RegAddress: "",
                RegMoneyNumStart: "",
                RegMoneyNumEnd: "",
                BeginDateStart: "",
                BeginDateEnd: "",
                Companyscale: "",
                CompanyType: "",
                QyZZ: "",
                Field: "",
                IndustryChain: "",
                RentLevel: "",
                CreditScoreStart: "",
                CreditScoreEnd: ""
            },
            options: [],
            optionsValue: [],
            props: {
                multiple: true,
                checkStrictly: true,
                value: "name",
                label: "name",
                expandTrigger: "hover"
            },
        };
    },
    props: {
        circleParams: Object,
        polygonParams: Object,
        addressParams: Object
    },
    watch: {
        polygonParams: {
            handler(newName, oldName) {
                this.getPolygonParams = this.polygonParams;
            },
            immediate: true,
            deep: true
        },
        circleParams: {
            handler(newName, oldName) {
                this.getCircleParams = this.circleParams;
            },
            immediate: true,
            deep: true
        },
        addressParams: {
            handler(newName, oldName) {
                this.getAddressParams = this.addressParams;
            },
            immediate: true,
            deep: true
        },
        optionsValue: {
            handler: function (newV, oldV) {
                let industrys = "";
                let industryList = newV;
                if (industryList.length > 0) {
                    for (let i = 0; i < industryList.length; i++) {
                        industrys += industryList[i][industryList[i].length - 1] + ",";
                    }
                    industrys = industrys.substring(0, industrys.length - 1);
                }
                this.searchform.Field=industrys;
            }
        }
    },
    mounted() {},
    created() {
        this.getWork();
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.searchform.RegMoneyNumEnd = "";
        },
        getWork: function () {
            let _this = this;
            // _this.loading = true;
            let params = qs.stringify({});
            _this.$http
                .post("/Api/Work_List", params)
                .then(function (response) {
                    let res = response.data;
                    let jsonData = [];
                    if (res.code == 1) {
                        _this.options = res.data;
                        // _this.loading = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取表单信息
        getFormInfo: function () {
            if (this.polygonParams.Polygon == "" && this.addressParams.isClick == 0) {
                var model = {
                    Centre: this.getCircleParams.Centre,
                    Radius: this.getCircleParams.Radius,
                    Name: this.searchform.Name,
                    BScope: this.searchform.BScope,
                    RegAddress: this.searchform.RegAddress,
                    RegMoneyNumStart: this.searchform.RegMoneyNumStart,
                    RegMoneyNumEnd: this.searchform.RegMoneyNumEnd,
                    BeginDateStart: this.searchform.BeginDateStart[0] ? this.searchform.BeginDateStart[0] : '',
                    BeginDateEnd: this.searchform.BeginDateStart[1] ? this.searchform.BeginDateStart[0] : '',
                    Companyscale: this.searchform.Companyscale,
                    CompanyType: this.searchform.CompanyType,
                    QyZZ: this.searchform.QyZZ,
                    Field: this.searchform.Field,
                    IndustryChain: this.searchform.IndustryChain,
                    RentLevel: this.searchform.RentLevel,
                    CreditScoreStart: this.searchform.CreditScoreStart,
                    CreditScoreEnd: this.searchform.CreditScoreEnd
                };
                this.searchForm = model;
                this.useParentCircle();
            } else if (
                this.circleParams.Centre == "" &&
                this.addressParams.isClick == 0
            ) {
                var model = {
                    Polygon: this.getPolygonParams.Polygon,
                    Name: this.searchform.Name,
                    BScope: this.searchform.BScope,
                    RegAddress: this.searchform.RegAddress,
                    RegMoneyNumStart: this.searchform.RegMoneyNumStart,
                    RegMoneyNumEnd: this.searchform.RegMoneyNumEnd,
                    BeginDateStart: this.searchform.BeginDateStart[0] ? this.searchform.BeginDateStart[0] : '',
                    BeginDateEnd: this.searchform.BeginDateStart[1] ? this.searchform.BeginDateStart[0] : '',
                    Companyscale: this.searchform.Companyscale,
                    CompanyType: this.searchform.CompanyType,
                    QyZZ: this.searchform.QyZZ,
                    Field: this.searchform.Field,
                    IndustryChain: this.searchform.IndustryChain,
                    RentLevel: this.searchform.RentLevel,
                    CreditScoreStart: this.searchform.CreditScoreStart,
                    CreditScoreEnd: this.searchform.CreditScoreEnd
                };
                this.searchForm = model;
                this.useParentPolygon();
            } else if (
                this.circleParams.Centre == "" &&
                this.polygonParams.Polygon == ""
            ) {
                var model = {
                    Name: this.searchform.Name,
                    BScope: this.searchform.BScope,
                    RegAddress: this.searchform.RegAddress,
                    RegMoneyNumStart: this.searchform.RegMoneyNumStart,
                    RegMoneyNumEnd: this.searchform.RegMoneyNumEnd,
                    BeginDateStart: this.searchform.BeginDateStart[0] ? this.searchform.BeginDateStart[0] : '',
                    BeginDateEnd: this.searchform.BeginDateStart[1] ? this.searchform.BeginDateStart[0] : '',
                    Companyscale: this.searchform.Companyscale,
                    CompanyType: this.searchform.CompanyType,
                    QyZZ: this.searchform.QyZZ,
                    Field: this.searchform.Field,
                    IndustryChain: this.searchform.IndustryChain,
                    RentLevel: this.searchform.RentLevel,
                    CreditScoreStart: this.searchform.CreditScoreStart,
                    CreditScoreEnd: this.searchform.CreditScoreEnd
                };
                this.searchForm = model;
                this.useParentAddress();
            }
        },
        useParentCircle: function () {
            this.$emit("pageOneSearch", this.searchForm);
        },
        useParentPolygon: function () {
            this.$emit("pageOneSearch", this.searchForm);
        },
        useParentAddress: function () {
            this.$emit("pageOneSearch", this.searchForm);
        }
    }
};
</script>

<style lang="scss">
.company-search {
    .el-col {
        padding: 0 10px;
    }

    .el-form-item {
        margin-bottom: 10px;
    }

    .el-input {
        width: 100%;
    }

    .el-range-editor.el-input__inner {
        width: 100%;
    }

    .el-select {
        width: 100%;
    }

    .noheight {
        height: 248px;
    }
}
</style>
