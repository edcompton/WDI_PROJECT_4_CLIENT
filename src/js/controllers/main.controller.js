angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ["$rootScope", "CurrentUserService"];
function MainCtrl($rootScope, CurrentUserService){

  const vm = this;


  vm.logout = () => {
    console.log('fuck')
    CurrentUserService.clearUser();
  };
}
