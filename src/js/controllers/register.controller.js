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
        console.log("register response:", data);
      }, err => {
        console.log(err);
      });
  };
}
