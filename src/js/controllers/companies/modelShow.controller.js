angular
.module('financeApp')
.controller('CompanyModelShowCtrl', CompanyModelShowCtrl);

CompanyModelShowCtrl.$inject = ['$http','API', '$stateParams'];
function CompanyModelShowCtrl($http, API, $stateParams){
  const vm = this;
  vm.tickerParam = $stateParams.ticker.toString();
  const ticker = vm.tickerParam.toUpperCase();
  console.log(vm.tickerParam);

  getCompanyData();

  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model/${ticker}`
    }).then(function successCallback(response) {
      // console.log(response);
      vm.is =  response.data.is_yearly_results;
      vm.bs = response.data.bs_yearly_results;
      vm.cf = response.data.cf_yearly_results;


    }, function errorCallback(error) {
      console.log(error);
    });
  }

}
