angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ["$rootScope", "CurrentUserService"];
function MainCtrl($rootScope, CurrentUserService){

  const vm = this;

  vm.user = CurrentUserService.getUser();

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.getUser();
  });

  $rootScope.$on('loggedOut', () => {
    console.log('logged out');
    vm.user = null;
  });

  vm.logout = () => {
    console.log('fuck')
    CurrentUserService.clearUser();
  };
}
