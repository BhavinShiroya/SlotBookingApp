(function () {
    'use strict';

    function HeaderController($scope, $state, $localStorage, apiService, Notification) {
        /* jshint validthis:true */
        var vm = this;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header
        });

        vm.drop = function () {
            apiService.get('slots/clear/all').then(function (resp) {
                Notification.success('Record Drops Successfully');
                $state.reload();
            });
            $localStorage.timeSlotsData = [];
        }

    }
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', '$localStorage', 'apiService', 'Notification'];
})();