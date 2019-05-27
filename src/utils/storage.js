/*
 * @Description: 为localStorage和sessionStorage设置过期时间
 * @Author: luozhao
 * @Date: 2019-01-18 09:30:10
 * @LastEditors: luozhao
 * @LastEditTime: 2019-01-18 09:35:13
 */
class Storage {
  constructor(strategy = 'internal') {
    this.strategy = strategy;
  }

  /** 设置storage
   * @param {string} key
   * @param {any} val
   * @param {number} maxAge 存储时间：ms
   */
  set(key, val, maxAge = 0) {
    const data = {
      val,
      expires: maxAge === 0 ? 0 : Date.now() + maxAge
    };
    window[this.strategy][key.toString()] = JSON.stringify(data);
  }
  /**
   * 获取Storage
   * @param {string} key
   * @returns
   * @memberof Storage
   */
  get(key) {
    const data = window[this.strategy][key.toString()] &&
      JSON.parse(window[this.strategy][key.toString()]);

    if (data) {
      if (data.expires === 0) {
        return data.val;
      }

      if (Date.now() < data.expires) {
        return data.val;
      }

      this.remove(key);
      return null;
    }
    return null;
  }
  // 清除storage
  remove(key) {
    delete window[this.strategy][key.toString()];
  }
}

// 全局变量
window.internal = window.internal || {};

const local = new Storage('localStorage');
const session = new Storage('sessionStorage');
const internal = new Storage('internal');

export default {
  local,
  session,
  internal
};
