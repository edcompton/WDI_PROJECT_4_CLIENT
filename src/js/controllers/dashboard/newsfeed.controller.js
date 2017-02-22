angular
.module('financeApp')
.controller('newsfeedCtrl', newsfeedCtrl);

newsfeedCtrl.$inject = ['$http', 'API'];

function newsfeedCtrl($http, API) {
  const vm = this;
  vm.tickers = ['AAPL', 'GOOG', 'KO', 'MMM', 'AXP', 'BA', 'CAT', 'CVX', 'CSCO'];

  function getWatchlistRSS() {
    $http({
      method: 'POST',
      url: `${API}/watchlistfeed`,
      data: vm.tickers
    }).then(function successCallback(response) {
      vm.newsItems = response.data.newsItems;
      parseNewsItemPubDates(vm.newsItems);
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function getSecRSS() {
    $http({
      method: 'POST',
      url: `${API}/filingfeed`,
      data: vm.tickers
    }).then(function successCallback(response) {

      vm.filingItems = response.data.filingItems
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function parseNewsItemPubDates(array) {
    for(var i = 0; i < vm.newsItems.length; i++) {
      temp = vm.newsItems[i].pubDate.split(',')[1];
      temp = temp.split(' ');
      temp = `${temp[1]} ${temp[2]} ${temp[4]}`;
      vm.newsItems[i].pubDate = temp;
    }
  }

//Possible overscroll prevention
  function preventOverscroll() {
    tile = document.getElementsByClassName('scrollable')[0];
    console.log(tile);
    tile.bind('mousewheel', (e) => {
      angular.element(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
      //prevent page fom scrolling
      return false;

    });
  }
  // preventOverscroll()
  getWatchlistRSS();
  getSecRSS();
}
