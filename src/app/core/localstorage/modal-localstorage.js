(function () {
    'use strict';

    function localstorageModalCtrl(slotData, index, $localStorage, apiService, Notification, $uibModalInstance) {
        var vm = this;
        vm.title = 'Add Slot';
        vm.slot = {};
        if (slotData.isBook) {
            vm.title = 'Edit Slot';
        }
        vm.slot = angular.copy(slotData);
        function submit() {
            var data = {
                index: index,
            };
            if (vm.slot.isBook) {
                data.data = angular.copy(vm.slot);
                $localStorage.timeSlotsData[index] = vm.slot;
                $uibModalInstance.close(data);
            } else {
                vm.slot.isBook = true;
                data.data = angular.copy(vm.slot);
                $localStorage.timeSlotsData.push(vm.slot);
                $uibModalInstance.close(data);
            }
        }

        vm.submit = submit;

    }
    angular
        .module('app')
        .controller('localstorageModalCtrl', localstorageModalCtrl);

    localstorageModalCtrl.$inject = ['slotData', 'index', '$localStorage', 'apiService', 'Notification', '$uibModalInstance'];
})();