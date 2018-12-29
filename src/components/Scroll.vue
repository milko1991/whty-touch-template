<!--
 * @Description: 滑动组件
 * @Author: luozhao
 * @Date: 2018-12-29 14:53:41
 * @LastEditors: luozhao
 * @LastEditTime: 2018-12-29 15:16:59
 -->

<template>
  <div ref='scrollWpap'
       class='wrap_loading'
       :class='"wrap_loading"+random'>
    <div class="scroll_box">
      <slot name='topLoading'
            v-if='showPullDown'>
        <div class='topLoading'>
          <InlineLoading v-show='topLoading'></InlineLoading> {{ topMsg }}
        </div>
      </slot>
      <slot></slot>
      <div v-if='showPullUp'
           v-show='isLessInfo'>
        <div v-show='bottomStatus && !showEnded'
             class='bottomLoading'>
          <InlineLoading v-show='bottomLoading'></InlineLoading> {{ bottomMsg }}
        </div>
        <p class="showPullLoading"
           v-if="!showEnded"
           v-show="bottomStatus1">
          <InlineLoading></InlineLoading> 正在加载
        </p>
        <slot name='bottomLoading'
              v-if='showEnded'>
        </slot>
      </div>
    </div>

  </div>

</template>

<script>
import BS from 'better-scroll';
import { InlineLoading } from 'vux';
export default {
  components: {
    InlineLoading
  },
  props: {
    // 是否显示没有更多提示
    showEnded: {
      type: Boolean,
      default: false
    },
    // 是否开启下拉刷新
    showPullDown: {
      type: Boolean,
      default: false
    },
    // 下拉刷新数据tips隐藏
    topLoadOk: {
      type: Boolean,
      default: false
    },
    // 上拉加载数据tips隐藏
    bottomLoadOk: {
      type: Boolean,
      default: false
    },
    // 是否开启上拉加载
    showPullUp: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {
          probeType: 3,
          momentum: true,
          click: true,
          tap: true,
          preventDefault: true
        };
      }
    },
    // 刷新scroll returnRefresh变化时刷新scroll组件
    returnRefresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      topMsg: '',
      topMsgArr: ['正在加载', '下拉更新数据', '松手更新数据'],
      topLoading: false,
      bottomStatus: true,
      bottomMsg: '',
      bottomLoading: false,
      bottomMsgArr: ['正在加载', '上拉加载更多', '松手加载更多'],
      bottomStatus1: false,
      isLessInfo: true,
      random: Math.floor(Math.random() * 1000000000000)
    };
  },
  name: 'scroll',
  mounted () {
    if (this.showPullDown) {
      this.$set(this.options, 'pullDownRefresh', {
        threshold: 50,
        stop: 50
      });
    }
    if (this.showPullUp) {
      this.$set(this.options, 'pullUpLoad', true);
    }
    this.topMsg = this.topMsgArr[1];
    // this.bottomMsg = this.bottomMsgArr[1];
    this.scroll = new BS('.wrap_loading' + this.random, this.options);
    let k = true;
    this.scroll.on('scroll', ops => {
      // 下拉刷新
      if (this.showPullDown) {
        if (ops.y >= 50 && k) {
          this.topMsg = this.topMsgArr[2];
          this.scroll.off('touchEnd');
          this.scroll.on('touchEnd', ops => {
            // 下拉刷新数据
            if (k) this.$emit('refresh');
            k = false;
            this.topMsg = this.topMsgArr[0];
            this.topLoading = true;
            this.scroll.off('touchEnd');
            setTimeout(() => {
              this.scroll.refresh();
            }, 3000);
          });
        }
        this.scroll.on('pullingDown', () => {
          this.scroll.on('scrollEnd', () => {
            this.topMsg = this.topMsgArr[1];
            this.topLoading = false;
            k = true;
          });
        });
      }
      // 上啦加载
      if (this.showPullUp) {
        this.bottomMsg = this.bottomMsgArr[1];
        if (ops.y < this.scroll.maxScrollY - 70) {
          this.bottomMsg = this.bottomMsgArr[2];
          this.scroll.off('touchEnd');
          this.scroll.on('touchEnd', ops => {
            let max = this.scroll.maxScrollY - 68;
            this.bottomStatus1 = true;
            this.bottomStatus = false;
            setTimeout(() => {
              this.scroll.scrollTo(0, max);
              // 上拉加载数据
              this.$emit('scrollToEnd');
              this.scroll.refresh();
              this.scroll.off('touchEnd');
            }, 50);
          });
          this.scroll.on('scrollEnd', () => {
            this.bottomMsg = this.bottomMsgArr[1];
            this.bottomLoading = false;
          });
        }
      }
    });
  },
  watch: {
    topLoadOk (n) {
      if (n) {
        this.scroll.finishPullDown();
        this.$emit('update:topLoadOk', false);
      };
    },
    bottomLoadOk (n) {
      if (n) {
        this.scroll.finishPullUp();
        this.$emit('update:bottomLoadOk', false);
        this.bottomMsg = this.bottomMsgArr[1];
        this.bottomStatus1 = false;
        this.bottomStatus = true;
      }
    },
    returnRefresh (n) {
      this.scroll.refresh();
    }
  }
};
</script>

<style >
.wrap_loading {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
}
/* .wrap_loading .weui-loading {
  width: 40px;
  height: 40px;
} */
.wrap_loading .weui-loadmore__tips {
  font-size: 20px;
}
.topLoading {
  position: absolute;
  top: -50px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.bottomLoading {
  position: absolute;
  bottom: -50px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.showPullLoading {
  width: 100%;
  text-align: center;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
</style>
