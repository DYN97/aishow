<template>
  <div>
    <div style="display: inline; float: left; width: 50%; height: 800px; border: #3b4151 solid 1px">
      <ve-line :data="chartData" height="400px"></ve-line>
    </div>
  </div>
</template>

<script>
export default {
  name: "simple",
  data: function() {
    return {
      chartData: {
        columns: ['个数', '概率'],
        rows: [
          {
            '个数': 3,
            '概率': 0.97
          },
          {
            '个数': 4,
            '概率': 5.4
          },
          {
            '个数': 5,
            '概率': 13.88
          },
          {
            '个数': 6,
            '概率': 21.81
          },
          {
            '个数': 7,
            '概率': 23.37
          },
          {
            '个数': 8,
            '概率': 18.03
          },
          {
            '个数': 9,
            '概率': 10.3
          },
          {
            '个数': 10,
            '概率': 4.42
          },
          {
            '个数': 11,
            '概率': 1.42
          },
          {
            '个数': 12,
            '概率': 0.34
          },
          {
            '个数': 13,
            '概率': 0.06
          },
          {
            '个数': 14,
            '概率': 0.01
          },
          {
            '个数': 15,
            '概率': 0
          },
          {
            '个数': 16,
            '概率': 0
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.el-header {
  background-color: #1f5dea;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
}
</style>