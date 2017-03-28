angular
.module('financeApp')
.service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', '$rootScope'];

function CurrentUserService(TokenService, User, $rootScope) {

  const self = this;

  self.currentUser = {};

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      User.get({ id: decoded.id })
      .$promise
      .then((data) => {
        self.currentUser = data;
        $rootScope.$broadcast('loggedIn');
      });
    }
  };

  self.clearUser = () => {
    self.currentUser = null;
    TokenService.clearToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
