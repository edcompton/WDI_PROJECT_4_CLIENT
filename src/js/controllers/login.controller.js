angular
  .module('financeApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', '$rootScope', 'CurrentUserService'];
function LoginCtrl(User, $rootScope, CurrentUserService) {
  const vm = this;
  vm.login = function() {
    User
      .login(vm.user).$promise
      .then((data) => {
        CurrentUserService.getUser();
      }, err => {
        console.log(err);
      });
  };
}
