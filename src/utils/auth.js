import token from '../store/token'

const AppAccessTokenName = 'app_access_token';
export default {
  /**
   * 登陆Cookies
   * @param token AccessToken
   * @param expires  过期时间
   * @returns {*}
   */
  setToken(token, expires) {
    window.localStorage.setItem(AppAccessTokenName, token);
  },
  isLogin() {
    return window.localStorage.getItem(AppAccessTokenName);
  },
  logout() {
    console.warn('用户注销登陆');
    return window.localStorage.removeItem(AppAccessTokenName);
  },
  getToken() {
    return window.localStorage.getItem(AppAccessTokenName);
  }
}
