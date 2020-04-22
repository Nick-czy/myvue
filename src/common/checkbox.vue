<template>
  <div style="margin:5px 0;">
    <span>{{this.name}}：</span>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in this.list" :label="city" :key="city">{{city}}<slot></slot></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ["蓝天科技园5栋招商"],
      isIndeterminate: true
    };
  },
  created() {
    // this.cities = this.list;
  },
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.list : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.list.length;
    }
  },
  props: ["name", "list"]
};
</script>

<style lang="scss">
.el-checkbox-group {
  display: inline-block;
  margin-left: 20px;
}
</style>