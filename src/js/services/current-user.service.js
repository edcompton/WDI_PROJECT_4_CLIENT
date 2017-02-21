angular
.module('financeApp')
.service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User'];
function CurrentUserService(TokenService, User) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (!decoded) return;
    return User.get({ id: decoded.id }).$promise; // $promise has to be joined onto the get
  };

  self.clearUser = () => {
    currentUser = null;
    TokenService.clearToken();
    console.log('fuckin token is fucked')
    // $rootScope.$broadcast('loggedOut');
  };
}
