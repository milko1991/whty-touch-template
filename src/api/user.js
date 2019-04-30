/*
 * @Description: 用户User请求api模块
 * @Author: luozhao
 * @LastEditors: luozhao
 * @Date: 2019-04-30 11:03:22
 * @LastEditTime: 2019-04-30 13:54:40
 */
import api from '../utils/apiRequestHandler';
import appConfig from '../utils/appConfig';

class User {
  constructor() {
    this.isProdToOfficial = appConfig.isProdToOfficial;
    this.crosUrl = appConfig.crosUrl;
  }
  /**
   * @description: 查询用户信息
   * @author luozhao
   * @param {Object} param
   * {
   *  personId:用户id
   * }
   * @returns
   * @memberof User
   */
  getUser(param) {
    return api({
      url: ``,
      method: 'post',
      data: param
    });
  }
}

export default new User();
