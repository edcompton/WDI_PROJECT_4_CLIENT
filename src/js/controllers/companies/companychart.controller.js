angular
.module('financeApp')
.controller('CompanyChartCtrl', CompanyChartCtrl);

CompanyChartCtrl.$inject = ['$http','API', '$stateParams'];
function CompanyChartCtrl($http, API, $stateParams){
  const vm = this;
  vm.tickerParam = $stateParams.ticker.toString();
  const ticker = vm.tickerParam;

  function getHistoricalPrices() {
    $http({
      method: 'POST',
      url: `${API}/historicalprices`,
      data: [ticker]
    }).then(function successCallback(response) {
      vm.priceHistory = response.data.priceHistory;
      createChart(vm.priceHistory);
    }, function errorCallback(error) {
      console.log(error);
    });
  }

  getHistoricalPrices();

  function createChart(priceHistory) {
    var date = priceHistory[0][0].Date.split('-').join(' ');
    var closeData = [];
    var dateData = [];
    for (var i = priceHistory[0].length-1; i > 0; i--) {
      closeData.push(priceHistory[0][i].Adj_Close);
      dateData.push(priceHistory[0][i].Date);
    }
    vm.labels = dateData;
    vm.series = ['Adjusted Close', 'Date'];
    vm.data = [
      closeData,
      dateData
    ];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    vm.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: false,
            position: 'right'
          }
        ]
      }
    };
  }
}
