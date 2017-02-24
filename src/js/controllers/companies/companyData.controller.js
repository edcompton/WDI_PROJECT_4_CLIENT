angular
.module('financeApp')
.controller('CompanyDataCtrl', CompanyDataCtrl);

CompanyDataCtrl.$inject = ['$http','API', '$stateParams'];
function CompanyDataCtrl($http, API, $stateParams){
  const vm = this;
  vm.tickerParam = $stateParams.ticker.toString();
  const ticker = vm.tickerParam;

  getCompanyData();
  getSectorDescription();
  getMarketCap();
  getHistoricalPrices();

  function getHistoricalPrices() {
    $http({
      method: 'POST',
      url: `${API}/historicalprices`,
      data: [ticker]
    }).then(function successCallback(response) {
      vm.priceHistory = response.data.priceHistory;
      vm.currentPrice = parseFloat(vm.priceHistory[0][0].Adj_Close).toFixed(2);
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function getMarketCap() {
    $http
      .get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${ticker}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
      .then(function(response) {
        const data = response.data.query.results.quote;
        vm.marketCap = data.MarketCapitalization;
        console.log(vm.marketCap);
      });
  }


  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model/${ticker}`
    }).then(function successCallback(response) {
      vm.is =  response.data.is_yearly_results;
      vm.bs = response.data.bs_yearly_results;
      vm.cf = response.data.cf_yearly_results;
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function getSectorDescription() {
    $http({
      method: 'GET',
      url: `${API}/companies/info/${ticker}`
    }).then(function successCallback(response) {
      vm.companyName = response.data.name;
      vm.companyDescription = response.data.description;
      vm.companySector = response.data.sector;
    }, function errorCallback(error) {
      console.log(error);
    });
  }
}
