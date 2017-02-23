angular
  .module('financeApp')
  .config(homeRouter);

homeRouter.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function homeRouter($stateProvider, $locationProvider, $urlRouterProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'home'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('companySummaryShow', {
    url: '/company/:ticker/summary',
    templateUrl: '/js/views/companies/summaryShow.html',
    controller: 'CompanyDataCtrl',
    controllerAs: 'data'
  })
  .state('incomeStatement', {
    url: '/company/:ticker/model',
    templateUrl: '/js/views/companies/incomeStatement.html',
    controller: 'CompanyModelShowCtrl',
    controllerAs: 'model'
  })
  .state('balanceSheet', {
    url: '/company/:ticker/model',
    templateUrl: '/js/views/companies/balanceSheet.html',
    controller: 'CompanyModelShowCtrl',
    controllerAs: 'model'
  })
  .state('cashFlow', {
    url: '/company/:ticker/model',
    templateUrl: '/js/views/companies/cashFlow.html',
    controller: 'CompanyModelShowCtrl',
    controllerAs: 'model'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  });
  $urlRouterProvider.otherwise('/');

}
