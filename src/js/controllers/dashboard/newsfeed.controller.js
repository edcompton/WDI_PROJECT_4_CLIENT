angular
.module('financeApp')
.controller('newsfeedCtrl', newsfeedCtrl);

newsfeedCtrl.$inject = ['$http', 'API','CurrentUserService'];

function newsfeedCtrl($http, API, CurrentUserService) {
  const vm = this;
  // vm.tickers = ['AAPL', 'GOOG', 'KO', 'MMM', 'AXP', 'BA', 'CAT', 'CVX', 'CSCO'];


  var data;
  var userId;

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
      vm.filingItems = response.data.filingItems;
      console.log('filings:', vm.filingItems);
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

  function fetchWatchlist() {
    $http
    .get(`${API}/watchlists/${userId}`)
    .then(function(res, err) {
      vm.tickers = [];
      vm.stockData = [];
      if (err) console.log(err);
      var tickerArray = res.data.tickers;
      for (var i = 0; i < tickerArray.length; i++) {
        vm.tickers.push(tickerArray[i].ticker);
      }
    }).then(function() {
      getWatchlistRSS();
      getSecRSS();
    });
  }


  setTimeout(function(){
    data = CurrentUserService.currentUser;
    userId = data.user.id;
  }, 500);
  setTimeout(function(){
    fetchWatchlist();
  }, 1500);
}
