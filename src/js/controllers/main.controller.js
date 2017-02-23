angular
.module('financeApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$location'];
function MainCtrl($rootScope, CurrentUserService, $state, $location){

  const vm = this;

  vm.tickers = [{ticker: 'Apple', description: 'AAPL'}, {ticker: 'Google', description: 'GOOG'}, {ticker: 'Coca Cola', description: 'KO'}, {ticker: 'Procter & Gamble', description: 'PG'}, {ticker: 'American Express', description: 'AXP'}, {ticker: 'Boeing', description: 'BA'}, {ticker: 'Caterpillar', description: 'CAT'}, {ticker: 'Chevron', description: 'CVX'}, {ticker: 'Cisco', description: 'CSCO'}, {ticker: 'Disney', description: 'DIS'}, {ticker: 'E I Du Pont de Nemours and Co', description: 'DD'}, {ticker: 'Exxon Mobil', description: 'XOM'}, {ticker: 'General Electric', description: 'GE'}, {ticker: 'Goldman Sachs', description: 'GS'}, {ticker: 'Home Depot', description: 'HD'}, {ticker: 'IBM', description: 'IBM'}, {ticker: 'Intel', description: 'INTC'}, {ticker: 'Johnson & Johnson', description: 'JNJ'}, {ticker: 'JPMorgan Chase', description: 'JPM'}, {ticker: 'McDonalds', description: 'MCD'}, {ticker: 'Nike', description: 'NKE'}, {ticker: 'Pfizer', description: 'PFE'}, {ticker: 'Travelers Companies Inc', description: 'TRV'}, {ticker: 'United Technologies', description: 'UTX'}, {ticker: 'UnitedHealth', description: 'UNH'}, {ticker: 'Verizon', description: 'VZ'}, {ticker: 'Visa', description: 'V'}, {ticker: 'Wal-Mart', description: 'WMT'}];

  vm.user = CurrentUserService.getUser();

  $rootScope.$on('loggedIn', () => {
    console.log("Inside logged in inside main control:", CurrentUserService.currentUser);
    vm.user = CurrentUserService.currentUser;
    $state.go('home', {id: vm.user._id});
  });

  $rootScope.$on('loggedOut', () => {
    console.log('logged out being broadcast in mainCtrl');
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
