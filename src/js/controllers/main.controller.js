angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ["$rootScope", "CurrentUserService", "$state"];
function MainCtrl($rootScope, CurrentUserService, $state){

  const vm = this;

  vm.user = CurrentUserService.getUser();

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.getUser();
    $state.go("home")
  });

  $rootScope.$on('loggedOut', () => {
    console.log('logged out');
    vm.user = null;
    $state.go("login")
  });

  vm.logout = () => {
    CurrentUserService.clearUser();
  };
}
