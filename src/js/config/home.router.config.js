angular
  .module('financeApp')
  .config(homeRouter);

homeRouter.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function homeRouter($stateProvider, $locationProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/home',
    // template: '<h1>Home</h1>',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl as home'
  })
  .state('test', {
    url: '/test',
    template: '<h1>Test</h1>'
  });

  // $urlRouterProvider.otherwise('/');

}
