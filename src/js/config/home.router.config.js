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
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UsersIndexCtrl',
    controllerAs: 'usersIndex'
  });
  $urlRouterProvider.otherwise('/');

}
