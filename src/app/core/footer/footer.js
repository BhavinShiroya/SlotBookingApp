(function () {
    'use strict';

    function FooterController($scope) {
        /* jshint validthis:true */
        var vm = this;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter(); // init footer
        });
    }

    angular
        .module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$scope'];

})();