var app = angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'ngCookies',
  'ngStorage',
  'blockUI',
  'ngSanitize',
  'ui-notification',
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // global configs go here
  });
}]);

/* Configure blockUI */
app.config(['blockUIConfig', function (blockUIConfig) {
  blockUIConfig.requestFilter = function (config) {
    //Perform a global, case-insensitive search on the request url for 'noblockui' ...
    if (config.url.match('#noload')) {
      return false; // ... don't block it.
    }
  };
}]);



/* Setup global settings */
app.factory('settings', ['$rootScope', function ($rootScope) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000, // auto scroll to top on page load,
      pageHeader: false,
      pageHead: false,
      pageSidebar: false,
      pageFooter: false,
    },
    assetsPath: 'assets',
    globalPath: 'assets/global',
    layoutPath: 'assets/layouts/layout3',
  };

  $rootScope.settings = settings;

  return settings;
}]);
//http://localhost:3000/
//107.152.32.144:3000/
app.constant('API_URL', 'http://107.152.32.144:3000/');
app.constant('swal', swal);

/* Setup App Main Controller */
app.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on('$viewContentLoaded', function () {
    App.initComponents(); // init core components
    Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
  });
}]);

app.controller('MainCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
  //$state.go('dashboard');
}]);

/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
app.directive('ngSpinnerBar', ['$rootScope', '$state',
  function ($rootScope, $state) {
    return {
      link: function (scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', function () {
          element.removeClass('hide'); // show spinner bar
          Layout.closeMainMenu();
        });

        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', function (event) {
          element.addClass('hide'); // hide spinner bar
          $('body').removeClass('page-on-load'); // remove page loading indicator
          Layout.setAngularJsMainMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu

          // auto scorll to page top
          setTimeout(function () {
            App.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on('$stateNotFound', function () {
          element.addClass('hide'); // hide spinner bar
        });

        // handle errors
        $rootScope.$on('$stateChangeError', function () {
          element.addClass('hide'); // hide spinner bar
        });
      }
    };
  }
])

// Handle global LINK click
app.directive('a',
  function () {
    return {
      restrict: 'E',
      link: function (scope, elem, attrs) {
        if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
          elem.on('click', function (e) {
            e.preventDefault(); // prevent link click for above criteria
          });
        }
      }
    };
  });

// Handle Dropdown Hover Plugin Integration
app.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };
});

/* Init global settings and run the app */
app.run(['$rootScope', 'settings', '$state', function ($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view
}]);