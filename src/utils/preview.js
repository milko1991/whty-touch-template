/*
 * @Description: 预览各种资源的操作类,用于jxb 和 企业微信，
   针对不同的业务返回做对应的修改即可
 * @Author: luozhao
 * @LastEditors: luozhao
 * @Date: 2019-04-18 15:25:23
 * @LastEditTime: 2019-05-27 15:28:30
 */
import audioService from './previewAudio';
const IS_DEV = process.env.NODE_ENV !== 'production';
// let audioTimer = null;
const preview = {
  /**
   * 调用原生IOS方法
   * @param {String} method 方法名称
   * @param {Array} params 参数，格式为数组 eg: [1,2,3]
   */
  callNativeIosMethod(method, params = []) {
    if (navigator.userAgent.indexOf('iOS_WKWebView') > -1) {
      method && window.webkit.messageHandlers[method].postMessage(params);
    } else {
      method && method(params);
    }
  },
  /**
   * 预览图片
   * @param {Array} [imgUrls=[]] 图片地址数组
   * @param {number} [index=0] 当前展示的图片索引
   * @returns
   */
  previewImage(imgUrls = [], index = 0) {
    if (IS_DEV) {
      return;
    }
    let appType = sessionStorage.getItem('appType');
    let nativeType = sessionStorage.getItem('nativeType');
    if (appType === 'wechat' || appType === 'weixin') {
      // eslint-disable-next-line
      wx.previewImage({
        current: imgUrls[index], // 当前显示图片的http链接
        urls: imgUrls // 需要预览的图片http链接列表
      });
    } else if (appType === 'jxb') {
      let imagePathlist = {
        imagelist: imgUrls
      };
      this.stopPreviewAudioVideo();
      if (nativeType === 'Android') {
        window.jslistener.preImageList(JSON.stringify(imagePathlist), index);
      } else {
        this.callNativeIosMethod('preImageList', [JSON.stringify(imagePathlist), index]);
      }
    } else {
      this.$toast('当前不支持预览');
    }
  },
  /**
   * 预览文件 ppt txt doc xls...
   * @param {Object} [file={}] 文件数据对象
   * @returns
   */
  previewFile(file = {}) {
    if (IS_DEV) {
      return;
    }
    let appType = sessionStorage.getItem('appType');
    let nativeType = sessionStorage.getItem('nativeType');
    if (appType === 'wechat') {
      // eslint-disable-next-line
      wx.previewFile({
        url: file.fileExtra.localUrl, // 需要预览文件的地址(必填，可以使用相对路径)
        // name: item.fileName, // 需要预览文件的文件名(不填的话取url的最后部分)
        size: parseInt(file.fileSize) // 需要预览文件的字节大小(必填)
      });
    } else if (appType === 'jxb') {
      this.stopPreviewAudioVideo();
      if (nativeType === 'Android') {
        window.jslistener.previewFile(
          file.fileName,
          file.fileSize,
          file.fileExt,
          file.fileExtra.localUrl
        );
      } else {
        this.callNativeIosMethod('previewFile', [
          file.fileName,
          file.fileSize,
          file.fileExt,
          file.fileExtra.localUrl
        ]);
      }
    } else {
      this.$toast('当前不支持预览');
    }
  },
  /**
   * 音频预览 播放
   * @param {Document} el 元素对象
   * @param {Object} obj 音频资源数据对象
   * @returns
   */
  previewAudio(el, obj) {
    // if (IS_DEV) {
    //   return;
    // }
    let src = obj.fileExtra.localUrl;
    if (!src) {
      this.$toast('该音频资源不可用');
      return false;
    }
    audioService.playAudio(el, src);
  },
  /**
   * 视频预览
   * @param {Object}file 传入视频资源数据对象
   * @returns
   */
  previewVideo(file) {
    if (!file.fileExtra.localUrl) {
      this.$toast('视频频资源不可用');
      return;
    }
    if (IS_DEV) {
      return;
    }
    let appType = sessionStorage.getItem('appType');
    let nativeType = sessionStorage.getItem('nativeType');
    if (appType === 'wechat') {
      // eslint-disable-next-line
      wx.previewFile({
        url: file.fileExtra.localUrl, // 需要预览文件的地址(必填，可以使用相对路径)
        // name: item.fileName, // 需要预览文件的文件名(不填的话取url的最后部分)
        size: parseInt(file.fileSize) // 需要预览文件的字节大小(必填)
      });
    } else if (appType === 'jxb') {
      let $audio = document.querySelectorAll('audio'); // 获取所有的音频
      if ($audio.length) {
        for (let i = 0; i < $audio.length; i++) {
          $audio[i].pause(); // 暂停掉所有的音频
          $audio[i].load();
        }
      }
      let $audioBtn = document.querySelectorAll('.audioBtn'); // 获取所有的音频
      if ($audioBtn.length) {
        for (let i = 0; i < $audioBtn.length; i++) {
          $audioBtn[i].classList.remove('active'); // 移除音频播放状态
        }
      }
      if (nativeType === 'Android') {
        window.jslistener.playVideo(file.fileExtra.localUrl);
      } else {
        this.callNativeIosMethod('playVideo', [file.fileExtra.localUrl]);
      }
    } else {
      this.$toast('当前不支持预览');
    }
  },
  /**
   * @description: 关闭音频和视频预览
   * @author luozhao
   */
  stopPreviewAudioVideo() {
    let $video = document.querySelectorAll('video'); // 获取所有的视频
    if ($video.length) {
      for (let i = 0; i < $video.length; i++) {
        $video[i].pause(); // 暂停掉所有的视频
        $video[i].load();
      }
    }
    let $audio = document.querySelectorAll('audio'); // 获取所有的音频
    if ($audio.length) {
      for (let i = 0; i < $audio.length; i++) {
        $audio[i].pause(); // 暂停掉所有的音频
        $audio[i].load();
      }
    }
    let $audioBtn = document.querySelectorAll('.audioBtn'); // 获取所有的音频
    if ($audioBtn.length) {
      for (let i = 0; i < $audioBtn.length; i++) {
        $audioBtn[i].classList.remove('active'); // 移除音频播放状态
      }
    }
  }
};
export default preview;
