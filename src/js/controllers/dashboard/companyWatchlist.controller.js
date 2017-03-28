angular
.module('financeApp')
.controller('companyWatchlistCtrl', companyWatchlistCtrl);

companyWatchlistCtrl.$inject = ['$http', 'API', 'CurrentUserService', '$location'];
function companyWatchlistCtrl($http, API, CurrentUserService, $location) {

  const vm = this;

  var data;
  var userId;

  vm.removeCompany = function(companyTicker) {
    vm.tickers.filter(t => t !== companyTicker);
    $http
    .post(`${API}/watchlists/${userId}/delete/${companyTicker}`)
    .then(function(res, err) {
      if (err) console.log(err);
    });
  };

  vm.addCompany = function(companyTicker) {
    $http
    .post(`${API}/watchlists/${userId}/add/${companyTicker}`)
    .then(function(res, err) {
      if (err) console.log(err);
    });
  };

  function fetchWatchlist() {
    $http
    .get(`${API}/watchlists/${userId}`)
    .then(function(res, err) {
      vm.tickers = [];
      vm.stockData = [];
      if (err) console.log(err);
      var tickerArray = res.data.tickers;
      for (var i = 0; i < tickerArray.length; i++) {
        vm.tickers.push(tickerArray[i].ticker);
      }
    }).then(function() {
      for (const ticker of vm.tickers) {
        $http
        .get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${ticker}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
        .then(function(response, err) {
          if (err) console.log(err);
          const data = response.data.query.results.quote;
          data.Name = data.Name.split(' Commo')[0];
          vm.stockData.push(data);
        });
      }
    });
  }


  setTimeout(function(){
    data = CurrentUserService.currentUser;
    userId = data.user.id;
  }, 500);
  setTimeout(function(){
    fetchWatchlist();
  }, 1500);


  vm.goToState = function(symbol) {
    $location.url(`/company/${symbol}/summary`);
  };

  vm.checkStocks = function(stock) {
    if (stock.indexOf('-') >= 0) {
      return {color: 'red'};
    }else {
      return {color: 'green'};
    }
  };

}
