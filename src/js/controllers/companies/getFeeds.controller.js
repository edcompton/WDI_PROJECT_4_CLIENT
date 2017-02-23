angular
.module('financeApp')
.controller('GetFeedsCtrl', GetFeedsCtrl);

GetFeedsCtrl.$inject = ['$http','API'];
function GetFeedsCtrl($http, API){
  const vm = this;
  const ticker = 'AAPL';

  getFeed();

  function getFeed() {
    $http({
      method: 'GET',
      url: `${API}/companies/feed/${ticker}`
    }).then(function successCallback(response) {
      console.log(response);
      vm.newsItems = response.data.newsItems;
    }, function errorCallback(error) {
      console.log(error);
    });
  }

}
