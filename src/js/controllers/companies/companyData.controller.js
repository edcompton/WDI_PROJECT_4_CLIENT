angular
.module('financeApp')
.controller('CompanyDataCtrl', CompanyDataCtrl);

CompanyDataCtrl.$inject = ['$http','API'];
function CompanyDataCtrl($http, API){
  const vm = this;
  const ticker = 'AAPL';

  if (!vm.fs) getCompanyData();

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
  getEpsEstimates();


  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model/${ticker}`
    }).then(function successCallback(response) {
      vm.fs = {};
      vm.fs.is0 = response.data.is_yearly_results[0];
      vm.fs.is1 = response.data.is_yearly_results[1];
      vm.fs.is2 = response.data.is_yearly_results[2];
      vm.fs.is = [vm.fs.is2, vm.fs.is1, vm.fs.is0];

      vm.fs.bs0 = response.data.bs_yearly_results[0];
      vm.fs.bs1 = response.data.bs_yearly_results[1];
      vm.fs.bs = [vm.fs.bs1, vm.fs.bs0];

      vm.fs.cf0 = response.data.cf_yearly_results[0];
      vm.fs.cf1 = response.data.cf_yearly_results[1];
      vm.fs.cf2 = response.data.cf_yearly_results[2];
      vm.fs.cf = [vm.fs.cf2, vm.fs.cf1, vm.fs.cf0];

      console.log(vm.fs);
    }, function errorCallback(error) {
      console.log(error);
    });
  }


}
