// app.js is the main JS file which you should define your Angular module
console.log('js loaded');

angular
.module('financeApp', [
  'chart.js',
  'ui.router',
  'ngResource',
  'angular-jwt',
  'angularResizable'
]);
