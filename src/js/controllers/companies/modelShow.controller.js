angular
.module('financeApp')
.controller('CompanyModelShowCtrl', CompanyModelShowCtrl);

CompanyModelShowCtrl.$inject = ['$http','API'];
function CompanyModelShowCtrl($http, API){
  const vm = this;
  const ticker = 'AAPL';

  getCompanyData();

  function getCompanyData() {
    $http({
      method: 'GET',
      url: `${API}/companies/model/${ticker}`
    }).then(function successCallback(response) {
      console.log(response);
<<<<<<< HEAD
      vm.is =  response.data.is_yearly_results;
      vm.bs = response.data.bs_yearly_results;
      vm.cf = response.data.cf_yearly_results;
=======
      vm.is0 = response.data.is_yearly_results[0];
      vm.is1 = response.data.is_yearly_results[1];
      vm.is2 = response.data.is_yearly_results[2];
      vm.is = [vm.is2, vm.is1, vm.is0];

      vm.fs.bs0 = response.data.bs_yearly_results[0];
      vm.fs.bs1 = response.data.bs_yearly_results[1];
      vm.fs.bs = [vm.fs.bs1, vm.fs.bs0];
>>>>>>> f06468d53039994243d8710ec77f4c96fa00125b

      vm.fs.cf0 = response.data.cf_yearly_results[0];
      vm.fs.cf1 = response.data.cf_yearly_results[1];
      vm.fs.cf2 = response.data.cf_yearly_results[2];
      vm.fs.cf = [vm.fs.cf2, vm.fs.cf1, vm.fs.cf0];

    }, function errorCallback(error) {
      console.log(error);
    });
  }
}
