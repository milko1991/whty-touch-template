<!--
 * @Description: 没有更多提示组件 和滑动组件组合使用 栗子：UserScroll组件
 * @Author: luozhao
 * @Date: 2019-02-15 14:16:00
 * @LastEditors: luozhao
 * @LastEditTime: 2019-04-30 10:59:54
 -->

<template>
  <div class="no_more"
       slot='bottomLoading'>
    <span class="no_tip">{{tips}}</span>
  </div>
</template>

<script>
export default {
  name: 'NoMore',
  props: {
    tips: {
      type: String,
      default: '没有更多了'
    }
  },
  data () {
    return {
    };
  },
  computed: {},
  methods: {},
  created () { },
  mounted () { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.no_more {
  border-top: 0.01rem solid #e5e5e5;
  margin-top: 0.24rem;
  width: 40%;
  margin: 0.45rem auto;
  line-height: 0.48rem;
  font-size: 0.28rem;
  text-align: center;
  .no_tip {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    top: -0.27rem;
    padding: 0 0.11rem;
    background-color: #f5f5f5;
    color: #b2b2b2;
  }
}
</style>
