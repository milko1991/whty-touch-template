<!--
 * @Description: 滑动组件使用示例
 * @Author: luozhao
 * @Date: 2018-12-27 09:19:00
 * @LastEditors: luozhao
 * @LastEditTime: 2019-04-30 10:59:09
 -->
<template>
  <div class="user_scroll">
    <b-scroll @scrollToEnd="onScrollBottom"
              @refresh="refresh"
              :topLoadOk.sync="getTop"
              :bottomLoadOk.sync="getBottom"
              :showPullUp="true"
              :showPullDown="true"
              :showEnded="getEnded">
      <notification-item v-for="(item,index) in notificationList"
                         :key="index"
                         :notification="item"></notification-item>
      <!-- 没有更多数据插槽 -->
      <no-more slot='bottomLoading'></no-more>
    </b-scroll>
  </div>
</template>

<script>
/**
  * scrollToEnd 上拉加载时触发的函数
  * refresh： 下拉刷新时触发的函数
  * showPullUp: 是否开启上拉加载
  * showPullDown： 是否开启下拉刷新
  * topLoadOk ：下拉刷新完成时设置为true  getTop 初始化设置为false
  * bottomLoadOk: 上拉记载完成时设置为true  getBottom 初始化设置为false
  * showEnded: 没有更多刷剧时设置为true,默认false getEnded 初始化设置为false
  */
import { mapState } from 'vuex';
export default {
  name: 'UseScroll',
  components: {
    NoMore: () => import('@/components/NoMore')
  },
  data () {
    return {
      notificationList: [], // 我接手的消息列表
      total: 0,
      page: 1,
      pageSize: 10,
      getTop: false, // 下拉刷新完成
      getEnded: false, // 控制显示没有更多数据文字
      getBottom: false // 上拉加载完成
    };
  },
  computed: {
    ...mapState(['sendeeId', 'sendeeMsgCode'])
  },
  created () {
    this.fetchReceiveList();
  },
  methods: {
    // 拉取数据
    async fetchReceiveList () {
      try {
        let res = await this.$api.notification.getReceiveMessage({
          params: {
            sendeeId: this.sendeeId,
            sendeeMsgCode: this.sendeeMsgCode,
            page: this.page,
            pageSize: this.pageSize
          }
        });
        this.getTop = true;
        if (res.code === '000000') {
          if (this.page === 1) {
            this.notificationList = res.data;
          } else {
            this.notificationList = this.notificationList.concat(res.data);
          }
          this.total = res.total;
          if (this.notificationList.length >= this.total) {
            // 没有更多数据时设置getEnded为true
            this.getEnded = true;
          } else {
            this.getBottom = true;
            this.page++;
          }
        }
      } catch (error) {
        this.getEnded = false;
        this.getTop = true;
        this.getBottom = true;
        console.log(error);
      }
    },
    // 上拉加载触发函数
    onScrollBottom () {
      if (this.getEnded) {
        return;
      };
      this.fetchReceiveList();
    },
    // 下拉刷新
    refresh () {
      this.page = 1;
      this.fetchReceiveList();
    }
  }
};
</script>

<style lang="less" scoped>
.user_scroll {
}
</style>
