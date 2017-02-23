angular
.module('financeApp')
.controller('ChartCtrl', ChartCtrl);

ChartCtrl.$inject = ['$http', 'API'];

function ChartCtrl($http, API) {

  const vm = this;
  vm.stockChartTitle = 'S&P 500';

  vm.getHistoricalPrices = function(symbol) {
    console.log(symbol, 'symbol');
    $http({
      method: 'POST',
      url: `${API}/historicalprices`,
      data: [symbol]
    }).then(function successCallback(response) {
      vm.priceHistory = response.data.priceHistory;
      createChart(vm.priceHistory);
    }, function errorCallback(error) {
      console.log(error);
    });
  };

  vm.getInitialPrice = function(symbol) {
    console.log(symbol, 'symbol');
    $http({
      method: 'POST',
      url: `${API}/historicalprices`,
      data: ['^GSPC']
    }).then(function successCallback(response) {
      console.log(response);
      vm.priceHistory = response.data.priceHistory;
      createChart(vm.priceHistory);
    }, function errorCallback(error) {
      console.log(error);
    });
  };

  vm.getInitialPrice();

  function createChart(priceHistory) {
    var date = priceHistory[0][0].Date.split('-').join(' ');
    var closeData = [];
    var dateData = [];
    for (var i = priceHistory[0].length-1; i > 0; i--) {
      closeData.push(priceHistory[0][i].Adj_Close);
      dateData.push(priceHistory[0][i].Date);
    }

    parseDateData(dateData);
    vm.labels = dateData;
    vm.series = ['Adjusted Close', 'Date'];
    vm.data = [
      closeData,
      dateData
    ];
    vm.onClick = function (points, evt) {
      // console.log(points, evt);
    };

    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    vm.options = {
      tooltips: {
        enabled: true
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          display: false
        }],
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
  function parseDateData(array) {
    newDates = [];
    dates = {
      1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
    }
    for (var i = 0; i < array.length; i++) {
      var month = (array[i].split('-')[1]);
      array[i] = dates[parseInt(month)];
    }
  }
}
