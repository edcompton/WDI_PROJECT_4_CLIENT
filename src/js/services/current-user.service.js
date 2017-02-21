angular
.module('financeApp')
.service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', "$rootScope"];
function CurrentUserService(TokenService, User, $rootScope) {

  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (!decoded) return;
    return User.get({ id: decoded.id }).$promise; // $promise has to be joined onto the get
  };

  self.clearUser = () => {
    currentUser = null;
    TokenService.clearToken();
    $rootScope.$broadcast('loggedOut');
  };
}
