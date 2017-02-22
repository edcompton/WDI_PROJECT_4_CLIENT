angular
.module('financeApp')
.controller('newsfeedCtrl', newsfeedCtrl);

newsfeedCtrl.$inject = ['$http', 'API'];

function newsfeedCtrl($http, API) {
  const vm = this;
  vm.tickers = ['AAPL', 'GOOG', 'KO', 'MMM', 'AXP', 'BA', 'CAT', 'CVX', 'CSCO'];

  function getWatchlistRSS() {
    $http({
      method: 'POST',
      url: `${API}/watchlistfeed`,
      data: vm.tickers
    }).then(function successCallback(response) {
      vm.newsItems = response.data.newsItems;
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function getSecRSS() {
    $http({
      method: 'POST',
      url: `${API}/filingfeed`,
      data: vm.tickers
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  getWatchlistRSS();
  getSecRSS();
}
