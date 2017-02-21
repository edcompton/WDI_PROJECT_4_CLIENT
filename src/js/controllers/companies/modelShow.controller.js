angular
.module('financeApp')
.controller('CompanyModelShowCtrl', CompanyModelShowCtrl);

CompanyModelShowCtrl.$inject = ['$http','API'];
function CompanyModelShowCtrl($http, API){
  const vm = this;
  const ticker = 'AAPL';

  console.log('hello');
  getCompanyData();

  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model`,
      params: { ticker: `${ticker}` }
    }).then(function successCallback(response) {
      vm.is0 = response.data.is_yearly_results[0];
      vm.is1 = response.data.is_yearly_results[1];
      vm.is2 = response.data.is_yearly_results[2];
      vm.is = [vm.is2, vm.is1, vm.is0];

      vm.bs0 = response.data.bs_yearly_results[0];
      vm.bs1 = response.data.bs_yearly_results[1];
      vm.bs = [vm.bs1, vm.bs0];

      vm.cf0 = response.data.cf_yearly_results[0];
      vm.cf1 = response.data.cf_yearly_results[1];
      vm.cf2 = response.data.cf_yearly_results[2];
      vm.cf = [vm.cf2, vm.cf1, vm.cf0];

      console.log(vm.cf);
    }, function errorCallback(error) {
      console.log(error);
    });
  }
}
