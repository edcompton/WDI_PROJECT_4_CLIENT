angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$location'];
function MainCtrl($rootScope, CurrentUserService, $state, $location){

  const vm = this;

  vm.tickers = [{ticker: 'Apple', description: 'AAPL'}, {ticker: 'Google', description: 'GOOG'}, {ticker: 'Coca Cola', description: 'KO'}, {ticker: 'Procter & Gamble', description: 'PG'}, {ticker: 'Microsoft', description: 'MSFT'}];
  // vm.user = CurrentUserService.getUser();

  $rootScope.$on('loggedIn', () => {
    console.log("Inside logged in inside main control:", CurrentUserService.currentUser);
    vm.user = CurrentUserService.currentUser;
    $state.go('home', {id: vm.user._id});
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
    $location.url(`/company/${ticker.description}/summary`);
  };



}
