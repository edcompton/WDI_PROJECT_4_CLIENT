angular
.module('financeApp')
.controller('companyWatchlistCtrl', companyWatchlistCtrl)

companyWatchlistCtrl.$inject = ["$http", "API"];
function companyWatchlistCtrl($http, API) {
  const vm = this;
  console.log('im hereee')
  vm.tickers = ['AAPL', 'GOOG', 'KO', 'MMM', 'AXP', 'BA', 'CAT', 'CVX', 'CSCO'];
  vm.stockData = [];

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


}
