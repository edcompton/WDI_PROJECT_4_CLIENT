angular
.module('financeApp')
.controller('PeerDataCtrl', PeerDataCtrl);

PeerDataCtrl.$inject = ['$http','API', '$stateParams'];
function PeerDataCtrl($http, API, $stateParams){
  const vm = this;
  vm.tickerParam = $stateParams.ticker.toString();
  const ticker = vm.tickerParam;

  getPeerData();

  function getPeerData() {
    $http({
      method: 'GET',
      url: `${API}/companies/peerdata/${ticker}`
    }).then(function successCallback(response) {
      console.log('PEER DATA', response);
      vm.peerData = response.data.data;
      vm.peerTickers = [];
      vm.eps2016 = [];
      vm.eps2015 = [];
      vm.yearEnds = [];
      for (const peer of vm.peerData) {
        vm.peerTickers.push(peer.ticker);
        if (peer.IS[peer.IS.length-1].year === 2016) {
          vm.eps2015.push(peer.IS[peer.IS.length-2].diluted_eps);
          vm.eps2016.push(peer.IS[peer.IS.length-1].diluted_eps);
        } else {
          vm.eps2015.push(peer.IS[peer.IS.length-1].diluted_eps);
          vm.eps2016.push(false);
        }
        vm.yearEnds.push(peer.IS[peer.IS.length-1].date.substring(0,3) + "'" + peer.IS[peer.IS.length-1].date.substring(peer.IS[peer.IS.length-1].date.length - 2));
      }
      getEpsEstimates();
      getStockPricesAndMarketCaps();
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  function getEpsEstimates() {
    vm.peerEpsEst = [];
    for (const peerTicker of vm.peerTickers) {
      $http({
        method: 'GET',
        url: `${API}/companies/epsestimates/${peerTicker}`
      }).then(function successCallback(response) {
        const index = vm.peerTickers.indexOf(peerTicker);
        vm.peerEpsEst[index] = response.data;
        // vm.est = response.data;
        // vm.marketCap = response.data.market_cap;
      }, function errorCallback(error) {
        console.log(error);
      });
    }
  }

  function getStockPricesAndMarketCaps() {
    vm.peerStockPrices = [];
    vm.peerMarketCaps = [];
    for (const peerTicker of vm.peerTickers) {
      $http
        .get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${peerTicker}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`)
        .then(function(response, err) {
          const data = response.data.query.results.quote;
          const index = vm.peerTickers.indexOf(peerTicker);
          vm.peerStockPrices[index] = parseFloat(data.LastTradePriceOnly).toFixed(2);
          vm.peerMarketCaps[index] = data.MarketCapitalization;
          if (err) console.log(err);
        });
    }
  }
}
