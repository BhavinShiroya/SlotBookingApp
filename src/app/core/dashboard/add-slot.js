(function () {
    'use strict';

    function AddSlotModalCtrl(slotData, apiService, Notification, $uibModalInstance) {
        var vm = this;
        vm.title = 'Add Slot';
        vm.slot = {};
        if (slotData._id) {
            vm.title = 'Edit Slot';            
        }
        vm.slot = angular.copy(slotData);       

        function submit() {
            vm.slot.isBook = true;
            if (slotData._id) {
                apiService.put('slots/' + slotData._id, vm.slot).then(function (resp) {
                    Notification.success('Record Save Successfully');
                    $uibModalInstance.close(resp.data);
                }, function (resp) {
                    Notification.error(resp.data.message);
                });
            } else {
                apiService.post('slots', vm.slot).then(function (resp) {
                    Notification.success('Record Save Successfully');
                    $uibModalInstance.close(resp.data);
                }, function (resp) {
                    Notification.error(resp.data.message);
                });
            }
        }

        vm.submit = submit;
    }
    angular
        .module('app')
        .controller('AddSlotModalCtrl', AddSlotModalCtrl);

    AddSlotModalCtrl.$inject = ['slotData', 'apiService', 'Notification', '$uibModalInstance'];
})();