angular
  .module('financeApp')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService'];
function AuthInterceptor(API, TokenService) {
  return {
    request(config){
      const token = TokenService.getToken();  // null if it's not there
      if (config.url.indexOf(API) === 0 && token) {
        console.log(config.url);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    response(res) {
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        console.log('Setting token from interceptor', res.data.token);
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
