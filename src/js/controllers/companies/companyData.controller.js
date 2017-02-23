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
  getEpsEstimates();
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


  function getEpsEstimates() {
    $http({
      method: 'GET',
      url: `${API}/companies/epsestimates/${ticker}`
    }).then(function successCallback(response) {
      vm.est = response.data;
      vm.marketCap = response.data.market_cap;
    }, function errorCallback(error) {
      console.log(error);
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
