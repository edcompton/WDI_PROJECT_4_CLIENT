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
      vm.newsItems = response.data.newsItems;
      parseNewsItemPubDates(vm.newsItems);
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function parseNewsItemPubDates(array) {
    for(var i = 0; i < array.length; i++) {
      let temp = array[i].pubDate.split(',')[1];
      temp = temp.split(' ');
      temp = `${temp[1]} ${temp[2]} ${temp[4]}`;
      array[i].pubDate = temp;
    }
  }

}
