angular
.module('financeApp')
.controller('CompanyDataCtrl', CompanyDataCtrl);

CompanyDataCtrl.$inject = ['$http','API'];
function CompanyDataCtrl($http, API){
  const vm = this;
  const ticker = 'AAPL';

  getCompanyData();
  getSectorDescription();
  getEpsEstimates();
  getHistoricalPrices();

  function getHistoricalPrices() {
    $http({
      method: 'POST',
      url: `${API}/historicalprices`,
      data: ['AAPL']
    }).then(function successCallback(response) {
      vm.priceHistory = response.data.priceHistory;
      console.log(vm.priceHistory);
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
      console.log(vm.est);
    }, function errorCallback(error) {
      console.log(error);
    });
  }


  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model/${ticker}`
    }).then(function successCallback(response) {
      console.log(response);
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
