(function () {
    'use strict';
    function DashboardController($scope, $location, $rootScope, ModalService, apiService) {
        var vm = this;
        $rootScope.settings.layout.pageHeader = true;
        $rootScope.settings.layout.pageHead = true;
        $rootScope.settings.layout.pageFooter = true;
        vm.timeSlots = [];
        for (var i = 8; i <= 17; i++) {
            if (i >= 12) {
                if (i >= 13) {
                    generateArray((i - 12) + ' PM');
                } else {
                    generateArray(i + ' PM');
                }
            } else {
                generateArray(i + ' AM');
            }
        };

        function generateArray(sloatTime) {
            var data = {
                first_name: '',
                last_name: '',
                mobile: '',
                sloat_time: sloatTime,
                isBook: false
            };
            vm.timeSlots.push(data);
        }

        loadAllSavedSlot();
        /**
         * load all slots form server
         */
        function loadAllSavedSlot() {
            apiService.get('slots').then(function (resp) {
                angular.forEach(vm.timeSlots, function (localData) {
                    angular.forEach(resp.data, function (serverData) {
                        if (localData.sloat_time === serverData.sloat_time) {
                            dataAssign(localData, serverData);
                        }
                    });
                });
            });
        }

        /**
         * 
         * @param {*object} slotDetails 
         */
        function openSloats(slotDetails) {
            var modalInstance = ModalService.openModal(
                "app/core/dashboard/add-slot.html",
                "AddSlotModalCtrl",
                "$ctrl",
                'md',
                {
                    slotData: function () {
                        return slotDetails
                    }
                });
            modalInstance.result.then(function (result) {
                if (result) {
                    var updatedObject = vm.timeSlots.find(x => x.sloat_time === result.sloat_time);
                    if (updatedObject) {
                        dataAssign(updatedObject, result);
                    }
                }
            });
        };


        function dataAssign(localData, serverData) {
            localData.first_name = serverData.first_name;
            localData.last_name = serverData.last_name;
            localData.mobile = serverData.mobile;
            localData.isBook = serverData.isBook;
            localData._id = serverData._id;
            localData.__v = serverData.__v;
        }

        vm.openSloats = openSloats;
    }
    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$location', '$rootScope', 'ModalService', 'apiService'];
})();