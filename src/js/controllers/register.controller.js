angular
  .module('financeApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', '$rootScope'];
function RegisterCtrl(User, $rootScope){
  const vm = this;

  vm.register = function() {
    User
      .register(vm.user).$promise
      .then(data => {
        console.log(data);
        $rootScope.$broadcast('loggedIn');
      }, err => {
        console.log(err);
      });
  };
}
