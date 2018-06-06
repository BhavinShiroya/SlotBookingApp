(function () {
    'use strict';

    function HeaderController($scope, $state, $localStorage) {
        /* jshint validthis:true */
        var vm = this;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header
        });
    }
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', '$localStorage'];
})();