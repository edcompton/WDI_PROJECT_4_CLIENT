angular
.module('financeApp')
.controller('GetFeedsCtrl', GetFeedsCtrl);

GetFeedsCtrl.$inject = ['$http','API', '$stateParams'];
function GetFeedsCtrl($http, API, $stateParams){
  const vm = this;
  vm.tickerParam = $stateParams.ticker.toString();
  const ticker = vm.tickerParam;


  getFeed();

  function getFeed() {
    $http({
      method: 'GET',
      url: `${API}/companies/feed/${ticker}`
    }).then(function successCallback(response) {
      // console.log(response);
      vm.newsItems = response.data.newsItems;
    }, function errorCallback(error) {
      console.log(error);
    });
  }

}
