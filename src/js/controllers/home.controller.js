angular
.module('financeApp')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$http', 'API'];
function HomeCtrl($http, API){
  const vm = this;
//
//   // function getWatchlistRSS() {
//   //   $http({
//   //     method: 'POST',
//   //     url: `${API}/watchlistfeed`,§
//   //     data: vm.tickers
//   //   }).then(function successCallback(response) {
//   //     vm.newsItems = response.data.newsItems;
//   //   }, function errorCallback(error) {
//   //     console.log(error);
//   //   });
//   // }
//   //
//   // // vm.populateCurrencies(addCrossCurrencies);
//   // // getHistoricalPrices()
//   // getWatchlistRSS();
//   // getSecRSS();
//   //
//   //
//   // function getSecRSS() {
//   //   $http({
//   //     method: 'POST',
//   //     url: `${API}/filingfeed`,
//   //     data: vm.tickers
//   //   }).then(function successCallback(response) {
//   //     console.log(response);
//   //   }, function errorCallback(error) {
//   //     console.log(error);
//   //   });
//   // }
//
//   // function getHistoricalPrices() {
//   //   $http({
//   //     method: 'POST',
//   //     url: `${API}/historicalprices`,
//   //     data: ['GOOG']
//   //   }).then(function successCallback(response) {
//   //     vm.priceHistory = response.data.priceHistory;
//   //     // console.log(vm.priceHistory);
//   //     createChart(vm.priceHistory);
//   //   }, function errorCallback(error) {
//   //     console.log(error);
//   //   });
//   // }
//   //
//   // function createChart(priceHistory) {
//   //   var date = priceHistory[0][0].Date.split('-').join(' ');
//   //   var closeData = [];
//   //   var dateData = [];
//   //   for (var i = priceHistory[0].length-1; i > 0; i--) {
//   //     closeData.push(priceHistory[0][i].Adj_Close);
//   //     dateData.push(priceHistory[0][i].Date);
//   //   }
//   //   console.log(date);
//   //   console.log(closeData);
//   //   console.log(dateData);
//   //   vm.labels = dateData;
//   //   vm.series = ['Adjusted Close', 'Date'];
//   //   vm.data = [
//   //     closeData,
//   //     dateData
//   //   ];
//   //   vm.onClick = function (points, evt) {
//   //     console.log(points, evt);
//   //   };
//   //   vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
//   //   vm.options = {
//   //     scales: {
//   //       yAxes: [
//   //         {
//   //           id: 'y-axis-1',
//   //           type: 'linear',
//   //           display: true,
//   //           position: 'left'
//   //         },
//   //         {
//   //           id: 'y-axis-2',
//   //           type: 'linear',
//   //           display: false,
//   //           position: 'right'
//   //         }
//   //       ]
//   //     }
//   //   };
//   // }
//
//
//   // https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&CIK=0000320193&type=&dateb=&owner=exclude&start=0&count=40&output=atom
//
//   // function getFields() {
//   //   $http({
//   //     method: 'GET',
//   //     url: `${API}/companies`
//   //   }).then(function successCallback(response) {
//   //     console.log(response);
//   //   }, function errorCallback(error) {
//   //     console.log(error);
//   //   });
//   // }
//
}
