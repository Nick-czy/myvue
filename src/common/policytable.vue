<template>
   <div class="">
       <table class="table">
        <tbody>
          <tr>
            <th width="90">政策名称：</th>
            <td colspan="3">{{data.title | isNull}}</td>
          </tr>
          <tr>
            <th>发文机构：</th>
            <td colspan="3">{{data.industry | isNull}}</td>
          </tr>
          <tr>
            <th>类型：</th>
            <td colspan="3">{{data.type | isNull}}</td>
          </tr>
          <tr>
            <th>政策号：</th>
            <td colspan="3">{{data.number | isNull}}</td>
          </tr>
          <tr>
            <th width="90">地区：</th>
            <td>{{data.area | isNull}}</td>
            <th width="90">开始时间：</th>
            <td>{{data.beginDate | isNull | time}}</td>
          </tr>
          <tr>
            <th>发布时间：</th>
            <td>{{data.pubDate | isNull | time}}</td>
            <th>失效时间：</th>
            <td>{{data.endDate | isNull | time}}</td>
          </tr>
          <tr>
            <th>产业类别：</th>
            <td colspan="3">{{data.industryType | isNull}}</td>
          </tr>
          <tr>
            <th>申报条件：</th>
            <td colspan="3">{{data.qualification | isNull}}</td>
          </tr>
          <tr>
            <th>支持力度：</th>
            <td colspan="3">{{data.supportDegree | isNull}}</td>
          </tr>
          <tr>
            <th>申报材料：</th>
            <td colspan="3">{{data.applyMaterial | isNull}}</td>
          </tr>
          <tr>
            <th>项目来源：</th>
            <td colspan="3">{{data.projectFrom | isNull}}</td>
          </tr>
          
          <tr>
            <th>项目分析：</th>
            <td colspan="3">{{data.analysis | isNull}}</td>
          </tr>
        </tbody>
      </table>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   name: '',
   data() {
       return {}
   },
   props: {
    data: Object
  },
  filters: {
    isNull(val) {
      if (val) {
        return val;
      } else {
        return "-";
      }
    },
    time(val){
      return val.split('T')[0];
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
    .table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #e4eef6;
        th {
            background-color: #f2f9fc;
            border: 1px solid #e4eef6;
            padding: 10px;
            text-align: left;
        }
        td {
            border: 1px solid #e4eef6;
            padding: 10px;
        }
    }
</style>
