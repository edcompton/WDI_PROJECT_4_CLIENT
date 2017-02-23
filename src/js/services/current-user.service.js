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
console.log(self.currentUser)
        $rootScope.$broadcast('loggedIn');
      });
    }
  };

  self.clearUser = () => {
    console.log('clearUser in curent User service is logging out');
    self.currentUser = null;
    TokenService.clearToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
