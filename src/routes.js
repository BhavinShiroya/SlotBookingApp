angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "app/core/dashboard/dashboard.html",
      controller: "DashboardController",
      controllerAs: '$ctrl',
    })
}
