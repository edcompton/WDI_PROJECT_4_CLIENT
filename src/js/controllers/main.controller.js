angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$location'];
function MainCtrl($rootScope, CurrentUserService, $state, $location){

  const vm = this;

  vm.tickers = [{ticker: 'Apple', description: 'AAPL'}, {ticker: 'Google', description: 'GOOG'}];
  vm.user = CurrentUserService.getUser();

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.getUser();
    $state.go('home');
  });

  $rootScope.$on('loggedOut', () => {
    console.log('logged out');
    vm.user = null;
    $state.go('login');
  });

  vm.logout = () => {
    CurrentUserService.clearUser();
  };

  vm.localSearch = function(str) {
    console.log(str);
    var matches = [];
    vm.tickers.forEach(function(ticker) {
      console.log(ticker.ticker);
      if ((ticker.ticker.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
        matches.push(ticker);
      }
    });
    return matches;
  };

  vm.searchTicker = function(ticker) {
    console.log(ticker.description);
    $location.url(`/company/${ticker.description}/model`);
  };

}
