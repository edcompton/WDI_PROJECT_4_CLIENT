angular
  .module('financeApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', '$rootScope', 'CurrentUserService'];
function RegisterCtrl(User, $rootScope, CurrentUserService) {
  const vm = this;

  vm.register = function() {
    User
      .register(vm.user)
      .$promise
      .then(data => {
        CurrentUserService.getUser();
      }, err => {
        console.log(err);
      });
  };
}
