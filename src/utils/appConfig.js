/*
 * @Description: 应用运行相关配置
 * @Author: luozhao
 * @LastEditors: luozhao
 * @Date: 2019-03-06 11:06:42
 * @LastEditTime: 2019-04-30 13:57:47
 */
let appConfig = {
  isDev: process.env.NODE_ENV !== 'production',
  baseUrl: '', // 接口域名
  crosUrl: '', // 家校帮转发跨域接口URL
  isOpenGate: false, // 接口是否走开放平台
  isProdToOfficial: false // 是否打包到正式线 true:正式线 false:测试线
};
// 打包正式线
if (!appConfig.isDev && appConfig.isProdToOfficial) {
  appConfig.crosUrl = `http://wwp-t-api.huijiaoyun.com/wwp/routefunction`;
  appConfig.baseUrl = `http://opengate.huijiaoyun.com`;
} else {
  // 开发，打包测试线
  appConfig.crosUrl = `http://jxb.t.huijiaoyun.com/wwp/routefunction`;
  appConfig.baseUrl = `http://opengate.huijiaoyun.com`;
}
export default appConfig;
