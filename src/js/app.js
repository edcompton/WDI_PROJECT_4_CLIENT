// app.js is the main JS file which you should define your Angular module
console.log('js loaded');

angular
.module('financeApp', [
  'ui.router',
  'ngResource',
  'angular-jwt'
]);
