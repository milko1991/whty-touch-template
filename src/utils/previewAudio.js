/*
 * @Author: Alan
 * @LastEditors: luozhao
 * @Description: 音频文件预览，注意事项：1、该方法只需要播放按钮（点击事件绑定元素）不需要配audio；2、按钮必须加上 'audioBtn' 类名；3、根据需求（是否需要暂停）加类名 'audioType01' ：不需要暂停，'audioType02' ：需要暂停
 * @Date: 2019-03-01 16:13:17
 * @LastEditTime: 2019-04-28 15:05:42
 */
window.PREVAUDIOEVENT = ''; // 存储正在播放的音频元素，便于暂停
window.PLAYAUDIOSTATUS = false; // 存储音频音频播放状态
const previewAudio = {
  /**
   * @description:
   * @param {String} src:音频附件
   * @return:
   */
  playAudio(e, src) {
    let flag = true; // 标记判断onerror是否在playAudio方法里面
    if (!src) {
      this.$toast('该音频资源不可用');
      return false;
    }
    if (!window.PLAYAUDIOSTATUS) {
      window.$EL = document.querySelector('#app');
      window.$AUDIOEL = document.createElement('audio');
      window.$SOURCE = document.createElement('source');
      window.$SOURCE.type = 'audio/mp3';
      window.$AUDIOEL.appendChild(window.$SOURCE);
      window.$EL.appendChild(window.$AUDIOEL);
    }
    window.PLAYAUDIOSTATUS = true;
    let $video = document.querySelectorAll('video'); // 获取所有的视频
    if ($video.length) {
      for (let i = 0; i < $video.length; i++) {
        $video[i].pause(); // 暂停掉所有的视频
        $video[i].load();
      }
    }
    let $currentEl = e.currentTarget;
    let $audioAll = document.querySelectorAll('.audioBtn'); // 获取所有的音频元素
    for (let i = 0; i < $audioAll.length; i++) {
      if ($audioAll[i] !== $currentEl) {
        $audioAll[i].classList.remove('active'); // 去掉播放状态
      }
    }
    if ($currentEl.classList.contains('audioType01')) {
      // 音频播放类型一（不需要暂停）
      $currentEl.classList.add('active'); // 给当前元素添加播放状态
      window.$SOURCE.src = src;
      window.$SOURCE.onerror = () => {
        if (flag) {
          // onerror只在在playAudio方法里面执行
          this.$toast('该音频资源不可用');
          $currentEl.classList.remove('active'); // 去掉播放状态
          flag = false;
        }
      };
      window.$AUDIOEL.load();
      window.$AUDIOEL.play();
    } else {
      // 音频播放类型二（需要暂停）
      if (!$currentEl.classList.contains('active')) {
        if ($currentEl !== window.PREVAUDIOEVENT) {
          window.$SOURCE.src = src;
          window.$SOURCE.onerror = () => {
            if (flag) {
              // onerror只在在playAudio方法里面执行
              this.$toast('该音频资源不可用');
              $currentEl.classList.remove('active'); // 去掉播放状态
              window.PREVAUDIOEVENT = '';
              flag = false;
            }
          };
          window.$AUDIOEL.load();
        }
        $currentEl.classList.add('active'); // 给当前元素添加播放状态
        window.$AUDIOEL.play();
      } else {
        window.$AUDIOEL.pause();
        $currentEl.classList.remove('active'); // 去掉播放状态
      }
    }
    window.PREVAUDIOEVENT = e.currentTarget; // 存储当前播放音频
    window.$AUDIOEL.onended = () => {
      // 播放完成后移除播放状态
      $currentEl.classList.remove('active');
    };
  }
};
export default previewAudio;
